import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { authModule } from './controllers/authenticate/authenticate.module';
import { userModule } from './controllers/user/user.module';
import { AuthGuard } from './guards/auth.guard';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  imports: [userModule, authModule],
})
export class HttpModule {}
