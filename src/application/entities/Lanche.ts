import { randomUUID } from 'crypto';
import { Endereco } from './Endereco';
import { Horario } from './Horario';
import { Cardapio } from './Cardapio';

interface LancheProps {
  nome: string;
  contato: string;

  _logo?: string;
  _horarios?: Horario[];
  _endereco?: Endereco;
  _cardapio?: Cardapio;

  usuarioId: string;
}

export class Lanche {
  private _id: string;
  private props: LancheProps;

  constructor(props: LancheProps) {
    this._id = randomUUID();
    this.props = props;
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

  public set logo(logo: string) {
    this.props._logo = logo;
  }

  public get logo(): string {
    return this.props._logo ?? '';
  }

  public set contato(contato: string) {
    this.props.contato = contato;
  }

  public get contato(): string {
    return this.props.contato;
  }

  public set endereco(endereco: Endereco) {
    this.props._endereco = endereco;
  }

  public get endereco(): Endereco {
    return this.props._endereco ?? ({} as Endereco);
  }

  public set horario(horario: Horario) {
    this.props._horarios?.push(horario);
  }

  public get horarios(): Horario[] {
    return this.props._horarios ?? [];
  }

  public set usuarioId(id: string) {
    this.props.usuarioId = id;
  }

  public get usuarioId(): string {
    return this.props.usuarioId;
  }

  public set cardapio(cardapio: Cardapio) {
    this.props._cardapio = cardapio;
  }

  public get cardapio(): Cardapio {
    return this.props?._cardapio ?? ({} as Cardapio);
  }
}
