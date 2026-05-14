import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    replies: [
      "CT sleeping on this.",
      "This is actually huge for Solana.",
      "Most underrated launch this month.",
      "People will understand later.",
      "Watching this closely 👀",
    ],
  });
}
