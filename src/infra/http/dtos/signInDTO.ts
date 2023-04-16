import { IsEmail, IsNotEmpty } from 'class-validator';

export class signInDTO {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Informe um Email Válido!' })
  email: string;

  @IsNotEmpty()
  password: string;
}
