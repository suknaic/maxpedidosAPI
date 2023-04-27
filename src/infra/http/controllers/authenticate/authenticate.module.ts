import { Module } from '@nestjs/common';
import { AuthenticateService } from '@usecases/authenticate/authenticate.service';
import { databaseModule } from 'src/infra/database/database.module';
import { AuthenticateController } from './authenticate.controller';
import { providerModule } from '@shared/providers/providers.module';
import { RefreshTokenService } from '@usecases/authenticate/refreshtoken.service';
import { SendForgotPasswordMailService } from '@usecases/sendForgotPasswordMail/SendForgotPasswordMail.service';

@Module({
  imports: [databaseModule, providerModule],
  controllers: [AuthenticateController],
  providers: [
    AuthenticateService,
    RefreshTokenService,
    SendForgotPasswordMailService,
  ],
})
export class authModule {}
