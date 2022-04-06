export interface Product {
  name: string;
  brand: string;
  image: string;
  count: number;
  category: string;
  rating: number;
  description: string;
  featurette: string;
  mrp: number;
  price: number;
  id: string;
  reviews: Review[];
  cart: { id: string; count: number } | any;
}

interface Review {
  name: string;
  description: string;
  rating: number;
  image: string;
}
