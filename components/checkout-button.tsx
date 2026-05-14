"use client";

export function CheckoutButton({
  plan,
  children,
  featured = false,
}: {
  plan: "free" | "pro" | "founder";
  children: React.ReactNode;
  featured?: boolean;
}) {
  async function handleClick() {
    if (plan === "free") {
      window.location.href = "/dashboard";
      return;
    }

    const res = await fetch("/api/ziina/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plan }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Checkout failed. Try again.");
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`mt-8 inline-flex h-11 items-center justify-center rounded-full text-sm font-semibold transition ${
        featured
          ? "bg-gradient-to-r from-solana-purple to-emerald-500 text-black hover:brightness-110"
          : "border border-white/15 text-white hover:border-solana-purple/40 hover:bg-white/[0.04]"
      }`}
    >
      {children}
    </button>
  );
}