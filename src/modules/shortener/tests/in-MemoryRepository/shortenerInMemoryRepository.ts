import { paginate, paginationSkipItens } from '@shared/utils/functions/paginate';
import { Pagination } from '@shared/utils/interfaces/globalRequest';
import { Shortener } from '@shortener/application/entities/shortener';
import { IShortenerRepository } from '@shortener/application/interfaces/IShortenerRepository';
import { GetAllShortenerUrlsInput } from '@shortener/application/interfaces/shortenerRequest';

export class ShortenerInMemoryRepository implements IShortenerRepository {
  shortener = new Map<number, Shortener>();

  async createShortenerURL(data: Shortener): Promise<Shortener> {
    const id = this.shortener.size ? this.shortener.size + 1 : 1;

    const assign = new Shortener({ ...data.props, createdAt: new Date() }, id);
    assign.id = id;

    return this.shortener.set(id, assign).get(id)!;
  }

  async updateShortenerUrlHit(slug: string): Promise<void> {
    const shortenerExists = this.getActiveBySlug(slug);

    const updated = new Shortener({
      ...shortenerExists!.props,
      hits: (shortenerExists?.hits || 0) + 1,
    });

    updated.id = shortenerExists!.id!;

    this.shortener.set(shortenerExists!.id!, updated!);
  }

  async updateShortenerUrl(data: Shortener): Promise<Shortener> {
    const shortener = this.getActiveBySlug(data.slug);

    const assign = new Shortener({ ...data.props, updatedAt: new Date() }, shortener!.id);
    assign.id = shortener!.id!;

    return this.shortener.set(shortener!.id!, assign).get(shortener!.id!)!;
  }

  async deleteShortenerUrl(slug: string): Promise<void> {
    const shortener = this.getActiveBySlug(slug);

    if (!shortener) {
      return;
    }

    const deleted = new Shortener({ ...shortener.props, deletedAt: new Date() }, shortener.id);
    deleted.id = shortener.id!;

    this.shortener.set(shortener.id!, deleted);
  }

  async findShortenerBySlug(slug: string): Promise<Shortener | null> {
    return Array.from(this.shortener.values()).find(s => s.slug === slug && !s.deletedAt) || null;
  }

  async findAllShortenersUrls(data: GetAllShortenerUrlsInput): Promise<Pagination<Shortener>> {
    const limit = data.limit || 10;
    const page = data.page || 1;

    const allActive = Array.from(this.shortener.values()).filter(url => url.profileId === data.profileId && !url.deletedAt);

    const totalItems = allActive.length;
    const skip = paginationSkipItens(page, limit);
    const paginated = allActive
      .slice(skip, skip + limit)
      .sort((a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0));

    return {
      data: paginated,
      metadata: {
        totalPages: paginate(totalItems, limit),
        currentPage: page,
        totalItemsOnThisPage: paginated.length,
        totalItems,
        limitPerPage: limit,
      },
    };
  }

  private getActiveBySlug(slug: string): Shortener | null {
    return Array.from(this.shortener.values()).find(s => s.slug === slug && !s.deletedAt) || null;
  }
}
