import { Module } from '@nestjs/common';
import { OpenTelemetryModule } from 'nestjs-otel';

const enableObservability = process.env.ENABLE_OBSERVABILITY === 'true';
const otlModuleConfig = enableObservability
  ? [
      OpenTelemetryModule.forRoot({
        metrics: {
          hostMetrics: true,
          apiMetrics: {
            enable: true,
            ignoreRoutes: ['/favicon.ico'],
            ignoreUndefinedRoutes: false,
          },
        },
      }),
    ]
  : [];

@Module({
  imports: otlModuleConfig,
  providers: [],
  exports: [],
})
export class ObservabilityModule {}
