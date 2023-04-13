import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { Hash } from 'crypto';
import { User } from '../../entities/User';
import { UserRepository } from '../../repositories/userRepository';

interface IUserRequest {
  nome: string;
  contato: string;
  email: string;
  senha: string;
}
interface ICreateUseResponse {
  usuario: User;
}

@Injectable()
export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  public async execute({
    nome,
    contato,
    email,
    senha,
  }: IUserRequest): Promise<ICreateUseResponse> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists)
      throw new HttpException('Usuario já existe', HttpStatus.BAD_REQUEST);
    // codificar a senha

    const password = await hash(senha, 8);
    const usuario = new User({
      nome,
      contato,
      email,
      senha: password,
    });

    await this.userRepository.create(usuario);
    return { usuario };
  }
}
