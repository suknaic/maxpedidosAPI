import { randomUUID } from 'crypto';
import { Item } from './Item';

type CategoryProps = {
  name: string;
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
  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }
  public set cardapioID(cardapioId: string) {
    this.props.cardapioId = cardapioId;
  }

  public get cardapioID(): string {
    return this.props.cardapioId;
  }
  public set item(item: Item) {
    this.props.items.push(item);
  }

  public get items(): Item[] {
    return this.props.items;
  }
}
