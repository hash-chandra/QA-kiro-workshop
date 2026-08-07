# Arize Phoenix Integration

Arize Phoenix provides **test execution observability** and **AI-powered failure analysis** for the Test Automation Accelerator.

---

## What Phoenix Adds

| Capability | How It Works |
|-----------|--------------|
| **Test execution tracing** | Custom Playwright reporter sends every test as an OTLP span to Phoenix — pass/fail, duration, errors, project, suite |
| **AI failure classification** | Python script classifies failures via LLM into categories (UI regression, flaky, environment, data, real bug) |
| **LLM observability** | All AI classification calls are auto-traced — prompt, response, token usage, latency visible in Phoenix |
| **Trend analysis** | Phoenix retains trace history, enabling analysis of failure patterns across runs |

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Playwright Tests                                       │
│  ┌──────────────────┐    ┌───────────────────────────┐  │
│  │ Test Execution    │──►│ arize-phoenix.reporter.ts  │  │
│  │ (UI + API specs)  │    │ (OTLP spans per test)     │  │
│  └──────────────────┘    └──────────┬────────────────┘  │
│                                     │                    │
│  ┌──────────────────┐               ▼                   │
│  │ results.json      │    ┌──────────────────────────┐  │
│  │ (Playwright JSON) │──►│ analyze_failures.py       │  │
│  └──────────────────┘    │ (LLM classification)      │  │
│                           └──────────┬───────────────┘  │
│                                      │                   │
└──────────────────────────────────────┼───────────────────┘
                                       ▼
                            ┌──────────────────────┐
                            │   Arize Phoenix       │
                            │   localhost:6006      │
                            │                      │
                            │  • Test exec spans   │
                            │  • LLM traces        │
                            │  • Token/latency     │
                            └──────────────────────┘
```

## Files

| File | Description |
|------|-------------|
| `src/reporters/arize-phoenix.reporter.ts` | Custom Playwright reporter — sends test spans to Phoenix via OTLP |
| `arize/analyze_failures.py` | AI failure classifier — traces LLM calls in Phoenix |
| `arize/requirements.txt` | Python dependencies for Phoenix + analysis |
| `arize/README.md` | Full setup guide and demo walkthrough |

## Setup

See [arize/README.md](../arize/README.md) for complete setup instructions.

**Quick version:**

```bash
# Install + start Phoenix
pip install -r arize/requirements.txt
phoenix serve

# Run tests (reporter sends spans automatically)
npm test

# Analyze failures with AI
export OPENAI_API_KEY=your-key
python arize/analyze_failures.py

# View traces
open http://localhost:6006
```

## How This Fits the Proposal

| Proposal Requirement | Implementation |
|---------------------|----------------|
| "Test analytics, anomaly detection" | Phoenix dashboard shows test execution trends, failure patterns |
| "Flaky test pattern identification" | AI analyzer classifies flaky tests; Phoenix traces show classification reasoning |
| "Observability and analytics integrated" | OTLP-based telemetry pipeline from Playwright → Phoenix |
| "Actionable insights into test failures" | AI provides category, confidence score, and suggested action for each failure |
