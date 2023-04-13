import { Module } from '@nestjs/common';
import { CreateUserService } from '@usecases/user/CreateUser.service';
import { databaseModule } from '../database/database.module';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [databaseModule],
  controllers: [UserController],
  providers: [CreateUserService],
})
export class HttpModule {}
