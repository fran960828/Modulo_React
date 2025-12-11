import type { ReactNode } from "react";

export interface Iproduct {
  id: string;
  image: string;
  title: string;
  price: number;
  description: string;
}

export interface Ibutton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export interface IcontextCart{
  items:Iproduct,
  addProduct:()=>void
  updateProduct:()=>void
}

export interface IfunctionContext{
  children:ReactNode
}