import { Controller, Delete, HttpCode, Param, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GlobalRequest } from '@shared/utils/interfaces/globalRequest';
import { DeleteShortenerUseCase } from '@shortener/application/use-cases/deleteShortenerUseCase';

@ApiBearerAuth()
@ApiTags('Shortener')
@Controller('shortener')
@ApiResponse({ status: 404, description: 'Shortener url not found' })
@ApiResponse({ status: 401, description: 'You are not the owner of this shortener url and cannot delete it' })
export class DeleteShortenerController {
  constructor(private deleteShortenerUseCase: DeleteShortenerUseCase) {}

  @Delete('/:slug')
  @ApiParam({ name: 'slug', type: 'string', description: 'The slug of the shortener url to be deleted' })
  @HttpCode(204)
  async handle(@Param('slug') slug: string, @Request() req: GlobalRequest): Promise<void> {
    await this.deleteShortenerUseCase.execute({
      slug: slug,
      profileId: req.user.profileId,
    });
  }
}
