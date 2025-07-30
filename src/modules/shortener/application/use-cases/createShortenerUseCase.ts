import { Injectable } from '@nestjs/common';
import { IShortenerRepository } from '../interfaces/IShortenerRepository';
import { Shortener } from '../entities/shortener';
import { nanoid } from 'nanoid';
import { ShortenerInput } from '../interfaces/shortenerRequest';

@Injectable()
export class CreateShortenerUseCase {
  constructor(private shortenerRepository: IShortenerRepository) {}

  async execute(data: ShortenerInput): Promise<Shortener> {
    const slug = nanoid(6);
    const urlExists = await this.shortenerRepository.findShortenerBySlug(slug);

    if (urlExists) {
      return await this.execute(data);
    }

    const shortener = new Shortener({
      ...data,
      slug: slug,
    });

    return await this.shortenerRepository.createShortenerURL(shortener);
  }
}
