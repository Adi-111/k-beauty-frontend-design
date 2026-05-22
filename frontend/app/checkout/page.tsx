import Link from "next/link";
import Image from "next/image";
import Placeholder from "@/components/Placeholder";
import { getProduct } from "@/lib/products";

const lines = [
  { slug: "daily-moist-soothing-mask-cica", qty: 1 },
  { slug: "mild-peeling-toner-pad", qty: 2 },
];

function Field({ label, placeholder, type = "text", half }: { label: string; placeholder?: string; type?: string; half?: boolean }) {
  return (
    <label className={`block ${half ? "" : "md:col-span-2"}`}>
      <span className="font-body text-label-sm uppercase tracking-wider text-on-surface-variant">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full mt-1.5 bg-transparent border-b border-outline focus:border-primary outline-none py-2.5 font-body text-body-md placeholder:text-on-surface-variant/50"
      />
    </label>
  );
}

export default function CheckoutPage() {
  const items = lines.map((l) => ({ product: getProduct(l.slug)!, qty: l.qty })).filter((i) => i.product);
  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const total = subtotal;

  return (
    <div className="px-container-margin-mobile md:px-container-margin-desktop py-12 md:py-16">
      <div className="max-w-content mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <Link href="/cart" className="text-primary"><span className="material-symbols-outlined">arrow_back</span></Link>
          <h1 className="font-display text-headline-lg md:text-display-lg">Secure Checkout</h1>
        </div>

        {/* steps */}
        <div className="flex items-center gap-4 mb-12 font-body text-label-sm uppercase tracking-wider">
          {["Information", "Shipping", "Payment"].map((s, i) => (
            <div key={s} className="flex items-center gap-4">
              <span className={`flex items-center gap-2 ${i === 0 ? "text-primary" : "text-on-surface-variant"}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center ${i === 0 ? "bg-primary text-on-primary" : "border border-outline-variant"}`}>{i + 1}</span>
                {s}
              </span>
              {i < 2 && <span className="material-symbols-outlined text-on-surface-variant text-[18px]">chevron_right</span>}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* form */}
          <div className="lg:col-span-2 space-y-12">
            <section className="space-y-5">
              <h2 className="font-display text-headline-md">Contact</h2>
              <div className="grid md:grid-cols-2 gap-x-6 gap-y-5">
                <Field label="Email" placeholder="you@email.com" type="email" />
                <Field label="Phone" placeholder="+91 00000 00000" half />
                <Field label="Full name" placeholder="Riya Desai" half />
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="font-display text-headline-md">Shipping address</h2>
              <div className="grid md:grid-cols-2 gap-x-6 gap-y-5">
                <Field label="Address" placeholder="Flat / House no., Street" />
                <Field label="City" placeholder="Mumbai" half />
                <Field label="State" placeholder="Maharashtra" half />
                <Field label="PIN code" placeholder="400001" half />
                <Field label="Country" placeholder="India" half />
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="font-display text-headline-md">Shipping method</h2>
              <div className="space-y-3">
                {[
                  { name: "Standard · 3–5 days", price: "Free" },
                  { name: "Express · 1–2 days", price: "$6.90" },
                ].map((m, i) => (
                  <label key={m.name} className="flex items-center gap-4 border border-outline-variant/60 rounded-xl px-5 py-4 cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-surface-container-low">
                    <input type="radio" name="ship" defaultChecked={i === 0} className="accent-primary w-4 h-4" />
                    <span className="font-body text-body-md flex-1">{m.name}</span>
                    <span className="font-body text-body-md text-primary font-semibold">{m.price}</span>
                  </label>
                ))}
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="font-display text-headline-md">Payment</h2>
              <div className="grid md:grid-cols-2 gap-x-6 gap-y-5">
                <Field label="Card number" placeholder="0000 0000 0000 0000" />
                <Field label="Expiry" placeholder="MM / YY" half />
                <Field label="CVV" placeholder="123" half />
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
                <div className="flex justify-between"><span className="text-on-surface-variant">Shipping</span><span className="text-primary">Free</span></div>
              </div>
              <div className="border-t border-outline-variant/60 pt-4 flex justify-between items-baseline">
                <span className="font-display text-headline-md">Total</span>
                <span className="font-display text-headline-md text-primary">${total.toFixed(2)}</span>
              </div>
              <button className="w-full bg-primary text-on-primary font-body text-label-md uppercase tracking-wider py-4 rounded-full hover:bg-primary-container transition-colors">
                Pay ${total.toFixed(2)}
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
