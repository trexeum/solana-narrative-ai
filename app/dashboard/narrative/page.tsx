"use client";

import { useState } from "react";

export default function NarrativeFinderPage() {
  const [project, setProject] = useState("");
  const [category, setCategory] = useState("meme");
  const [angles, setAngles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  function generateNarratives() {
    setLoading(true);
    setAngles([]);

    setTimeout(() => {
      setAngles([
        "The Solana-native speed narrative: position the project as built for users who want fast, low-friction crypto experiences.",
        "The community-first narrative: make the token feel like a movement, not just another chart.",
        "The early meta narrative: frame the project as catching a trend before CT fully notices it.",
      ]);
      setLoading(false);
    }, 900);
  }

  return (
    <div className="min-h-screen bg-black px-8 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <div className="mb-3 inline-flex rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400">
            NARRATIVE TOOL
          </div>

          <h1 className="mb-4 text-5xl font-bold tracking-tight">
            Narrative Finder
          </h1>

          <p className="max-w-2xl text-lg text-zinc-400">
            Find sharp Solana positioning angles for your token or project.
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
          <input
            value={project}
            onChange={(e) => setProject(e.target.value)}
            placeholder="Describe your Solana project..."
            className="mb-4 w-full rounded-2xl border border-zinc-800 bg-black p-5 text-white outline-none focus:border-purple-500/50"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mb-5 w-full rounded-2xl border border-zinc-800 bg-black p-5 text-white outline-none"
          >
            <option value="meme">Meme</option>
            <option value="defi">DeFi</option>
            <option value="ai">AI</option>
            <option value="depin">DePIN</option>
            <option value="gaming">Gaming</option>
            <option value="nft">NFT</option>
          </select>

          <button
            onClick={generateNarratives}
            disabled={loading || !project.trim()}
            className="rounded-2xl bg-purple-500 px-6 py-3 font-semibold text-white transition hover:bg-purple-400 disabled:opacity-50"
          >
            {loading ? "Finding..." : "Find Narratives"}
          </button>
        </div>

        {angles.length > 0 && (
          <div className="mt-10 space-y-4">
            {angles.map((angle, index) => (
              <div
                key={index}
                className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5"
              >
                <div className="mb-2 text-xs uppercase tracking-wider text-purple-400">
                  Narrative #{index + 1}
                </div>
                <p className="text-lg text-zinc-100">{angle}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}