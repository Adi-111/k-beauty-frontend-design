"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

const questions = [
  {
    q: "How does your skin usually feel by midday?",
    a: ["Tight & dry", "Balanced", "Shiny in the T-zone", "Reactive & sensitive"],
  },
  {
    q: "What's your number one concern right now?",
    a: ["Dullness & uneven tone", "Redness & sensitivity", "Texture & pores", "Fine lines & firmness"],
  },
  {
    q: "How would you describe your current routine?",
    a: ["Just cleanser", "Cleanser + moisturizer", "A few steps", "Full K-beauty ritual"],
  },
  {
    q: "Which climate are you in most of the year?",
    a: ["Hot & humid", "Hot & dry", "Cold & dry", "Temperate"],
  },
];

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const done = step >= questions.length;
  const progress = Math.round((Math.min(step, questions.length) / questions.length) * 100);

  const choose = (i: number) => {
    setAnswers((prev) => [...prev.slice(0, step), i]);
    setStep((s) => s + 1);
  };
  const restart = () => {
    setStep(0);
    setAnswers([]);
  };

  const recommended = products.filter((p) => p.bestSeller).concat(products.filter((p) => p.category === "Serums")).slice(0, 4);

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-container-margin-mobile md:px-container-margin-desktop py-16 bg-surface-container-low">
      <div className="w-full max-w-2xl">
        {!done ? (
          <div className="bg-surface-container-lowest rounded-xl p-8 md:p-12 border border-outline-variant/40">
            <div className="flex items-center justify-between mb-8">
              <span className="font-body text-label-sm uppercase tracking-widest text-primary">Ritual Finder</span>
              <span className="font-body text-label-sm uppercase tracking-widest text-on-surface-variant">
                {step + 1} / {questions.length}
              </span>
            </div>
            <div className="h-1 bg-surface-container-high rounded-full mb-10 overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <h1 className="font-display text-headline-lg mb-8 leading-tight">{questions[step].q}</h1>
            <div className="grid gap-4">
              {questions[step].a.map((opt) => (
                <button
                  key={opt}
                  onClick={() => choose(questions[step].a.indexOf(opt))}
                  className="text-left font-body text-body-lg px-6 py-5 rounded-xl border border-outline-variant/60 hover:border-primary hover:bg-surface-container-low transition-colors flex items-center justify-between group"
                >
                  {opt}
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary group-hover:translate-x-1 transition-all">
                    arrow_forward
                  </span>
                </button>
              ))}
            </div>
            {step > 0 && (
              <button onClick={() => setStep((s) => s - 1)} className="mt-8 font-body text-label-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors">
                ← Back
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-10">
            <div className="text-center space-y-4">
              <span className="material-symbols-outlined icon-fill text-primary text-[48px]">spa</span>
              <h1 className="font-display text-display-lg">Your ritual is ready</h1>
              <p className="font-body text-body-lg text-on-surface-variant max-w-md mx-auto">
                Based on your answers, we&apos;ve matched a gentle, results-driven routine for calm,
                hydrated and glowing skin.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10">
              {recommended.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/shop" className="bg-primary text-on-primary font-body text-label-md uppercase tracking-wider px-8 py-4 rounded-full hover:bg-primary-container transition-colors">
                Shop My Routine
              </Link>
              <button onClick={restart} className="border border-outline font-body text-label-md uppercase tracking-wider px-8 py-4 rounded-full hover:border-primary hover:text-primary transition-colors">
                Retake Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
