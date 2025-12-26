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

export interface Ierror {
  message: string;
}
export interface IerrorDom extends Ierror {
  title: string;
}
export interface IimageDom {
  title: string;
  messageLoading: string;
  messageFallback: string;
  isLoading: boolean;
  places: Iplace[];
  onSelect: (selectPlace: Iplace) => void;
}

export interface IuseFetch {
  fnFetch: () => Promise<Iplace[]>;
  initialValue: any[];
}
export interface Ibackend {
  onSelected: (selectedPlace: Iplace) => void;
}
export interface IFavourite extends Ibackend {
  places: Iplace[];
}

export interface Imodal {
  open: boolean;
  children: ReactNode;
  onClose: () => void;
}

export interface IprogressBar {
  timer: number;
}

export interface IdeleteModal {
  onCancel: () => void;
  onConfirm: () => void;
}
