import type { Product } from './products';

const BASE = (process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000/api').replace(/\/$/, '');

// ── Raw shape returned by the backend ─────────────────────────────────────────
export type ApiProduct = {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  category: { id: number; name: string; slug: string } | null;
  collection: string;
  price: number;
  compareAt: number | null;
  images: string[];
  rating: number;
  reviewCount: number;
  size: string;
  shortDesc: string;
  description: string;
  ritual: string;
  ingredients: string;
  keyIngredients: Array<{ name: string; role: string; desc: string; icon: string }>;
  stats: Array<{ value: string; label: string }>;
  concerns: string[];
  badge: string | null;
  isBestSeller: boolean;
  isNew: boolean;
  isTrending: boolean;
  stockQty: number;
};

export type ApiUser = { id: string; name: string; email: string; role: string };

export type ApiCart = {
  id: number;
  items: Array<{ id: number; product: ApiProduct; qty: number }>;
};

export type ApiOrder = {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  subtotal: number;
  shippingCost: number;
  paymentMethod: string;
  shippingMethod: string;
  createdAt: string;
  items: Array<{ productName: string; productPrice: number; qty: number; subtotal: number }>;
};

export type ApiLoyalty = { id: number; points: number; tier: string; memberSince: string };
export type ApiLoyaltyTransaction = { id: number; points: number; type: string; reason: string; createdAt: string };

// ── Placeholder mapping for ProductCard compatibility ──────────────────────────
const CATEGORY_PLACEHOLDER: Record<string, { variant: Product['placeholderVariant']; icon: string }> = {
  'Toner Pads':    { variant: 'green',  icon: 'water_drop' },
  'Sheet Masks':   { variant: 'linen',  icon: 'layers' },
  'Serums':        { variant: 'dark',   icon: 'science' },
  'Essences':      { variant: 'green',  icon: 'spa' },
  'Toners':        { variant: 'stone',  icon: 'filter_alt' },
  'Cleansers':     { variant: 'linen',  icon: 'bubble_chart' },
  'Moisturizers':  { variant: 'stone',  icon: 'favorite' },
  'Suncare':       { variant: 'linen',  icon: 'wb_sunny' },
  'Eye Care':      { variant: 'dark',   icon: 'visibility' },
  'Lip Care':      { variant: 'green',  icon: 'face' },
  'Exfoliators':   { variant: 'stone',  icon: 'grain' },
  'Body':          { variant: 'linen',  icon: 'self_improvement' },
};

/** Convert a backend ApiProduct to the local Product shape used by existing components */
export function toProduct(p: ApiProduct): Product {
  const catName = p.category?.name ?? 'Skincare';
  const ph = CATEGORY_PLACEHOLDER[catName] ?? { variant: 'linen' as const, icon: 'spa' };
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    tagline: p.tagline ?? catName,
    category: catName,
    collection: p.collection ?? 'Daily Ritual',
    price: Number(p.price),
    compareAt: p.compareAt ? Number(p.compareAt) : undefined,
    image: p.images?.[0],
    gallery: p.images ?? [],
    placeholderVariant: ph.variant,
    placeholderIcon: ph.icon,
    badge: p.badge ?? undefined,
    rating: Number(p.rating),
    reviewCount: p.reviewCount,
    size: p.size ?? '',
    shortDesc: p.shortDesc ?? '',
    description: p.description ?? '',
    ritual: p.ritual ?? '',
    ingredients: p.ingredients ?? '',
    keyIngredients: p.keyIngredients ?? [],
    stats: p.stats ?? [],
    concerns: p.concerns ?? [],
    bestSeller: p.isBestSeller,
    isNew: p.isNew,
    trending: p.isTrending,
  };
}

// ── HTTP helpers ───────────────────────────────────────────────────────────────
type RequestOptions = { method: string; body?: string };

async function request<T>(path: string, options: RequestOptions, token?: string | null): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Request failed' }));
    throw err;
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  get:    <T>(path: string, token?: string | null) =>
    request<T>(path, { method: 'GET' }, token),
  post:   <T>(path: string, body: unknown, token?: string | null) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }, token),
  patch:  <T>(path: string, body: unknown, token?: string | null) =>
    request<T>(path, { method: 'PATCH', body: JSON.stringify(body) }, token),
  delete: <T>(path: string, token?: string | null) =>
    request<T>(path, { method: 'DELETE' }, token),
};
