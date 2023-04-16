import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticateService } from '@usecases/authenticate/authenticate.service';
import { jwtConstants } from 'src/infra/config/auth';
import { databaseModule } from 'src/infra/database/database.module';
import { AuthenticateController } from './authenticate.controller';

@Module({
  imports: [
    databaseModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expires_in_token },
    }),
  ],
  controllers: [AuthenticateController],
  providers: [AuthenticateService],
})
export class authModule {}
