import { Module } from '@nestjs/common';
import { CreateUserService } from '@usecases/user/createUser.service';
import { databaseModule } from 'src/infra/database/database.module';
import { CreateUserController } from './createUser.controller';

@Module({
  imports: [databaseModule],
  controllers: [CreateUserController],
  providers: [CreateUserService],
})
export class userModule {}
