import Link from "next/link";
import { AuthLandingNav } from "./auth-landing-nav";
import { WaitlistForm } from "./waitlist-form";

const nav = [
  { href: "#problem", label: "Problem" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#testimonials", label: "Wall" },
];

function LogoMark() {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-solana-purple to-emerald-400 shadow-[0_0_20px_-4px_rgba(20,241,149,0.5)]">
      <span className="font-mono text-sm font-bold text-black">S</span>
    </div>
  );
}

function GridBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(153,69,255,0.25),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_100%_50%,rgba(20,241,149,0.08),transparent)]" />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-solana-green">
        {eyebrow}
      </p>
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg">
        {subtitle}
      </p>
    </div>
  );
}

export function LandingPage() {
  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "",
      blurb: "For testing SolPulse before committing.",
      features: [
        "5 generations / day",
        "Basic X posts",
        "Limited raid replies",
        "Basic narrative radar",
        "Community updates",
      ],
      cta: "Start free",
      featured: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "/mo",
      blurb: "For creators and founders posting daily.",
      features: [
        "300 generations / month",
        "Advanced narrative radar",
        "Unlimited raid replies",
        "Content calendar",
        "Saved drafts",
        "Priority generations",
      ],
      cta: "Go Pro",
      featured: true,
    },
    {
      name: "Founder",
      price: "$49",
      period: "/mo",
      blurb: "For serious launch teams and alpha hunters.",
      features: [
        "2000 generations / month",
        "Premium radar signals",
        "Early alpha alerts",
        "Priority models",
        "Future API access",
        "Founder-level support",
      ],
      cta: "Start Founder",
      featured: false,
    },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black">
      <GridBackdrop />

      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <LogoMark />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-white">SolPulse</span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                Crypto-native
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-zinc-400 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#pricing"
              className="hidden rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:border-white/20 hover:text-white sm:inline-flex"
            >
              View plans
            </a>
            <a
              href="#cta"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-solana-purple to-emerald-500 px-3 py-2 text-sm font-semibold text-black shadow-[0_0_24px_-6px_rgba(153,69,255,0.55)] transition hover:brightness-110 sm:px-4"
            >
              Get access
            </a>
            <AuthLandingNav />
          </div>
        </div>
      </header>

      <main>
        <section className="relative px-4 pb-24 pt-16 sm:px-6 sm:pb-32 sm:pt-24">
          <div className="mx-auto max-w-6xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 font-mono text-[11px] text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-solana-green shadow-[0_0_8px_#14f195]" />
              Built for crypto founders
            </div>

            <h1 className="mx-auto max-w-4xl text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl md:leading-[1.08]">
              Narrative engine for{" "}
              <span className="bg-gradient-to-r from-solana-purple via-fuchsia-400 to-solana-green bg-clip-text text-transparent">
                crypto attention
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-zinc-400 sm:text-xl">
              Generate viral X posts, raid-ready replies, sharp market angles,
              and full content calendars built for founders who need to move fast.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#cta"
                className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-full bg-gradient-to-r from-solana-purple to-emerald-500 px-8 text-base font-semibold text-black shadow-[0_0_32px_-8px_rgba(20,241,149,0.45)] transition hover:brightness-110"
              >
                Start free
              </a>
              <a
                href="#features"
                className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-full border border-white/15 bg-white/[0.02] px-8 text-base font-medium text-white transition hover:border-solana-purple/40 hover:bg-white/[0.05]"
              >
                See what it does
              </a>
            </div>
          </div>
        </section>

        <section
          id="problem"
          className="scroll-mt-24 border-t border-white/[0.06] bg-gradient-to-b from-black to-[#060608] px-4 py-24 sm:px-6"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="The gap"
              title="Generic AI doesn’t speak crypto culture"
              subtitle="Your brand needs posts that sound sharp, timely, and native — not like a random chatbot."
            />
          </div>
        </section>

        <section id="features" className="scroll-mt-24 px-4 py-24 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Product"
              title="Everything to own the feed"
              subtitle="One workspace for posts, replies, narratives, and calendars."
            />

            <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Viral X posts",
                "Raid replies",
                "Narrative radar",
                "7-day calendars",
              ].map((title) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/[0.08] bg-[#0a0a0d] p-6"
                >
                  <h3 className="text-base font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    Built to help founders move faster and stay active on CT.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="pricing"
          className="scroll-mt-24 border-t border-white/[0.06] bg-[#050508] px-4 py-24 sm:px-6"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Pricing"
              title="Start free. Upgrade when you scale."
              subtitle="Simple launch-ready plans for creators, founders, and teams growing on crypto Twitter."
            />

            <div className="mt-16 grid gap-6 lg:grid-cols-3">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative flex flex-col rounded-2xl border p-8 ${
                    plan.featured
                      ? "border-solana-purple/50 bg-gradient-to-b from-solana-purple/10 to-black shadow-[0_0_48px_-12px_rgba(153,69,255,0.35)]"
                      : "border-white/[0.08] bg-[#0a0a0d]"
                  }`}
                >
                  {plan.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-solana-green/40 bg-black px-3 py-0.5 font-mono text-[10px] uppercase tracking-wider text-solana-green">
                      Most popular
                    </span>
                  )}

                  <h3 className="text-lg font-semibold text-white">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-400">{plan.blurb}</p>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-semibold tracking-tight text-white">
                      {plan.price}
                    </span>
                    <span className="text-zinc-500">{plan.period}</span>
                  </div>

                  <ul className="mt-8 flex flex-col gap-3 text-sm text-zinc-300">
                    {plan.features.map((line) => (
                      <li key={line} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-solana-green" />
                        {line}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#cta"
                    className={`mt-8 inline-flex h-11 items-center justify-center rounded-full text-sm font-semibold transition ${
                      plan.featured
                        ? "bg-gradient-to-r from-solana-purple to-emerald-500 text-black hover:brightness-110"
                        : "border border-white/15 text-white hover:border-solana-purple/40 hover:bg-white/[0.04]"
                    }`}
                  >
                    {plan.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="testimonials"
          className="scroll-mt-24 px-4 py-24 sm:px-6"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Wall"
              title="Built for founders shipping daily"
              subtitle="Stay loud without sounding like a generic LLM."
            />
          </div>
        </section>

        <section
          id="cta"
          className="scroll-mt-24 border-t border-white/[0.06] bg-gradient-to-b from-black via-[#070712] to-black px-4 py-24 sm:px-6"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-solana-green">
              Get started
            </p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Generate your first posts with SolPulse
            </h2>
            <p className="mt-4 text-pretty text-zinc-400">
              Start free now. Upgrade when you need more generations, radar,
              and launch features.
            </p>
            <div className="mt-10 flex justify-center">
              <WaitlistForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.06] px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <LogoMark />
            <div>
              <p className="text-sm font-semibold text-white">SolPulse</p>
              <p className="text-xs text-zinc-500">
                AI for crypto narratives.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500">
            <span className="font-mono">© {new Date().getFullYear()}</span>
            <a href="#problem" className="hover:text-zinc-300">
              Problem
            </a>
            <a href="#features" className="hover:text-zinc-300">
              Features
            </a>
            <a href="#pricing" className="hover:text-zinc-300">
              Pricing
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}