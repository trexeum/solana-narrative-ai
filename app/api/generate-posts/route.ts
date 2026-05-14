import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const topic = body.topic || body.prompt || "Solana crypto project";

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are SolPulse, an expert crypto content strategist. Generate short, viral, high-energy X posts for crypto founders and Solana CT. Keep them sharp, natural, and not cringe.",
        },
        {
          role: "user",
          content: `Generate 5 X posts about: ${topic}`,
        },
      ],
      temperature: 0.9,
    });

    const text = completion.choices[0]?.message?.content || "";

    const posts = text
      .split("\n")
      .map((p) => p.replace(/^\d+[\).\s-]*/, "").trim())
      .filter(Boolean)
      .slice(0, 5);

    return NextResponse.json({ posts });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to generate posts" },
      { status: 500 }
    );
  }
}
