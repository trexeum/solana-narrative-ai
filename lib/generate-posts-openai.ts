import type { GeneratePostsRequest } from "./generate-posts-types";

const SYSTEM = `You write short posts for X (Twitter) aimed at crypto/Solana audiences.

Rules (must follow):
- Each post MUST be under 280 characters (strict).
- Solana-native voice: CT culture, builders, on-chain apps, memes where appropriate — never generic corporate marketing.
- No financial guarantees, no "guaranteed returns", no "100x", no pump promises.
- No scam language (no "airdrop confirmed", no fake urgency tricks).
- No fake partnerships, no invented endorsements or celebrity/investor claims.
- No personalized investment advice; you may use "not financial advice" / "nfa" sparingly, not every line.
- No securities-style solicitation.
- Output valid JSON only, no markdown fences.

Return shape: {"posts": string[]} — array of post strings.`;

function userPayload(input: GeneratePostsRequest, count: 5 | 1): string {
  const competitors = input.competitorTokens.trim() || "(none listed)";
  const audience = input.targetAudience.trim() || "Solana CT / builders";

  if (count === 1 && input.replaceIndex != null) {
    return `Project: ${input.projectName.trim()}
Ticker: ${input.tokenTicker.trim()}
Description: ${input.projectDescription.trim()}
Audience: ${audience}
Competitor Solana tokens (for positioning, not to claim affiliation): ${competitors}
Tone style: ${input.tone}

Generate exactly ONE fresh replacement post (same constraints). Variation ${input.replaceIndex + 1}.
Return JSON: {"posts": ["..."]} with a single string in the array.`;
  }

  return `Project: ${input.projectName.trim()}
Ticker: ${input.tokenTicker.trim()}
Description: ${input.projectDescription.trim()}
Audience: ${audience}
Competitor Solana tokens (for positioning only, never claim partnerships): ${competitors}
Tone style: ${input.tone}

Generate exactly 5 distinct posts. Each must feel different (hook, angle, or format).
Return JSON: {"posts": ["...","...","...","...","..."]}`;
}

function parsePostsJson(content: string): string[] {
  let trimmed = content.trim();
  if (trimmed.startsWith("```")) {
    trimmed = trimmed.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
  }
  const parsed = JSON.parse(trimmed) as { posts?: unknown };
  if (!parsed || !Array.isArray(parsed.posts)) {
    throw new Error("Invalid JSON: missing posts array");
  }
  const posts = parsed.posts
    .filter((p): p is string => typeof p === "string")
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => (p.length > 280 ? p.slice(0, 277) + "..." : p));
  return posts;
}

export async function generatePostsWithOpenAI(
  apiKey: string,
  input: GeneratePostsRequest,
): Promise<string[]> {
  const replace =
    typeof input.replaceIndex === "number" &&
    input.replaceIndex >= 0 &&
    input.replaceIndex <= 4;
  const count: 5 | 1 = replace ? 1 : 5;

  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.85,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: userPayload(input, count) },
      ],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenAI error ${res.status}: ${errText.slice(0, 500)}`);
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("Empty OpenAI response");

  const posts = parsePostsJson(content);
  if (replace) {
    if (posts.length < 1) throw new Error("Expected 1 post");
    return [posts[0]];
  }
  if (posts.length < 5) {
    while (posts.length < 5) {
      posts.push(posts[posts.length - 1] ?? "Building on Solana.");
    }
  }
  return posts.slice(0, 5);
}
