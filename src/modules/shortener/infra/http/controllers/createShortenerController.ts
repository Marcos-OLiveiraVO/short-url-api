import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ShortenerViewModel } from '../viewModels/shortenerViewModel';
import { CreateShortenerUseCase } from '@shortener/application/use-cases/createShortenerUseCase';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '@shared/middleware/auth/decorators/public.decorator';
import { CreateShortenerDTO } from '@shortener/infra/adapters/dtos/shortenerDTO';

@Controller('shortener')
@ApiTags('Shortener')
@ApiBearerAuth()
export class CreateShortenerController {
  constructor(private createShortenerUseCase: CreateShortenerUseCase) {}

  @Public()
  @Post()
  @HttpCode(201)
  async handle(@Body() data: CreateShortenerDTO): Promise<ShortenerViewModel> {
    const url = await this.createShortenerUseCase.execute(data);

    return ShortenerViewModel.toHttp(url);
  }
}
