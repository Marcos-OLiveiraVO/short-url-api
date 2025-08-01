import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ProfileModule } from '@profile/profile.module';
import { DatabaseModule } from '@shared/database/database.module';
import { AuthenticationGuard } from '@shared/middleware/auth/authentication.guard';
import { AuthenticationModule } from '@shared/middleware/auth/authentication.module';
import { ObservabilityModule } from '@shared/services/observability/observability.module';
import { ShortenerModule } from '@shortener/shortener.module';

@Module({
  providers: [{ provide: APP_GUARD, useClass: AuthenticationGuard }],
  imports: [DatabaseModule, AuthenticationModule, ProfileModule, ShortenerModule, ObservabilityModule],
})
export class AppModule {}
