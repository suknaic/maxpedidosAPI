import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class userDTO {
  @IsNotEmpty({ message: 'nome nao pode ser vazio' })
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('BR', { message: 'Telefone Invalido' })
  contato: string;

  @IsNotEmpty()
  senha: string;
}
