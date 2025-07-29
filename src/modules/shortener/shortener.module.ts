import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/database/database.module';
import { CreateShortenerController } from './infra/http/controllers/createShortenerController';
import { CreateShortenerUseCase } from './application/use-cases/createShortenerUseCase';
import { IShortenerRepository } from './application/interfaces/IShortenerRepository';
import { ShortenerRepository } from './infra/database/repositories/shortenerRepository';
import { GetShortenerUrlController } from './infra/http/controllers/getShortenerUrlController';
import { GetShortenerUrlUseCase } from './application/use-cases/getShortenerUrlUseCase';
import { GetAllShortenerUrlsController } from './infra/http/controllers/getAllShortenerUrlsController';
import { GetAllShortenerUrlsUseCase } from './application/use-cases/getAllShortenerUrlsUseCase';

@Module({
  imports: [DatabaseModule],
  providers: [
    CreateShortenerUseCase,
    GetShortenerUrlUseCase,
    GetAllShortenerUrlsUseCase,
    { provide: IShortenerRepository, useClass: ShortenerRepository },
  ],
  controllers: [CreateShortenerController, GetShortenerUrlController, GetAllShortenerUrlsController],
})
export class ShortenerModule {}
