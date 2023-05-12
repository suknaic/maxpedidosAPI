import { Module } from '@nestjs/common';
import { AuthenticateService } from '@usecases/authenticate/authenticate.service';
import { databaseModule } from 'src/infra/database/database.module';
import { AuthenticateController } from './authenticate.controller';
import { providerModule } from 'src/shared/providers/providers.module';
import { RefreshTokenService } from '@usecases/authenticate/refreshtoken.service';

@Module({
  imports: [databaseModule, providerModule],
  controllers: [AuthenticateController],
  providers: [AuthenticateService, RefreshTokenService],
})
export class authModule {}
