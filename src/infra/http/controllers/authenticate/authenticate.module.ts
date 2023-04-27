import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticateService } from '@usecases/authenticate/authenticate.service';
import { jwtConstants } from 'src/infra/config/auth';
import { databaseModule } from 'src/infra/database/database.module';
import { AuthenticateController } from './authenticate.controller';
import { providerModule } from '@shared/providers/providers.module';
import { RefreshTokenService } from '@usecases/authenticate/refreshtoken.service';

@Module({
  imports: [
    databaseModule,
    providerModule,
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [AuthenticateController],
  providers: [AuthenticateService, RefreshTokenService],
})
export class authModule {}
