import Link from "next/link";

const tiers = [
  { name: "Glow", range: "0–499 pts", perks: "Free shipping on $40+, birthday gift" },
  { name: "Radiance", range: "500–1499 pts", perks: "Early access, double-point days", active: true },
  { name: "Luminous", range: "1500+ pts", perks: "Free gifts, VIP concierge, exclusive sets" },
];

const ways = [
  { icon: "shopping_bag", title: "Make a purchase", pts: "1 pt / $1" },
  { icon: "reviews", title: "Write a review", pts: "+50 pts" },
  { icon: "group_add", title: "Refer a friend", pts: "+200 pts" },
  { icon: "cake", title: "Birthday bonus", pts: "+150 pts" },
];

const history = [
  { label: "Order #OC-20481", date: "May 12, 2026", pts: "+128" },
  { label: "Review · CICA Mask", date: "May 02, 2026", pts: "+50" },
  { label: "Referral · Aarav M.", date: "Apr 28, 2026", pts: "+200" },
  { label: "Redeemed · $15 off", date: "Apr 10, 2026", pts: "−750" },
];

export default function LoyaltyPage() {
  const points = 980;
  const nextTier = 1500;
  const pct = Math.round((points / nextTier) * 100);

  return (
    <div className="px-container-margin-mobile md:px-container-margin-desktop py-12 md:py-16">
      <div className="max-w-content mx-auto space-y-10">
        {/* header card */}
        <div className="bg-primary text-on-primary rounded-xl p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-3">
            <p className="font-body text-label-md uppercase tracking-widest opacity-80">Your Loyalty Circle</p>
            <h1 className="font-display text-display-lg">Welcome back, Riya</h1>
            <p className="font-body text-body-md opacity-80">Radiance Member · Joined Jan 2026</p>
          </div>
          <div className="bg-on-primary/10 rounded-xl p-8">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="font-display text-[3.5rem] leading-none">{points}</span>
              <span className="font-body text-label-md uppercase tracking-wider opacity-80">points</span>
            </div>
            <div className="h-2 bg-on-primary/20 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-on-primary rounded-full" style={{ width: `${pct}%` }} />
            </div>
            <p className="font-body text-label-sm uppercase tracking-wider opacity-80">
              {nextTier - points} pts to Luminous tier
            </p>
          </div>
        </div>

        {/* tiers */}
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`rounded-xl p-8 space-y-3 border ${
                t.active
                  ? "bg-surface-container-high border-primary"
                  : "bg-surface-container-low border-outline-variant/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-headline-md">{t.name}</h3>
                {t.active && (
                  <span className="font-body text-label-sm uppercase tracking-wider bg-primary text-on-primary px-3 py-1 rounded-full">
                    Current
                  </span>
                )}
              </div>
              <p className="font-body text-label-sm uppercase tracking-wider text-primary">{t.range}</p>
              <p className="font-body text-body-md text-on-surface-variant">{t.perks}</p>
            </div>
          ))}
        </div>

        {/* earn + history */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/40">
            <h3 className="font-display text-headline-md mb-6">Ways to earn</h3>
            <div className="space-y-4">
              {ways.map((w) => (
                <div key={w.title} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined icon-fill text-primary">{w.icon}</span>
                  </div>
                  <span className="font-body text-body-md flex-1">{w.title}</span>
                  <span className="font-body text-label-md uppercase tracking-wider text-primary">{w.pts}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/40">
            <h3 className="font-display text-headline-md mb-6">Recent activity</h3>
            <div className="divide-y divide-outline-variant/40">
              {history.map((h) => (
                <div key={h.label} className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-body text-body-md">{h.label}</p>
                    <p className="font-body text-label-sm uppercase tracking-wider text-on-surface-variant">{h.date}</p>
                  </div>
                  <span className={`font-body text-body-md font-semibold ${h.pts.startsWith("−") ? "text-secondary" : "text-primary"}`}>
                    {h.pts}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-secondary-container text-on-secondary-container rounded-xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-display text-headline-md text-primary">Redeem 750 pts for $15 off</h3>
            <p className="font-body text-body-md">Apply your reward at checkout on any order.</p>
          </div>
          <Link href="/shop" className="bg-primary text-on-primary font-body text-label-md uppercase tracking-wider px-8 py-4 rounded-full hover:bg-primary-container transition-colors whitespace-nowrap">
            Redeem Reward
          </Link>
        </div>
      </div>
    </div>
  );
}
