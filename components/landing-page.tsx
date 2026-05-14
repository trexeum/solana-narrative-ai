import Link from "next/link";
import { CheckoutButton } from "./checkout-button";

type Plan = "free" | "pro" | "founder";

const plans: {
  name: string;
  price: string;
  description: string;
  features: string[];
  button: string;
  plan: Plan;
  featured?: boolean;
}[] = [
  {
    name: "Free",
    price: "$0",
    description: "For testing SolPulse before committing.",
    features: [
      "5 generations / day",
      "Basic X posts",
      "Limited raid replies",
      "Basic narrative radar",
      "Community updates",
    ],
    button: "Start free",
    plan: "free",
  },
  {
    name: "Pro",
    price: "$19",
    description: "For creators and founders posting daily.",
    features: [
      "300 generations / month",
      "Advanced narrative radar",
      "Unlimited raid replies",
      "Content calendar",
      "Saved drafts",
      "Priority generations",
    ],
    button: "Go Pro",
    featured: true,
    plan: "pro",
  },
  {
    name: "Founder",
    price: "$49",
    description: "For serious launch teams and alpha hunters.",
    features: [
      "2000 generations / month",
      "Premium radar signals",
      "Early alpha alerts",
      "Priority models",
      "Future API access",
      "Founder-level support",
    ],
    button: "Start Founder",
    plan: "founder",
  },
];

export function LandingPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-28 text-center">
        <div className="mb-4 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-emerald-400">
          SolPulse is live
        </div>

        <h1 className="max-w-5xl text-6xl font-black leading-tight tracking-tight">
          Turn crypto narratives into viral distribution.
        </h1>

        <p className="mt-8 max-w-2xl text-lg text-zinc-400">
          Generate CT-ready posts, raid replies, narrative maps, and launch
          content in seconds.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <CheckoutButton plan="free" featured>
            Start free
          </CheckoutButton>

          <Link
            href="#pricing"
            className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 px-8 text-sm font-semibold text-white hover:border-solana-purple/40"
          >
            View plans
          </Link>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <div className="mb-4 text-xs uppercase tracking-[0.35em] text-emerald-400">
            Pricing
          </div>

          <h2 className="text-5xl font-black">
            Start free. Upgrade when you scale.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-zinc-400">
            Simple launch-ready plans for creators, founders, and teams growing
            on crypto Twitter.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl border p-8 ${
                plan.featured
                  ? "border-solana-purple bg-gradient-to-b from-solana-purple/10 to-transparent shadow-[0_0_60px_rgba(153,69,255,0.2)]"
                  : "border-white/10 bg-white/[0.02]"
              }`}
            >
              {plan.featured && (
                <div className="mb-6 inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-400">
                  Most popular
                </div>
              )}

              <h3 className="text-3xl font-bold">{plan.name}</h3>
              <p className="mt-3 text-zinc-400">{plan.description}</p>

              <div className="mt-8 flex items-end gap-1">
                <span className="text-6xl font-black">{plan.price}</span>
                {plan.price !== "$0" && (
                  <span className="mb-2 text-zinc-500">/mo</span>
                )}
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-zinc-300">
                    <div className="h-2 w-2 rounded-full bg-emerald-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              <CheckoutButton plan={plan.plan} featured={plan.featured}>
                {plan.button}
              </CheckoutButton>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}