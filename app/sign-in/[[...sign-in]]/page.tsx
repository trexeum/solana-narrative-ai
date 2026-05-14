import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";
import Link from "next/link";
import { clerkAppearance } from "@/lib/clerk-appearance";

export const metadata: Metadata = {
  title: "Sign in — SolanaNarrativeAI",
  description: "Sign in to your SolanaNarrativeAI workspace.",
};

export default function SignInPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-4 py-16">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(153,69,255,0.22),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_50%,rgba(20,241,149,0.06),transparent)]" />
      </div>

      <Link
        href="/"
        className="absolute left-4 top-4 text-sm text-zinc-500 transition duration-300 hover:text-solana-green sm:left-6 sm:top-6"
      >
        ← Home
      </Link>

      <SignIn
        appearance={clerkAppearance}
        fallbackRedirectUrl="/dashboard"
        signUpUrl="/sign-up"
      />

      <p className="mt-8 text-center text-xs text-zinc-600">
        New here?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-solana-green underline-offset-4 transition hover:text-emerald-300 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
