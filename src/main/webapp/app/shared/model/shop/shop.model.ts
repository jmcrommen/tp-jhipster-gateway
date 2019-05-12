export interface IShop {
  id?: number;
  name?: string;
  description?: string;
  address?: string;
  mail?: string;
}

export class Shop implements IShop {
  constructor(public id?: number, public name?: string, public description?: string, public address?: string, public mail?: string) {}
}
