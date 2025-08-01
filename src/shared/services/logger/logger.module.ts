import { Module } from '@nestjs/common';
import { ILoggerRepository } from './application/interfaces/ILoggerRepository';
import { LoggerRepository } from './infra/database/repositories/loggerRepository';
import { LoggerModule as PinoModule } from 'nestjs-pino';
import { formatterLoggerByEnvironment } from '@shared/utils/functions/formatterLogger';

const logLevel = process.env.LOG_LEVEL || 'info';

export const configLogger = [
  PinoModule.forRoot({
    pinoHttp: {
      level: logLevel,
      transport: { target: 'pino-pretty', options: { colorize: true, translateTime: 'SYS:standard' } },
      serializers: formatterLoggerByEnvironment,
    },
  }),
];

@Module({
  imports: configLogger,
  providers: [{ provide: ILoggerRepository, useClass: LoggerRepository }],
  exports: [{ provide: ILoggerRepository, useClass: LoggerRepository }],
})
export class LoggerModule {}
