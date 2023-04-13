import { CpfValidator } from 'src/util/cpfValidator';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Validate,
} from 'class-validator';

export class userDTO {
  id?: string;

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
