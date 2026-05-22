import Link from "next/link";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "Toner Pads", href: "/shop" },
      { label: "Sheet Masks", href: "/shop" },
      { label: "Offers", href: "/offers" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Sustainability", href: "/about" },
      { label: "Certifications", href: "/about" },
      { label: "Skin Quiz", href: "/quiz" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Shipping Policy", href: "/faq" },
      { label: "Returns", href: "/faq" },
      { label: "Contact Us", href: "/faq" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-on-primary pt-section-gap-sm pb-12 px-container-margin-mobile md:px-container-margin-desktop mb-16 md:mb-0">
      <div className="max-w-content mx-auto grid grid-cols-2 md:grid-cols-6 gap-10">
        <div className="col-span-2 md:col-span-3 space-y-6">
          <span className="font-display text-headline-lg tracking-tight">O&apos;Circle Beauty</span>
          <p className="font-body text-body-md opacity-80 max-w-sm">
            Buy Far Beyond. Consciously crafted Korean skincare — clinically proven, vegan-certified,
            and made in Korea with strict quality control.
          </p>
          <div className="flex gap-3 pt-2">
            {["Verified Authentic", "Vegan LOHAS", "ISO Certified"].map((b) => (
              <span
                key={b}
                className="font-body text-label-sm uppercase tracking-wider border border-on-primary/30 rounded-full px-3 py-1"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title} className="space-y-4">
            <h5 className="font-body text-label-md uppercase tracking-widest border-b border-on-primary/20 pb-2">
              {col.title}
            </h5>
            <ul className="space-y-2.5 opacity-75">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="font-body text-body-md hover:opacity-100 transition-opacity">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-content mx-auto mt-16">
        <div className="grid md:grid-cols-2 gap-8 items-center border-t border-on-primary/15 pt-10">
          <div className="space-y-3">
            <h5 className="font-display text-headline-md">Join the Circle</h5>
            <p className="font-body text-body-md opacity-75 max-w-md">
              Subscribe for early access to rituals, restocks and member-only offers.
            </p>
          </div>
          <div className="flex gap-3 items-end">
            <input
              type="email"
              placeholder="Email address"
              className="bg-transparent border-b border-on-primary/40 focus:border-on-primary outline-none py-2 text-body-md w-full placeholder:text-on-primary/50"
            />
            <button
              type="button"
              className="font-body text-label-md uppercase tracking-wider bg-on-primary text-primary px-6 py-3 rounded-full hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-content mx-auto border-t border-on-primary/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 opacity-60 font-body text-label-sm uppercase tracking-wider">
        <span>© {new Date().getFullYear()} O&apos;Circle Beauty · Powered by Wol Goo · Buy Far Beyond</span>
        <div className="flex gap-6">
          <Link href="/faq">Privacy</Link>
          <Link href="/faq">Terms</Link>
          <Link href="/faq">Shipping</Link>
        </div>
      </div>
    </footer>
  );
}
