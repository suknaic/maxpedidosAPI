import { randomUUID } from 'crypto';
import { Categoria } from './Categoria';

interface CardapioProps {
  categorias?: Categoria[];
  lancheId: string;
}

export class Cardapio {
  private _id: string;
  private props: CardapioProps;

  constructor(props: CardapioProps) {
    this._id = randomUUID();
    this.props = props;
  }

  public get id(): string {
    return this._id;
  }

  public set categoria(categoria: Categoria) {
    this.props.categorias?.push(categoria);
  }

  public get categorias(): Categoria[] {
    return this.props.categorias ?? [];
  }

  public get lancheId(): string {
    return this.props.lancheId as string;
  }
  public set lancheId(lancheId: string) {
    this.props.lancheId = lancheId;
  }
}
