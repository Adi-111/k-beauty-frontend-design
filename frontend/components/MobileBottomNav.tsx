"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/cart-context";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  const items = [
    { label: "Shop", href: "/shop", icon: "storefront" },
    { label: "Quiz", href: "/quiz", icon: "spa" },
    { label: "Bag", href: "/cart", icon: "shopping_bag", badge: itemCount },
    { label: "Account", href: "/account", icon: "person" },
    { label: "Loyalty", href: "/loyalty", icon: "auto_awesome" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-background rounded-t-xl shadow-[0_-4px_20px_rgba(20,66,45,0.06)] border-t border-outline-variant/20">
      {items.map((it) => {
        const active = pathname === it.href || (it.href !== "/" && pathname.startsWith(it.href));
        return (
          <Link
            key={it.href}
            href={it.href}
            className={`flex flex-col items-center justify-center transition-transform duration-200 active:scale-90 relative ${
              active ? "text-primary" : "text-secondary"
            }`}
          >
            <span className={`material-symbols-outlined ${active ? "icon-fill" : ""}`}>
              {it.icon}
            </span>
            {it.badge != null && it.badge > 0 && (
              <span className="absolute -top-0.5 right-0 bg-primary text-on-primary text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {it.badge > 9 ? "9+" : it.badge}
              </span>
            )}
            <span className="font-body text-label-sm uppercase tracking-wider mt-1">
              {it.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
