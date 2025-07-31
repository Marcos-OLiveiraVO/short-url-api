import { PinoLogger } from 'nestjs-pino';

export interface LoggerLevelInput {
  level?: Criticality;
  message: string;
  context?: Record<string, any>;
}

export type Criticality = 'debug' | 'info' | 'warn' | 'error';

export interface LoggerWithFallbackInput {
  level: Criticality;
  logData: LoggerLevelInput;
  logger: PinoLogger;
}
