import { paginate, paginationSkipItens } from '@shared/utils/functions/paginate';
import { Pagination } from '@shared/utils/interfaces/globalRequest';
import { Shortener } from '@shortener/application/entities/shortener';
import { IShortenerRepository } from '@shortener/application/interfaces/IShortenerRepository';
import { GetAllShortenerUrlsInput } from '@shortener/application/interfaces/shortenerRequest';

export class ShortenerInMemoryRepository implements IShortenerRepository {
  shortener = new Map<number, Shortener>();

  async createShortenerURL(data: Shortener): Promise<Shortener> {
    const id = this.shortener.size ? this.shortener.size + 1 : 1;

    return this.shortener.set(id, data).get(id)!;
  }

  async updateShortenerUrlHit(slug: string): Promise<void> {
    const shortenerExists = Array.from(this.shortener.values()).find(s => s.slug === slug);

    if (shortenerExists) {
      shortenerExists.hits ? shortenerExists.hits++ : (shortenerExists.hits = 1);
    }

    this.shortener.set(shortenerExists!.id!, shortenerExists!);
  }

  async updateShortenerUrl(data: Shortener): Promise<Shortener> {
    throw new Error('Method not implemented.');
  }

  async deleteShortenerUrl(slug: string): Promise<void> {
    const shortener = Array.from(this.shortener.values()).find(s => s.slug === slug);

    if (!shortener) {
      return;
    }

    const assign = Object.assign(shortener, { deletedAt: new Date() });

    this.shortener.set(shortener.id!, assign);
  }

  async findShortenerBySlug(slug: string): Promise<Shortener | null> {
    const shortener = Array.from(this.shortener.values()).find(s => s.slug === slug);

    return shortener || null;
  }

  async findAllShortenersUrls(data: GetAllShortenerUrlsInput): Promise<Pagination<Shortener>> {
    const limit = data.limit || 10;
    const page = data.page || 1;

    const itensTopSkip = paginationSkipItens(page, limit);
    const totalUrls = this.shortener.size;

    const urls = Array.from(this.shortener.values()).filter(url => url.profileId === data.profileId);
    const urlsWithPagination = urls.slice(itensTopSkip, itensTopSkip + limit);

    const totalPages = paginate(totalUrls, limit);

    return {
      data: urlsWithPagination,
      metadata: {
        totalPages: totalPages,
        currentPage: page,
        totalItemsOnThisPage: urlsWithPagination.length,
        totalItems: totalUrls,
        limitPerPage: limit,
      },
    };
  }
}
