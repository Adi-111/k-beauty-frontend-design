import { createContext, useContext, useReducer } from 'react';
import type { Product } from '@/lib/products';

export type CartItem = { product: Product; qty: number };

type State = { items: CartItem[] };
type Action =
  | { type: 'ADD'; product: Product }
  | { type: 'REMOVE'; slug: string }
  | { type: 'SET_QTY'; slug: string; qty: number }
  | { type: 'CLEAR' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(i => i.product.slug === action.product.slug);
      if (existing) {
        return { items: state.items.map(i => i.product.slug === action.product.slug ? { ...i, qty: i.qty + 1 } : i) };
      }
      return { items: [...state.items, { product: action.product, qty: 1 }] };
    }
    case 'REMOVE':
      return { items: state.items.filter(i => i.product.slug !== action.slug) };
    case 'SET_QTY':
      if (action.qty <= 0) return { items: state.items.filter(i => i.product.slug !== action.slug) };
      return { items: state.items.map(i => i.product.slug === action.slug ? { ...i, qty: action.qty } : i) };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

type CartCtx = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
};

const CartContext = createContext<CartCtx>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  setQty: () => {},
  clearCart: () => {},
  itemCount: 0,
  subtotal: 0,
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  const itemCount = state.items.reduce((s, i) => s + i.qty, 0);
  const subtotal = state.items.reduce((s, i) => s + i.product.price * i.qty, 0);

  return (
    <CartContext.Provider value={{
      items: state.items,
      addItem: p => dispatch({ type: 'ADD', product: p }),
      removeItem: slug => dispatch({ type: 'REMOVE', slug }),
      setQty: (slug, qty) => dispatch({ type: 'SET_QTY', slug, qty }),
      clearCart: () => dispatch({ type: 'CLEAR' }),
      itemCount,
      subtotal,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
