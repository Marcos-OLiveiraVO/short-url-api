import { Prisma, shortUrl } from '@prisma/client';
import { Shortener } from '@shortener/application/entities/shortener';

export class ShortenerMapper {
  static toDomain(model: shortUrl): Shortener {
    return new Shortener(
      {
        profileId: model.profileId!,
        name: model.name!,
        slug: model.slug,
        originalUrl: model.originalUrl,
        hits: model.hits!,
        createdAt: model.createdAt!,
        updatedAt: model.updatedAt!,
        deletedAt: model.deletedAt!,
      },
      model.id,
    );
  }
  static toDatabase(entity: Shortener): Prisma.shortUrlUncheckedCreateInput {
    return {
      id: entity.id,
      profileId: entity.profileId,
      name: entity.name,
      slug: entity.slug,
      originalUrl: entity.originalUrl,
      hits: entity.hits,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    };
  }
}
