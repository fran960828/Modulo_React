export interface AvailableMeals {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

export interface CartProduct extends AvailableMeals {
  quantity: number;
}

export interface ProductState {
  items: CartProduct[];
  totalQuantity: number;
  change: boolean;
}
type Status = "pending" | "success" | "error" | "";

export interface INotification {
  status: Status;
  title: string;
  message: string;
}

export interface UiState {
  showCart: boolean;
  notification: INotification;
}
export interface ProductSentHttp {
  cart: {
    items: CartProduct[];
    totalQuantity: number;
  };
}
