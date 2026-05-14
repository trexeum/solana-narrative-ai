"use client";

import { useState } from "react";

export default function RaidRepliesPage() {
  const [tweet, setTweet] = useState("");
  const [replies, setReplies] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateReplies() {
    if (!tweet.trim()) return;

    setLoading(true);
    setError("");
    setReplies([]);

    try {
      const res = await fetch("/api/generate-raid-replies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tweet,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate replies");
      }

      setReplies(data.replies || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function copyReply(reply: string) {
    navigator.clipboard.writeText(reply);
  }

  return (
    <div className="min-h-screen bg-black px-8 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <div className="mb-3 inline-flex rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
            SOLANA CT TOOL
          </div>

          <h1 className="mb-4 text-5xl font-bold tracking-tight">
            Raid Reply Generator
          </h1>

          <p className="max-w-2xl text-lg text-zinc-400">
            Generate aggressive, viral, high-engagement Solana CT replies in
            seconds.
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
          <textarea
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
            placeholder="Paste the tweet you want to raid..."
            className="h-48 w-full resize-none rounded-2xl border border-zinc-800 bg-black p-5 text-base text-white outline-none transition focus:border-green-500/50"
          />

          <div className="mt-5 flex items-center justify-between">
            <p className="text-sm text-zinc-500">
              {tweet.length} characters
            </p>

            <button
              onClick={generateReplies}
              disabled={loading || !tweet.trim()}
              className="rounded-2xl bg-green-500 px-6 py-3 font-semibold text-black transition hover:scale-[1.02] hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate Replies"}
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
            {error}
          </div>
        )}

        {replies.length > 0 && (
          <div className="mt-10 space-y-4">
            {replies.map((reply, index) => (
              <div
                key={index}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-5 transition hover:border-green-500/30"
              >
                <div>
                  <div className="mb-2 text-xs uppercase tracking-wider text-green-400">
                    Reply #{index + 1}
                  </div>

                  <p className="text-lg text-zinc-100">{reply}</p>
                </div>

                <button
                  onClick={() => copyReply(reply)}
                  className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:border-green-500 hover:text-white"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
