"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/products";

const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Top Rated"];

export default function ShopPage() {
  const [active, setActive] = useState("All");
  const [sort, setSort] = useState("Featured");

  let list = active === "All" ? products : products.filter((p) => p.category === active);
  list = [...list].sort((a, b) => {
    if (sort === "Price: Low to High") return a.price - b.price;
    if (sort === "Price: High to Low") return b.price - a.price;
    if (sort === "Top Rated") return b.rating - a.rating;
    return 0;
  });

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
              {categories.map((c) => (
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
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
          </div>

          <p className="font-body text-body-md text-on-surface-variant mb-8">{list.length} products</p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {list.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
