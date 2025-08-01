import { RequestWithId } from '../interfaces/globalRequest';

const environment = process.env.ENABLE_LOGGER === 'true';
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
