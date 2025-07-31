import { LoggerModule as PinoModule } from 'nestjs-pino';
import { RequestWithId } from '../interfaces/globalRequest';

const environment = process.env.ENABLE_PROD_ENVIRONMENT === 'true';
const logLevel = process.env.LOG_LEVEL || 'info';

export const formatterLoggerByEnvironment = environment
  ? {
      req(req: RequestWithId) {
        return {
          id: req.id,
          method: req.method,
          url: req.url,
          body: req.body,
        };
      },
    }
  : undefined;

export const configLogger = [
  PinoModule.forRoot({
    pinoHttp: {
      level: logLevel,
      transport: { target: 'pino-pretty', options: { colorize: true, translateTime: 'SYS:standard' } },
      serializers: formatterLoggerByEnvironment,
    },
  }),
];
