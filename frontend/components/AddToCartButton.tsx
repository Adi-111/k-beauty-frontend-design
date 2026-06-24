"use client";

import { useState } from "react";
import { useCart } from "@/context/cart-context";
import type { Product } from "@/lib/products";

export default function AddToCartButton({ product }: { product: Product & { id: number } }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <button
      onClick={handleAdd}
      className="w-full bg-primary text-on-primary font-body text-label-md uppercase tracking-wider py-4 rounded-full hover:bg-primary-container transition-colors active:scale-[0.99] flex items-center justify-center gap-2"
    >
      {added ? (
        <>
          <span className="material-symbols-outlined icon-fill text-[18px]">check_circle</span>
          Added to Bag
        </>
      ) : (
        `Add to Cart · $${product.price.toFixed(2)}`
      )}
    </button>
  );
}
