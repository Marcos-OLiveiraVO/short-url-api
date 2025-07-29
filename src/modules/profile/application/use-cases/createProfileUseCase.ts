import { ConflictException, Injectable } from '@nestjs/common';
import { IProfileRepository } from '../interfaces/IProfileRepository';
import { Hash } from '@shared/utils/password';
import { Profile } from '../entities/profile';
import { CreateProfileInput } from '../interfaces/profileRequest';

@Injectable()
export class CreateProfileUseCase {
  constructor(private profileRepository: IProfileRepository) {}

  async execute(data: CreateProfileInput): Promise<void> {
    const profileExists = await this.profileRepository.findProfileByEmail(data.email);

    if (profileExists) {
      throw new ConflictException('Profile already exists');
    }

    const profile = new Profile({
      ...data,
      password: new Hash().generateHash(data.password),
    });

    await this.profileRepository.createProfile(profile);
  }
}
