import { GetAllShortenerUrlsUseCase } from '@shortener/application/use-cases/getAllShortenerUrlsUseCase';
import { ShortenerViewModel } from '../viewModels/shortenerViewModel';
import { GlobalRequest, Pagination } from '@shared/utils/interfaces/globalRequest';
import { Controller, Get, HttpCode, Query, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetAllShortenerUrlsDTO } from '@shortener/infra/adapters/dtos/shortenerDTO';

@Controller('shorteners')
@ApiTags('Shortener')
@ApiBearerAuth()
export class GetAllShortenerUrlsController {
  constructor(private getAllShortenerUrlsUseCase: GetAllShortenerUrlsUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(@Query() data: GetAllShortenerUrlsDTO, @Request() req: GlobalRequest): Promise<Pagination<ShortenerViewModel>> {
    const urls = await this.getAllShortenerUrlsUseCase.execute({
      ...data,
      profileId: req.user.profileId,
    });

    if (urls.data.length === 0) {
      return {
        data: [],
        metadata: urls.metadata,
      };
    }

    return {
      metadata: urls.metadata,
      data: urls.data.map(url => ShortenerViewModel.toHttp(url)),
    };
  }
}
