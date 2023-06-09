import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { authModule } from './controllers/authenticate/authenticate.module';
import { lancheModule } from './controllers/lanche/lanche.module';
import { userModule } from './controllers/user/user.module';
import { AuthGuard } from './guards/auth.guard';
import { providerModule } from '@shared/providers/providers.module';
import { PasswordModule } from './controllers/password/password.module';
import { EnderecoModule } from './controllers/endereco/endereco.module';
import { CategoryModule } from './controllers/category/category.module';
import { QueueModule } from '../queue/queue.module';

@Module({
  imports: [
    QueueModule,
    providerModule,
    authModule,
    PasswordModule,
    userModule,
    EnderecoModule,
    lancheModule,
    CategoryModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class HttpModule {}
