import { NextResponse } from "next/server";

const ZIINA_API_URL = "https://api-v2.ziina.com/api/payment_intent";

export async function POST(req) {
  try {
    const body = await req.json();
    const plan = body.plan;

    if (!process.env.ZIINA_API_KEY) {
      return NextResponse.json(
        { error: "Missing Ziina API key" },
        { status: 500 }
      );
    }

    const amount = plan === "founder" ? 4900 : 1900;

    const response = await fetch(ZIINA_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ZIINA_API_KEY}`,
      },
      body: JSON.stringify({
        amount,
        currency_code: "USD",
        test: false,
        success_url: "https://www.solpulse.space/dashboard?payment=success",
        cancel_url: "https://www.solpulse.space/?payment=cancelled",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Ziina error:", data);

      return NextResponse.json(
        { error: "Ziina checkout failed", details: data },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: data.redirect_url,
      paymentIntentId: data.id,
    });
  } catch (error) {
    console.error("Server error:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}