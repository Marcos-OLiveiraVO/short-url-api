import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/database/database.module';
import { CreateShortenerController } from './infra/http/controllers/createShortenerController';
import { CreateShortenerUseCase } from './application/use-cases/createShortenerUseCase';
import { IShortenerRepository } from './application/interfaces/IShortenerRepository';
import { ShortenerRepository } from './infra/database/repositories/shortenerRepository';

@Module({
  imports: [DatabaseModule],
  providers: [CreateShortenerUseCase, { provide: IShortenerRepository, useClass: ShortenerRepository }],
  controllers: [CreateShortenerController],
})
export class ShortenerModule {}
