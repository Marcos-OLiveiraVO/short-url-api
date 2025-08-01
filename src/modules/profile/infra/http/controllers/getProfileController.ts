import { Controller, Get, HttpCode, NotFoundException, Param } from '@nestjs/common';
import { GetProfileUseCase } from '@profile/application/use-cases/getProfileUseCase';
import { ProfileViewModel } from '../viewModels/profileViewModel';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfileViewModelOutput } from '@profile/application/interfaces/profileRequest';

@Controller('/profile')
@ApiTags('Profile')
@ApiResponse({ status: 404, description: 'Profile not found' })
@ApiBearerAuth()
export class GetProfileController {
  constructor(private getProfileUseCase: GetProfileUseCase) {}

  @Get('/:profileId')
  @HttpCode(200)
  async handle(@Param('profileId') profileId: number): Promise<ProfileViewModelOutput | null> {
    const profile = await this.getProfileUseCase.execute(profileId);

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return ProfileViewModel.toHttp(profile);
  }
}
