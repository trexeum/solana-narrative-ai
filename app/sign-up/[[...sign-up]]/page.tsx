"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase-client";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        email,
        plan: "free",
      });
    }

    window.location.href = "/dashboard";
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <form
        onSubmit={handleSignUp}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8"
      >
        <h1 className="text-4xl font-black">Create account</h1>
        <p className="mt-2 text-zinc-400">Start using SolPulse for free.</p>

        <input
          className="mt-8 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="mt-4 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-gradient-to-r from-solana-purple to-emerald-400 px-4 py-3 font-semibold text-black"
        >
          {loading ? "Creating..." : "Create free account"}
        </button>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <a href="/sign-in" className="text-emerald-400">
            Sign in
          </a>
        </p>
      </form>
    </main>
  );
}