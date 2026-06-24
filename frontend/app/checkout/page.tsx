"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Placeholder from "@/components/Placeholder";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { api, type ApiOrder } from "@/lib/api";

function Field({
  label, placeholder, type = "text", half, value, onChange,
}: {
  label: string; placeholder?: string; type?: string; half?: boolean;
  value: string; onChange: (v: string) => void;
}) {
  return (
    <label className={`block ${half ? "" : "md:col-span-2"}`}>
      <span className="font-body text-label-sm uppercase tracking-wider text-on-surface-variant">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full mt-1.5 bg-transparent border-b border-outline focus:border-primary outline-none py-2.5 font-body text-body-md placeholder:text-on-surface-variant/50"
      />
    </label>
  );
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { token, user } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState(user?.name ?? "");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const [orderNumber, setOrderNumber] = useState("");

  const total = subtotal + (shippingMethod === "express" ? 6.9 : 0);

  const handlePlaceOrder = async () => {
    if (!token) { setError("Please sign in to place an order."); return; }
    if (!street || !city || !pin) { setError("Please complete your delivery address."); return; }
    setError("");
    setPlacing(true);
    try {
      const order = await api.post<ApiOrder>("/orders", {
        paymentMethod,
        shippingMethod,
        contactEmail: email,
        contactPhone: phone,
        shippingAddress: { street, city, state, pin, country: "India" },
      }, token);
      clearCart();
      setOrderNumber(order.orderNumber);
    } catch (e: any) {
      setError(e?.message ?? "Failed to place order. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  if (orderNumber) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-8 py-24 text-center">
        <span className="material-symbols-outlined icon-fill text-primary text-[72px]">check_circle</span>
        <h1 className="font-display text-headline-lg">Order Placed!</h1>
        <p className="font-body text-body-lg text-on-surface-variant max-w-md">
          Your ritual is on its way. We&apos;ll send tracking details to your email.
        </p>
        <p className="font-body text-label-md uppercase tracking-widest text-primary">Order #{orderNumber}</p>
        <Link href="/" className="bg-primary text-on-primary font-body text-label-md uppercase tracking-wider px-8 py-4 rounded-full hover:opacity-90 transition-opacity">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="px-container-margin-mobile md:px-container-margin-desktop py-12 md:py-16">
      <div className="max-w-content mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <Link href="/cart" className="text-primary"><span className="material-symbols-outlined">arrow_back</span></Link>
          <h1 className="font-display text-headline-lg md:text-display-lg">Secure Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* form */}
          <div className="lg:col-span-2 space-y-12">
            <section className="space-y-5">
              <h2 className="font-display text-headline-md">Contact</h2>
              <div className="grid md:grid-cols-2 gap-x-6 gap-y-5">
                <Field label="Email" placeholder="you@email.com" type="email" value={email} onChange={setEmail} />
                <Field label="Phone" placeholder="+91 00000 00000" half value={phone} onChange={setPhone} />
                <Field label="Full name" placeholder="Riya Desai" half value={fullName} onChange={setFullName} />
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="font-display text-headline-md">Shipping address</h2>
              <div className="grid md:grid-cols-2 gap-x-6 gap-y-5">
                <Field label="Address" placeholder="Flat / House no., Street" value={street} onChange={setStreet} />
                <Field label="City" placeholder="Mumbai" half value={city} onChange={setCity} />
                <Field label="State" placeholder="Maharashtra" half value={state} onChange={setState} />
                <Field label="PIN code" placeholder="400001" half value={pin} onChange={setPin} />
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="font-display text-headline-md">Shipping method</h2>
              <div className="space-y-3">
                {[
                  { id: "standard", name: "Standard · 3–5 days", price: "Free" },
                  { id: "express", name: "Express · 1–2 days", price: "$6.90" },
                ].map((m) => (
                  <label key={m.id} className="flex items-center gap-4 border border-outline-variant/60 rounded-xl px-5 py-4 cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-surface-container-low">
                    <input
                      type="radio" name="ship" value={m.id}
                      checked={shippingMethod === m.id} onChange={() => setShippingMethod(m.id)}
                      className="accent-primary w-4 h-4"
                    />
                    <span className="font-body text-body-md flex-1">{m.name}</span>
                    <span className="font-body text-body-md text-primary font-semibold">{m.price}</span>
                  </label>
                ))}
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="font-display text-headline-md">Payment</h2>
              <div className="space-y-3">
                {[
                  { id: "card", label: "Credit / Debit Card" },
                  { id: "upi", label: "UPI / NetBanking" },
                  { id: "cod", label: "Cash on Delivery" },
                ].map((p) => (
                  <label key={p.id} className="flex items-center gap-4 border border-outline-variant/60 rounded-xl px-5 py-4 cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-surface-container-low">
                    <input type="radio" name="pay" value={p.id} checked={paymentMethod === p.id} onChange={() => setPaymentMethod(p.id)} className="accent-primary w-4 h-4" />
                    <span className="font-body text-body-md">{p.label}</span>
                  </label>
                ))}
              </div>
              <div className="flex gap-3 pt-1 text-on-surface-variant">
                {["Visa", "Mastercard", "Maestro", "RuPay", "UPI"].map((p) => (
                  <span key={p} className="font-body text-label-sm uppercase tracking-wider border border-outline-variant/60 rounded px-2.5 py-1">{p}</span>
                ))}
              </div>
            </section>
          </div>

          {/* summary */}
          <div className="lg:col-span-1">
            <div className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/40 space-y-5 lg:sticky lg:top-24">
              <h2 className="font-display text-headline-md">In your bag</h2>
              <div className="space-y-4">
                {items.map((i) => (
                  <div key={i.product.slug} className="flex gap-4 items-center">
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                      {i.product.image ? (
                        <Image src={i.product.image} alt={i.product.name} fill sizes="64px" className="object-cover" />
                      ) : (
                        <Placeholder label={i.product.name} variant={i.product.placeholderVariant} icon={i.product.placeholderIcon} />
                      )}
                      <span className="absolute -top-1.5 -right-1.5 bg-primary text-on-primary text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">{i.qty}</span>
                    </div>
                    <span className="font-body text-body-md flex-1 leading-tight">{i.product.name}</span>
                    <span className="font-body text-body-md">${(i.product.price * i.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-outline-variant/60 pt-4 space-y-3 font-body text-body-md">
                <div className="flex justify-between"><span className="text-on-surface-variant">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Shipping</span>
                  <span className="text-primary">{shippingMethod === "express" ? "$6.90" : "Free"}</span>
                </div>
              </div>
              <div className="border-t border-outline-variant/60 pt-4 flex justify-between items-baseline">
                <span className="font-display text-headline-md">Total</span>
                <span className="font-display text-headline-md text-primary">${total.toFixed(2)}</span>
              </div>
              {error && <p className="font-body text-body-sm text-error">{error}</p>}
              <button
                onClick={handlePlaceOrder}
                disabled={placing || items.length === 0}
                className="w-full bg-primary text-on-primary font-body text-label-md uppercase tracking-wider py-4 rounded-full hover:bg-primary-container transition-colors disabled:opacity-60"
              >
                {placing ? "Placing order…" : `Pay $${total.toFixed(2)}`}
              </button>
              <div className="flex items-center justify-center gap-2 text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px]">lock</span>
                <span className="font-body text-label-sm uppercase tracking-wider">256-bit secure payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
