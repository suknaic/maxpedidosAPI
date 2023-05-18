import { IsLatitude, IsLongitude, IsNotEmpty, Matches } from 'class-validator';

export class EnderecoDTO {
  @IsNotEmpty()
  logradouro: string;
  @IsNotEmpty()
  numero: string;
  complemento?: string;
  @IsNotEmpty()
  cidade: string;
  @IsNotEmpty()
  estado: string;
  @IsNotEmpty()
  cep: string;

  @IsLatitude()
  lat?: string;

  @IsLongitude()
  long?: string;
}
