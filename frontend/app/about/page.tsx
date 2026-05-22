import Link from "next/link";
import Image from "next/image";
import Placeholder from "@/components/Placeholder";

const values = [
  { icon: "verified", title: "Safe & Smart Ingredients", desc: "Dermatological science, formulated to suit diverse skin, climate and lifestyle." },
  { icon: "spa", title: "Good Results for All", desc: "From teenagers with breakouts to adults with dry or aging skin — something for everyone." },
  { icon: "favorite", title: "Easy, Comfortable Daily Use", desc: "Hygienic, generous and effortless rituals designed for real, visible results." },
];

const certs = ["ISO 9001:2008", "ISO 14001:2004", "GMP Mask Production", "Vegan LOHAS", "Venture Certified", "Patent Registered"];

const regions = [
  { region: "Asia", countries: "China · Singapore · Cambodia · Thailand · Myanmar · Philippines · Japan · Malaysia · Vietnam · Qatar · Turkey · Iraq · Kazakhstan · Lebanon · Hong Kong" },
  { region: "Europe", countries: "Czech · Russia · Spain · United Kingdom · France · Switzerland · Belarus" },
  { region: "Americas", countries: "USA · Canada · Mexico · Brazil · Chile · Bolivia · Uruguay" },
  { region: "Africa & Oceania", countries: "Morocco · South Africa · Australia · + Middle East" },
];

export default function AboutPage() {
  return (
    <div>
      {/* HERO */}
      <section className="grid md:grid-cols-2 items-stretch">
        <div className="flex flex-col justify-center px-container-margin-mobile md:px-container-margin-desktop py-16 md:py-24 space-y-6 order-2 md:order-1">
          <p className="font-body text-label-md uppercase tracking-[0.25em] text-primary">Our Story</p>
          <h1 className="font-display text-headline-lg-mobile md:text-display-xl leading-[1.05]">
            Premium personal care, <span className="italic text-primary">far beyond</span> a product.
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-md">
            O&apos;Circle Beauty — powered by Wol Goo — exists to bring verified, mild-yet-effective
            Korean skincare to the world through honest partnerships and tailored curation.
          </p>
        </div>
        <div className="relative min-h-[40vh] md:min-h-full order-1 md:order-2">
          <Image src="/products/toner-pad-2.jpg" alt="O'Circle Beauty story" fill sizes="50vw" className="object-cover" />
        </div>
      </section>

      {/* STORY */}
      <section className="px-container-margin-mobile md:px-container-margin-desktop py-section-gap-sm md:py-section-gap-lg">
        <div className="max-w-3xl mx-auto space-y-8 text-center">
          <h2 className="font-display text-headline-lg text-primary">Why we started</h2>
          <p className="font-body text-body-lg text-on-surface-variant">
            We saw how global fans of K-beauty still struggle to access real Korean products — facing
            limited supply, high markups and complicated imports. Everyone deserves quality products
            that are worth their money, especially when buying for the people they love.
          </p>
          <p className="font-body text-body-lg text-on-surface-variant">
            So we decided to act. We don&apos;t just sell — we research local needs, optimise product
            choices, and ensure fair pricing and verified quality. What we offer is more than a
            product. It&apos;s authenticity, trust, and a better everyday choice.
          </p>
          <p className="font-display italic text-headline-md text-primary pt-4">
            Buy Far Beyond — a decision toward better living.
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-surface-container-lowest px-container-margin-mobile md:px-container-margin-desktop py-section-gap-sm md:py-section-gap-lg">
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-surface-container-low rounded-xl p-8 space-y-4 border border-outline-variant/40">
                <div className="w-16 h-16 rounded-full bg-primary-container/10 flex items-center justify-center">
                  <span className="material-symbols-outlined icon-fill text-primary text-[32px]">{v.icon}</span>
                </div>
                <h3 className="font-display text-headline-md">{v.title}</h3>
                <p className="font-body text-body-md text-on-surface-variant">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MJ CARE BANNER */}
      <section className="px-container-margin-mobile md:px-container-margin-desktop py-section-gap-sm md:py-section-gap-lg">
        <div className="max-w-content mx-auto bg-primary text-on-primary rounded-xl p-10 md:p-16 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <p className="font-body text-label-md uppercase tracking-widest opacity-80">MJ Care</p>
            <h2 className="font-display text-headline-lg">Skincare you can trust, every day.</h2>
            <p className="font-body text-body-md opacity-85">
              For nine years running, MJ Care was the No.1 online face mask brand in Japan. Today it&apos;s
              sold in 32 countries — proof that people everywhere love and trust it for honest, gentle,
              effective care.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-on-primary/10 rounded-xl p-8 text-center">
              <span className="font-display text-[3rem] leading-none block">9</span>
              <p className="font-body text-label-sm uppercase tracking-wider mt-2">Years No.1 in Japan</p>
            </div>
            <div className="bg-on-primary/10 rounded-xl p-8 text-center">
              <span className="font-display text-[3rem] leading-none block">32</span>
              <p className="font-body text-label-sm uppercase tracking-wider mt-2">Countries Worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="bg-surface-container-low px-container-margin-mobile md:px-container-margin-desktop py-section-gap-sm md:py-section-gap-lg">
        <div className="max-w-content mx-auto text-center space-y-10">
          <div className="space-y-3">
            <h2 className="font-display text-headline-lg">Certified & Patented</h2>
            <p className="font-body text-body-md text-on-surface-variant max-w-xl mx-auto">
              Made in Korea with strict quality control and clinically tested for safety and efficacy.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {certs.map((c) => (
              <span key={c} className="bg-surface-container-lowest border border-outline-variant/60 rounded-full px-6 py-3 font-body text-label-md uppercase tracking-wider text-primary">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* EXPORT MAP */}
      <section className="px-container-margin-mobile md:px-container-margin-desktop py-section-gap-sm md:py-section-gap-lg">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-14 space-y-3">
            <p className="font-body text-label-md uppercase tracking-widest text-primary">Global Reach</p>
            <h2 className="font-display text-headline-lg">Trusted across continents</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {regions.map((r) => (
              <div key={r.region} className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/40">
                <h3 className="font-display text-headline-md text-primary mb-3">{r.region}</h3>
                <p className="font-body text-body-md text-on-surface-variant">{r.countries}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="bg-primary text-on-primary px-container-margin-mobile md:px-container-margin-desktop py-section-gap-sm md:py-section-gap-lg">
        <div className="max-w-content mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <p className="font-display italic text-headline-md opacity-90">Our slogan</p>
            <h2 className="font-display text-display-lg">Buy Far Beyond</h2>
            <p className="font-body text-body-md opacity-80 max-w-md">
              A smart choice that gives you more than just beauty — it lifts your standards, your skin,
              and your confidence.
            </p>
          </div>
          <div className="space-y-5 font-body">
            {[
              { label: "Company", value: "Wol Goo Company" },
              { label: "Address", value: "Daeheung-ro 6gil 4-6, Mapo-gu, Seoul, Korea" },
              { label: "Tel", value: "+82 10 7113 6128" },
              { label: "Email", value: "wolgoo.cp@gmail.com" },
            ].map((c) => (
              <div key={c.label} className="border-b border-on-primary/20 pb-4">
                <p className="text-label-sm uppercase tracking-widest opacity-70 mb-1">{c.label}</p>
                <p className="text-body-lg">{c.value}</p>
              </div>
            ))}
            <Link href="/shop" className="inline-block bg-on-primary text-primary font-body text-label-md uppercase tracking-wider px-8 py-4 rounded-full hover:opacity-90 transition-opacity">
              Explore the Range
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
