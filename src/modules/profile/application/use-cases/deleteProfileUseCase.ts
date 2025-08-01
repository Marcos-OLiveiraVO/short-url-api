import { Injectable } from '@nestjs/common';
import { IProfileRepository } from '../interfaces/IProfileRepository';

@Injectable()
export class DeleteProfileUseCase {
  constructor(private profileRepository: IProfileRepository) {}

  async execute(profileId: number): Promise<void> {
    await this.profileRepository.deleteProfile(profileId);
  }
}
