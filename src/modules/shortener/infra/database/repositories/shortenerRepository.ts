import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prismaService';
import { Shortener } from '@shortener/application/entities/shortener';
import { IShortenerRepository } from '@shortener/application/interfaces/IShortenerRepository';
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

  async findShortenerBySlug(slug: string): Promise<Shortener | null> {
    const shortener = await this.prisma.shortUrl.findFirst({ where: { slug: slug } });

    if (!shortener) {
      return null;
    }

    return ShortenerMapper.toDomain(shortener);
  }

  async updateShortenerUrlHit(slug: string): Promise<void> {
    await this.prisma.shortUrl.updateMany({
      where: { slug: slug },
      data: { hits: { increment: 1 } },
    });
  }
}
