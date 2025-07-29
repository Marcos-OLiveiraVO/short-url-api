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
import { DeleteShortenerController } from './infra/http/controllers/deleteShortenerController';
import { DeleteShortenerUseCase } from './application/use-cases/deleteShortenerUseCase';

@Module({
  imports: [DatabaseModule],
  providers: [
    CreateShortenerUseCase,
    DeleteShortenerUseCase,
    GetShortenerUrlUseCase,
    GetAllShortenerUseCase,
    { provide: IShortenerRepository, useClass: ShortenerRepository },
  ],
  controllers: [CreateShortenerController, DeleteShortenerController, GetShortenerUrlController, GetAllShortenerController],
})
export class ShortenerModule {}
