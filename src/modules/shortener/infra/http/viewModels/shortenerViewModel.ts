import { Shortener } from '@shortener/application/entities/shortener';
import { ShortenerViewModelOutput } from '@shortener/application/interfaces/shortenerRequest';

export class ShortenerViewModel {
  static toHttp(entity: Shortener): ShortenerViewModelOutput {
    return {
      id: entity.id!,
      hits: entity.hits,
      profileId: entity.profileId,
      name: entity.name,
      slug: entity.slug,
      originalUrl: entity.originalUrl,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    };
  }
}
