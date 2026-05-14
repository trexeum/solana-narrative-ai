"use client";

import { useState } from "react";

const mockCalendar = [
  {
    day: "Day 1",
    theme: "Origin Story",
    post: "Tell people why the project exists and what problem it solves on Solana.",
  },
  {
    day: "Day 2",
    theme: "Community Angle",
    post: "Post about the type of people your token is built for.",
  },
  {
    day: "Day 3",
    theme: "Meme Push",
    post: "Drop a short meme-style post that makes the project feel native to CT.",
  },
  {
    day: "Day 4",
    theme: "Narrative Day",
    post: "Connect your project to a Solana meta like speed, degen culture, DeFi, or AI.",
  },
  {
    day: "Day 5",
    theme: "Founder Energy",
    post: "Share conviction: why you’re building, why now, why Solana.",
  },
  {
    day: "Day 6",
    theme: "Raid Day",
    post: "Create 5 short replies your community can use under big Solana tweets.",
  },
  {
    day: "Day 7",
    theme: "CTA Push",
    post: "Tell people exactly what to do next: follow, join, mint, test, or share.",
  },
];

export default function ContentCalendarPage() {
  const [project, setProject] = useState("");
  const [goal, setGoal] = useState("community growth");
  const [calendar, setCalendar] = useState<typeof mockCalendar>([]);
  const [loading, setLoading] = useState(false);

  function generateCalendar() {
    setLoading(true);
    setCalendar([]);

    setTimeout(() => {
      setCalendar(mockCalendar);
      setLoading(false);
    }, 900);
  }

  return (
    <div className="min-h-screen bg-black px-8 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <div className="mb-3 inline-flex rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
            CONTENT SYSTEM
          </div>

          <h1 className="mb-4 text-5xl font-bold tracking-tight">
            7-Day Content Calendar
          </h1>

          <p className="max-w-2xl text-lg text-zinc-400">
            Build a full week of Solana-native content ideas for your token.
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <input
            value={project}
            onChange={(e) => setProject(e.target.value)}
            placeholder="Describe your Solana project..."
            className="mb-4 w-full rounded-2xl border border-zinc-800 bg-black p-5 text-white outline-none"
          />

          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="mb-5 w-full rounded-2xl border border-zinc-800 bg-black p-5 text-white outline-none"
          >
            <option>community growth</option>
            <option>launch hype</option>
            <option>presale</option>
            <option>post-launch traction</option>
            <option>brand awareness</option>
          </select>

          <button
            onClick={generateCalendar}
            disabled={loading || !project.trim()}
            className="rounded-2xl bg-green-500 px-6 py-3 font-semibold text-black disabled:opacity-50"
          >
            {loading ? "Building..." : "Generate Calendar"}
          </button>
        </div>

        <div className="mt-10 grid gap-4">
          {calendar.map((item) => (
            <div
              key={item.day}
              className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5"
            >
              <div className="mb-2 text-xs uppercase tracking-wider text-green-400">
                {item.day} · {item.theme}
              </div>
              <p className="text-lg text-zinc-100">{item.post}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}