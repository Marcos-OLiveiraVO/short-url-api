import { ShortenerViewModel } from '../viewModels/shortenerViewModel';
import { GlobalRequest, Pagination } from '@shared/utils/interfaces/globalRequest';
import { Controller, Get, HttpCode, Query, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetAllShortenerUrlsDTO } from '@shortener/infra/adapters/dtos/shortenerDTO';
import { GetAllShortenerUseCase } from '@shortener/application/use-cases/getAllShortenerUseCase';

@Controller('shorteners')
@ApiTags('Shortener')
@ApiBearerAuth()
export class GetAllShortenerController {
  constructor(private getAllShortenerUseCase: GetAllShortenerUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(@Query() data: GetAllShortenerUrlsDTO, @Request() req: GlobalRequest): Promise<Pagination<ShortenerViewModel>> {
    const urls = await this.getAllShortenerUseCase.execute({
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
