export interface UserTypes {
  name: string;
  email: string;
  isAdmin: boolean;
  cart: {
    total: number;
    count: number;
  };
  notification: any[]; 
  orders: any[];      
  status: number;
}


export interface ProductTypes {
  _id: string;
  name: string;
  desc: string;
  price: number;
  category: string;
  image: string[];
}
export interface CartTypes {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  quantity:number
}


export type ProductType = {
  id: string;
  category: string;
  image: string;
  name: string;
  price: number;
  initialQuantity: number;
  quantity: number;
};

export type OrderType = {
  _id?: string;
  address: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  intent_id: string;
  name: string;
  note?: string;
  phoneNumber: string;
  product: ProductType[];
  status: "PAID" | "NOT PAID";
};