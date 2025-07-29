import { Controller, Get, Param, HttpRedirectResponse, Redirect } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetShortenerUrlUseCase } from '@shortener/application/use-cases/getShortenerUrlUseCase';
import { Public } from '@shared/middleware/auth/decorators/public.decorator';

@Controller('/shortener')
@ApiTags('Shortener')
@ApiResponse({ status: 404, description: 'Shortener url not found' })
@ApiBearerAuth()
export class GetShortenerUrlController {
  constructor(private getShortenerUrlUseCase: GetShortenerUrlUseCase) {}

  @Get('/:slug')
  @ApiParam({ name: 'slug', description: 'Shortened URL identifier', type: String })
  @Redirect()
  @Public()
  async handle(@Param('slug') slug: string): Promise<HttpRedirectResponse> {
    const url = await this.getShortenerUrlUseCase.execute(slug);

    return {
      url: url,
      statusCode: 302,
    };
  }
}
