import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { IShortenerRepository } from '../interfaces/IShortenerRepository';
import { Shortener } from '../entities/shortener';
import { UpdateShortenerInput } from '../interfaces/shortenerRequest';

@Injectable()
export class UpdateShortenerUseCase {
  constructor(private shortenerRepository: IShortenerRepository) {}

  async execute(data: UpdateShortenerInput): Promise<Shortener> {
    const url = await this.shortenerRepository.findShortenerBySlug(data.slug);

    if (!url) {
      throw new NotFoundException('Shortener url not found');
    }

    const isOwner = url.profileId === data.profileId;

    if (!isOwner) {
      throw new UnauthorizedException('You are not the owner of this shortener url and cannot update it');
    }

    const shortener = new Shortener(data);

    return await this.shortenerRepository.updateShortenerUrl(shortener);
  }
}
