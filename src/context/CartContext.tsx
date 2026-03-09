import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type PropsWithChildren,
} from "react";
import type { CartItem, Product } from "../types";

type CartAction =
  | { type: "add"; product: Product }
  | { type: "remove"; productId: string }
  | { type: "update"; productId: string; quantity: number }
  | { type: "clear" };

interface CartState {
  items: CartItem[];
}

interface CartValue extends CartState {
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
}

const STORAGE_KEY = "dafab-cart";
const CartContext = createContext<CartValue | null>(null);

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "add": {
      const existing = state.items.find((item) => item.id === action.product.id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === action.product.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        };
      }

      return { items: [...state.items, { ...action.product, quantity: 1 }] };
    }
    case "remove":
      return { items: state.items.filter((item) => item.id !== action.productId) };
    case "update":
      return {
        items: state.items.map((item) =>
          item.id === action.productId
            ? { ...item, quantity: Math.max(1, Math.min(action.quantity, 20)) }
            : item,
        ),
      };
    case "clear":
      return { items: [] };
    default:
      return state;
  }
}

function getInitialState(): CartState {
  if (typeof window === "undefined") {
    return { items: [] };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { items: [] };
    }

    const parsed = JSON.parse(raw) as CartState;
    return { items: Array.isArray(parsed.items) ? parsed.items : [] };
  } catch {
    return { items: [] };
  }
}

export function CartProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo<CartValue>(
    () => ({
      items: state.items,
      addItem: (product) => dispatch({ type: "add", product }),
      removeItem: (productId) => dispatch({ type: "remove", productId }),
      updateQuantity: (productId, quantity) => dispatch({ type: "update", productId, quantity }),
      clearCart: () => dispatch({ type: "clear" }),
      totalItems: state.items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    [state.items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
