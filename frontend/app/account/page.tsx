"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Placeholder from "@/components/Placeholder";
import { useAuth } from "@/context/auth-context";

export default function AccountPage() {
  const { user, login, register, logout, loading, error } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const router = useRouter();
  const isLogin = mode === "login";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        if (!name) { setFormError("Please enter your name"); setSubmitting(false); return; }
        await register(name, email, password);
      }
      router.push("/");
    } catch (err: any) {
      setFormError(err?.message ?? "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  // Logged-in view
  if (user) {
    return (
      <div className="px-container-margin-mobile md:px-container-margin-desktop py-16">
        <div className="max-w-sm mx-auto space-y-8">
          <div className="space-y-2">
            <p className="font-body text-label-md uppercase tracking-widest text-primary">Welcome back</p>
            <h1 className="font-display text-headline-lg">{user.name}</h1>
            <p className="font-body text-body-md text-on-surface-variant">{user.email}</p>
          </div>
          <div className="space-y-4">
            <Link href="/loyalty" className="flex items-center justify-between bg-surface-container-low rounded-xl p-5 hover:bg-surface-container transition-colors">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">diamond</span>
                <span className="font-body text-body-md">O&apos;Circle Loyalty</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
            </Link>
            <Link href="/cart" className="flex items-center justify-between bg-surface-container-low rounded-xl p-5 hover:bg-surface-container transition-colors">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">shopping_bag</span>
                <span className="font-body text-body-md">My Bag</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
            </Link>
          </div>
          <button
            onClick={logout}
            className="w-full border border-outline text-on-background font-body text-label-md uppercase tracking-wider py-4 rounded-full hover:border-primary hover:text-primary transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 min-h-[calc(100vh-64px)]">
      {/* visual side */}
      <div className="relative hidden md:block">
        <Placeholder label="Join the Circle" sub="Buy Far Beyond" variant="green" icon="auto_awesome" />
      </div>

      {/* form side */}
      <div className="flex items-center justify-center px-container-margin-mobile md:px-20 py-16">
        <div className="w-full max-w-sm space-y-8">
          <div className="space-y-2">
            <p className="font-body text-label-md uppercase tracking-widest text-primary">
              {isLogin ? "Welcome back" : "Create account"}
            </p>
            <h1 className="font-display text-headline-lg">
              {isLogin ? "Sign in to O'Circle" : "Join the Circle"}
            </h1>
            <p className="font-body text-body-md text-on-surface-variant">
              {isLogin ? "Access your orders, rituals and loyalty points." : "Earn points, unlock perks and shop authentic K-beauty."}
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <label className="block">
                <span className="font-body text-label-sm uppercase tracking-wider text-on-surface-variant">Full name</span>
                <input
                  value={name} onChange={e => setName(e.target.value)}
                  className="w-full mt-1.5 bg-transparent border-b border-outline focus:border-primary outline-none py-2.5 font-body text-body-md placeholder:text-on-surface-variant/50"
                  placeholder="Riya Desai"
                />
              </label>
            )}
            <label className="block">
              <span className="font-body text-label-sm uppercase tracking-wider text-on-surface-variant">Email</span>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full mt-1.5 bg-transparent border-b border-outline focus:border-primary outline-none py-2.5 font-body text-body-md placeholder:text-on-surface-variant/50"
                placeholder="you@email.com"
              />
            </label>
            <label className="block">
              <span className="font-body text-label-sm uppercase tracking-wider text-on-surface-variant">Password</span>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                className="w-full mt-1.5 bg-transparent border-b border-outline focus:border-primary outline-none py-2.5 font-body text-body-md placeholder:text-on-surface-variant/50"
                placeholder="••••••••"
              />
            </label>

            {(formError || error) && (
              <p className="font-body text-body-sm text-error">{formError || error}</p>
            )}

            {isLogin && (
              <div className="text-right">
                <a href="#" className="font-body text-label-sm uppercase tracking-wider text-primary hover:underline">Forgot password?</a>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || loading}
              className="w-full bg-primary text-on-primary font-body text-label-md uppercase tracking-wider py-4 rounded-full hover:bg-primary-container transition-colors disabled:opacity-60"
            >
              {submitting ? "Please wait…" : isLogin ? "Sign In" : "Create Account"}
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
            {isLogin ? "New to O'Circle? " : "Already a member? "}
            <button onClick={() => setMode(isLogin ? "signup" : "login")} className="text-primary font-semibold hover:underline">
              {isLogin ? "Create an account" : "Sign in"}
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
