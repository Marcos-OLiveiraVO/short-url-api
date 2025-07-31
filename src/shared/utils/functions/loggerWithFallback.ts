import {
  Criticality,
  LoggerLevelInput,
  LoggerWithFallbackInput,
} from '@shared/services/logger/application/interfaces/loggerRequest';
import { PinoLogger } from 'nestjs-pino';

export const isEnabled = process.env.ENABLE_LOGGER === 'true';

export function loggerWithFallback(data: LoggerWithFallbackInput) {
  if (!isEnabled) {
    console[data.level](`[${data.level.toUpperCase()}] ${data.logData.message}`, data.logData.context || {});

    return;
  }

  return (data.logger as PinoLogger)[data.level](
    {
      context: { ...data.logData.context },
    },
    data.logData.message,
  );
}
