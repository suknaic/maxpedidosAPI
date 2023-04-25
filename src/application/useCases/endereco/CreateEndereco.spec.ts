import { LancheRepositoryInMemory } from '../../repositories/in-memory/lancheRepositoryInMemory';
import { CreateEnderecoService } from './createEndereco.service';
import { enderecoRepositoryInMemory } from '../../repositories/in-memory/enderecoRepositoryInMemory';
import { makeLanche } from '../../factories/lancheFactory';
import { Lanche } from '../../entities/Lanche';
import { HttpException } from '@nestjs/common';

describe('[createEnderecoService]', () => {
  let enderecoService: CreateEnderecoService;
  let lancheRepository: LancheRepositoryInMemory;
  let enderecoRepository: enderecoRepositoryInMemory;
  let lanche: Lanche;

  beforeEach(() => {
    enderecoRepository = new enderecoRepositoryInMemory();
    lancheRepository = new LancheRepositoryInMemory();
    enderecoService = new CreateEnderecoService(
      enderecoRepository,
      lancheRepository,
    );

    lanche = makeLanche({
      nome: 'lancheTest',
      contato: '68999999999',
      usuarioId: 'id-user-fake',
    });
    lancheRepository.create(lanche);
  });

  it('should be able to create endereco to lanche', async () => {
    await enderecoService.execute({
      cep: '69999-134',
      cidade: 'rio branco',
      estado: 'acre',
      logradouro: 'AC',
      numero: '1000',
      complemento: 'perto do campo',
      userId: 'id-user-fake',
    });

    expect(enderecoRepository.repository).toHaveLength(1);
    expect(enderecoRepository.repository[0]).toHaveProperty('id');
  });

  it('should not be able to create endereco to user Invalid', async () => {
    expect(async () => {
      await enderecoService.execute({
        cep: '69999-134',
        cidade: 'rio branco',
        estado: 'acre',
        logradouro: 'AC',
        numero: '1000',
        complemento: 'perto do campo',
        userId: 'id-user-invalid',
      });
    }).rejects.toBeInstanceOf(HttpException);
  });
});
