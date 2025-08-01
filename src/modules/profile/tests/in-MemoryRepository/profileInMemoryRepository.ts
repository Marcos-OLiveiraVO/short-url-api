import { Profile } from '@profile/application/entities/profile';
import { IProfileRepository } from '@profile/application/interfaces/IProfileRepository';
import { FindProfileByEmailOutput } from '@profile/application/interfaces/profileRequest';

export class ProfileInMemoryRepository implements IProfileRepository {
  private profile = new Map<Number, Profile>();

  async createProfile(data: Profile): Promise<void> {
    const id = this.profile.size ? this.profile.size + 1 : 1;

    const profile = new Profile({ ...data.props }, id);
    profile.id = id;

    this.profile.set(id, profile);
  }

  async deleteProfile(profileId: number): Promise<void> {
    const profile = this.profile.get(profileId);

    if (!profile) return;

    const UpdateProfile = new Profile({ ...profile.props, deletedAt: new Date() }, profile.id);

    this.profile.set(profileId, UpdateProfile);
  }

  async findProfileByEmail(email: string): Promise<FindProfileByEmailOutput | null> {
    const profile = Array.from(this.profile.values()).find(profile => profile.email === email);

    if (!profile) return null;

    return {
      password: profile.password,
      id: profile.id!,
      email: profile.email,
    };
  }

  async findProfileById(profileId: number): Promise<Profile | null> {
    const profile = this.profile.get(profileId);

    if (!profile) return null;

    return profile;
  }
}
