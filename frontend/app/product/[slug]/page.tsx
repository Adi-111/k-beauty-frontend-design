import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import ProductCard from "@/components/ProductCard";
import Stars from "@/components/Stars";
import AddToCartButton from "@/components/AddToCartButton";
import { serverFetch, toProduct, type ApiProduct } from "@/lib/api";
import { getProduct, getCuratedRelated, withId } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const [rawProduct, rawRelated] = await Promise.all([
    serverFetch<ApiProduct>(`/products/${params.slug}`, 60),
    serverFetch<ApiProduct[]>(`/products/${params.slug}/related`, 120),
  ]);

  // Fall back to the local catalog when the commerce API is unreachable or
  // doesn't know about this product yet (e.g. this frontend-only demo mode).
  const localProduct = !rawProduct ? getProduct(params.slug) : undefined;
  if (!rawProduct && !localProduct) notFound();

  const product = rawProduct ? toProduct(rawProduct) : withId(localProduct!);
  const related = rawRelated?.length
    ? rawRelated.map(toProduct)
    : getCuratedRelated(params.slug).map(withId);

  return (
    <div>
      {/* breadcrumb */}
      <div className="px-container-margin-mobile md:px-container-margin-desktop pt-8">
        <div className="max-w-content mx-auto font-body text-label-sm uppercase tracking-wider text-on-surface-variant flex gap-2">
          <Link href="/" className="hover:text-primary">Home</Link> /
          <Link href="/shop" className="hover:text-primary">Shop</Link> /
          <span className="text-primary">{product.category}</span>
        </div>
      </div>

      {/* HERO */}
      <section className="px-container-margin-mobile md:px-container-margin-desktop py-10 md:py-12">
        <div className="max-w-content mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
          <ProductGallery product={product} />

          <div className="space-y-8 md:sticky md:top-24">
            <div className="space-y-3">
              <p className="font-body text-label-md uppercase tracking-[0.2em] text-primary">{product.collection}</p>
              <h1 className="font-display text-headline-lg md:text-display-lg leading-tight">{product.name}</h1>
              <p className="font-body text-body-lg text-on-surface-variant max-w-md">{product.shortDesc}</p>
              <div className="flex items-center gap-3 pt-1">
                <Stars rating={product.rating} size={18} />
                <span className="font-body text-body-md text-on-surface-variant">
                  {product.rating} · {product.reviewCount.toLocaleString()} reviews
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="font-display text-headline-lg text-primary">${product.price.toFixed(2)}</span>
              {product.compareAt && (
                <span className="font-body text-body-md text-secondary line-through">${product.compareAt.toFixed(2)}</span>
              )}
              <span className="font-body text-label-sm uppercase tracking-wider text-on-surface-variant ml-auto">{product.size}</span>
            </div>

            <div className="flex flex-col gap-4">
              <AddToCartButton product={product} />
              <button className="w-full border border-outline text-on-background font-body text-label-md uppercase tracking-wider py-4 rounded-full hover:border-primary hover:text-primary transition-colors">
                Add to Wishlist
              </button>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 justify-center pt-2">
                {["Vegan LOHAS", "Clinically Tested", "Made in Korea"].map((b) => (
                  <span key={b} className="flex items-center gap-2">
                    <span className="material-symbols-outlined icon-fill text-primary text-[18px]">verified</span>
                    <span className="font-body text-label-sm uppercase tracking-wider">{b}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-outline-variant pt-6 space-y-2">
              {[
                { t: "Description", c: product.description },
                { t: "The Ritual", c: product.ritual },
                { t: "Full Ingredients", c: product.ingredients },
              ].map((d, i) => (
                <details key={d.t} className="group border-b border-outline-variant/60 py-4" open={i === 0}>
                  <summary className="flex justify-between items-center cursor-pointer list-none">
                    <span className="font-body text-label-md uppercase tracking-wider">{d.t}</span>
                    <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                  </summary>
                  <p className="pt-4 font-body text-body-md text-on-surface-variant leading-relaxed">{d.c}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* KEY INGREDIENTS */}
      <section className="bg-surface-container-lowest px-container-margin-mobile md:px-container-margin-desktop py-section-gap-sm md:py-section-gap-lg">
        <div className="max-w-content mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <h2 className="font-display text-headline-lg">Bio-Active Synergy</h2>
            <p className="font-body text-body-md text-on-surface-variant">
              Traditional Korean botanicals meet modern clinical precision for results that feel like a second skin.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.keyIngredients.map((ing) => (
              <div key={ing.name} className="flex flex-col md:flex-row gap-6 bg-surface-container-low rounded-xl p-8 items-start border border-outline-variant/40 hover:bg-surface-container-high transition-colors">
                <div className="w-20 h-20 flex-shrink-0 bg-primary-container/10 flex items-center justify-center rounded-full">
                  <span className="material-symbols-outlined icon-fill text-primary text-[36px]">{ing.icon}</span>
                </div>
                <div className="space-y-2">
                  <p className="font-body text-label-sm uppercase tracking-widest text-primary">{ing.role}</p>
                  <h3 className="font-display text-headline-md">{ing.name}</h3>
                  <p className="font-body text-body-md text-on-surface-variant">{ing.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      {product.stats && product.stats.length > 0 && (
        <section className="px-container-margin-mobile md:px-container-margin-desktop py-section-gap-sm md:py-section-gap-lg">
          <div className="max-w-content mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 space-y-5">
              <h2 className="font-display text-headline-lg text-primary">Why it works</h2>
              <p className="font-body text-body-md text-on-surface-variant">
                Thoughtful formulation and manufacturing — designed for daily care with real, visible results.
              </p>
            </div>
            <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {product.stats.map((s, i) => {
                const tones = [
                  "bg-primary text-on-primary",
                  "bg-secondary-container text-on-secondary-container",
                  "bg-tertiary-fixed text-on-tertiary-fixed",
                  "bg-primary-container text-on-primary-container",
                ];
                return (
                  <div key={s.label} className={`${tones[i % 4]} p-6 rounded-xl flex flex-col justify-between aspect-square`}>
                    <span className="font-display text-[clamp(1.75rem,4vw,2.5rem)] leading-none">{s.value}</span>
                    <p className="font-body text-label-sm uppercase tracking-wider mt-3">{s.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* RELATED */}
      {related.length > 0 && (
        <section className="bg-surface-container-low px-container-margin-mobile md:px-container-margin-desktop py-section-gap-sm md:py-section-gap-lg">
          <div className="max-w-content mx-auto">
            <div className="mb-12 space-y-3">
              <h2 className="font-display text-headline-lg">Complete the Ritual</h2>
              <p className="font-body text-body-md text-on-surface-variant">Pair it with these member favourites.</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
