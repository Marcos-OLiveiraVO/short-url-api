import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProfileUseCase } from '@profile/application/use-cases/createProfileUseCase';
import { CreateProfileDTO } from '@profile/infra/adapters/dtos/profileDTO';
import { Public } from '@shared/middleware/auth/decorators/public.decorator';

@Controller('profile')
@ApiTags('Profile')
@ApiResponse({ status: 409, description: 'Profile already exists' })
export class CreateProfileController {
  constructor(private readonly createProfileUseCase: CreateProfileUseCase) {}

  @Post()
  @HttpCode(201)
  @Public()
  async handle(@Body() data: CreateProfileDTO): Promise<void> {
    await this.createProfileUseCase.execute(data);
  }
}
