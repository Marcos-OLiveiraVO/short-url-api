import { Injectable, NotFoundException } from '@nestjs/common';
import { IProfileRepository } from '../interfaces/IProfileRepository';
import { CreateProfileLoginInput, CreateProfileLoginOutput } from '../interfaces/profileRequest';
import { AuthenticationService } from '@shared/middleware/auth/authenticationService';
import { Hash } from '@shared/utils/functions/password';

@Injectable()
export class CreateProfileLoginUseCase {
  constructor(
    private profileRepository: IProfileRepository,
    private authService: AuthenticationService,
  ) {}

  async execute(data: CreateProfileLoginInput): Promise<CreateProfileLoginOutput> {
    const profile = await this.profileRepository.findProfileByEmail(data.email);

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    const isSamePassword = new Hash().compareHash({
      password: data.password,
      hash: profile.password,
    });

    if (!isSamePassword) {
      throw new NotFoundException('Profile not found');
    }

    const token = await this.authService.execute({
      profileId: profile.id,
      email: data.email,
    });

    return {
      profileId: profile.id,
      access_token: token.access_token,
    };
  }
}
