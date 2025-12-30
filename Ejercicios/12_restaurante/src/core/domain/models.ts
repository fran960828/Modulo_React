import type { ReactNode } from "react";

export interface AvailableMeals {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

export interface CartItem {
  id:string,
  name: string;
  quantity: number;
  price: number;
}

export interface Form {
  fullName: string;
  email: string;
  address: string;
  postalCode: string;
  city: string;
}

export interface Order extends CartItem, Form {
  totalPrice: number;
}

export interface ErrorLoad {
  message: string;
}

export interface UseFetch<T> {
  fnFetch: () => Promise<T>;
  initialValue: T;
}

export interface CardProduct {
  data: AvailableMeals[];
  isLoading: boolean;
  errorLoad: ErrorLoad | null;
}

export interface ContextRest {
  stateCart:CartItem[],
  handleAddProduct:(id:string)=>void
  handleUpdateProduct:(id:string,amount:number)=>void
}

export interface ContextRestFunction {
  children: ReactNode;
}
export type CartRestAction =
  | { type: "ADD_PRODUCT"; id: string }
  | { type: "UPDATE_PRODUCT"; id: string; amount: number };