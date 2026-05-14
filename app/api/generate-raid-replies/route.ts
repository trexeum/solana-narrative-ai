import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { tweet } = await req.json();

    if (!tweet) {
      return NextResponse.json(
        { error: "Tweet is required" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a viral Solana crypto Twitter expert. Generate 5 short aggressive high-engagement raid replies. Only output the replies. No numbering.",
        },
        {
          role: "user",
          content: tweet,
        },
      ],
      temperature: 0.9,
    });

    const text = completion.choices[0].message.content || "";

    const replies = text
      .split("\n")
      .map((r) => r.trim())
      .filter(Boolean);

    return NextResponse.json({ replies });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to generate replies" },
      { status: 500 }
    );
  }
}