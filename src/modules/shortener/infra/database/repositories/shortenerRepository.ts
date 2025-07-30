import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prismaService';
import { paginate, paginationSkipItens } from '@shared/utils/functions/paginate';
import { Pagination } from '@shared/utils/interfaces/globalRequest';
import { Shortener } from '@shortener/application/entities/shortener';
import { IShortenerRepository } from '@shortener/application/interfaces/IShortenerRepository';
import { GetAllShortenerUrlsInput } from '@shortener/application/interfaces/shortenerRequest';
import { ShortenerMapper } from '@shortener/infra/adapters/mappers/shortenerMapper';

@Injectable()
export class ShortenerRepository implements IShortenerRepository {
  constructor(private prisma: PrismaService) {}

  async createShortenerURL(data: Shortener): Promise<Shortener> {
    const shortener = await this.prisma.shortUrl.create({
      data: ShortenerMapper.toDatabase(data),
    });

    return ShortenerMapper.toDomain(shortener);
  }

  async updateShortenerUrlHit(slug: string): Promise<void> {
    await this.prisma.shortUrl.updateMany({
      where: { slug: slug },
      data: { hits: { increment: 1 } },
    });
  }

  async updateShortenerUrl(data: Shortener): Promise<Shortener> {
    const shortener = await this.prisma.shortUrl.update({
      where: { slug: data.slug },
      data: ShortenerMapper.toDatabase(data),
    });

    return ShortenerMapper.toDomain(shortener);
  }

  async deleteShortenerUrl(slug: string): Promise<void> {
    await this.prisma.shortUrl.deleteMany({
      where: { slug: slug },
    });
  }

  async findShortenerBySlug(slug: string): Promise<Shortener | null> {
    const shortener = await this.prisma.shortUrl.findFirst({ where: { slug: slug } });

    if (!shortener) {
      return null;
    }

    return ShortenerMapper.toDomain(shortener);
  }

  async findAllShortenersUrls(data: GetAllShortenerUrlsInput): Promise<Pagination<Shortener>> {
    const limit = data.limit || 10;
    const page = data.page || 1;

    const itensTopSkip = paginationSkipItens(page, limit);

    const totalUrls = await this.prisma.shortUrl.count({
      where: { profileId: data.profileId },
    });

    const urls = await this.prisma.shortUrl.findMany({
      where: { profileId: data.profileId },
      skip: itensTopSkip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    const totalPages = paginate(totalUrls, limit);

    return {
      data: urls.map(url => ShortenerMapper.toDomain(url)),
      metadata: {
        totalPages: totalPages,
        currentPage: page,
        totalItemsOnThisPage: urls.length,
        totalItems: totalUrls,
        limitPerPage: limit,
      },
    };
  }
}
