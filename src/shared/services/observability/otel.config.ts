import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { NodeSDK } from '@opentelemetry/sdk-node';

const isEnabled = process.env.ENABLE_OBSERVABILITY === 'true';

const traceExporter = new OTLPTraceExporter({
  url: process.env.JAEGER_ENDPOINT || 'http://jaeger:4318/v1/traces',
});

const metricReader = new PrometheusExporter({
  port: 9464,
  appendTimestamp: true,
  endpoint: '/metrics',
});

const sdk = new NodeSDK({
  serviceName: 'shortener-url-api',
  traceExporter: traceExporter,
  metricReader: metricReader,
  instrumentations: [getNodeAutoInstrumentations()],
});

if (isEnabled) sdk.start();
