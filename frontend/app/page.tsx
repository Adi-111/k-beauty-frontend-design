import Link from "next/link";
import Image from "next/image";
import ProductRail from "@/components/ProductRail";
import HeroBanners from "@/components/HeroBanners";
import Stars from "@/components/Stars";
import { serverFetch, toProduct, type ApiProduct, type ApiReview } from "@/lib/api";
import { essenherbProducts, reviews as localReviews, withId } from "@/lib/products";

const categories = [
  { label: "Sheet Masks", href: "/shop", image: "/products/tile-masks.jpg" },
  { label: "Serums", href: "/shop", image: "/products/tile-serums.jpg" },
  { label: "Toners", href: "/shop", image: "/products/tile-toners.jpg" },
  { label: "Moisturizers", href: "/shop", image: "/products/tile-moisturizers.jpg" },
  { label: "Cleansers", href: "/shop", image: "/products/tile-cleansers.jpg" },
  { label: "Suncare", href: "/shop", image: "/products/tile-suncare.jpg" },
  { label: "Eye Care", href: "/shop", image: "/products/tile-eyecare.jpg" },
  { label: "Offers", href: "/offers", image: "/products/tile-offers.jpg" },
];

export default async function HomePage() {
  const [bestSellersRaw, trendingRaw, reviewsRaw] = await Promise.all([
    serverFetch<ApiProduct[]>('/products/best-sellers', 120),
    serverFetch<ApiProduct[]>('/products/trending', 120),
    serverFetch<{ data: ApiReview[] }>('/reviews?limit=3', 300),
  ]);

  const bestSellers = bestSellersRaw?.length
    ? bestSellersRaw.map(toProduct)
    : essenherbProducts.filter((p) => p.bestSeller).map(withId);
  const trendingNow = trendingRaw?.length
    ? trendingRaw.map(toProduct)
    : essenherbProducts.filter((p) => p.trending).map(withId);
  const reviews = reviewsRaw?.data?.length
    ? reviewsRaw.data
    : localReviews.slice(0, 3).map((r, i) => ({
        id: i + 1,
        authorName: r.name,
        rating: r.rating,
        title: r.title,
        body: r.body,
        isVerified: r.verified,
      }));

  return (
    <div>
      {/* HERO BANNERS */}
      <section className="px-container-margin-mobile md:px-container-margin-desktop pt-8 pb-10">
        <div className="max-w-content mx-auto">
          <HeroBanners />
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="px-container-margin-mobile md:px-container-margin-desktop pb-12">
        <div className="max-w-content mx-auto">
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-display text-headline-md">Shop by Category</h2>
            <Link href="/shop" className="font-body text-label-md uppercase tracking-wider text-primary hover:underline">
              All products
            </Link>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4">
            {categories.map((c) => (
              <Link key={c.label} href={c.href} className="group flex flex-col items-center gap-2.5">
                <div className="w-full aspect-square rounded-xl overflow-hidden relative">
                  <Image
                    src={c.image}
                    alt={c.label}
                    fill
                    sizes="(max-width: 768px) 25vw, 12vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="font-body text-label-sm text-center leading-tight text-on-surface-variant group-hover:text-primary transition-colors">
                  {c.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BEST SELLERS RAIL */}
      <ProductRail title="Best Sellers" subtitle="Member Favourites" products={bestSellers} tone="muted" />

      {/* STATS BENTO */}
      <section className="bg-surface-container-lowest px-container-margin-mobile md:px-container-margin-desktop py-section-gap-sm md:py-section-gap-lg">
        <div className="max-w-content mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 space-y-6">
            <p className="font-body text-label-md uppercase tracking-widest text-primary">Trusted Worldwide</p>
            <h2 className="font-display text-headline-lg text-primary">Proven by people,<br />refined by nature.</h2>
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

      {/* TRENDING RAIL */}
      <ProductRail title="Trending Now" subtitle="Going Fast" products={trendingNow} />

      {/* REVIEWS */}
      <section className="px-container-margin-mobile md:px-container-margin-desktop py-section-gap-sm">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-12 space-y-3">
            <p className="font-body text-label-md uppercase tracking-widest text-primary">Real Reviews</p>
            <h2 className="font-display text-headline-lg">Loved by our Circle</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.id} className="bg-surface-container-low rounded-xl p-8 space-y-4 border border-outline-variant/40">
                <Stars rating={r.rating} />
                <h4 className="font-display text-headline-md">{r.title}</h4>
                <p className="font-body text-body-md text-on-surface-variant">&ldquo;{r.body}&rdquo;</p>
                <div className="flex items-center gap-2 pt-2 border-t border-outline-variant/40">
                  <span className="material-symbols-outlined icon-fill text-primary text-[18px]">verified</span>
                  <span className="font-body text-label-sm uppercase tracking-wider">{r.authorName} · Verified</span>
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
            <Image src="/products/hero-quiz.jpg" alt="Your personalised ritual" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </section>
    </div>
  );
}
