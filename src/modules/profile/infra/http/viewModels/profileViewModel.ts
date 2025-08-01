import { Profile } from '@profile/application/entities/profile';
import { ProfileViewModelOutput } from '@profile/application/interfaces/profileRequest';

export class ProfileViewModel {
  static toHttp(entity: Profile): ProfileViewModelOutput {
    return {
      id: entity.id!,
      name: entity.name,
      email: entity.email,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    };
  }
}
