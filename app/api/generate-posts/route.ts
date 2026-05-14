import OpenAI from "openai";
import { NextResponse } from "next/server";
import { getUserPlan } from "@/lib/usage-limits";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const plan = getUserPlan();
    const body = await req.json();
    const topic = body.topic || body.prompt || "crypto project";

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are SolPulse, a crypto-native content strategist. Generate sharp, viral X posts for blockchain founders. Make them natural, punchy, high-conviction, and not cringe. No fake guarantees. No financial advice.",
        },
        {
          role: "user",
          content: `Generate 5 launch-ready X posts about: ${topic}`,
        },
      ],
      temperature: 0.85,
    });

    const text = completion.choices[0]?.message?.content || "";

    const posts = text
      .split("\n")
      .map((p) => p.replace(/^\d+[\).\s-]*/, "").trim())
      .filter(Boolean)
      .slice(0, 5);

    return NextResponse.json({
      posts,
      plan,
      upgradeMessage:
        plan === "free"
          ? "Free users get 5 generations/day. Upgrade soon for more."
          : null,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to generate posts" },
      { status: 500 }
    );
  }
}
