import { randomUUID } from 'crypto';
import { Item } from './Item';

type CategoryProps = {
  nome: string;
  cardapioId: string;
  items?: Item[];
};

export class Categoria {
  private _id: string;
  private props: CategoryProps;

  constructor(props: CategoryProps) {
    this._id = randomUUID();
    this.props = props;
  }
  public get id(): string {
    return this._id;
  }
  public set nome(nome: string) {
    this.props.nome = nome;
  }

  public get nome(): string {
    return this.props.nome;
  }
  public set cardapioId(cardapioId: string) {
    this.props.cardapioId = cardapioId;
  }

  public get cardapioId(): string {
    return this.props.cardapioId;
  }
  public set item(item: Item) {
    this.props.items.push(item);
  }
  public get items(): Item[] {
    return this.props.items ?? [];
  }
}
