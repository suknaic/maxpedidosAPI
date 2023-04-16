import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { User } from '../../entities/User';
import { UserRepository } from '../../repositories/userRepository';

interface IUserRequest {
  nome: string;
  contato: string;
  email: string;
  senha: string;
}
interface ICreateUseResponse {
  user: User;
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

    if (userAlreadyExists) {
      throw new HttpException('Usuario já existe', HttpStatus.BAD_REQUEST);
    }

    const passwordHashed = await hash(senha, 8);
    const user = new User({
      nome,
      contato,
      email,
      senha: passwordHashed,
    });

    await this.userRepository.create(user);
    return { user };
  }
}
