# Arize Phoenix — Test Observability & AI Failure Analysis

This directory contains the Arize Phoenix integration for the Test Automation Accelerator.

## What It Does

| Component | Location | Purpose |
|-----------|----------|---------|
| **Phoenix Reporter** | `src/reporters/arize-phoenix.reporter.ts` | Custom Playwright reporter — sends every test execution as a traced span to Phoenix |
| **Failure Analyzer** | `arize/analyze_failures.py` | Reads test results, classifies failures via LLM, all calls traced in Phoenix |

## Architecture

```
Playwright tests
  └─► Phoenix Reporter ──► Arize Phoenix (OTLP spans)
                                  ▲
test-results/results.json         │
  └─► analyze_failures.py ──► LLM (OpenAI / Bedrock)
        (auto-traced) ───────────┘
```

**Phoenix shows two views:**
1. **Test execution traces** — hierarchical view of every test run (pass/fail, duration, errors)
2. **LLM failure analysis traces** — the prompt, response, token usage, and latency for each AI classification

---

## Quick Start

### 1. Install Phoenix

```bash
python3 -m venv arize/.venv
source arize/.venv/bin/activate
pip install -r arize/requirements.txt
```

### 2. Start Phoenix server

```bash
phoenix serve
# Phoenix UI: http://localhost:6006
```

### 3. Run Playwright tests (spans sent to Phoenix automatically)

```bash
npm test
# or
npx playwright test
```

### 4. Analyze failures with AI

```bash
export OPENAI_API_KEY=your-key-here
python arize/analyze_failures.py
```

### 5. View in Phoenix

Open [http://localhost:6006](http://localhost:6006) to see:
- **Project: test-automation-accelerator** — test execution spans
- **Project: test-failure-analysis** — LLM classification traces

---

## Configuration

### Reporter (environment variables)

| Variable | Default | Description |
|----------|---------|-------------|
| `PHOENIX_COLLECTOR_ENDPOINT` | `http://localhost:6006/v1/traces` | Phoenix OTLP endpoint |
| `PHOENIX_PROJECT_NAME` | `test-automation-accelerator` | Project name in Phoenix UI |

### Failure Analyzer (environment variables)

| Variable | Default | Description |
|----------|---------|-------------|
| `OPENAI_API_KEY` | — | Required. API key for the LLM provider |
| `OPENAI_BASE_URL` | OpenAI default | Set for Bedrock via LiteLLM or other providers |
| `OPENAI_MODEL` | `gpt-4o-mini` | Model to use for classification |
| `PHOENIX_COLLECTOR_ENDPOINT` | `http://localhost:6006/v1/traces` | Phoenix OTLP endpoint |
| `PHOENIX_PROJECT_NAME` | `test-failure-analysis` | Project name in Phoenix UI |

### Using Amazon Bedrock instead of OpenAI

Use [LiteLLM proxy](https://docs.litellm.ai/) to expose Bedrock as an OpenAI-compatible endpoint:

```bash
pip install litellm[proxy]
litellm --model bedrock/anthropic.claude-3-haiku-20240307 --port 4000

# Then point the analyzer at it:
export OPENAI_BASE_URL=http://localhost:4000/v1
export OPENAI_API_KEY=dummy
export OPENAI_MODEL=bedrock/anthropic.claude-3-haiku-20240307
python arize/analyze_failures.py
```

---

## Failure Categories

The AI analyzer classifies each failure into one of:

| Category | Meaning | Typical Action |
|----------|---------|----------------|
| `UI_REGRESSION` | Selector, text, or layout changed | Update page object locators |
| `FLAKY` | Timing / race condition | Add waits, use web-first assertions |
| `ENVIRONMENT` | Server down, network, config | Check server status, env vars |
| `DATA` | Test data missing or stale | Reset test data, check seed |
| `REAL_BUG` | Genuine application defect | File a bug report |

---

## Demo Walkthrough

1. Start Phoenix: `phoenix serve`
2. Run tests with some expected failures: `npx playwright test`
3. Show Phoenix UI — test execution spans with pass/fail/duration
4. Run failure analysis: `python arize/analyze_failures.py`
5. Show Phoenix UI — LLM traces with full prompt, response, tokens, latency
6. Show the AI classification summary in the terminal output

**Key talking points:**
- "Every test execution is automatically traced to Phoenix — no extra code in tests"
- "When failures occur, AI classifies the root cause and the LLM interaction is fully observable"
- "We can see exactly what prompt was sent, what the model returned, and how long it took"
- "This gives us intelligent triage with full observability — not a black box"
