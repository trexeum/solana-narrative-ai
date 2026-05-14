"use client";

type Props = {
  children: React.ReactNode;
  plan: "free" | "pro" | "founder";
  featured?: boolean;
};

export function CheckoutButton({ children, plan, featured = false }: Props) {
  async function handleCheckout() {
    if (plan === "free") {
      window.location.href = "/sign-up";
      return;
    }

    const response = await fetch("/api/ziina", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plan }),
    });

    const data = await response.json();

    if (!response.ok || !data.url) {
      console.error("Checkout failed:", data);
      alert(data.error || "Payment failed. Check Vercel logs.");
      return;
    }

    window.location.href = data.url;
  }

  return (
    <button
      type="button"
      onClick={handleCheckout}
      className={`mt-10 w-full rounded-full px-6 py-4 font-semibold transition ${
        featured
          ? "bg-gradient-to-r from-solana-purple to-emerald-400 text-black"
          : "border border-white/10 bg-white/[0.03] text-white hover:border-solana-purple/40"
      }`}
    >
      {children}
    </button>
  );
}