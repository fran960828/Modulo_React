import type { ReactNode } from "react";

export interface Iplace {
  id: string;
  title: string;
  image: {
    src: string;
    alt: string;
  };
  lat: number;
  lon: number;
}

export interface Icontainer{
    title:string,
    description:string,
    places:Iplace[]
    addRemovePlaces:(id:string)=>void
}

export interface Imodal {
  open:boolean,
  children:ReactNode,
  onClose:()=>void
}

export interface IbuttonActions {
  onConfirm:()=>void,
  onCancel:()=>void
}

export interface IprogressBar {
  Timer:number
}