"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

type Slide = {
  href: string;
  date: string;
  title: string;
  subtitle: string;
  image?: string;
  gradient: string;
  icon?: string;
  textOnLight?: boolean;
};

const slides: Slide[] = [
  {
    href: "/offers",
    date: "May 25 – May 31",
    title: "K-Beauty, Express",
    subtitle: "Summer Soothe · Up to 20% off",
    image: "/products/toner-pad-2.jpg",
    gradient: "from-primary/85 via-primary/40 to-transparent",
  },
  {
    href: "/shop",
    date: "Soothe & Repair",
    title: "The CICA Edit",
    subtitle: "Calm, hydrate & repair daily",
    image: "/products/cica-mask-3.jpg",
    gradient: "from-on-background/80 via-on-background/30 to-transparent",
  },
  {
    href: "/shop",
    date: "Top Rated",
    title: "Member Best Sellers",
    subtitle: "Loved by 12,000+ members",
    image: "/products/cat-banner-bestseller.jpg",
    gradient: "from-primary/85 via-primary/45 to-transparent",
  },
  {
    href: "/account",
    date: "New Members",
    title: "Join the Circle",
    subtitle: "Sign up & get 100 points",
    image: "/products/cat-banner-member.jpg",
    gradient: "from-primary/85 via-primary/45 to-transparent",
  },
  {
    href: "/loyalty",
    date: "May 1 – May 31",
    title: "Reward Event is On",
    subtitle: "Earn double points this month",
    image: "/products/cat-banner-rewards.jpg",
    gradient: "from-on-background/80 via-on-background/35 to-transparent",
  },
];

export default function HeroBanners() {
  const ref = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const perView = 3;
  const pages = Math.ceil(slides.length / perView);

  const go = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const next = Math.min(Math.max(page + dir, 0), pages - 1);
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    setPage(next);
  };

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    setPage(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div>
      <div
        ref={ref}
        onScroll={onScroll}
        className="flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar"
      >
        {slides.map((s, i) => (
          <Link
            key={s.title}
            href={s.href}
            className="group relative snap-start shrink-0 w-[82%] sm:w-[calc((100%-1.25rem)/2)] md:w-[calc((100%-3rem)/3)] aspect-[5/6] rounded-xl overflow-hidden"
          >
            {s.image ? (
              <Image
                src={s.image}
                alt={s.title}
                fill
                priority={i < 3}
                sizes="(max-width: 768px) 82vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} placeholder-grain`} />
            )}
            {s.image && <div className={`absolute inset-0 bg-gradient-to-t ${s.gradient}`} />}
            {s.icon && (
              <span className="material-symbols-outlined icon-fill absolute top-6 right-6 text-on-primary/30 text-[88px]">
                {s.icon}
              </span>
            )}

            <div className="absolute inset-x-0 bottom-0 p-7 md:p-8 text-on-primary space-y-2">
              <span className="inline-block bg-on-background/30 backdrop-blur-sm rounded-full px-3 py-1 font-body text-label-sm uppercase tracking-wider">
                {s.date}
              </span>
              <h2 className="font-display text-headline-lg leading-tight">{s.title}</h2>
              <div className="flex items-end justify-between gap-3">
                <p className="font-body text-body-md opacity-90">{s.subtitle}</p>
                <span className="font-body text-label-sm opacity-80 whitespace-nowrap">
                  {i + 1} | {slides.length}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* carousel control */}
      <div className="flex items-center justify-center gap-5 mt-6">
        <button
          aria-label="Previous"
          onClick={() => go(-1)}
          className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <span className="font-body text-body-md tabular-nums">
          {page + 1}/{pages}
        </span>
        <button
          aria-label="Next"
          onClick={() => go(1)}
          className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>
  );
}
