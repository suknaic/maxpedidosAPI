import { Module } from '@nestjs/common';
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider';
import { IDateProvider } from './DateProvider/model/IDateProvider';
import { IMailProvider } from './MailProvider/model/IMailProvider';
import { EtherealMailProvider } from './MailProvider/implementations/EthereealMailProvider';
import { JwtModule } from '@nestjs/jwt';
import { ITokensProvider } from './JwtProvider/model/generateTokensProvider';
import { JwtTokenProvider } from './JwtProvider/implementations/jwtTokenProvider';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [
    {
      provide: IDateProvider,
      useClass: DayjsDateProvider,
    },
    {
      provide: ITokensProvider,
      useClass: JwtTokenProvider,
    },
    {
      provide: IMailProvider,
      useClass: EtherealMailProvider,
    },
  ],
  exports: [IDateProvider, IMailProvider, ITokensProvider],
})
export class providerModule {}
