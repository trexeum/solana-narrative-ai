"use client";

const savedItems = [
  {
    type: "Post Generator",
    title: "Solana meme coin launch posts",
    content: "Solana CT is not ready for what’s coming next.",
  },
  {
    type: "Raid Replies",
    title: "Replies for launch tweet",
    content: "Quiet builders usually make the loudest waves.",
  },
  {
    type: "Narrative Finder",
    title: "NFT project positioning",
    content: "The community-first narrative: make it feel like a movement.",
  },
];

export default function SavedGenerationsPage() {
  return (
    <div className="min-h-screen bg-black px-8 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <div className="mb-3 inline-flex rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
            SAVED OUTPUTS
          </div>

          <h1 className="mb-4 text-5xl font-bold tracking-tight">
            Saved Generations
          </h1>

          <p className="max-w-2xl text-lg text-zinc-400">
            Review your best generated posts, replies, narratives, and calendars.
          </p>
        </div>

        <div className="space-y-4">
          {savedItems.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5"
            >
              <div className="mb-2 text-xs uppercase tracking-wider text-green-400">
                {item.type}
              </div>

              <h2 className="mb-2 text-xl font-semibold">{item.title}</h2>

              <p className="text-zinc-300">{item.content}</p>

              <button className="mt-4 rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:border-green-500 hover:text-white">
                Copy
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}