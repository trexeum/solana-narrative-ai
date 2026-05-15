"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase-client";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <form
        onSubmit={handleSignIn}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8"
      >
        <h1 className="text-4xl font-black">Sign in</h1>

        <input
          className="mt-8 w-full rounded-xl border border-white/10 bg-black px-4 py-3"
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="mt-4 w-full rounded-xl border border-white/10 bg-black px-4 py-3"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="mt-6 w-full rounded-xl bg-gradient-to-r from-solana-purple to-emerald-400 px-4 py-3 font-semibold text-black">
          Sign in
        </button>
      </form>
    </main>
  );
}