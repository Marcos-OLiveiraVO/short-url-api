import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from '@shared/database/database.module';
import { AuthenticationGuard } from '@shared/middleware/auth/authentication.guard';
import { AuthenticationModule } from '@shared/middleware/auth/authentication.module';

@Module({
  providers: [{ provide: APP_GUARD, useClass: AuthenticationGuard }],
  imports: [DatabaseModule, AuthenticationModule],
})
export class AppModule {}
