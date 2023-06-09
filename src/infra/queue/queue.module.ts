import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { SendMailProducerService } from './jobs/sendMail.producer.service';
import { SendMailConsumer } from './jobs/sendMail.consumer';
import { providerModule } from '@shared/providers/providers.module';
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
  providers: [SendMailProducerService, SendMailConsumer],
  exports: [SendMailProducerService],
})
export class QueueModule {}
