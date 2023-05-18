import { Module } from '@nestjs/common';
import { databaseModule } from 'src/infra/database/database.module';
import { EnderecoController } from './endereco.controller';
import { CreateEnderecoService } from '@application/useCases/endereco/createEndereco.service';

@Module({
  imports: [databaseModule],
  controllers: [EnderecoController],
  providers: [CreateEnderecoService],
})
export class EnderecoModule {}
