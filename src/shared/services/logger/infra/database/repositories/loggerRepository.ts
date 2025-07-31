import { Injectable } from '@nestjs/common';
import { ILoggerRepository } from '@shared/services/logger/application/interfaces/ILoggerRepository';
import { LoggerLevelInput } from '@shared/services/logger/application/interfaces/loggerRequest';
import { loggerWithFallback } from '@shared/utils/functions/loggerWithFallback';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class LoggerRepository implements ILoggerRepository {
  constructor(private readonly pino: PinoLogger) {}

  debug(data: LoggerLevelInput): void {
    loggerWithFallback({
      logData: data,
      logger: this.pino,
      level: 'debug',
    });
  }

  info(data: LoggerLevelInput): void {
    loggerWithFallback({
      logData: data,
      logger: this.pino,
      level: 'info',
    });
  }

  warn(data: LoggerLevelInput): void {
    loggerWithFallback({
      logData: data,
      logger: this.pino,
      level: 'warn',
    });
  }

  error(data: LoggerLevelInput): void {
    loggerWithFallback({
      logData: data,
      logger: this.pino,
      level: 'error',
    });
  }
}
