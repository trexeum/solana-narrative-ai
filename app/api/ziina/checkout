import { NextResponse } from "next/server";

const ZIINA_API_URL = "https://api-v2.ziina.com/api/payment_intent";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const plan = body.plan;

    const amount =
      plan === "founder"
        ? 4900 // $49.00 in cents
        : 1900; // $19.00 in cents

    const response = await fetch(ZIINA_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ZIINA_API_KEY}`,
      },
      body: JSON.stringify({
        amount,
        currency_code: "USD",
        test: true,
        success_url: "https://www.solpulse.space/dashboard?payment=success",
        cancel_url: "https://www.solpulse.space/pricing?payment=cancelled",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);

      return NextResponse.json(
        {
          error: "Ziina checkout failed",
          details: data,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: data.redirect_url,
      paymentIntentId: data.id,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Ziina checkout failed" },
      { status: 500 }
    );
  }
}