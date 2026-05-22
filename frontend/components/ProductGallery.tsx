"use client";

import Image from "next/image";
import { useState } from "react";
import Placeholder from "./Placeholder";
import type { Product } from "@/lib/products";

export default function ProductGallery({ product }: { product: Product }) {
  const images = product.gallery ?? (product.image ? [product.image] : []);
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-square md:aspect-auto md:h-full rounded-xl overflow-hidden">
        <Placeholder
          label={product.name}
          sub={product.category}
          variant={product.placeholderVariant}
          icon={product.placeholderIcon}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square bg-surface-container-low rounded-xl overflow-hidden">
        <Image
          src={images[active]}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        {product.badge && (
          <span className="absolute top-4 left-4 bg-background/90 backdrop-blur text-primary font-body text-label-sm uppercase tracking-wider px-3 py-1 rounded-full">
            {product.badge}
          </span>
        )}
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActive(i)}
              className={`relative aspect-square rounded-md overflow-hidden border-2 transition-colors ${
                active === i ? "border-primary" : "border-transparent"
              }`}
            >
              <Image src={img} alt={`${product.name} view ${i + 1}`} fill sizes="20vw" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
