import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/database/database.module';
import { CreateProfileController } from './infra/http/controllers/createProfileController';
import { CreateProfileUseCase } from './application/use-cases/createProfileUseCase';
import { AuthenticationService } from '@shared/middleware/auth/authenticationService';
import { AuthenticationModule } from '@shared/middleware/auth/authentication.module';
import { CreateProfileLoginController } from './infra/http/controllers/createProfileLoginController';
import { CreateProfileLoginUseCase } from './application/use-cases/createProfileLoginUseCase';
import { ProfileRepository } from './infra/database/repositories/profileRepository';
import { IProfileRepository } from './application/interfaces/IProfileRepository';

@Module({
  imports: [DatabaseModule, AuthenticationModule],
  providers: [
    CreateProfileUseCase,
    CreateProfileLoginUseCase,
    AuthenticationService,
    { provide: IProfileRepository, useClass: ProfileRepository },
  ],
  controllers: [CreateProfileController, CreateProfileLoginController],
})
export class ProfileModule {}
