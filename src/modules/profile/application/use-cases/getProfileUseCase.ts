import { Injectable } from '@nestjs/common';
import { IProfileRepository } from '../interfaces/IProfileRepository';
import { Profile } from '../entities/profile';

@Injectable()
export class GetProfileUseCase {
  constructor(private profileRepository: IProfileRepository) {}

  async execute(profileId: number): Promise<Profile | null> {
    return await this.profileRepository.findProfileById(profileId);
  }
}
