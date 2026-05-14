export const TONE_OPTIONS = [
  "bullish",
  "meme",
  "degen",
  "serious",
] as const;

export type ToneStyle = (typeof TONE_OPTIONS)[number];

export type GeneratePostsRequest = {
  projectName: string;
  tokenTicker: string;
  projectDescription: string;
  targetAudience: string;
  competitorTokens: string;
  tone: ToneStyle;
  /** If set, API returns one replacement post at this index (client merges). */
  replaceIndex?: number | null;
};

export type GeneratePostsResponse = {
  posts: string[];
  /** true when OpenAI was not configured */
  mock?: boolean;
};
