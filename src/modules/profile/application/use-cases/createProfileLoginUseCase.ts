import { Injectable, NotFoundException } from '@nestjs/common';
import { IProfileRepository } from '../interfaces/IProfileRepository';
import { CreateProfileLoginInput } from '../interfaces/profileRequest';
import { SignInResponse } from '@shared/middleware/auth/interfaces/authenticationRequest';
import { Hash } from '@shared/utils/password';
import { AuthenticationService } from '@shared/middleware/auth/authenticationService';

@Injectable()
export class CreateProfileLoginUseCase {
  constructor(
    private profileRepository: IProfileRepository,
    private authService: AuthenticationService,
  ) {}

  async execute(data: CreateProfileLoginInput): Promise<SignInResponse> {
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

    return token;
  }
}
