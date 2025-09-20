// Cart-related TypeScript interfaces and types

export interface CartItem {
  id: string; // unique product identifier
  name: string;
  category: string;
  image: string;
  quantity: number;
  addedAt: Date;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  isLoading: boolean;
}

export interface CartContextType {
  cart: CartState;
  addToCart: (product: Omit<CartItem, "quantity" | "addedAt">) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
  isInCart: (productId: string) => boolean;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  description?: string;
}
