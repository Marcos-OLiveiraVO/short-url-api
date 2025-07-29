import { Shortener } from '../entities/shortener';

export abstract class IShortenerRepository {
  abstract createShortenerURL(data: Shortener): Promise<Shortener>;
  abstract findShortenerBySlug(slug: string): Promise<Shortener | null>;
}
