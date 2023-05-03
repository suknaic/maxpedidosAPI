import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { authModule } from './controllers/authenticate/authenticate.module';
import { lancheModule } from './controllers/lanche/lanche.module';
import { userModule } from './controllers/user/user.module';
import { AuthGuard } from './guards/auth.guard';
import { providerModule } from '@shared/providers/providers.module';
import { PasswordModule } from './controllers/password/password.module';

@Module({
  imports: [
    providerModule,
    authModule,
    PasswordModule,
    userModule,
    lancheModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class HttpModule {}
