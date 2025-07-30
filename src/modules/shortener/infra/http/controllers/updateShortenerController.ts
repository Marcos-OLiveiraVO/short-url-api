import { Body, Controller, HttpCode, Param, Put, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateShortenerUseCase } from '@shortener/application/use-cases/updateShortenerUseCase';
import { ShortenerViewModel } from '../viewModels/shortenerViewModel';
import { UpdateShortenerDTO } from '@shortener/infra/adapters/dtos/shortenerDTO';
import { GlobalRequest } from '@shared/utils/interfaces/globalRequest';

@Controller('shortener')
@ApiTags('Shortener')
@ApiBearerAuth()
@ApiResponse({ status: 404, description: 'Shortener url not found' })
@ApiResponse({ status: 401, description: 'You are not the owner of this shortener url and cannot update it' })
export class UpdateShortenerController {
  constructor(private updateShortenerUseCase: UpdateShortenerUseCase) {}

  @Put('/:slug')
  @HttpCode(200)
  async handle(
    @Param('slug') slug: string,
    @Body() data: UpdateShortenerDTO,
    @Request() req: GlobalRequest,
  ): Promise<ShortenerViewModel> {
    const url = await this.updateShortenerUseCase.execute({
      ...data,
      slug,
      profileId: req.user.profileId,
    });

    return ShortenerViewModel.toHttp(url);
  }
}
