import { Module } from '@nestjs/common';
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider';
import { IDateProvider } from './DateProvider/model/IDateProvider';

@Module({
  providers: [
    {
      provide: IDateProvider,
      useClass: DayjsDateProvider,
    },
  ],
  exports: [IDateProvider],
})
export class providerModule {}
