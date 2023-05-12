import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { User } from '../../entities/User';
import { UserRepository } from '../../repositories/userRepository';

type IUserRequest = {
  nome: string;
  contato: string;
  email: string;
  senha: string;
};
type ICreateUseResponse = {
  user: User;
};

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
    const makeUser = new User({
      nome,
      contato,
      email,
      senha: passwordHashed,
    });

    const user = await this.userRepository.create(makeUser);
    return { user };
  }
}
