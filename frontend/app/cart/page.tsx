"use client";

import Link from "next/link";
import Image from "next/image";
import Placeholder from "@/components/Placeholder";
import { useCart } from "@/context/cart-context";

export default function CartPage() {
  const { items, subtotal, setQty, removeItem } = useCart();
  const freeAt = 40;
  const remaining = Math.max(0, freeAt - subtotal);
  const shipPct = Math.min(100, Math.round((subtotal / freeAt) * 100));

  return (
    <div className="px-container-margin-mobile md:px-container-margin-desktop py-12 md:py-16">
      <div className="max-w-content mx-auto">
        <h1 className="font-display text-headline-lg md:text-display-lg mb-10">Your Bag</h1>

        {items.length === 0 ? (
          <div className="text-center py-24 space-y-6">
            <span className="material-symbols-outlined text-[72px] text-on-surface-variant">shopping_bag</span>
            <p className="font-body text-body-lg text-on-surface-variant">Your bag is empty.</p>
            <Link href="/shop" className="inline-block bg-primary text-on-primary font-body text-label-md uppercase tracking-wider px-8 py-4 rounded-full hover:opacity-90 transition-opacity">
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* items */}
            <div className="lg:col-span-2 space-y-6">
              {/* free shipping bar */}
              <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/40">
                <p className="font-body text-body-md mb-3">
                  {remaining > 0 ? (
                    <>You&apos;re <span className="text-primary font-semibold">${remaining.toFixed(2)}</span> away from free shipping</>
                  ) : (
                    <span className="text-primary font-semibold">You&apos;ve unlocked free shipping!</span>
                  )}
                </p>
                <div className="h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${shipPct}%` }} />
                </div>
              </div>

              {items.map((i) => (
                <div key={i.product.slug} className="flex gap-5 bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/40">
                  <div className="relative w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden">
                    {i.product.image ? (
                      <Image src={i.product.image} alt={i.product.name} fill sizes="120px" className="object-cover" />
                    ) : (
                      <Placeholder label={i.product.name} variant={i.product.placeholderVariant} icon={i.product.placeholderIcon} />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-body text-label-sm uppercase tracking-widest text-on-surface-variant">{i.product.category}</p>
                    <Link href={`/product/${i.product.slug}`} className="font-display text-headline-md hover:text-primary transition-colors">
                      {i.product.name}
                    </Link>
                    <p className="font-body text-label-sm text-on-surface-variant">{i.product.size}</p>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-outline-variant rounded-full">
                        <button
                          onClick={() => setQty(i.product.slug, i.qty - 1)}
                          className="w-9 h-9 flex items-center justify-center text-primary hover:bg-surface-container-low rounded-l-full"
                        >
                          <span className="material-symbols-outlined text-[18px]">remove</span>
                        </button>
                        <span className="w-8 text-center font-body text-body-md">{i.qty}</span>
                        <button
                          onClick={() => setQty(i.product.slug, i.qty + 1)}
                          className="w-9 h-9 flex items-center justify-center text-primary hover:bg-surface-container-low rounded-r-full"
                        >
                          <span className="material-symbols-outlined text-[18px]">add</span>
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-body text-body-lg text-primary font-semibold">
                          ${(i.product.price * i.qty).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeItem(i.product.slug)}
                          className="text-on-surface-variant hover:text-error transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <Link href="/shop" className="inline-flex items-center gap-2 font-body text-label-md uppercase tracking-wider text-primary hover:gap-3 transition-all">
                <span className="material-symbols-outlined text-[20px]">arrow_back</span> Continue shopping
              </Link>
            </div>

            {/* summary */}
            <div className="lg:col-span-1">
              <div className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/40 space-y-5 lg:sticky lg:top-24">
                <h2 className="font-display text-headline-md">Order Summary</h2>
                <div className="space-y-3 font-body text-body-md">
                  <div className="flex justify-between"><span className="text-on-surface-variant">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-on-surface-variant">Shipping</span><span className="text-primary">{remaining > 0 ? "$4.90" : "Free"}</span></div>
                  <div className="flex justify-between"><span className="text-on-surface-variant">Member discount</span><span>−$0.00</span></div>
                </div>
                <div className="border-t border-outline-variant/60 pt-4 flex justify-between items-baseline">
                  <span className="font-display text-headline-md">Total</span>
                  <span className="font-display text-headline-md text-primary">${(subtotal + (remaining > 0 ? 4.9 : 0)).toFixed(2)}</span>
                </div>
                <div className="flex gap-2">
                  <input placeholder="Promo code" className="flex-1 bg-transparent border-b border-outline focus:border-primary outline-none py-2 font-body text-body-md placeholder:text-on-surface-variant/60" />
                  <button className="font-body text-label-md uppercase tracking-wider text-primary">Apply</button>
                </div>
                <Link href="/checkout" className="block text-center bg-primary text-on-primary font-body text-label-md uppercase tracking-wider py-4 rounded-full hover:bg-primary-container transition-colors">
                  Checkout
                </Link>
                <div className="flex items-center justify-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]">lock</span>
                  <span className="font-body text-label-sm uppercase tracking-wider">Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
