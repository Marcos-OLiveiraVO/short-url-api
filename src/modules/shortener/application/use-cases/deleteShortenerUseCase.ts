import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { IShortenerRepository } from '../interfaces/IShortenerRepository';
import { DeleteShortenerInput } from '../interfaces/shortenerRequest';

@Injectable()
export class DeleteShortenerUseCase {
  constructor(private shortenerRepository: IShortenerRepository) {}

  async execute(data: DeleteShortenerInput): Promise<void> {
    const url = await this.shortenerRepository.findShortenerBySlug(data.slug);

    if (!url) {
      throw new NotFoundException('Shortener url not found');
    }

    const isOwner = url.profileId === data.profileId;

    if (!isOwner) {
      throw new UnauthorizedException('You are not the owner of this shortener url and cannot delete it');
    }

    await this.shortenerRepository.deleteShortenerUrl(data.slug);
  }
}
