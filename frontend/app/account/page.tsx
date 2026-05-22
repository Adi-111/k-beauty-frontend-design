"use client";

import { useState } from "react";
import Link from "next/link";
import Placeholder from "@/components/Placeholder";

export default function AccountPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const login = mode === "login";

  return (
    <div className="grid md:grid-cols-2 min-h-[calc(100vh-64px)]">
      {/* visual side */}
      <div className="relative hidden md:block">
        <Placeholder
          label="Join the Circle"
          sub="Buy Far Beyond"
          variant="green"
          icon="auto_awesome"
        />
      </div>

      {/* form side */}
      <div className="flex items-center justify-center px-container-margin-mobile md:px-20 py-16">
        <div className="w-full max-w-sm space-y-8">
          <div className="space-y-2">
            <p className="font-body text-label-md uppercase tracking-widest text-primary">
              {login ? "Welcome back" : "Create account"}
            </p>
            <h1 className="font-display text-headline-lg">
              {login ? "Sign in to O'Circle" : "Join the Circle"}
            </h1>
            <p className="font-body text-body-md text-on-surface-variant">
              {login ? "Access your orders, rituals and loyalty points." : "Earn points, unlock perks and shop authentic K-beauty."}
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {!login && (
              <label className="block">
                <span className="font-body text-label-sm uppercase tracking-wider text-on-surface-variant">Full name</span>
                <input className="w-full mt-1.5 bg-transparent border-b border-outline focus:border-primary outline-none py-2.5 font-body text-body-md placeholder:text-on-surface-variant/50" placeholder="Riya Desai" />
              </label>
            )}
            <label className="block">
              <span className="font-body text-label-sm uppercase tracking-wider text-on-surface-variant">Email</span>
              <input type="email" className="w-full mt-1.5 bg-transparent border-b border-outline focus:border-primary outline-none py-2.5 font-body text-body-md placeholder:text-on-surface-variant/50" placeholder="you@email.com" />
            </label>
            <label className="block">
              <span className="font-body text-label-sm uppercase tracking-wider text-on-surface-variant">Password</span>
              <input type="password" className="w-full mt-1.5 bg-transparent border-b border-outline focus:border-primary outline-none py-2.5 font-body text-body-md placeholder:text-on-surface-variant/50" placeholder="••••••••" />
            </label>

            {login && (
              <div className="text-right">
                <a href="#" className="font-body text-label-sm uppercase tracking-wider text-primary hover:underline">Forgot password?</a>
              </div>
            )}

            <button className="w-full bg-primary text-on-primary font-body text-label-md uppercase tracking-wider py-4 rounded-full hover:bg-primary-container transition-colors">
              {login ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="flex items-center gap-4">
            <span className="h-px bg-outline-variant flex-1" />
            <span className="font-body text-label-sm uppercase tracking-wider text-on-surface-variant">or</span>
            <span className="h-px bg-outline-variant flex-1" />
          </div>

          <button className="w-full border border-outline font-body text-label-md uppercase tracking-wider py-4 rounded-full hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[20px]">mail</span>
            Continue with Google
          </button>

          <p className="text-center font-body text-body-md text-on-surface-variant">
            {login ? "New to O'Circle? " : "Already a member? "}
            <button onClick={() => setMode(login ? "signup" : "login")} className="text-primary font-semibold hover:underline">
              {login ? "Create an account" : "Sign in"}
            </button>
          </p>

          <p className="text-center">
            <Link href="/" className="font-body text-label-sm uppercase tracking-wider text-on-surface-variant hover:text-primary">
              ← Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
