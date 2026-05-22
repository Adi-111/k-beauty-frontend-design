import Link from "next/link";
import Image from "next/image";
import Placeholder from "./Placeholder";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] bg-surface-container-low rounded-xl overflow-hidden mb-5">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <Placeholder
            label={product.name}
            sub={product.category}
            variant={product.placeholderVariant}
            icon={product.placeholderIcon}
          />
        )}
        {product.badge && (
          <span className="absolute top-4 left-4 bg-background/90 backdrop-blur text-primary font-body text-label-sm uppercase tracking-wider px-3 py-1 rounded-full">
            {product.badge}
          </span>
        )}
        <span className="absolute bottom-4 left-4 right-4 bg-primary text-on-primary text-center font-body text-label-sm uppercase tracking-wider py-3 rounded-full translate-y-14 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          Quick Add +
        </span>
      </div>
      <div className="space-y-1">
        <p className="font-body text-label-sm uppercase tracking-widest text-on-surface-variant">
          {product.category}
        </p>
        <h3 className="font-display text-headline-md leading-tight group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 pt-1">
          <span className="font-body text-body-md text-primary font-semibold">${product.price.toFixed(2)}</span>
          {product.compareAt && (
            <span className="font-body text-body-md text-secondary line-through">
              ${product.compareAt.toFixed(2)}
            </span>
          )}
          <span className="ml-auto flex items-center gap-1 text-on-surface-variant">
            <span className="material-symbols-outlined icon-fill text-[16px] text-primary">star</span>
            <span className="font-body text-label-sm">{product.rating}</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
