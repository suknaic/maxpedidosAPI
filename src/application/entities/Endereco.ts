import { randomUUID } from 'crypto';

type EnderecoProps = {
  logradouro: string;
  numero: string;
  complemento: string;
  cidade: string;
  estado: string;
  cep: string;
  lat?: string;
  long?: string;

  lancheId: string;
};

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
  public set latitude(latitude: string) {
    this.props.lat = latitude;
  }
  public get latitude(): string {
    return this.props.lat;
  }
  public set longitude(longitude: string) {
    this.props.long = longitude;
  }
  public get longitude(): string {
    return this.props.long;
  }

  public set lancheId(id: string) {
    this.props.lancheId = id;
  }

  public get lancheId(): string {
    return this.props.lancheId;
  }
}
