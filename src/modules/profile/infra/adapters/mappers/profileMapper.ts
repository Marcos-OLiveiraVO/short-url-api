import { Prisma, profile } from '@prisma/client';
import { Profile } from '@profile/application/entities/profile';

export class ProfileMapper {
  static toDomain(entity: profile): Profile {
    return new Profile(
      {
        name: entity.name,
        email: entity.email,
        password: entity.password,
        createdAt: entity.createdAt!,
        updatedAt: entity.updatedAt!,
        deletedAt: entity.deletedAt!,
      },
      entity.id,
    );
  }
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
