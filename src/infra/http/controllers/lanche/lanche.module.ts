import { Module } from '@nestjs/common';
import { providerModule } from 'src/shared/providers/providers.module';
import { CreateLancheService } from '@usecases/lanche/createLanche.service';
import { CreateCardapioService } from '@usecases/cardapio/createCardapio.service';
import { databaseModule } from 'src/infra/database/database.module';
import { CreateLancheController } from './createLanche.controller';

@Module({
  imports: [databaseModule, providerModule],
  controllers: [CreateLancheController],
  providers: [CreateLancheService, CreateCardapioService],
})
export class lancheModule {}
