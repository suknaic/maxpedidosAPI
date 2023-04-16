import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class lancheDTO {
  logo?: string;

  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  @IsPhoneNumber('BR', { message: 'Contato invalido!' })
  contato: string;
}
