import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { cpf } from 'cpf-cnpj-validator';

@ValidatorConstraint({ name: 'cpf', async: false })
export class CpfValidator implements ValidatorConstraintInterface {
  validate(cpfValue: string, args: ValidationArguments): boolean {
    return cpf.isValid(cpfValue);
  }

  defaultMessage(args: ValidationArguments): string {
    return 'CPF Invalid';
  }
}
