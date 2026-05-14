import Link from "next/link";

export function PlaceholderPanel({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl transition duration-300 hover:border-white/[0.12] hover:bg-white/[0.05]">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-solana-green">
        Workspace
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">
        {title}
      </h1>
      {description ? (
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-zinc-400">
          {description}
        </p>
      ) : null}
      <p className="mt-6 text-sm text-zinc-500">
        Full tooling ships next — this route is wired for navigation only.
      </p>
      <Link
        href="/dashboard"
        className="mt-6 inline-flex text-sm font-medium text-solana-purple transition hover:text-solana-green"
      >
        ← Back to dashboard
      </Link>
    </div>
  );
}
