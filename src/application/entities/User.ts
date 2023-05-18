import { randomUUID } from 'crypto';
import { Lanche } from './Lanche';

export type UserProps = {
  nome: string;
  email: string;
  contato: string;
  senha: string;
  lanches?: Lanche[];
};

export class User {
  private _id: string;
  private props: UserProps;

  constructor(props: UserProps) {
    this._id = randomUUID();
    this.props = props;
  }

  public set id(id: string) {
    this._id;
  }

  public get id(): string {
    return this._id;
  }

  public set nome(name: string) {
    this.props.nome = name;
  }

  public get nome(): string {
    return this.props.nome;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get email(): string {
    return this.props.email;
  }

  public set contato(contato: string) {
    this.props.contato = contato;
  }

  public get contato(): string {
    return this.props.contato;
  }

  public set senha(senha: string) {
    this.props.senha = senha;
  }

  public get senha(): string {
    return this.props.senha;
  }

  public set lanche(lanche: Lanche) {
    this.props.lanches?.push(lanche);
  }

  public get lanches(): Lanche[] {
    return this.props.lanches ?? [];
  }
}
