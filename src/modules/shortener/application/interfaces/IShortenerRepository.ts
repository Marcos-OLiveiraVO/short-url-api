import { Pagination } from '@shared/utils/interfaces/globalRequest';
import { Shortener } from '../entities/shortener';
import { GetAllShortenerUrlsInput } from './shortenerRequest';

export abstract class IShortenerRepository {
  abstract createShortenerURL(data: Shortener): Promise<Shortener>;
  abstract updateShortenerUrlHit(slug: string): Promise<void>;
  abstract updateShortenerUrl(data: Shortener): Promise<Shortener>;
  abstract deleteShortenerUrl(slug: string): Promise<void>;
  abstract findShortenerBySlug(slug: string): Promise<Shortener | null>;
  abstract findAllShortenersUrls(data: GetAllShortenerUrlsInput): Promise<Pagination<Shortener>>;
}
