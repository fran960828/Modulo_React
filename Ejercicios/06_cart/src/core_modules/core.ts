import type { ReactNode } from "react";

export interface Iproduct {
  id: string;
  image: string;
  title: string;
  price: number;
  description: string;
}
export interface IcartItem extends Iproduct {
  quantity: number;
}

export interface Ibutton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export interface IcontextCart {
  shoppingCart: IcartItem[];
  handleAddProduct: (id: string) => void;
  updateProduct?: () => void;
}

export interface IfunctionContext {
  children: ReactNode;
}
export interface ICartModalHandle {
  open: () => void;
}

export interface ICartModalProps {
  actions: ReactNode;
}
