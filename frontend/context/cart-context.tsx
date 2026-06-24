'use client';

import { createContext, useCallback, useContext, useEffect, useReducer } from 'react';
import { api, toProduct, type ApiCart, type ApiProduct } from '@/lib/api';
import type { Product } from '@/lib/products';
import { useAuth } from './auth-context';

export type CartItem = { product: Product & { id: number }; qty: number };

type State = { items: CartItem[] };
type Action =
  | { type: 'ADD'; product: Product & { id: number } }
  | { type: 'REMOVE'; slug: string }
  | { type: 'SET_QTY'; slug: string; qty: number }
  | { type: 'CLEAR' }
  | { type: 'INIT'; items: CartItem[] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INIT': return { items: action.items };
    case 'ADD': {
      const existing = state.items.find(i => i.product.slug === action.product.slug);
      if (existing) return { items: state.items.map(i => i.product.slug === action.product.slug ? { ...i, qty: i.qty + 1 } : i) };
      return { items: [...state.items, { product: action.product, qty: 1 }] };
    }
    case 'REMOVE': return { items: state.items.filter(i => i.product.slug !== action.slug) };
    case 'SET_QTY':
      if (action.qty <= 0) return { items: state.items.filter(i => i.product.slug !== action.slug) };
      return { items: state.items.map(i => i.product.slug === action.slug ? { ...i, qty: action.qty } : i) };
    case 'CLEAR': return { items: [] };
    default: return state;
  }
}

type CartCtx = {
  items: CartItem[];
  addItem: (product: Product & { id: number }) => void;
  removeItem: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
};

const CartContext = createContext<CartCtx>({
  items: [], addItem: () => {}, removeItem: () => {}, setQty: () => {}, clearCart: () => {},
  itemCount: 0, subtotal: 0,
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const { token } = useAuth();

  useEffect(() => {
    if (!token) { dispatch({ type: 'CLEAR' }); return; }
    api.get<ApiCart>('/cart', token).then(cart => {
      const items = (cart?.items ?? []).map(ci => ({ product: toProduct(ci.product as ApiProduct), qty: ci.qty }));
      dispatch({ type: 'INIT', items });
    }).catch(() => {});
  }, [token]);

  const addItem = useCallback((product: Product & { id: number }) => {
    dispatch({ type: 'ADD', product });
    if (token && product.id) {
      api.post('/cart/items', { productId: product.id, qty: 1 }, token).catch(() => {});
    }
  }, [token]);

  const removeItem = useCallback((slug: string) => {
    const item = state.items.find(i => i.product.slug === slug);
    dispatch({ type: 'REMOVE', slug });
    if (token && item?.product.id) {
      api.delete(`/cart/items/${item.product.id}`, token).catch(() => {});
    }
  }, [token, state.items]);

  const setQty = useCallback((slug: string, qty: number) => {
    const item = state.items.find(i => i.product.slug === slug);
    dispatch({ type: 'SET_QTY', slug, qty });
    if (token && item?.product.id) {
      api.patch(`/cart/items/${item.product.id}`, { qty }, token).catch(() => {});
    }
  }, [token, state.items]);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR' });
    if (token) api.delete('/cart', token).catch(() => {});
  }, [token]);

  const itemCount = state.items.reduce((s, i) => s + i.qty, 0);
  const subtotal = state.items.reduce((s, i) => s + i.product.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items: state.items, addItem, removeItem, setQty, clearCart, itemCount, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
