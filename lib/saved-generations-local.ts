import type { GeneratePostsRequest } from "./generate-posts-types";

const STORAGE_KEY = "solana-narrative-ai:saved-generate-batches";
const MAX_BATCHES = 40;

export type SavedGenerateBatch = {
  id: string;
  savedAt: string;
  context: Omit<GeneratePostsRequest, "replaceIndex">;
  posts: string[];
};

function safeParse(raw: string | null): SavedGenerateBatch[] {
  if (!raw) return [];
  try {
    const data = JSON.parse(raw) as unknown;
    if (!Array.isArray(data)) return [];
    return data.filter(
      (x): x is SavedGenerateBatch =>
        x &&
        typeof x === "object" &&
        typeof (x as SavedGenerateBatch).id === "string" &&
        typeof (x as SavedGenerateBatch).savedAt === "string" &&
        Array.isArray((x as SavedGenerateBatch).posts),
    );
  } catch {
    return [];
  }
}

export function loadSavedGenerateBatches(): SavedGenerateBatch[] {
  if (typeof window === "undefined") return [];
  return safeParse(localStorage.getItem(STORAGE_KEY));
}

export function saveGenerateBatchLocal(input: {
  context: Omit<GeneratePostsRequest, "replaceIndex">;
  posts: string[];
}): SavedGenerateBatch {
  const batch: SavedGenerateBatch = {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    savedAt: new Date().toISOString(),
    context: input.context,
    posts: input.posts.slice(0, 5),
  };

  if (typeof window === "undefined") return batch;

  const prev = safeParse(localStorage.getItem(STORAGE_KEY));
  const next = [batch, ...prev].slice(0, MAX_BATCHES);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return batch;
}
