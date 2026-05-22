import Link from "next/link";

const groups = [
  {
    title: "Orders & Shipping",
    items: [
      { q: "How long does delivery take?", a: "Standard delivery is 3–5 business days; express is 1–2. Orders are dispatched from our Korea-verified fulfilment partners." },
      { q: "Is shipping free?", a: "Yes — shipping is complimentary on all orders over $40. Below that, a flat $4.90 applies." },
      { q: "Do you ship internationally?", a: "MJ Care products are trusted in 32 countries. O'Circle currently ships across India and select international regions." },
    ],
  },
  {
    title: "Products & Authenticity",
    items: [
      { q: "Are your products authentic?", a: "Always. Every product is sourced through honest partnerships, made in Korea with strict quality control, and clinically tested for safety and efficacy." },
      { q: "Are the products vegan?", a: "Our hero MJ Care toner pads and CICA masks are Certified Vegan LOHAS — safe, cruelty-free and trustworthy." },
      { q: "Are they suitable for sensitive skin?", a: "Yes. Our formulas are mild-yet-effective and developed for sensitive skin, including the CICA soothing range." },
    ],
  },
  {
    title: "Returns & Refunds",
    items: [
      { q: "What is your return policy?", a: "Unopened products may be returned within 14 days of delivery for a full refund. For hygiene reasons, opened skincare cannot be returned unless faulty." },
      { q: "How do I start a return?", a: "Contact us at wolgoo.cp@gmail.com with your order number and we'll guide you through the process." },
      { q: "When will I get my refund?", a: "Refunds are processed within 5–7 business days of receiving the returned item." },
    ],
  },
  {
    title: "Loyalty & Account",
    items: [
      { q: "How does the Loyalty Circle work?", a: "Earn 1 point per $1 spent, plus bonus points for reviews, referrals and birthdays. Redeem points for discounts and exclusive gifts." },
      { q: "How do I track my points?", a: "Your balance, tier and rewards are all visible in your Loyalty dashboard once you're signed in." },
    ],
  },
];

export default function FaqPage() {
  return (
    <div>
      <section className="bg-surface-container-low px-container-margin-mobile md:px-container-margin-desktop py-16">
        <div className="max-w-content mx-auto space-y-4">
          <p className="font-body text-label-md uppercase tracking-widest text-primary">Support</p>
          <h1 className="font-display text-headline-lg md:text-display-lg">Help & FAQ</h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-xl">
            Everything you need to know about orders, products, returns and your Loyalty Circle.
          </p>
        </div>
      </section>

      <section className="px-container-margin-mobile md:px-container-margin-desktop py-section-gap-sm md:py-section-gap-lg">
        <div className="max-w-3xl mx-auto space-y-14">
          {groups.map((g) => (
            <div key={g.title} className="space-y-4">
              <h2 className="font-display text-headline-md text-primary">{g.title}</h2>
              <div className="divide-y divide-outline-variant/60 border-y border-outline-variant/60">
                {g.items.map((it) => (
                  <details key={it.q} className="group py-5">
                    <summary className="flex justify-between items-center cursor-pointer list-none">
                      <span className="font-body text-body-lg pr-6">{it.q}</span>
                      <span className="material-symbols-outlined group-open:rotate-180 transition-transform text-primary">expand_more</span>
                    </summary>
                    <p className="pt-4 font-body text-body-md text-on-surface-variant leading-relaxed">{it.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-primary text-on-primary rounded-xl p-10 text-center space-y-4">
            <h3 className="font-display text-headline-lg">Still have a question?</h3>
            <p className="font-body text-body-md opacity-85">Our team is here to help — reach out any time.</p>
            <a href="mailto:wolgoo.cp@gmail.com" className="inline-block bg-on-primary text-primary font-body text-label-md uppercase tracking-wider px-8 py-4 rounded-full hover:opacity-90 transition-opacity">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
