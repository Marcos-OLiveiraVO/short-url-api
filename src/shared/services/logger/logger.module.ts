import { Module } from '@nestjs/common';
import { ILoggerRepository } from './application/interfaces/ILoggerRepository';
import { LoggerRepository } from './infra/database/repositories/loggerRepository';
import { configLogger } from '@shared/utils/functions/formatterLogger';

@Module({
  imports: configLogger,
  providers: [{ provide: ILoggerRepository, useClass: LoggerRepository }],
  exports: [{ provide: ILoggerRepository, useClass: LoggerRepository }],
})
export class LoggerModule {}
