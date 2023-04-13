import { randomUUID } from 'crypto';

export class Categoria {
  private _id: string;

  constructor() {
    this._id = randomUUID();
  }
}
