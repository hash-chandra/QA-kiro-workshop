#!/usr/bin/env python3
"""
AI-powered test failure analysis with Arize Phoenix observability.

Reads Playwright JSON results, classifies each failure using an LLM,
and traces all LLM interactions in Arize Phoenix for full observability.

Usage:
  phoenix serve &                              # Start Phoenix on :6006
  python arize/analyze_failures.py             # Analyze latest results
  open http://localhost:6006                   # View traces in Phoenix

Environment:
  OPENAI_API_KEY              — API key (OpenAI or compatible provider)
  OPENAI_BASE_URL             — Custom base URL (for Bedrock via LiteLLM, etc.)
  OPENAI_MODEL                — Model name (default: gpt-4o-mini)
  PHOENIX_COLLECTOR_ENDPOINT  — Phoenix OTLP endpoint (default: http://localhost:6006/v1/traces)
  PHOENIX_PROJECT_NAME        — Phoenix project name (default: test-failure-analysis)
"""

import json
import os
import sys
from pathlib import Path

from openai import OpenAI
from openinference.instrumentation.openai import OpenAIInstrumentor
from phoenix.otel import register


CLASSIFICATION_PROMPT = """You are a test automation expert analyzing Playwright test failures.

Classify this failure into exactly ONE category:
- UI_REGRESSION: A UI element changed (selector, text, layout, missing data-testid)
- FLAKY: Timing issue, race condition, or intermittent failure
- ENVIRONMENT: Server not running, network error, or configuration problem
- DATA: Test data missing, stale, or in unexpected state
- REAL_BUG: Likely a genuine application defect

Test details:
  Name: {title}
  File: {file}
  Suite: {suite}
  Project: {project}
  Duration: {duration_ms}ms
  Retry attempt: {retry}

Error output:
{error}

Respond with JSON only — no markdown fences:
{{"category": "...", "confidence": 0.0, "reasoning": "one sentence", "suggested_action": "one sentence"}}"""


def setup_phoenix_tracing():
    """Connect to Phoenix and instrument OpenAI calls."""
    endpoint = os.environ.get(
        "PHOENIX_COLLECTOR_ENDPOINT", "http://localhost:6006/v1/traces"
    )
    project = os.environ.get("PHOENIX_PROJECT_NAME", "test-failure-analysis")
    tp = register(endpoint=endpoint, project_name=project)
    OpenAIInstrumentor().instrument(tracer_provider=tp)
    print(f"[Phoenix] Tracing LLM calls to {endpoint} (project: {project})")
    return tp


def load_results(path: str) -> dict:
    """Load Playwright JSON report."""
    with open(path) as f:
        return json.load(f)


def extract_failures(results: dict) -> list[dict]:
    """Walk the suite tree and collect failed/timed-out tests."""
    failures: list[dict] = []

    def walk(suites: list[dict]):
        for suite in suites:
            for spec in suite.get("specs", []):
                for test in spec.get("tests", []):
                    for result in test.get("results", []):
                        if result["status"] in ("failed", "timedOut"):
                            errors = result.get("errors", [])
                            failures.append(
                                {
                                    "title": spec["title"],
                                    "file": suite.get("file", ""),
                                    "suite": suite.get("title", ""),
                                    "project": test.get("projectName", ""),
                                    "status": result["status"],
                                    "duration_ms": result.get("duration", 0),
                                    "error": "\n".join(
                                        e.get("message", "") for e in errors
                                    )[:2000],
                                    "retry": result.get("retry", 0),
                                }
                            )
            walk(suite.get("suites", []))

    walk(results.get("suites", []))
    return failures


def classify_failure(client: OpenAI, failure: dict, model: str) -> dict:
    """Send failure context to LLM for classification. Auto-traced by Phoenix."""
    prompt = CLASSIFICATION_PROMPT.format(**failure)

    response = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.1,
    )

    content = response.choices[0].message.content or "{}"
    # Strip markdown fences if the model wraps them
    content = content.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()

    try:
        return json.loads(content)
    except json.JSONDecodeError:
        return {
            "category": "UNKNOWN",
            "confidence": 0.0,
            "reasoning": "Could not parse LLM response",
            "suggested_action": "Manual review required",
        }


def print_summary(analyses: list[dict]):
    """Print a formatted summary of all classified failures."""
    print("\n" + "=" * 64)
    print("  FAILURE ANALYSIS SUMMARY")
    print("=" * 64)

    for a in analyses:
        print(f"\n  Test: {a['test']}")
        print(f"  File: {a['file']}")
        print(f"  Category:  {a['category']}  (confidence: {a.get('confidence', '?')})")
        print(f"  Reasoning: {a.get('reasoning', '-')}")
        print(f"  Action:    {a.get('suggested_action', '-')}")

    # Breakdown
    cats: dict[str, int] = {}
    for a in analyses:
        c = a.get("category", "UNKNOWN")
        cats[c] = cats.get(c, 0) + 1

    print(f"\n  Breakdown: {cats}")
    print(f"\n  View LLM traces in Phoenix: http://localhost:6006")
    print(f"  Project: test-failure-analysis\n")


def main():
    results_path = sys.argv[1] if len(sys.argv) > 1 else "test-results/results.json"
    model = os.environ.get("OPENAI_MODEL", "gpt-4o-mini")

    if not Path(results_path).exists():
        print(f"Results file not found: {results_path}")
        print("Run Playwright tests first: npx playwright test")
        sys.exit(1)

    # 1. Connect to Phoenix
    setup_phoenix_tracing()

    # 2. Load results
    print(f"[Results] Loading {results_path}")
    results = load_results(results_path)
    failures = extract_failures(results)

    if not failures:
        print("\nAll tests passed — nothing to analyze.")
        return

    print(f"[Analysis] Found {len(failures)} failure(s), classifying with {model}...\n")

    # 3. Classify each failure (LLM calls auto-traced in Phoenix)
    client = OpenAI()
    analyses: list[dict] = []

    for f in failures:
        print(f"  Classifying: {f['title']}...")
        result = classify_failure(client, f, model)
        result["test"] = f["title"]
        result["file"] = f["file"]
        analyses.append(result)

    # 4. Print summary
    print_summary(analyses)

    # 5. Optionally write JSON output
    output_path = Path("arize/analysis-results.json")
    output_path.parent.mkdir(exist_ok=True)
    with open(output_path, "w") as out:
        json.dump(analyses, out, indent=2)
    print(f"  Results saved to {output_path}")


if __name__ == "__main__":
    main()
