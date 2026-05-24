"use client";

import Link from "next/link";
import { useRef } from "react";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/products";

type Props = {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllHref?: string;
  tone?: "default" | "muted";
};

export default function ProductRail({ title, subtitle, products, viewAllHref = "/shop", tone = "default" }: Props) {
  const scroller = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 720), behavior: "smooth" });
  };

  if (products.length === 0) return null;

  return (
    <section
      className={`py-12 md:py-16 ${tone === "muted" ? "bg-surface-container-low" : ""}`}
    >
      <div className="max-w-content mx-auto px-container-margin-mobile md:px-container-margin-desktop">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div className="space-y-1.5">
            {subtitle && (
              <p className="font-body text-label-md uppercase tracking-widest text-primary">{subtitle}</p>
            )}
            <h2 className="font-display text-headline-lg leading-tight">{title}</h2>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={viewAllHref}
              className="hidden sm:inline font-body text-label-md uppercase tracking-wider text-primary hover:underline whitespace-nowrap"
            >
              View all
            </Link>
            <div className="hidden md:flex gap-2">
              <button
                aria-label="Scroll left"
                onClick={() => scroll(-1)}
                className="w-11 h-11 rounded-full border border-outline flex items-center justify-center hover:bg-primary hover:text-on-primary hover:border-primary transition-colors"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button
                aria-label="Scroll right"
                onClick={() => scroll(1)}
                className="w-11 h-11 rounded-full border border-outline flex items-center justify-center hover:bg-primary hover:text-on-primary hover:border-primary transition-colors"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scroller}
          className="flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-container-margin-mobile px-container-margin-mobile md:mx-0 md:px-0 pb-2"
        >
          {products.map((p) => (
            <div
              key={p.slug}
              className="snap-start shrink-0 w-[46%] sm:w-[260px] md:w-[270px]"
            >
              <ProductCard product={p} />
            </div>
          ))}
          <Link
            href={viewAllHref}
            className="snap-start shrink-0 w-[46%] sm:w-[260px] md:w-[270px] rounded-xl border border-dashed border-outline flex flex-col items-center justify-center gap-3 text-primary hover:bg-surface-container-low transition-colors aspect-[4/5] self-stretch"
          >
            <span className="material-symbols-outlined text-[40px]">arrow_forward</span>
            <span className="font-body text-label-md uppercase tracking-wider">View all</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
