import { TypesPrestation } from './types-prestation.model';
import { RollingStock } from './rolling-stock.model';

export class Prestation {
  constructor(
    public id: string,
    public date: Date,
    public type: TypesPrestation,
  ) { }
}
