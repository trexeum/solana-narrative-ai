import type { Metadata } from "next";
import { GeneratePostsTool } from "@/components/dashboard/generate-posts-tool";

export const metadata: Metadata = {
  title: "Generate Posts — SolanaNarrativeAI",
  description:
    "Generate viral Solana-native X posts with tone controls and instant copy.",
};

export default function GeneratePostsPage() {
  return <GeneratePostsTool />;
}
