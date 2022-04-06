export interface User {
  name: string;
  id: string;
  email: string;
  password: string;
  phone: string;
  country: string;
  doorno: string;
  locality: string;
  district: string;
  state: string;
  picture: string;
  cart: Cart[];
  islogged: boolean;
}

export interface Cart {
  id: string;
  count: number;
}
