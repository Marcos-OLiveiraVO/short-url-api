import { Injectable, NotFoundException } from '@nestjs/common';
import { IShortenerRepository } from '../interfaces/IShortenerRepository';

@Injectable()
export class GetShortenerUrlUseCase {
  constructor(private shortenerRepository: IShortenerRepository) {}

  async execute(slug: string): Promise<string> {
    const shortener = await this.shortenerRepository.findShortenerBySlug(slug);

    if (!shortener) {
      throw new NotFoundException('Shortener url not found');
    }

    await this.shortenerRepository.updateShortenerUrlHit(slug);

    return shortener.originalUrl;
  }
}
