import { IsNotEmpty } from 'class-validator';

export class CategoryDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  icon: string;
}
