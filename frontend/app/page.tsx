import Link from "next/link";
import Image from "next/image";
import ProductRail from "@/components/ProductRail";
import HeroBanners from "@/components/HeroBanners";
import Placeholder from "@/components/Placeholder";
import Stars from "@/components/Stars";
import {
  reviews,
  shopByConcern,
  bestSellers,
  newArrivals,
  trendingNow,
  byCategory,
  underPrice,
} from "@/lib/products";

const trust = [
  { icon: "verified", label: "100% Authentic" },
  { icon: "eco", label: "Vegan LOHAS Certified" },
  { icon: "workspace_premium", label: "Made in Korea" },
  { icon: "local_shipping", label: "Free Shipping $40+" },
];

const subNav = [
  { label: "Welcome", href: "/" },
  { label: "Member", href: "/loyalty" },
  { label: "Suncare", href: "/shop" },
  { label: "Serum", href: "/shop" },
  { label: "Lip", href: "/shop" },
  { label: "Cream", href: "/shop" },
  { label: "Cleansing", href: "/shop" },
  { label: "Eye", href: "/shop" },
  { label: "Toner/Pads", href: "/shop" },
  { label: "Mask", href: "/shop" },
  { label: "Offers", href: "/offers" },
];

const heroTiles = [
  { label: "Sheet Masks", icon: "face_retouching_natural", href: "/shop", tint: "bg-primary-container/10" },
  { label: "Toner Pads", icon: "blur_circular", href: "/shop", tint: "bg-secondary-container" },
  { label: "Serums", icon: "opacity", href: "/shop", tint: "bg-tertiary-fixed" },
  { label: "Essences", icon: "auto_awesome", href: "/shop", tint: "bg-surface-container-high" },
  { label: "Cleansers", icon: "soap", href: "/shop", tint: "bg-primary-container/10" },
  { label: "Moisturizers", icon: "spa", href: "/shop", tint: "bg-secondary-container" },
  { label: "Suncare", icon: "sunny", href: "/shop", tint: "bg-tertiary-fixed" },
  { label: "Eye Care", icon: "visibility", href: "/shop", tint: "bg-surface-container-high" },
  { label: "Lip Care", icon: "favorite", href: "/shop", tint: "bg-primary-container/10" },
  { label: "Exfoliators", icon: "science", href: "/shop", tint: "bg-secondary-container" },
  { label: "Offers", icon: "sell", href: "/offers", tint: "bg-tertiary-fixed" },
  { label: "Skin Quiz", icon: "quiz", href: "/quiz", tint: "bg-surface-container-high" },
  { label: "Loyalty", icon: "auto_awesome", href: "/loyalty", tint: "bg-primary-container/10" },
  { label: "Member", icon: "person", href: "/account", tint: "bg-secondary-container" },
];

export default function HomePage() {
  const ranked = bestSellers(5);

  return (
    <div>
      {/* SECONDARY CATEGORY NAV */}
      <div className="border-b border-outline-variant/40 bg-background">
        <nav className="max-w-content mx-auto flex gap-7 overflow-x-auto no-scrollbar px-container-margin-mobile md:px-container-margin-desktop py-4">
          {subNav.map((n, i) => (
            <Link
              key={n.label}
              href={n.href}
              className={`whitespace-nowrap font-body text-body-md transition-colors hover:text-primary ${
                i === 0 ? "text-primary font-semibold" : "text-on-surface-variant"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* HERO BANNERS */}
      <section className="px-container-margin-mobile md:px-container-margin-desktop pt-8 pb-10">
        <div className="max-w-content mx-auto">
          <HeroBanners />
        </div>
      </section>

      {/* CATEGORY TILE ROW */}
      <section className="px-container-margin-mobile md:px-container-margin-desktop pb-10">
        <div className="max-w-content mx-auto">
          <div
            className="flex gap-4 md:gap-5 overflow-x-auto no-scrollbar -mx-container-margin-mobile px-container-margin-mobile md:mx-0 md:px-0"
          >
            {heroTiles.map((t) => (
              <Link key={t.label} href={t.href} className="group flex flex-col items-center gap-2.5 shrink-0 w-[88px] md:w-[96px]">
                <div className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all group-hover:-translate-y-1 group-hover:shadow-[0_8px_24px_rgba(20,66,45,0.10)] ${t.tint}`}>
                  <span className="material-symbols-outlined icon-fill text-primary text-[30px] md:text-[34px]">{t.icon}</span>
                </div>
                <span className="font-body text-label-sm text-center leading-tight text-on-surface-variant group-hover:text-primary transition-colors">
                  {t.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-primary text-on-primary">
        <div className="max-w-content mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-on-primary/10">
          {trust.map((t) => (
            <div key={t.label} className="flex items-center justify-center gap-3 px-4 py-5 text-center">
              <span className="material-symbols-outlined">{t.icon}</span>
              <span className="font-body text-label-md uppercase tracking-wider">{t.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* BEST SELLERS RAIL */}
      <ProductRail title="Best Sellers" subtitle="Member Favourites" products={bestSellers(10)} tone="muted" />

      {/* SHOP BY CONCERN */}
      <section className="px-container-margin-mobile md:px-container-margin-desktop py-12 md:py-16">
        <div className="max-w-content mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div className="space-y-1.5">
              <p className="font-body text-label-md uppercase tracking-widest text-primary">Targeted Care</p>
              <h2 className="font-display text-headline-lg">Shop by Concern</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {shopByConcern.map((c) => (
              <Link key={c.name} href="/shop" className="group flex items-center gap-4 bg-surface-container-low rounded-xl p-5 border border-outline-variant/40 hover:border-primary transition-colors">
                <div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined icon-fill text-primary">{c.icon}</span>
                </div>
                <span className="font-body text-body-md font-medium group-hover:text-primary transition-colors">{c.name}</span>
                <span className="material-symbols-outlined text-on-surface-variant ml-auto group-hover:translate-x-1 transition-transform">chevron_right</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS RAIL */}
      <ProductRail title="New Arrivals" subtitle="Just Dropped" products={newArrivals(10)} tone="muted" />

      {/* DEALS GRID */}
      <section className="px-container-margin-mobile md:px-container-margin-desktop py-12 md:py-16">
        <div className="max-w-content mx-auto">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display text-headline-lg">Today&apos;s Deals</h2>
            <Link href="/offers" className="font-body text-label-md uppercase tracking-wider text-primary hover:underline">All offers</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/offers" className="group relative md:col-span-2 rounded-xl overflow-hidden min-h-[240px] flex items-end">
              <Image src="/products/toner-pad-2.jpg" alt="Bundle offer" fill sizes="66vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
              <div className="relative p-8 text-on-primary space-y-2">
                <span className="font-body text-label-md uppercase tracking-widest bg-on-primary/20 rounded-full px-3 py-1">Save up to 20%</span>
                <h3 className="font-display text-headline-lg">Ritual Bundles</h3>
                <p className="font-body text-body-md opacity-90">Build a full routine for less — curated sets inside the Circle.</p>
              </div>
            </Link>
            <div className="grid grid-rows-2 gap-6">
              <Link href="/offers" className="bg-secondary-container text-on-secondary-container rounded-xl p-7 flex flex-col justify-center hover:opacity-90 transition-opacity">
                <span className="font-body text-label-md uppercase tracking-widest text-primary mb-1">Gift With Purchase</span>
                <h3 className="font-display text-headline-md">Free 5-pack CICA mask over $80</h3>
              </Link>
              <Link href="/loyalty" className="bg-primary text-on-primary rounded-xl p-7 flex flex-col justify-center hover:opacity-90 transition-opacity">
                <span className="font-body text-label-md uppercase tracking-widest opacity-80 mb-1">Refer a Friend</span>
                <h3 className="font-display text-headline-md">Give $10, get $10</h3>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SHEET MASK EDIT RAIL */}
      <ProductRail title="The Sheet Mask Edit" subtitle="Soothe & Glow" products={byCategory("Sheet Masks", 10)} tone="muted" />

      {/* RANKED BEST SELLERS */}
      <section className="px-container-margin-mobile md:px-container-margin-desktop py-12 md:py-16">
        <div className="max-w-content mx-auto grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4 md:sticky md:top-32">
            <p className="font-body text-label-md uppercase tracking-widest text-primary">Most Loved</p>
            <h2 className="font-display text-headline-lg">This week&apos;s Top 5</h2>
            <p className="font-body text-body-md text-on-surface-variant max-w-sm">
              The products our Circle keeps coming back to — ranked by sales and reviews.
            </p>
            <Link href="/shop" className="inline-flex items-center gap-2 font-body text-label-md uppercase tracking-wider text-primary hover:gap-3 transition-all">
              Shop all best sellers <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </Link>
          </div>
          <div className="divide-y divide-outline-variant/50">
            {ranked.map((p, i) => (
              <Link key={p.slug} href={`/product/${p.slug}`} className="group flex items-center gap-5 py-4">
                <span className="font-display text-headline-lg text-outline-variant w-8 flex-shrink-0">{i + 1}</span>
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  {p.image ? (
                    <Image src={p.image} alt={p.name} fill sizes="64px" className="object-cover" />
                  ) : (
                    <Placeholder label={p.name} variant={p.placeholderVariant} icon={p.placeholderIcon} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-label-sm uppercase tracking-widest text-on-surface-variant">{p.category}</p>
                  <h3 className="font-display text-headline-md truncate group-hover:text-primary transition-colors">{p.name}</h3>
                  <div className="flex items-center gap-2">
                    <Stars rating={p.rating} size={14} />
                    <span className="font-body text-label-sm text-on-surface-variant">{p.rating}</span>
                  </div>
                </div>
                <span className="font-body text-body-md text-primary font-semibold flex-shrink-0">${p.price.toFixed(2)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* UNDER $30 RAIL */}
      <ProductRail title="Under $30" subtitle="Everyday Essentials" products={underPrice(30, 10)} tone="muted" />

      {/* TRENDING RAIL */}
      <ProductRail title="Trending Now" subtitle="Going Fast" products={trendingNow(10)} />

      {/* STATS BENTO */}
      <section className="bg-surface-container-lowest px-container-margin-mobile md:px-container-margin-desktop py-section-gap-sm md:py-section-gap-lg">
        <div className="max-w-content mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 space-y-6">
            <p className="font-body text-label-md uppercase tracking-widest text-primary">Trusted Worldwide</p>
            <h2 className="font-display text-headline-lg text-primary">Proven by people, refined by nature.</h2>
            <p className="font-body text-body-md text-on-surface-variant">
              MJ Care has been the No.1 online face mask brand in Japan for nine years running and is now
              trusted across 32 countries.
            </p>
            <Link href="/about" className="inline-flex items-center gap-2 font-body text-label-md uppercase tracking-wider text-primary hover:gap-3 transition-all">
              Read our story <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </Link>
          </div>
          <div className="md:col-span-7 grid grid-cols-2 gap-4">
            {[
              { value: "9 yrs", label: "No.1 face mask brand in Japan", v: "bg-primary text-on-primary" },
              { value: "32", label: "Countries trust MJ Care", v: "bg-secondary-container text-on-secondary-container" },
              { value: "98%", label: "Reported immediate soothing", v: "bg-tertiary-fixed text-on-tertiary-fixed" },
              { value: "100%", label: "Would recommend to a friend", v: "bg-primary-container text-on-primary-container" },
            ].map((s) => (
              <div key={s.label} className={`${s.v} p-8 rounded-xl flex flex-col justify-between aspect-square`}>
                <span className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-none">{s.value}</span>
                <p className="font-body text-label-md uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="px-container-margin-mobile md:px-container-margin-desktop py-section-gap-sm md:py-section-gap-lg">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-12 space-y-3">
            <p className="font-body text-label-md uppercase tracking-widest text-primary">Real Reviews</p>
            <h2 className="font-display text-headline-lg">Loved by our Circle</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((r) => (
              <div key={r.name} className="bg-surface-container-low rounded-xl p-8 space-y-4 border border-outline-variant/40">
                <Stars rating={r.rating} />
                <h4 className="font-display text-headline-md">{r.title}</h4>
                <p className="font-body text-body-md text-on-surface-variant">&ldquo;{r.body}&rdquo;</p>
                <div className="flex items-center gap-2 pt-2 border-t border-outline-variant/40">
                  <span className="material-symbols-outlined icon-fill text-primary text-[18px]">verified</span>
                  <span className="font-body text-label-sm uppercase tracking-wider">{r.name} · Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUIZ CTA */}
      <section className="px-container-margin-mobile md:px-container-margin-desktop pb-section-gap-sm md:pb-section-gap-lg">
        <div className="max-w-content mx-auto bg-primary text-on-primary rounded-xl overflow-hidden grid md:grid-cols-2">
          <div className="p-10 md:p-16 flex flex-col justify-center space-y-6">
            <p className="font-body text-label-md uppercase tracking-widest opacity-80">Ritual Finder</p>
            <h2 className="font-display text-headline-lg">Not sure where to start?</h2>
            <p className="font-body text-body-md opacity-80 max-w-md">
              Take our 60-second skin quiz and we&apos;ll build a personalised K-beauty routine matched to
              your skin type, concerns and climate.
            </p>
            <Link href="/quiz" className="self-start bg-on-primary text-primary font-body text-label-md uppercase tracking-wider px-8 py-4 rounded-full hover:opacity-90 transition-opacity">
              Start the Quiz
            </Link>
          </div>
          <div className="relative min-h-[260px]">
            <Image src="/products/cat-essences.jpg" alt="Your personalised ritual" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </section>
    </div>
  );
}
