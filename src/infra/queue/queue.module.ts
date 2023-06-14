import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { SendMailProducerService } from './jobs/email/sendMail.producer.service';
import { SendMailConsumer } from './jobs/email/sendMail.consumer';
import { providerModule } from '@shared/providers/providers.module';
import { IMailQueue } from './jobs/email/IMailQueue';
@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
      },
    }),
    BullModule.registerQueue({
      name: 'SendMail',
    }),
    providerModule,
  ],
  providers: [
    {
      provide: IMailQueue,
      useClass: SendMailProducerService,
    },
    SendMailConsumer,
  ],
  exports: [IMailQueue],
})
export class QueueModule {}
