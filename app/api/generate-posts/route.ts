import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    posts: [
      "Solana CT is not ready for this one.",
      "Built on Solana because speed matters.",
      "Most projects chase hype. This one builds culture.",
      "Early users always see it before the timeline does.",
      "If you’re watching Solana closely, pay attention.",
    ],
  });
}
