"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import type { GeneratePostsRequest, ToneStyle } from "@/lib/generate-posts-types";
import { TONE_OPTIONS } from "@/lib/generate-posts-types";
import { saveGenerateBatchLocal } from "@/lib/saved-generations-local";

type ApiOk = { posts: string[]; mock?: boolean };
type ApiErr = { error: string };

function glassPanel(extra = "") {
  return `rounded-2xl border border-white/[0.08] bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl ${extra}`;
}

function handleFromTicker(ticker: string): string {
  const t = ticker.replace(/^@/, "").trim().toLowerCase().slice(0, 15);
  return t ? `@${t}` : "@token";
}

function charBarColor(len: number): string {
  if (len > 280) return "bg-red-400";
  if (len >= 260) return "bg-amber-400";
  if (len >= 235) return "bg-solana-green/90";
  return "bg-solana-purple/80";
}

export function GeneratePostsTool() {
  const [projectName, setProjectName] = useState("");
  const [tokenTicker, setTokenTicker] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [competitorTokens, setCompetitorTokens] = useState("");
  const [tone, setTone] = useState<ToneStyle>("bullish");

  const [posts, setPosts] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [regeneratingIndex, setRegeneratingIndex] = useState<number | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [mockMode, setMockMode] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  const payloadBase = useCallback((): GeneratePostsRequest => {
    return {
      projectName,
      tokenTicker,
      projectDescription,
      targetAudience,
      competitorTokens,
      tone,
    };
  }, [
    projectName,
    tokenTicker,
    projectDescription,
    targetAudience,
    competitorTokens,
    tone,
  ]);

  async function runGenerate(replaceIndex?: number) {
    setError(null);
    const isReplace = typeof replaceIndex === "number";
    if (isReplace) {
      setRegeneratingIndex(replaceIndex);
    } else {
      setIsGenerating(true);
    }

    try {
      const body: GeneratePostsRequest = {
        ...payloadBase(),
        ...(isReplace ? { replaceIndex } : {}),
      };

      const res = await fetch("/api/generate-posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = (await res.json()) as ApiOk | ApiErr;

      if (!res.ok || ("error" in data && data.error)) {
        throw new Error(
          "error" in data && typeof data.error === "string"
            ? data.error
            : "Request failed",
        );
      }

      const ok = data as ApiOk;
      if (!ok.posts?.length) throw new Error("No posts returned");

      if (isReplace && typeof replaceIndex === "number") {
        const next = [...posts];
        next[replaceIndex] = ok.posts[0] ?? next[replaceIndex];
        setPosts(next);
      } else {
        setPosts(ok.posts.slice(0, 5));
      }

      setMockMode(ok.mock === true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setIsGenerating(false);
      setRegeneratingIndex(null);
    }
  }

  async function copyText(text: string, index: number) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      setError("Could not copy to clipboard");
    }
  }

  function handleSaveBatch() {
    if (posts.length === 0) return;
    saveGenerateBatchLocal({
      context: {
        projectName,
        tokenTicker,
        projectDescription,
        targetAudience,
        competitorTokens,
        tone,
      },
      posts,
    });
    setSaveToast("Saved on this device");
    window.setTimeout(() => setSaveToast(null), 3200);
  }

  const busy = isGenerating || regeneratingIndex !== null;
  const showBatchOverlay = isGenerating && posts.length > 0;

  return (
    <div className="space-y-8">
      {/* Indeterminate loading bar */}
      <div
        className={`pointer-events-none fixed left-0 right-0 top-0 z-[60] h-0.5 overflow-hidden transition-opacity duration-300 ${
          isGenerating ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden={!isGenerating}
      >
        <div className="sn-generate-indeterminate-bar h-full w-1/3 bg-gradient-to-r from-transparent via-solana-purple to-solana-green" />
      </div>

      <header className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-solana-green">
          Generate Posts
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Viral X posts for Solana CT
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
          Feed project context and tone — get five under-280-character posts tuned
          for crypto Twitter. Regenerate any card without redoing the full batch.
        </p>
      </header>

      {mockMode && (
        <div
          className={`${glassPanel("px-4 py-3 text-sm text-amber-100/90")} border-amber-500/25 bg-amber-500/[0.06]`}
          role="status"
        >
          <span className="font-medium text-amber-200">Mock mode:</span>{" "}
          <code className="rounded bg-black/40 px-1.5 py-0.5 font-mono text-xs">
            OPENAI_API_KEY
          </code>{" "}
          is not set. Showing placeholder copy. Add your key in{" "}
          <code className="font-mono text-xs">.env.local</code> for live
          generation.
        </div>
      )}

      {saveToast && (
        <div
          className={`${glassPanel("flex items-center justify-between gap-3 px-4 py-3 text-sm")} border-solana-green/30 bg-solana-green/[0.08] text-solana-green`}
          role="status"
        >
          <span>{saveToast}</span>
          <Link
            href="/dashboard/saved"
            className="shrink-0 text-xs font-medium text-white/90 underline-offset-4 transition hover:text-white hover:underline"
          >
            Open Saved
          </Link>
        </div>
      )}

      {error && (
        <div
          className={`${glassPanel("border-red-500/30 bg-red-500/[0.06] px-4 py-3 text-sm text-red-100")}`}
          role="alert"
        >
          {error}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-5">
        <section className={`${glassPanel("p-6 transition-shadow duration-300 ease-out hover:shadow-[0_0_40px_-20px_rgba(153,69,255,0.2)]")} lg:col-span-2`}>
          <h2 className="text-lg font-semibold text-white">Context</h2>
          <p className="mt-1 text-xs text-zinc-500">
            Required: project name & ticker. More detail = sharper posts.
          </p>

          <div className="mt-6 flex flex-col gap-4">
            <label className="block transition duration-200 hover:opacity-[0.98]">
              <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                Project name
              </span>
              <input
                required
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g. Prism Vault"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white outline-none ring-solana-purple/30 transition duration-300 placeholder:text-zinc-600 hover:border-white/15 focus:border-solana-purple/40 focus:ring-2"
              />
            </label>

            <label className="block transition duration-200 hover:opacity-[0.98]">
              <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                Token ticker
              </span>
              <input
                required
                value={tokenTicker}
                onChange={(e) => setTokenTicker(e.target.value)}
                placeholder="e.g. PRISM"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 font-mono text-sm uppercase text-white outline-none ring-solana-purple/30 transition duration-300 placeholder:text-zinc-600 hover:border-white/15 focus:border-solana-purple/40 focus:ring-2"
              />
            </label>

            <label className="block transition duration-200 hover:opacity-[0.98]">
              <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                Project description
              </span>
              <textarea
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="What are you building? Why Solana?"
                rows={4}
                className="mt-1.5 w-full resize-y rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white outline-none ring-solana-purple/30 transition duration-300 placeholder:text-zinc-600 hover:border-white/15 focus:border-solana-purple/40 focus:ring-2"
              />
            </label>

            <label className="block transition duration-200 hover:opacity-[0.98]">
              <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                Target audience
              </span>
              <input
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g. DeFi power users, NFT collectors"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white outline-none ring-solana-purple/30 transition duration-300 placeholder:text-zinc-600 hover:border-white/15 focus:border-solana-purple/40 focus:ring-2"
              />
            </label>

            <label className="block transition duration-200 hover:opacity-[0.98]">
              <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                Competitor Solana tokens
              </span>
              <textarea
                value={competitorTokens}
                onChange={(e) => setCompetitorTokens(e.target.value)}
                placeholder="Tickers or names you position against (no fake ties)"
                rows={2}
                className="mt-1.5 w-full resize-y rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white outline-none ring-solana-purple/30 transition duration-300 placeholder:text-zinc-600 hover:border-white/15 focus:border-solana-purple/40 focus:ring-2"
              />
            </label>

            <label className="block transition duration-200 hover:opacity-[0.98]">
              <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                Tone style
              </span>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as ToneStyle)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white outline-none ring-solana-purple/30 transition duration-300 hover:border-white/15 focus:border-solana-purple/40 focus:ring-2"
              >
                {TONE_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              disabled={busy || !projectName.trim() || !tokenTicker.trim()}
              onClick={() => runGenerate()}
              className="group relative mt-2 inline-flex h-12 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-solana-purple to-emerald-500 px-6 text-sm font-semibold text-black shadow-[0_0_28px_-8px_rgba(153,69,255,0.55)] transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_0_36px_-6px_rgba(20,241,149,0.45)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
            >
              <span
                className={`pointer-events-none absolute inset-0 bg-white/20 opacity-0 transition duration-300 group-hover:opacity-100 ${
                  isGenerating ? "animate-pulse opacity-30" : ""
                }`}
              />
              {isGenerating ? (
                <span className="relative flex items-center gap-2">
                  <Spinner variant="button" />
                  Generating…
                </span>
              ) : (
                <span className="relative">Generate posts</span>
              )}
            </button>
          </div>
        </section>

        <section className="relative lg:col-span-3">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-white">Outputs</h2>
            <div className="flex flex-wrap items-center gap-2">
              {posts.length > 0 && (
                <>
                  <span className="font-mono text-xs text-zinc-500">
                    {posts.length} posts · ≤280 chars
                  </span>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => handleSaveBatch()}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-zinc-200 transition-all duration-300 ease-out hover:border-solana-green/35 hover:bg-solana-green/10 hover:text-solana-green active:scale-[0.97] disabled:opacity-40"
                  >
                    <IconBookmark className="h-3.5 w-3.5" />
                    Save locally
                  </button>
                </>
              )}
            </div>
          </div>

          {isGenerating && posts.length === 0 && (
            <LoadingSkeleton />
          )}

          {!isGenerating && posts.length === 0 && !error && (
            <div
              className={`${glassPanel("p-8 text-center text-zinc-500 transition duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]")}`}
            >
              <p className="text-sm">
                Fill context and hit{" "}
                <span className="text-zinc-300">Generate posts</span> — five
                cards will appear here.
              </p>
            </div>
          )}

          {showBatchOverlay && (
            <div
              className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-black/55 backdrop-blur-md transition-opacity duration-300"
              role="status"
              aria-live="polite"
            >
              <div className="relative">
                <div className="h-14 w-14 rounded-full border-2 border-solana-purple/30 border-t-solana-green animate-spin" />
                <div className="pointer-events-none absolute inset-0 rounded-full bg-solana-purple/10 blur-xl" />
              </div>
              <p className="text-sm font-medium text-zinc-200">
                Generating fresh posts…
              </p>
            </div>
          )}

          <ul className="relative flex flex-col gap-4">
            {posts.map((text, index) => (
              <li key={`post-${index}`}>
                <XPostCard
                  index={index}
                  text={text}
                  displayName={projectName.trim() || "Your project"}
                  ticker={tokenTicker}
                  isRegenerating={regeneratingIndex === index}
                  copied={copiedIndex === index}
                  onCopy={() => copyText(text, index)}
                  onRegenerate={() => runGenerate(index)}
                  disabled={busy}
                  disableCopy={regeneratingIndex === index}
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function XPostCard({
  index,
  text,
  displayName,
  ticker,
  isRegenerating,
  copied,
  onCopy,
  onRegenerate,
  disabled,
  disableCopy,
}: {
  index: number;
  text: string;
  displayName: string;
  ticker: string;
  isRegenerating: boolean;
  copied: boolean;
  onCopy: () => void;
  onRegenerate: () => void;
  disabled: boolean;
  disableCopy: boolean;
}) {
  const initial = (ticker.trim()[0] ?? displayName[0] ?? "?").toUpperCase();
  const handle = handleFromTicker(ticker);

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0f12]/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-[#12151a]/95 hover:shadow-[0_12px_40px_-16px_rgba(153,69,255,0.28),0_0_0_1px_rgba(20,241,149,0.06)] ${
        isRegenerating ? "pointer-events-none scale-[0.99] opacity-80" : ""
      }`}
    >
      <div className="sn-generate-shimmer pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex gap-3 p-4 sm:p-4">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-solana-purple/70 to-emerald-500/50 text-sm font-bold text-white shadow-[0_0_20px_-6px_rgba(153,69,255,0.6)] ring-2 ring-black/40 transition duration-300 group-hover:scale-105 group-hover:shadow-[0_0_24px_-4px_rgba(20,241,149,0.45)]"
          aria-hidden
        >
          {initial}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
            <span className="truncate text-[15px] font-bold leading-5 text-zinc-100">
              {displayName}
            </span>
            <span className="truncate text-[15px] leading-5 text-zinc-500">
              {handle}
            </span>
            <span className="text-zinc-600">·</span>
            <span className="text-[15px] leading-5 text-zinc-500">now</span>
          </div>

          <div className="mt-2 min-h-[3rem]">
            {isRegenerating ? (
              <div className="flex items-center gap-2 text-[15px] text-zinc-500">
                <Spinner variant="inline" />
                <span>Regenerating…</span>
              </div>
            ) : (
              <p className="whitespace-pre-wrap text-[15px] leading-5 tracking-[-0.011em] text-zinc-100">
                {text}
              </p>
            )}
          </div>

          {/* Character counter under post (X-style meta row) */}
          <div className="mt-3 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-zinc-800/90">
              <div
                className={`h-full max-w-full rounded-full transition-all duration-500 ease-out ${charBarColor(
                  isRegenerating ? 0 : text.length,
                )}`}
                style={{
                  width: `${Math.min(100, ((isRegenerating ? 0 : text.length) / 280) * 100)}%`,
                }}
              />
            </div>
            <p className="shrink-0 font-mono text-[11px] tabular-nums text-zinc-500">
              <span
                className={
                  text.length > 280
                    ? "text-red-400"
                    : text.length >= 260
                      ? "text-amber-400/90"
                      : "text-zinc-400"
                }
              >
                {isRegenerating ? "—" : text.length}
              </span>
              <span className="text-zinc-600"> / 280</span>
              <span className="ml-2 text-zinc-600">characters</span>
            </p>
          </div>
        </div>
      </div>

      {/* X-style action row */}
      <div className="relative border-t border-white/[0.06] px-2 py-1.5 sm:px-3">
        <div className="flex max-w-md items-center justify-around gap-1 sm:justify-start sm:gap-2">
          <button
            type="button"
            disabled={disabled || disableCopy || isRegenerating}
            onClick={onCopy}
            title={copied ? "Copied" : "Copy post"}
            aria-label={copied ? "Copied to clipboard" : "Copy post to clipboard"}
            className={`group/copy inline-flex min-h-10 min-w-10 items-center justify-center gap-2 rounded-full px-3 transition-all duration-300 ease-out sm:min-w-[auto] sm:px-4 ${
              copied
                ? "text-solana-green"
                : "text-zinc-400 hover:bg-solana-purple/15 hover:text-solana-purple disabled:opacity-30"
            }`}
          >
            {copied ? (
              <IconCheck className="h-[18px] w-[18px] shrink-0 transition-opacity duration-200" />
            ) : (
              <IconCopy className="h-[18px] w-[18px] shrink-0 transition-transform duration-300 ease-out group-hover/copy:scale-110" />
            )}
            <span className="hidden text-xs font-medium sm:inline">
              {copied ? "Copied" : "Copy"}
            </span>
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={onRegenerate}
            title="Regenerate this post"
            className="inline-flex min-h-10 min-w-10 items-center justify-center gap-2 rounded-full px-3 text-zinc-400 transition-all duration-300 ease-out hover:bg-solana-green/10 hover:text-solana-green disabled:opacity-30 sm:min-w-[auto] sm:px-4"
          >
            <IconRefresh className="h-[18px] w-[18px] shrink-0" />
            <span className="hidden text-xs font-medium sm:inline">
              Regenerate
            </span>
          </button>
        </div>
      </div>

      <span className="sr-only">Post {index + 1}</span>
    </article>
  );
}

function Spinner({
  variant = "button",
}: {
  variant?: "button" | "inline";
}) {
  const cls =
    variant === "button"
      ? "border-2 border-black/20 border-t-black/90"
      : "border-2 border-solana-green/25 border-t-solana-green";
  return (
    <span
      className={`inline-block h-4 w-4 animate-spin rounded-full ${cls}`}
      aria-hidden
    />
  );
}

function LoadingSkeleton() {
  return (
    <div
      className="flex flex-col gap-4"
      aria-busy
      aria-label="Generating posts"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`sn-generate-shimmer relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0f12]/80 p-4`}
        >
          <div className="flex gap-3">
            <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-zinc-800" />
            <div className="min-w-0 flex-1 space-y-3">
              <div className="flex gap-2">
                <div className="h-3 w-28 animate-pulse rounded bg-zinc-800" />
                <div className="h-3 w-20 animate-pulse rounded bg-zinc-800/80" />
              </div>
              <div className="h-3 w-full animate-pulse rounded bg-zinc-800/70" />
              <div className="h-3 w-[90%] animate-pulse rounded bg-zinc-800/60" />
              <div className="h-3 w-[70%] animate-pulse rounded bg-zinc-800/50" />
              <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full w-2/5 animate-pulse rounded-full bg-solana-purple/40" />
              </div>
              <p className="font-mono text-[11px] text-zinc-600">··· / 280</p>
            </div>
          </div>
          <div className="mt-3 flex gap-2 border-t border-white/[0.05] pt-3">
            <div className="h-9 w-16 animate-pulse rounded-full bg-zinc-800/80" />
            <div className="h-9 w-24 animate-pulse rounded-full bg-zinc-800/80" />
          </div>
        </div>
      ))}
    </div>
  );
}

function IconCopy({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  );
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

function IconRefresh({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );
}

function IconBookmark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
      />
    </svg>
  );
}
