"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api, type ApiLoyalty, type ApiLoyaltyTransaction } from "@/lib/api";
import { useAuth } from "@/context/auth-context";

const TIERS = [
  { name: "Glow", min: 0, max: 499, range: "0–499 pts", perks: "Free shipping on $40+, birthday gift" },
  { name: "Radiance", min: 500, max: 1499, range: "500–1499 pts", perks: "Early access, double-point days" },
  { name: "Luminance", min: 1500, max: null, range: "1500+ pts", perks: "Free gifts, VIP concierge, exclusive sets" },
];

const WAYS = [
  { icon: "shopping_bag", title: "Make a purchase", pts: "1 pt / $1" },
  { icon: "reviews", title: "Write a review", pts: "+50 pts" },
  { icon: "group_add", title: "Refer a friend", pts: "+200 pts" },
  { icon: "cake", title: "Birthday bonus", pts: "+150 pts" },
];

export default function LoyaltyPage() {
  const { token, user } = useAuth();
  const [loyalty, setLoyalty] = useState<ApiLoyalty | null>(null);
  const [transactions, setTransactions] = useState<ApiLoyaltyTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) { setLoading(false); return; }
    Promise.all([
      api.get<ApiLoyalty>("/loyalty", token),
      api.get<ApiLoyaltyTransaction[]>("/loyalty/transactions", token),
    ]).then(([l, t]) => {
      if (l) setLoyalty(l);
      setTransactions(t ?? []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [token]);

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-8 py-24 text-center">
        <span className="material-symbols-outlined icon-fill text-primary text-[72px]">diamond</span>
        <h1 className="font-display text-headline-lg">O&apos;Circle Loyalty</h1>
        <p className="font-body text-body-lg text-on-surface-variant max-w-md">
          Sign in to view your points, tier status, and earn rewards on every order.
        </p>
        <Link href="/account" className="bg-primary text-on-primary font-body text-label-md uppercase tracking-wider px-8 py-4 rounded-full hover:opacity-90 transition-opacity">
          Sign In
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const points = loyalty?.points ?? 0;
  const tierName = loyalty?.tier ?? "Glow";
  const currentTierData = TIERS.find(t => t.name === tierName) ?? TIERS[0];
  const nextTierData = TIERS[TIERS.findIndex(t => t.name === tierName) + 1] ?? null;
  const pct = nextTierData
    ? Math.round(((points - currentTierData.min) / (nextTierData.min - currentTierData.min)) * 100)
    : 100;

  return (
    <div className="px-container-margin-mobile md:px-container-margin-desktop py-12 md:py-16">
      <div className="max-w-content mx-auto space-y-10">
        {/* header card */}
        <div className="bg-primary text-on-primary rounded-xl p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-3">
            <p className="font-body text-label-md uppercase tracking-widest opacity-80">Your Loyalty Circle</p>
            <h1 className="font-display text-display-lg">Welcome back, {user?.name?.split(" ")[0]}</h1>
            <p className="font-body text-body-md opacity-80">{tierName} Member</p>
          </div>
          <div className="bg-on-primary/10 rounded-xl p-8">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="font-display text-[3.5rem] leading-none">{points.toLocaleString()}</span>
              <span className="font-body text-label-md uppercase tracking-wider opacity-80">points</span>
            </div>
            {nextTierData ? (
              <>
                <div className="h-2 bg-on-primary/20 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-on-primary rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <p className="font-body text-label-sm uppercase tracking-wider opacity-80">
                  {nextTierData.min - points} pts to {nextTierData.name} tier
                </p>
              </>
            ) : (
              <p className="font-body text-label-sm uppercase tracking-wider opacity-80">You&apos;ve reached the top tier!</p>
            )}
          </div>
        </div>

        {/* tiers */}
        <div className="grid md:grid-cols-3 gap-6">
          {TIERS.map((t) => {
            const active = t.name === tierName;
            return (
              <div
                key={t.name}
                className={`rounded-xl p-8 space-y-3 border ${
                  active ? "bg-surface-container-high border-primary" : "bg-surface-container-low border-outline-variant/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-headline-md">{t.name}</h3>
                  {active && (
                    <span className="font-body text-label-sm uppercase tracking-wider bg-primary text-on-primary px-3 py-1 rounded-full">
                      Current
                    </span>
                  )}
                </div>
                <p className="font-body text-label-sm uppercase tracking-wider text-primary">{t.range}</p>
                <p className="font-body text-body-md text-on-surface-variant">{t.perks}</p>
              </div>
            );
          })}
        </div>

        {/* earn + history */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/40">
            <h3 className="font-display text-headline-md mb-6">Ways to earn</h3>
            <div className="space-y-4">
              {WAYS.map((w) => (
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
            {transactions.length === 0 ? (
              <p className="font-body text-body-md text-on-surface-variant">No activity yet. Start shopping to earn points!</p>
            ) : (
              <div className="divide-y divide-outline-variant/40">
                {transactions.slice(0, 6).map((h) => {
                  const isNeg = h.type === "redeem";
                  const pts = `${isNeg ? "−" : "+"}${Math.abs(h.points)}`;
                  const date = new Date(h.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
                  return (
                    <div key={h.id} className="flex items-center justify-between py-4">
                      <div>
                        <p className="font-body text-body-md">{h.reason}</p>
                        <p className="font-body text-label-sm uppercase tracking-wider text-on-surface-variant">{date}</p>
                      </div>
                      <span className={`font-body text-body-md font-semibold ${isNeg ? "text-secondary" : "text-primary"}`}>
                        {pts}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {points > 0 && (
          <div className="bg-secondary-container text-on-secondary-container rounded-xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="font-display text-headline-md text-primary">
                Redeem {points} pts for ${(points * 0.01).toFixed(2)} off
              </h3>
              <p className="font-body text-body-md">Apply your reward at checkout on any order.</p>
            </div>
            <Link href="/shop" className="bg-primary text-on-primary font-body text-label-md uppercase tracking-wider px-8 py-4 rounded-full hover:bg-primary-container transition-colors whitespace-nowrap">
              Redeem Reward
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
