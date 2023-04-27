import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { authModule } from './controllers/authenticate/authenticate.module';
import { lancheModule } from './controllers/lanche/lanche.module';
import { userModule } from './controllers/user/user.module';
import { AuthGuard } from './guards/auth.guard';
import { databaseModule } from '../database/database.module';

@Module({
  imports: [databaseModule, authModule, userModule, lancheModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class HttpModule {}
