import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProfileLoginUseCase } from '@profile/application/use-cases/createProfileLoginUseCase';
import { ProfileLoginDTO } from '@profile/infra/adapters/dtos/profileDTO';
import { Public } from '@shared/middleware/auth/decorators/public.decorator';
import { SignInResponse } from '@shared/middleware/auth/interfaces/authenticationRequest';

@Controller('/login')
@ApiResponse({ status: 409, description: 'Profile not found' })
@ApiTags('Profile')
export class CreateProfileLoginController {
  constructor(private readonly createProfileLoginUseCase: CreateProfileLoginUseCase) {}

  @Post()
  @Public()
  @HttpCode(200)
  async handle(@Body() data: ProfileLoginDTO): Promise<SignInResponse> {
    return await this.createProfileLoginUseCase.execute(data);
  }
}
