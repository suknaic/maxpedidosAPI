import { randomUUID } from 'crypto';

interface EnderecoProps {
  logradouro: string;
  numero: string;
  complemento: string;
  cidade: string;
  estado: string;
  cep: string;

  lancheId: string;
}

export class Endereco {
  private _id: string;
  private props: EnderecoProps;

  constructor(props: EnderecoProps) {
    this._id = randomUUID();
    this.props = props;
  }

  public get id(): string {
    return this._id;
  }

  public set logradouro(logradouro: string) {
    this.props.logradouro = logradouro;
  }
  public get logradouro(): string {
    return this.props.logradouro;
  }

  public set numero(numero: string) {
    this.props.numero = numero;
  }
  public get numero(): string {
    return this.props.numero;
  }

  public set complemento(complemento: string) {
    this.props.complemento = complemento;
  }
  public get complemento(): string {
    return this.props.complemento;
  }

  public set cidade(cidade: string) {
    this.props.cidade = cidade;
  }
  public get cidade(): string {
    return this.props.cidade;
  }

  public set estado(estado: string) {
    this.props.estado = estado;
  }
  public get estado(): string {
    return this.props.estado;
  }

  public set cep(cep: string) {
    this.props.cep = cep;
  }
  public get cep(): string {
    return this.props.cep;
  }

  public set lancheId(id: string) {
    this.props.lancheId = id;
  }

  public get lancheId(): string {
    return this.props.lancheId;
  }
}
