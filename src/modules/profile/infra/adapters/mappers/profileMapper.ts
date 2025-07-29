import { Prisma } from '@prisma/client';
import { Profile } from '@profile/application/entities/profile';

export class ProfileMapper {
  static toDomain() {}
  static toDatabase(entity: Profile): Prisma.profileUncheckedCreateInput {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      password: entity.password,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    };
  }
}
