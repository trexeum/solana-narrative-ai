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
    <div
      className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-solana-purple to-emerald-400 shadow-[0_0_20px_-4px_rgba(20,241,149,0.5)]"
      aria-hidden
    >
      <span className="font-mono text-sm font-bold text-black">S</span>
    </div>
  );
}

function GridBackdrop() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
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
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black">
      <GridBackdrop />

      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <LogoMark />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-white">
                SolanaNarrativeAI
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                Solana-only
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
        {/* Hero */}
        <section className="relative px-4 pb-24 pt-16 sm:px-6 sm:pb-32 sm:pt-24">
          <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-[min(100%,42rem)] -translate-x-1/2 rounded-full bg-solana-purple/20 blur-[100px]" />
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 font-mono text-[11px] text-zinc-300">
                <span className="h-1.5 w-1.5 rounded-full bg-solana-green shadow-[0_0_8px_#14f195]" />
                Built for Solana token founders
              </div>
              <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl md:leading-[1.08]">
                Narrative engine for{" "}
                <span className="bg-gradient-to-r from-solana-purple via-fuchsia-400 to-solana-green bg-clip-text text-transparent">
                  the Solana meta
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-zinc-400 sm:text-xl">
                Generate viral X posts, raid-ready replies, sharp Solana angles,
                and a full 7-day content calendar — tuned to how{" "}
                <span className="text-zinc-200">your</span> chain actually moves.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                <a
                  href="#cta"
                  className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-full bg-gradient-to-r from-solana-purple to-emerald-500 px-8 text-base font-semibold text-black shadow-[0_0_32px_-8px_rgba(20,241,149,0.45)] transition hover:brightness-110"
                >
                  Join the waitlist
                </a>
                <a
                  href="#features"
                  className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-full border border-white/15 bg-white/[0.02] px-8 text-base font-medium text-white transition hover:border-solana-purple/40 hover:bg-white/[0.05]"
                >
                  See what it does
                </a>
              </div>
              <dl className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
                {[
                  { k: "Chains", v: "Solana only" },
                  { k: "Outputs", v: "Posts & raids" },
                  { k: "Cadence", v: "7-day calendars" },
                  { k: "Voice", v: "Founder-led" },
                ].map((stat) => (
                  <div
                    key={stat.k}
                    className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-4 text-left"
                  >
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                      {stat.k}
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-white">
                      {stat.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section
          id="problem"
          className="scroll-mt-24 border-t border-white/[0.06] bg-gradient-to-b from-black to-[#060608] px-4 py-24 sm:px-6"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="The gap"
              title="Generic AI doesn’t speak Solana"
              subtitle="Your ticker isn’t a buzzword list. Without chain-native context, outputs feel tourist-grade — and CT dies on the timeline."
            />
            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Lost voice",
                  body: "Copy sounds like it could be any L1. No memes, no meta, no conviction.",
                },
                {
                  title: "Raid whiff",
                  body: "Replies miss timing and tone. Raids need rhythm — not wall-of-text essays.",
                },
                {
                  title: "Founder time tax",
                  body: "You’re shipping protocol — not babysitting a generic chatbot for prompts.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="group rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-6 transition hover:border-solana-purple/30"
                >
                  <div className="mb-3 h-px w-8 bg-gradient-to-r from-solana-purple to-solana-green opacity-80" />
                  <h3 className="text-lg font-semibold text-white">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="scroll-mt-24 px-4 py-24 sm:px-6"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Product"
              title="Everything to own the feed"
              subtitle="One workspace tuned for Solana launch velocity — from first tweet to raid cadence."
            />
            <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Viral X posts",
                  desc: "Hooks, threads, and punchy one-liners aligned to how CT actually trades attention.",
                  icon: (
                    <svg
                      className="h-5 w-5 text-solana-green"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                },
                {
                  title: "Raid replies",
                  desc: "Short, quotable replies optimized for speed raids and coordinated momentum.",
                  icon: (
                    <svg
                      className="h-5 w-5 text-solana-green"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Solana narratives",
                  desc: "Angles that map to ecosystem storylines — infra, consumer, DePIN, memes, and more.",
                  icon: (
                    <svg
                      className="h-5 w-5 text-solana-green"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                      />
                    </svg>
                  ),
                },
                {
                  title: "7-day calendars",
                  desc: "A rolling week of posts, themes, and raid windows so your community stays hot.",
                  icon: (
                    <svg
                      className="h-5 w-5 text-solana-green"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5"
                      />
                    </svg>
                  ),
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="flex flex-col rounded-2xl border border-white/[0.08] bg-[#0a0a0d] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-solana-purple/25 bg-solana-purple/10">
                    {f.icon}
                  </div>
                  <h3 className="text-base font-semibold text-white">
                    {f.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                    {f.desc}
                  </p>
                  <div className="mt-4 font-mono text-[10px] uppercase tracking-wider text-solana-purple/80">
                    Solana-native
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section
          id="pricing"
          className="scroll-mt-24 border-t border-white/[0.06] bg-[#050508] px-4 py-24 sm:px-6"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Pricing"
              title="Pick your lane"
              subtitle="Simple tiers for solo founders and teams shipping on Solana. No hidden mint fees."
            />
            <div className="mt-16 grid gap-6 lg:grid-cols-3">
              {[
                {
                  name: "Starter",
                  price: "$49",
                  period: "/mo",
                  blurb: "Solo founder getting narrative online.",
                  features: [
                    "500 generations / mo",
                    "X posts + short replies",
                    "Basic calendar export",
                    "Email support",
                  ],
                  cta: "Start starter",
                  featured: false,
                },
                {
                  name: "Growth",
                  price: "$129",
                  period: "/mo",
                  blurb: "Full feed coverage with raids and angles.",
                  features: [
                    "Unlimited generations",
                    "Raid reply packs",
                    "Solana narrative maps",
                    "7-day rolling calendars",
                    "Priority support",
                  ],
                  cta: "Most popular",
                  featured: true,
                },
                {
                  name: "Studio",
                  price: "Custom",
                  period: "",
                  blurb: "Agencies and launch partners.",
                  features: [
                    "Shared brand voice model",
                    "Multi-seat workspace",
                    "Custom integrations",
                    "Dedicated success",
                  ],
                  cta: "Talk to us",
                  featured: false,
                },
              ].map((plan) => (
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
                      Best for launches
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
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-solana-green"
                          aria-hidden
                        />
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

        {/* Testimonials */}
        <section
          id="testimonials"
          className="scroll-mt-24 px-4 py-24 sm:px-6"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Wall"
              title="Founders shipping with conviction"
              subtitle="Teams using SolanaNarrativeAI to stay loud without sounding like a random LLM."
            />
            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {[
                {
                  quote:
                    "Our raid volume 3x’d because replies finally sound like us — not a Wikipedia summary with rocket emojis.",
                  name: "Maya K.",
                  role: "Founder, L1 adjacent infra",
                },
                {
                  quote:
                    "The 7-day calendar is unfair. We always know what hits next — mods actually follow it.",
                  name: "Devon L.",
                  role: "Head of community, consumer app",
                },
                {
                  quote:
                    "Solana-only was the unlock. Angles land because the model gets the meta we’re playing.",
                  name: "Rico V.",
                  role: "Core contributor, DePIN project",
                },
              ].map((t) => (
                <blockquote
                  key={t.name}
                  className="flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
                >
                  <p className="flex-1 text-sm leading-relaxed text-zinc-300">
                    “{t.quote}”
                  </p>
                  <footer className="mt-6 border-t border-white/[0.06] pt-4">
                    <cite className="not-italic">
                      <span className="font-medium text-white">{t.name}</span>
                      <span className="mt-0.5 block text-xs text-zinc-500">
                        {t.role}
                      </span>
                    </cite>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          id="cta"
          className="scroll-mt-24 border-t border-white/[0.06] bg-gradient-to-b from-black via-[#070712] to-black px-4 py-24 sm:px-6"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-solana-green">
              Early access
            </p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Ship the narrative before the next mint window
            </h2>
            <p className="mt-4 text-pretty text-zinc-400">
              Drop your email — we’ll ping you when onboarding opens. No wallet
              connect yet; we’re focused on the craft first.
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
              <p className="text-sm font-semibold text-white">
                SolanaNarrativeAI
              </p>
              <p className="text-xs text-zinc-500">
                AI for Solana token narratives.
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
