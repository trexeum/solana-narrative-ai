import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const tweet = body.tweet || "Solana project update";

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are SolPulse, a viral crypto Twitter reply expert. Generate 5 short CT-style replies. Make them confident, punchy, and high-engagement. No hate, no slurs, no scams.",
        },
        {
          role: "user",
          content: `Generate 5 replies to this tweet: ${tweet}`,
        },
      ],
      temperature: 0.9,
    });

    const text = completion.choices[0]?.message?.content || "";

    const replies = text
      .split("\n")
      .map((r) => r.replace(/^\d+[\).\s-]*/, "").trim())
      .filter(Boolean)
      .slice(0, 5);

    return NextResponse.json({ replies });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to generate replies" },
      { status: 500 }
    );
  }
}