"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { api, toProduct, type ApiProduct } from "@/lib/api";
import { curatedProducts as localProducts, withId } from "@/lib/products";
import type { Product } from "@/lib/products";

const CATEGORIES = ["All", ...Array.from(new Set(localProducts.map((p) => p.category)))];

function localFallback(active: string, sort: string): (Product & { id: number })[] {
  let list = localProducts.map(withId);
  if (active !== "All") list = list.filter((p) => p.category === active);
  if (sort === "price_asc") list = [...list].sort((a, b) => a.price - b.price);
  else if (sort === "price_desc") list = [...list].sort((a, b) => b.price - a.price);
  else if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
  return list;
}
const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Top Rated", value: "rating" },
];

export default function ShopPage() {
  const [active, setActive] = useState("All");
  const [sort, setSort] = useState("featured");
  const [products, setProducts] = useState<(Product & { id: number })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (active !== "All") params.set("category", active);
    if (sort !== "featured") params.set("sort", sort);
    api.get<{ data: ApiProduct[]; total: number }>(`/products?${params.toString()}`)
      .then(res => {
        const apiProducts = res?.data ?? [];
        setProducts(apiProducts.length ? apiProducts.map(toProduct) : localFallback(active, sort));
      })
      .catch(() => setProducts(localFallback(active, sort)))
      .finally(() => setLoading(false));
  }, [active, sort]);

  return (
    <div>
      {/* header band */}
      <section className="bg-surface-container-low px-container-margin-mobile md:px-container-margin-desktop py-16">
        <div className="max-w-content mx-auto space-y-4">
          <p className="font-body text-label-md uppercase tracking-widest text-primary">The Collection</p>
          <h1 className="font-display text-headline-lg md:text-display-lg">Skincare Rituals</h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-xl">
            Clinically-proven, vegan-certified Korean skincare — curated for every skin type, concern and climate.
          </p>
        </div>
      </section>

      <section className="px-container-margin-mobile md:px-container-margin-desktop py-12">
        <div className="max-w-content mx-auto">
          {/* filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`font-body text-label-md uppercase tracking-wider px-5 py-2.5 rounded-full border transition-colors ${
                    active === c
                      ? "bg-primary text-on-primary border-primary"
                      : "bg-surface-container-low text-on-surface-variant border-outline-variant/60 hover:border-primary"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-3 flex-shrink-0">
              <span className="font-body text-label-sm uppercase tracking-wider text-on-surface-variant">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="font-body text-body-md bg-transparent border-b border-outline pb-1 pr-6 outline-none focus:border-primary cursor-pointer"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </label>
          </div>

          <p className="font-body text-body-md text-on-surface-variant mb-8">
            {loading ? "Loading…" : `${products.length} products`}
          </p>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {products.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
