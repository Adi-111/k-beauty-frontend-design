import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import Placeholder from "@/components/Placeholder";
import Stars from "@/components/Stars";
import { products, reviews } from "@/lib/products";

const trust = [
  { icon: "verified", label: "100% Authentic" },
  { icon: "eco", label: "Vegan LOHAS Certified" },
  { icon: "workspace_premium", label: "Made in Korea" },
  { icon: "local_shipping", label: "Free Shipping $40+" },
];

const ingredients = [
  {
    icon: "science",
    name: "AHA · BHA · PHA",
    desc: "Triple-acid blends that gently resurface for smooth, refined skin.",
  },
  {
    icon: "eco",
    name: "Centella (CICA)",
    desc: "The hero soother for sensitive, reactive and redness-prone skin.",
  },
  {
    icon: "water_drop",
    name: "Hyaluronic Acid",
    desc: "Multi-weight hydration that plumps from the surface down.",
  },
  {
    icon: "grass",
    name: "Beta-Glucan",
    desc: "Oat-derived calm and lasting moisture retention.",
  },
];

const stats = [
  { value: "9 yrs", label: "No.1 online face mask brand in Japan", variant: "bg-primary text-on-primary" },
  { value: "32", label: "Countries trust MJ Care worldwide", variant: "bg-secondary-container text-on-secondary-container" },
  { value: "98%", label: "Reported immediate soothing & hydration", variant: "bg-tertiary-fixed text-on-tertiary-fixed" },
  { value: "100%", label: "Would recommend to a friend", variant: "bg-primary-container text-on-primary-container" },
];

export default function HomePage() {
  const featured = products.filter((p) => p.bestSeller);
  const grid = products.slice(0, 8);

  return (
    <div>
      {/* HERO */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-64px)] items-stretch">
        <div className="flex flex-col justify-center px-container-margin-mobile md:px-container-margin-desktop py-16 md:py-0 order-2 md:order-1 space-y-8">
          <p className="font-body text-label-md uppercase tracking-[0.25em] text-primary">
            Authentic K-Beauty · Buy Far Beyond
          </p>
          <h1 className="font-display text-headline-lg-mobile md:text-display-xl leading-[1.05] text-on-background">
            Skincare you can <span className="italic text-primary">trust</span>, every single day.
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-md">
            Clinically-proven, vegan-certified Korean rituals — crafted in Korea with strict quality
            control and designed for real, visible results.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="bg-primary text-on-primary font-body text-label-md uppercase tracking-wider px-8 py-4 rounded-full hover:bg-primary-container transition-colors active:scale-[0.98]"
            >
              Shop the Ritual
            </Link>
            <Link
              href="/quiz"
              className="border border-outline text-on-background font-body text-label-md uppercase tracking-wider px-8 py-4 rounded-full hover:border-primary hover:text-primary transition-colors"
            >
              Find Your Routine
            </Link>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Stars rating={5} size={18} />
            <span className="font-body text-body-md text-on-surface-variant">
              4.9 · Loved by 12,000+ members
            </span>
          </div>
        </div>

        <div className="relative bg-surface-container-low order-1 md:order-2 min-h-[50vh] md:min-h-full">
          <Image
            src="/products/cica-mask-2.jpg"
            alt="O'Circle Beauty hero — Daily Moist Soothing Mask CICA"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur rounded-xl px-5 py-4 max-w-[220px]">
            <p className="font-body text-label-sm uppercase tracking-wider text-primary mb-1">
              Best Seller
            </p>
            <p className="font-display text-headline-md leading-tight">Daily Moist Soothing Mask</p>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-primary text-on-primary">
        <div className="max-w-content mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-on-primary/10">
          {trust.map((t) => (
            <div key={t.label} className="flex items-center justify-center gap-3 px-4 py-6 text-center">
              <span className="material-symbols-outlined">{t.icon}</span>
              <span className="font-body text-label-md uppercase tracking-wider">{t.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED COLLECTIONS */}
      <section className="px-container-margin-mobile md:px-container-margin-desktop py-section-gap-sm md:py-section-gap-lg">
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/shop" className="group relative aspect-[16/10] rounded-xl overflow-hidden">
              <Image src="/products/toner-pad-2.jpg" alt="Toner Pads" fill sizes="50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
              <div className="absolute bottom-8 left-8 text-on-primary">
                <p className="font-body text-label-md uppercase tracking-widest opacity-90">Daily Exfoliation</p>
                <h3 className="font-display text-headline-lg">Toner Pads</h3>
              </div>
            </Link>
            <Link href="/shop" className="group relative aspect-[16/10] rounded-xl overflow-hidden">
              <Image src="/products/cica-mask-3.jpg" alt="Sheet Masks" fill sizes="50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
              <div className="absolute bottom-8 left-8 text-on-primary">
                <p className="font-body text-label-md uppercase tracking-widest opacity-90">Soothe & Repair</p>
                <h3 className="font-display text-headline-lg">CICA Sheet Masks</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="px-container-margin-mobile md:px-container-margin-desktop pb-section-gap-sm md:pb-section-gap-lg">
        <div className="max-w-content mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div className="space-y-3">
              <p className="font-body text-label-md uppercase tracking-widest text-primary">Member Favourites</p>
              <h2 className="font-display text-headline-lg">Best Sellers</h2>
            </div>
            <Link href="/shop" className="hidden md:flex items-center gap-2 font-body text-label-md uppercase tracking-wider text-primary hover:gap-3 transition-all">
              View all <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {grid.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* INGREDIENT PHILOSOPHY */}
      <section className="bg-surface-container-lowest px-container-margin-mobile md:px-container-margin-desktop py-section-gap-sm md:py-section-gap-lg">
        <div className="max-w-content mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="font-display text-headline-lg">Rooted in Dermatological Science</h2>
            <p className="font-body text-body-md text-on-surface-variant">
              Every formula pairs traditional Korean botanicals with modern clinical precision —
              gentle yet effective, even on the most sensitive skin.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {ingredients.map((ing) => (
              <div key={ing.name} className="bg-surface-container-low rounded-xl p-8 space-y-4 border border-outline-variant/40 hover:bg-surface-container-high transition-colors">
                <div className="w-16 h-16 rounded-full bg-primary-container/10 flex items-center justify-center">
                  <span className="material-symbols-outlined icon-fill text-primary text-[32px]">{ing.icon}</span>
                </div>
                <h3 className="font-display text-headline-md">{ing.name}</h3>
                <p className="font-body text-body-md text-on-surface-variant">{ing.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLINICAL STATS BENTO */}
      <section className="px-container-margin-mobile md:px-container-margin-desktop py-section-gap-sm md:py-section-gap-lg">
        <div className="max-w-content mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 space-y-6">
            <p className="font-body text-label-md uppercase tracking-widest text-primary">Trusted Worldwide</p>
            <h2 className="font-display text-headline-lg text-primary">Proven by people, refined by nature.</h2>
            <p className="font-body text-body-md text-on-surface-variant">
              MJ Care has been the No.1 online face mask brand in Japan for nine years running and is
              now trusted across 32 countries — from teenagers with breakouts to adults seeking calm,
              resilient skin.
            </p>
            <Link href="/about" className="inline-flex items-center gap-2 font-body text-label-md uppercase tracking-wider text-primary hover:gap-3 transition-all">
              Read our story <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </Link>
          </div>
          <div className="md:col-span-7 grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.label} className={`${s.variant} p-8 rounded-xl flex flex-col justify-between aspect-square`}>
                <span className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-none">{s.value}</span>
                <p className="font-body text-label-md uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-surface-container-low px-container-margin-mobile md:px-container-margin-desktop py-section-gap-sm md:py-section-gap-lg">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-14 space-y-3">
            <p className="font-body text-label-md uppercase tracking-widest text-primary">Real Reviews</p>
            <h2 className="font-display text-headline-lg">Loved by our Circle</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((r) => (
              <div key={r.name} className="bg-surface-container-lowest rounded-xl p-8 space-y-4 border border-outline-variant/40">
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
      <section className="px-container-margin-mobile md:px-container-margin-desktop py-section-gap-sm md:py-section-gap-lg">
        <div className="max-w-content mx-auto bg-primary text-on-primary rounded-xl overflow-hidden grid md:grid-cols-2">
          <div className="p-10 md:p-16 flex flex-col justify-center space-y-6">
            <p className="font-body text-label-md uppercase tracking-widest opacity-80">Ritual Finder</p>
            <h2 className="font-display text-headline-lg">Not sure where to start?</h2>
            <p className="font-body text-body-md opacity-80 max-w-md">
              Take our 60-second skin quiz and we&apos;ll build a personalised K-beauty routine matched
              to your skin type, concerns and climate.
            </p>
            <Link href="/quiz" className="self-start bg-on-primary text-primary font-body text-label-md uppercase tracking-wider px-8 py-4 rounded-full hover:opacity-90 transition-opacity">
              Start the Quiz
            </Link>
          </div>
          <div className="relative min-h-[260px]">
            <Placeholder label="Your Ritual Awaits" sub="Personalised in 60s" variant="green" icon="spa" />
          </div>
        </div>
      </section>
    </div>
  );
}
