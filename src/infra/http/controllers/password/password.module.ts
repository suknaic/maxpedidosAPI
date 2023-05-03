import { Module } from '@nestjs/common';
import { databaseModule } from 'src/infra/database/database.module';
import { providerModule } from 'src/shared/providers/providers.module';
import { RefreshTokenService } from '@usecases/authenticate/refreshtoken.service';
import { SendForgotPasswordMailService } from '@usecases/sendForgotPasswordMail/SendForgotPasswordMail.service';
import { PasswordController } from './password.controller';

@Module({
  imports: [databaseModule, providerModule],
  controllers: [PasswordController],
  providers: [RefreshTokenService, SendForgotPasswordMailService],
})
export class PasswordModule {}
