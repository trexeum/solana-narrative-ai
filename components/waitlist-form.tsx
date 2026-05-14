"use client";

import { useState } from "react";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="rounded-xl border border-solana-green/30 bg-solana-green/5 px-4 py-3 text-center text-sm text-solana-green">
        You&apos;re on the list. We&apos;ll reach out when spots open.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:items-stretch"
    >
      <label htmlFor="waitlist-email" className="sr-only">
        Email
      </label>
      <input
        id="waitlist-email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@protocol.xyz"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-12 flex-1 rounded-xl border border-white/10 bg-black/60 px-4 text-sm text-white outline-none ring-solana-purple/40 placeholder:text-zinc-500 focus:border-solana-purple/50 focus:ring-2"
      />
      <button
        type="submit"
        className="h-12 shrink-0 rounded-xl bg-gradient-to-r from-solana-purple to-emerald-500 px-6 text-sm font-semibold text-black shadow-[0_0_24px_-4px_rgba(153,69,255,0.6)] transition hover:brightness-110"
      >
        Join waitlist
      </button>
    </form>
  );
}
