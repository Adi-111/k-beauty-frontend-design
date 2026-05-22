"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Offers", href: "/offers" },
  { label: "Skin Quiz", href: "/quiz" },
  { label: "Our Story", href: "/about" },
  { label: "Loyalty", href: "/loyalty" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 h-16 flex justify-between items-center px-container-margin-mobile md:px-container-margin-desktop ${
          scrolled ? "scrolled-header" : "bg-background"
        }`}
        id="main-header"
      >
        <div className="flex items-center gap-6 flex-1">
          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="md:hidden hover:opacity-70 transition-opacity text-primary"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-body text-label-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <Link
          href="/"
          className="font-display text-headline-md tracking-tight text-primary text-center whitespace-nowrap"
        >
          O&apos;Circle
        </Link>

        <div className="flex items-center gap-4 flex-1 justify-end">
          <button aria-label="Search" className="hover:opacity-70 transition-opacity text-primary">
            <span className="material-symbols-outlined">search</span>
          </button>
          <Link
            href="/account"
            aria-label="Account"
            className="hidden md:inline hover:opacity-70 transition-opacity text-primary"
          >
            <span className="material-symbols-outlined">person</span>
          </Link>
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative hover:opacity-70 transition-opacity text-primary"
          >
            <span className="material-symbols-outlined">shopping_bag</span>
            <span className="absolute -top-1.5 -right-1.5 bg-primary text-on-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              2
            </span>
          </Link>
        </div>
      </header>

      {/* Mobile slide-over menu */}
      <div
        className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-on-background/40"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute left-0 top-0 h-full w-[80%] max-w-xs bg-background p-container-margin-mobile flex flex-col transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-12">
            <span className="font-display text-headline-md text-primary">O&apos;Circle</span>
            <button aria-label="Close menu" onClick={() => setMenuOpen(false)} className="text-primary">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <nav className="flex flex-col gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-headline-md text-on-background hover:text-primary transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/account"
              onClick={() => setMenuOpen(false)}
              className="font-display text-headline-md text-on-background hover:text-primary transition-colors"
            >
              Account
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
