import Link from "next/link";
import Image from "next/image";
import Placeholder from "@/components/Placeholder";
import { products } from "@/lib/products";

const bundles = [
  {
    name: "The Soothe & Glow Ritual",
    desc: "CICA Soothing Mask + Glass Skin Glow Serum — calm, then glow.",
    price: 56,
    was: 71,
    icon: "spa",
    variant: "green" as const,
  },
  {
    name: "Daily Essentials Trio",
    desc: "Toner Pad + Gel Cleanser + Dewy Veil Sunscreen for a complete AM routine.",
    price: 68,
    was: 82,
    icon: "wb_sunny",
    variant: "linen" as const,
  },
  {
    name: "Barrier Rescue Set",
    desc: "CICA Cream + Overnight Glow Mask to repair a stressed barrier overnight.",
    price: 58,
    was: 68,
    icon: "bedtime",
    variant: "stone" as const,
  },
];

export default function OffersPage() {
  const onSale = products.filter((p) => p.compareAt);
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-primary text-on-primary px-container-margin-mobile md:px-container-margin-desktop py-20 md:py-28">
        <div className="max-w-content mx-auto relative z-10 text-center space-y-5">
          <p className="font-body text-label-md uppercase tracking-[0.3em] opacity-80">Member Exclusive</p>
          <h1 className="font-display text-display-lg md:text-display-xl">Exclusive Ritual Offers</h1>
          <p className="font-body text-body-lg opacity-85 max-w-xl mx-auto">
            Curated bundles and limited member pricing — build your ritual for less, only inside the Circle.
          </p>
          <div className="inline-flex items-center gap-3 bg-on-primary/10 rounded-full px-6 py-3 font-body text-label-md uppercase tracking-wider">
            <span className="material-symbols-outlined">timer</span>
            Offers refresh every season
          </div>
        </div>
      </section>

      {/* BUNDLES */}
      <section className="px-container-margin-mobile md:px-container-margin-desktop py-section-gap-sm md:py-section-gap-lg">
        <div className="max-w-content mx-auto">
          <div className="mb-12 space-y-3">
            <p className="font-body text-label-md uppercase tracking-widest text-primary">Save More Together</p>
            <h2 className="font-display text-headline-lg">Ritual Bundles</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {bundles.map((b) => (
              <div key={b.name} className="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/40 flex flex-col">
                <div className="relative aspect-[4/3]">
                  <Placeholder label={b.name} sub="Bundle" variant={b.variant} icon={b.icon} />
                  <span className="absolute top-4 left-4 bg-primary text-on-primary font-body text-label-sm uppercase tracking-wider px-3 py-1 rounded-full">
                    Save ${b.was - b.price}
                  </span>
                </div>
                <div className="p-7 space-y-3 flex flex-col flex-1">
                  <h3 className="font-display text-headline-md">{b.name}</h3>
                  <p className="font-body text-body-md text-on-surface-variant flex-1">{b.desc}</p>
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-headline-md text-primary">${b.price}</span>
                    <span className="font-body text-body-md text-secondary line-through">${b.was}</span>
                  </div>
                  <button className="w-full bg-primary text-on-primary font-body text-label-md uppercase tracking-wider py-3.5 rounded-full hover:bg-primary-container transition-colors mt-2">
                    Add Bundle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMO BANNERS */}
      <section className="px-container-margin-mobile md:px-container-margin-desktop pb-section-gap-sm md:pb-section-gap-lg">
        <div className="max-w-content mx-auto grid md:grid-cols-2 gap-6">
          <div className="relative rounded-xl overflow-hidden min-h-[280px] flex items-end">
            <Image src="/products/cica-mask-3.jpg" alt="Gift with purchase" fill sizes="50vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-on-background/80 to-transparent" />
            <div className="relative p-10 text-inverse-on-surface space-y-3">
              <p className="font-body text-label-md uppercase tracking-widest opacity-90">Gift With Purchase</p>
              <h3 className="font-display text-headline-lg">Free 5-pack CICA mask over $80</h3>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden min-h-[280px] flex items-end bg-secondary-container">
            <div className="relative p-10 text-on-secondary-container space-y-3">
              <p className="font-body text-label-md uppercase tracking-widest text-primary">Refer a Friend</p>
              <h3 className="font-display text-headline-lg">Give $10, get $10 toward your next ritual.</h3>
              <Link href="/loyalty" className="inline-flex items-center gap-2 font-body text-label-md uppercase tracking-wider text-primary hover:gap-3 transition-all">
                Join Loyalty <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ON SALE */}
      <section className="bg-surface-container-low px-container-margin-mobile md:px-container-margin-desktop py-section-gap-sm md:py-section-gap-lg">
        <div className="max-w-content mx-auto">
          <div className="mb-12 space-y-3">
            <p className="font-body text-label-md uppercase tracking-widest text-primary">Limited Time</p>
            <h2 className="font-display text-headline-lg">On Sale Now</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {onSale.map((p) => (
              <Link key={p.slug} href={`/product/${p.slug}`} className="group flex gap-6 bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/40 items-center">
                <div className="relative w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden">
                  {p.image ? (
                    <Image src={p.image} alt={p.name} fill sizes="120px" className="object-cover" />
                  ) : (
                    <Placeholder label={p.name} variant={p.placeholderVariant} icon={p.placeholderIcon} />
                  )}
                </div>
                <div className="space-y-1">
                  <p className="font-body text-label-sm uppercase tracking-widest text-on-surface-variant">{p.category}</p>
                  <h3 className="font-display text-headline-md group-hover:text-primary transition-colors">{p.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="font-body text-body-md text-primary font-semibold">${p.price.toFixed(2)}</span>
                    <span className="font-body text-body-md text-secondary line-through">${p.compareAt?.toFixed(2)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
