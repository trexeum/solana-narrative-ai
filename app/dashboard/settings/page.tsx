"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [username, setUsername] = useState("SolanaNarrativeAI");
  const [tone, setTone] = useState("Aggressive CT");
  const [apiKey, setApiKey] = useState("");

  return (
    <div className="min-h-screen bg-black px-8 py-12 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <div className="mb-3 inline-flex rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
            SETTINGS
          </div>

          <h1 className="mb-4 text-5xl font-bold tracking-tight">
            Settings
          </h1>

          <p className="max-w-2xl text-lg text-zinc-400">
            Customize your Solana content workflow and AI preferences.
          </p>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <label className="mb-2 block text-sm text-zinc-400">
              Project Name
            </label>

            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 outline-none focus:border-green-500"
            />
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <label className="mb-2 block text-sm text-zinc-400">
              Default Tone
            </label>

            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 outline-none focus:border-green-500"
            >
              <option>Aggressive CT</option>
              <option>Community First</option>
              <option>Professional</option>
              <option>Meme Style</option>
            </select>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <label className="mb-2 block text-sm text-zinc-400">
              OpenAI API Key
            </label>

            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 outline-none focus:border-green-500"
            />

            <p className="mt-3 text-sm text-zinc-500">
              Connect your OpenAI account to enable live AI generations.
            </p>
          </div>

          <button className="rounded-2xl bg-green-500 px-6 py-4 font-semibold text-black transition hover:opacity-90">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}