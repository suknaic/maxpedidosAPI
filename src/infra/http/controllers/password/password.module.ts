import { Module } from '@nestjs/common';
import { databaseModule } from 'src/infra/database/database.module';
import { providerModule } from 'src/shared/providers/providers.module';
import { SendForgotPasswordMailService } from '@usecases/sendForgotPasswordMail/SendForgotPasswordMail.service';
import { PasswordController } from './password.controller';
import { ResetPassword } from '@usecases/ResetPassword/ResetPassword.service';
import { QueueModule } from 'src/infra/queue/queue.module';

@Module({
  imports: [databaseModule, providerModule, QueueModule],
  controllers: [PasswordController],
  providers: [SendForgotPasswordMailService, ResetPassword],
})
export class PasswordModule {}
