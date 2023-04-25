import { Endereco } from '../../entities/Endereco';
import { EnderecoRepository } from '../enderecoRepository';

export class enderecoRepositoryInMemory implements EnderecoRepository {
  public repository: Endereco[];

  constructor() {
    this.repository = [];
  }

  async create(endereco: Endereco): Promise<void> {
    this.repository.push(endereco);
  }
}
