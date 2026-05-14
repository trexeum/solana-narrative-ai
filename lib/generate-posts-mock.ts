import type { GeneratePostsRequest } from "./generate-posts-types";

function clip(s: string, max = 280): string {
  const t = s.trim();
  return t.length <= max ? t : t.slice(0, max - 1) + "…";
}

export function buildMockPosts(input: GeneratePostsRequest): string[] {
  const name = input.projectName.trim() || "the project";
  const ticker = (input.tokenTicker.trim() || "TICKER").toUpperCase().slice(0, 10);
  const tone = input.tone;

  const lines: string[] = [
    `${ticker} energy on Solana is different — shipping > shouting. ${name} is building where CT actually pays attention.`,
    `hot take: most L1 talk is noise. ${ticker} is a Solana-native bet on distribution + speed. not financial advice, just culture.`,
    `if you’re sleeping on ${name} (${ticker}) you’re missing the meta: tight loops, real users, on-chain receipts. dyor.`,
    `Solana summer isn’t a slogan — it’s composability. ${ticker} fits the stack where memes meet product. nfa.`,
    `${name} / $${ticker}: we’re not promising moon math — we’re here for the long game. community > cope. stay toxic (in a fun way).`,
  ];

  const toneSuffix: Record<string, string> = {
    bullish: " send it (metaphorically).",
    meme: " anyway chart is a vibe check.",
    degen: " probably nothing.",
    serious: " details in the repo / docs.",
  };

  return lines.map((base, i) =>
    clip(
      base +
        (tone === "meme" && i % 2 === 0 ? " gm gn idc." : "") +
        (toneSuffix[tone] ?? ""),
    ),
  );
}

export function buildMockSinglePost(
  input: GeneratePostsRequest,
  index: number,
): string {
  const all = buildMockPosts(input);
  const base = all[index % all.length];
  const spin = [
    "different angle:",
    "alt take:",
    "new hook:",
    "fresh line:",
    "rotation:",
  ][index % 5];
  return clip(`${spin} ${base}`);
}
