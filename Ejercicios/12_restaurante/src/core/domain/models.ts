export interface AvailableMeals {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

export interface CartItem {
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
