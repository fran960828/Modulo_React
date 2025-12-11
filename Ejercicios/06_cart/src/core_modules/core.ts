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
