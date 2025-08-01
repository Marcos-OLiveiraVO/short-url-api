import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DeleteProfileUseCase } from '@profile/application/use-cases/deleteProfileUseCase';

@Controller('/profile')
@ApiTags('Profile')
@ApiBearerAuth()
export class DeleteProfileController {
  constructor(private deleteProfileUseCase: DeleteProfileUseCase) {}

  @Delete('/:profileId')
  @HttpCode(204)
  async handle(@Param('profileId') profileId: number): Promise<void> {
    await this.deleteProfileUseCase.execute(profileId);
  }
}
