"use client";

import { useEffect, useState } from "react";

const initialSignals = [
  {
    token: "BONK",
    score: 96,
    momentum: "+230%",
    posts: 1842,
    status: "Exploding",
  },
  {
    token: "WIF",
    score: 91,
    momentum: "+180%",
    posts: 1294,
    status: "Early",
  },
  {
    token: "POPCAT",
    score: 87,
    momentum: "+122%",
    posts: 932,
    status: "Accumulating",
  },
  {
    token: "MEW",
    score: 82,
    momentum: "+88%",
    posts: 611,
    status: "Watch Closely",
  },
];

const narratives = [
  {
    name: "Solana AI Agents",
    score: 92,
    status: "Hot",
    explanation:
      "AI agent projects on Solana are getting heavy attention from CT and builders.",
    angle:
      "Position your project as part of the AI x Solana execution layer before the meta gets crowded.",
  },
  {
    name: "Meme Utility",
    score: 86,
    status: "Rising",
    explanation:
      "Memecoins with simple utility narratives are outperforming pure joke launches.",
    angle:
      "Frame the project as culture first, but with a reason to keep coming back.",
  },
  {
    name: "Founder-Led Tokens",
    score: 81,
    status: "Early",
    explanation:
      "Communities are rewarding founders that post constantly and build publicly.",
    angle:
      "Turn the founder into the main character of the project.",
  },
];

export default function NarrativeRadarPage() {
  const [signals, setSignals] = useState(initialSignals);
  const [scanCount, setScanCount] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setSignals((prev) =>
        prev.map((signal) => ({
          ...signal,
          score: Math.min(
            99,
            Math.max(70, signal.score + Math.floor(Math.random() * 3 - 1))
          ),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  function runScan() {
    if (scanCount > 0) {
      setScanCount(scanCount - 1);
    }
  }

  return (
    <div className="min-h-screen bg-black px-8 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <div className="inline-flex rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1 text-sm text-purple-300">
            LIVE META TRACKER
          </div>

          <h1 className="mt-4 text-5xl font-bold tracking-tight">
            Narrative Radar
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-zinc-400">
            Track emerging Solana narratives before they become overcrowded.
            Built for creators, founders, and CT operators.
          </p>

          <div className="mt-6 rounded-2xl border border-green-500/20 bg-green-500/10 p-4 text-green-300">
            You have {scanCount} free beta scans left today.
          </div>

          <button
            onClick={runScan}
            className="mt-4 rounded-2xl bg-green-500 px-6 py-3 font-semibold text-black hover:opacity-90"
          >
            Run Narrative Scan
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {signals.map((coin) => (
            <div
              key={coin.token}
              className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 transition hover:border-purple-500/40"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-3xl font-bold">${coin.token}</div>
                  <div className="mt-2 text-sm text-zinc-500">
                    Narrative strength: {coin.score}/100
                  </div>
                </div>

                <div className="rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-400">
                  {coin.status}
                </div>
              </div>

              <div className="mt-8">
                <div className="text-4xl font-bold text-green-400">
                  {coin.momentum}
                </div>
                <div className="mt-1 text-sm text-zinc-500">
                  momentum velocity
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-zinc-800 pt-4 text-sm">
                <span className="text-zinc-500">Posts detected</span>
                <span className="font-semibold">{coin.posts}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div>
            <h2 className="text-3xl font-bold">Trending Narratives</h2>

            <div className="mt-6 space-y-6">
              {narratives.map((narrative) => (
                <div
                  key={narrative.name}
                  className="rounded-3xl border border-zinc-800 bg-zinc-950 p-7"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold">{narrative.name}</h3>
                      <p className="mt-2 text-zinc-500">
                        Signal Score: {narrative.score}/100
                      </p>
                    </div>

                    <div className="rounded-full bg-purple-500/10 px-4 py-2 text-purple-300">
                      {narrative.status}
                    </div>
                  </div>

                  <div className="mt-6 grid gap-5 md:grid-cols-2">
                    <div className="rounded-2xl border border-zinc-800 bg-black p-5">
                      <p className="text-xs uppercase tracking-widest text-zinc-500">
                        Why it matters
                      </p>
                      <p className="mt-3 text-zinc-300">
                        {narrative.explanation}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5">
                      <p className="text-xs uppercase tracking-widest text-purple-300">
                        Strategic angle
                      </p>
                      <p className="mt-3 text-zinc-200">{narrative.angle}</p>
                    </div>
                  </div>

                  <button className="mt-6 rounded-2xl border border-zinc-700 px-5 py-3 font-semibold hover:bg-zinc-900">
                    Generate Posts From This
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="h-fit rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs text-green-400">
              PREMIUM PREVIEW
            </div>

            <h2 className="mt-4 text-2xl font-bold">Locked Alpha Signals</h2>

            <p className="mt-3 text-zinc-400">
              Premium users will get early alerts, hidden narratives, creator
              angles, and daily CT watchlists.
            </p>

            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-zinc-800 bg-black p-4 blur-[1px]">
                Hidden narrative detected: Solana DePIN comeback
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-black p-4 blur-[1px]">
                Whale CT accounts discussing new AI meta
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-black p-4 blur-[1px]">
                Early meme rotation forming
              </div>
            </div>

            <button className="mt-6 w-full rounded-2xl bg-purple-500 px-5 py-3 font-semibold text-white">
              Unlock Premium Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}