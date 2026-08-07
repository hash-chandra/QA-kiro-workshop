/**
 * Custom Playwright Reporter — Arize Phoenix
 *
 * Sends test execution spans to Arize Phoenix via OpenTelemetry (OTLP/proto).
 * Each test becomes a child span under a parent "Test Run" span,
 * giving a hierarchical view of the entire run in Phoenix.
 *
 * Setup:
 *   pip install arize-phoenix && phoenix serve
 *
 * Config (playwright.config.ts):
 *   reporter: [['./src/reporters/arize-phoenix.reporter.ts', { projectName: 'my-project' }]]
 *
 * Environment:
 *   PHOENIX_COLLECTOR_ENDPOINT  — default: http://localhost:6006/v1/traces
 *   PHOENIX_PROJECT_NAME        — default: test-automation-accelerator
 */
import type {
  Reporter,
  TestCase,
  TestResult,
  FullConfig,
  Suite,
  FullResult,
} from '@playwright/test/reporter';
import { BasicTracerProvider, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { trace, SpanStatusCode, context } from '@opentelemetry/api';

interface ReporterOptions {
  endpoint?: string;
  projectName?: string;
}

class ArizePhoenixReporter implements Reporter {
  private provider!: BasicTracerProvider;
  private projectName: string;
  private endpoint: string;
  private testResults: Array<{ test: TestCase; result: TestResult }> = [];
  private runStartTime = 0;

  constructor(options: ReporterOptions = {}) {
    this.endpoint =
      options.endpoint ||
      process.env.PHOENIX_COLLECTOR_ENDPOINT ||
      'http://localhost:6006/v1/traces';
    this.projectName =
      options.projectName ||
      process.env.PHOENIX_PROJECT_NAME ||
      'test-automation-accelerator';
  }

  onBegin(_config: FullConfig, _suite: Suite): void {
    this.runStartTime = Date.now();

    const exporter = new OTLPTraceExporter({ url: this.endpoint });
    const resource = resourceFromAttributes({ [ATTR_SERVICE_NAME]: this.projectName });

    this.provider = new BasicTracerProvider({ resource, spanProcessors: [new SimpleSpanProcessor(exporter)] });

    console.log(`[Phoenix] Tracing to ${this.endpoint} (project: ${this.projectName})`);
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    this.testResults.push({ test, result });
  }

  async onEnd(fullResult: FullResult): Promise<void> {
    if (this.testResults.length === 0) return;

    const tracer = this.provider.getTracer('playwright-test', '1.0.0');
    const passed = this.testResults.filter((r) => r.result.status === 'passed').length;
    const failed = this.testResults.filter((r) => r.result.status === 'failed').length;

    // Create parent span for the test run
    const runSpan = tracer.startSpan('Test Run', {
      startTime: this.runStartTime,
      attributes: {
        'test.run.status': fullResult.status,
        'test.run.total': this.testResults.length,
        'test.run.passed': passed,
        'test.run.failed': failed,
      },
    });

    const runCtx = trace.setSpan(context.active(), runSpan);

    // Create child spans for each test
    for (const { test, result } of this.testResults) {
      const startMs = new Date(result.startTime).getTime();
      const span = tracer.startSpan(
        test.title,
        {
          startTime: startMs,
          attributes: {
            'test.name': test.title,
            'test.file': test.location.file,
            'test.line': test.location.line,
            'test.status': result.status,
            'test.duration_ms': result.duration,
            'test.project': test.parent?.project()?.name || '',
            'test.suite': test.parent?.title || '',
            'test.retry': result.retry,
          },
        },
        runCtx,
      );

      if (result.status === 'failed' && result.errors.length > 0) {
        span.setAttribute('test.error.message', (result.errors[0]?.message || '').slice(0, 1000));
        span.setAttribute('test.error.stack', (result.errors[0]?.stack || '').slice(0, 2000));
        span.setStatus({ code: SpanStatusCode.ERROR, message: result.errors[0]?.message?.slice(0, 500) });
      } else {
        span.setStatus({ code: SpanStatusCode.OK });
      }

      span.end(startMs + result.duration);
    }

    runSpan.setStatus({
      code: fullResult.status === 'passed' ? SpanStatusCode.OK : SpanStatusCode.ERROR,
    });
    runSpan.end();

    try {
      await this.provider.forceFlush();
      console.log(`[Phoenix] Sent ${this.testResults.length} test spans (${passed} passed, ${failed} failed)`);
      console.log('[Phoenix] View at: http://localhost:6006');
    } catch {
      console.warn('[Phoenix] Could not connect — is Phoenix running? Run: phoenix serve');
    } finally {
      await this.provider.shutdown();
    }
  }
}

export default ArizePhoenixReporter;
