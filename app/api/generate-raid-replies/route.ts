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
    const tweet = body.tweet || body.prompt || "crypto project update";

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are SolPulse, a crypto Twitter reply strategist. Generate short, viral, high-engagement replies for blockchain founders. Make them natural, punchy, confident, and not cringe. No hate, no slurs, no scams, no financial advice.",
        },
        {
          role: "user",
          content: `Generate 5 raid-ready replies to this tweet or idea: ${tweet}`,
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

    return NextResponse.json({
      replies,
      plan,
      upgradeMessage:
        plan === "free"
          ? "Free users get 5 generations/day. Upgrade soon for more."
          : null,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to generate replies" },
      { status: 500 }
    );
  }
}