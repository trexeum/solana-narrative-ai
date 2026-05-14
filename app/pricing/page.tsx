export default function PricingPage() {
    const plans = [
      {
        name: "Free",
        price: "$0",
        features: [
          "5 generations/day",
          "Basic narrative radar",
          "Limited raid replies",
        ],
      },
      {
        name: "Pro",
        price: "$19/mo",
        features: [
          "300 generations/month",
          "Advanced narrative radar",
          "Priority generations",
          "Unlimited raid replies",
        ],
      },
      {
        name: "Founder",
        price: "$49/mo",
        features: [
          "2000 generations/month",
          "Early alpha signals",
          "Premium radar access",
          "Future API access",
        ],
      },
    ];
  
    return (
      <div className="min-h-screen bg-black px-8 py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-6xl font-bold">Pricing</h1>
  
            <p className="mt-4 text-zinc-400 text-lg">
              Choose the plan built for your growth on CT.
            </p>
          </div>
  
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8"
              >
                <h2 className="text-3xl font-bold">{plan.name}</h2>
  
                <div className="mt-4 text-5xl font-bold">
                  {plan.price}
                </div>
  
                <div className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="rounded-xl bg-black px-4 py-3 text-zinc-300"
                    >
                      {feature}
                    </div>
                  ))}
                </div>
  
                <button className="mt-8 w-full rounded-2xl bg-green-500 px-5 py-4 font-semibold text-black">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
