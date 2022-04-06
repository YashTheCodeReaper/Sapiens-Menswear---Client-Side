import { Cart } from './user.interface';

export interface Order {
  orderid: string;
  id: string;
  products: Cart[];
}
