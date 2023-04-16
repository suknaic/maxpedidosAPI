import { Module } from '@nestjs/common';
import { CreateLancheService } from '@usecases/lanche/createLanche.service';
import { databaseModule } from 'src/infra/database/database.module';
import { CreateLancheController } from './createLanche.controller';

@Module({
  imports: [databaseModule],
  controllers: [CreateLancheController],
  providers: [CreateLancheService],
})
export class lancheModule {}
