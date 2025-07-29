import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/database/database.module';
import { CreateShortenerController } from './infra/http/controllers/createShortenerController';
import { CreateShortenerUseCase } from './application/use-cases/createShortenerUseCase';
import { IShortenerRepository } from './application/interfaces/IShortenerRepository';
import { ShortenerRepository } from './infra/database/repositories/shortenerRepository';
import { GetShortenerUrlController } from './infra/http/controllers/getShortenerUrlController';
import { GetShortenerUrlUseCase } from './application/use-cases/getShortenerUrlUseCase';
import { GetAllShortenerUseCase } from './application/use-cases/getAllShortenerUseCase';
import { GetAllShortenerController } from './infra/http/controllers/getAllShortenerController';

@Module({
  imports: [DatabaseModule],
  providers: [
    CreateShortenerUseCase,
    GetShortenerUrlUseCase,
    GetAllShortenerUseCase,
    { provide: IShortenerRepository, useClass: ShortenerRepository },
  ],
  controllers: [CreateShortenerController, GetShortenerUrlController, GetAllShortenerController],
})
export class ShortenerModule {}
