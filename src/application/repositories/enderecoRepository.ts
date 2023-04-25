import { Endereco } from '../entities/Endereco';

export abstract class EnderecoRepository {
  abstract create(endereco: Endereco): Promise<void>;
}
