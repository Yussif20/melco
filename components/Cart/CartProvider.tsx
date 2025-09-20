"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useRef,
} from "react";
import { CartItem, CartState, CartContextType } from "@/types/cart";
import { useLocalStorage } from "@/hooks/useLocalStorage";

// Initial cart state
const initialCartState: CartState = {
  items: [],
  totalItems: 0,
  isLoading: false,
};

// Cart actions
type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity" | "addedAt"> }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }
  | { type: "SET_LOADING"; payload: boolean };

// Cart reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        // If item exists, increment quantity
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          totalItems: updatedItems.reduce(
            (total, item) => total + item.quantity,
            0
          ),
        };
      } else {
        // Add new item with quantity 1
        const newItem: CartItem = {
          ...action.payload,
          quantity: 1,
          addedAt: new Date(),
        };
        const updatedItems = [...state.items, newItem];
        return {
          ...state,
          items: updatedItems,
          totalItems: updatedItems.reduce(
            (total, item) => total + item.quantity,
            0
          ),
        };
      }
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce(
          (total, item) => total + item.quantity,
          0
        ),
      };
    }

    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        // Remove item if quantity is 0 or less
        const updatedItems = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        return {
          ...state,
          items: updatedItems,
          totalItems: updatedItems.reduce(
            (total, item) => total + item.quantity,
            0
          ),
        };
      }

      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce(
          (total, item) => total + item.quantity,
          0
        ),
      };
    }

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
        totalItems: 0,
      };

    case "LOAD_CART":
      return {
        ...state,
        items: action.payload,
        totalItems: action.payload.reduce(
          (total, item) => total + item.quantity,
          0
        ),
      };

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart provider component
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);
  const [storedCart, setStoredCart] = useLocalStorage<CartItem[]>(
    "melco-cart",
    []
  );
  const isInitializedRef = useRef(false);

  // Load cart from localStorage on mount (only once)
  useEffect(() => {
    if (!isInitializedRef.current && storedCart && storedCart.length > 0) {
      // Convert stored dates back to Date objects
      const cartWithDates = storedCart.map((item) => ({
        ...item,
        addedAt: new Date(item.addedAt),
      }));
      dispatch({ type: "LOAD_CART", payload: cartWithDates });
    }
    isInitializedRef.current = true;
  }, [storedCart]);

  // Update localStorage when cart changes (but not during initialization)
  useEffect(() => {
    if (isInitializedRef.current) {
      setStoredCart(cart.items);
    }
  }, [cart.items, setStoredCart]);

  // Cart operations
  const addToCart = (product: Omit<CartItem, "quantity" | "addedAt">) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const getItemQuantity = (productId: string): number => {
    const item = cart.items.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  const isInCart = (productId: string): boolean => {
    return cart.items.some((item) => item.id === productId);
  };

  const contextValue: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity,
    isInCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
