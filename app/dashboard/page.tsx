import Link from "next/link";

const stats = [
  {
    label: "Generations (7d)",
    value: "128",
    hint: "+18% vs last week",
    accent: "from-solana-purple/25 to-transparent",
  },
  {
    label: "Saved drafts",
    value: "42",
    hint: "12 raid-ready",
    accent: "from-emerald-500/20 to-transparent",
  },
  {
    label: "Raid replies",
    value: "340",
    hint: "Last 48h",
    accent: "from-solana-green/15 to-transparent",
  },
  {
    label: "Calendar slots",
    value: "21",
    hint: "Next 7 days",
    accent: "from-fuchsia-500/15 to-transparent",
  },
];

const recent = [
  {
    kind: "X post",
    title: "Thread — why our liquidity curve eats inflation narratives",
    time: "12 min ago",
    tone: "purple",
  },
  {
    kind: "Raid reply",
    title: "Short stack for the Jupiter adjacent quote tweet",
    time: "1 hr ago",
    tone: "green",
  },
  {
    kind: "Narrative",
    title: "Angle: Solana consumer apps as distribution, not hype",
    time: "Yesterday",
    tone: "purple",
  },
  {
    kind: "Calendar",
    title: "Week plan — memes Mon, infra Wed, AMA Fri",
    time: "2 days ago",
    tone: "green",
  },
];

function GlassCard({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/[0.08] bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl transition-all duration-300 ease-out hover:border-white/[0.12] hover:bg-white/[0.05] hover:shadow-[0_0_40px_-16px_rgba(153,69,255,0.25)] ${className}`}
    >
      {children}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-solana-green">
            Overview
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Welcome back, founder
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            Your Solana-native narrative workspace — sharpen posts, line up
            raids, and keep the calendar hot without sounding generic.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-[11px] text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-solana-green shadow-[0_0_8px_#14f195]" />
            Mainnet vibes only
          </span>
        </div>
      </div>

      {/* Quick stats */}
      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">
          Quick stats
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => (
            <GlassCard key={s.label} className="relative overflow-hidden p-5">
              <div
                className={`pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${s.accent} blur-2xl`}
                aria-hidden
              />
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                {s.label}
              </p>
              <p className="mt-2 text-3xl font-semibold tabular-nums text-white">
                {s.value}
              </p>
              <p className="mt-1 text-xs text-zinc-500">{s.hint}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Recent generations */}
        <section
          className="lg:col-span-3"
          aria-labelledby="recent-heading"
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2
              id="recent-heading"
              className="text-lg font-semibold text-white"
            >
              Recent generations
            </h2>
            <Link
              href="/dashboard/saved"
              className="text-xs font-medium text-solana-purple transition hover:text-solana-green"
            >
              View saved →
            </Link>
          </div>
          <GlassCard className="divide-y divide-white/[0.06]">
            {recent.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-2 p-4 transition duration-300 first:rounded-t-2xl last:rounded-b-2xl hover:bg-white/[0.03] sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <span
                    className={`inline-flex rounded-md px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
                      item.tone === "green"
                        ? "border border-solana-green/25 bg-solana-green/10 text-solana-green"
                        : "border border-solana-purple/25 bg-solana-purple/10 text-solana-purple"
                    }`}
                  >
                    {item.kind}
                  </span>
                  <p className="mt-2 truncate text-sm font-medium text-zinc-200">
                    {item.title}
                  </p>
                </div>
                <p className="shrink-0 text-xs text-zinc-500">{item.time}</p>
              </div>
            ))}
          </GlassCard>
        </section>

        {/* Quick actions */}
        <section className="lg:col-span-2" aria-labelledby="actions-heading">
          <h2
            id="actions-heading"
            className="mb-4 text-lg font-semibold text-white"
          >
            Quick actions
          </h2>
          <GlassCard className="flex flex-col gap-3 p-4">
            {[
              {
                href: "/dashboard/generate",
                label: "Generate posts",
                sub: "Threads & one-shots",
              },
              {
                href: "/dashboard/raid-replies",
                label: "Raid replies",
                sub: "Quote-ready stacks",
              },
              {
                href: "/dashboard/narrative",
                label: "Narrative finder",
                sub: "Angles that land on CT",
              },
              {
                href: "/dashboard/calendar",
                label: "Content calendar",
                sub: "Plan the next 7 days",
              },
            ].map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="group flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-black/30 px-4 py-3 transition-all duration-300 hover:border-solana-purple/35 hover:bg-white/[0.06]"
              >
                <div>
                  <p className="text-sm font-medium text-white">{a.label}</p>
                  <p className="text-xs text-zinc-500">{a.sub}</p>
                </div>
                <span className="text-solana-green opacity-0 transition duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
                  →
                </span>
              </Link>
            ))}
          </GlassCard>
        </section>
      </div>
    </div>
  );
}
