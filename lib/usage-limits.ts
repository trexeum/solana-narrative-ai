export type Plan = "free" | "pro" | "founder";

export const PLAN_LIMITS = {
  free: {
    dailyGenerations: 5,
    label: "Free",
  },
  pro: {
    monthlyGenerations: 300,
    label: "Pro",
    price: "$19/mo",
  },
  founder: {
    monthlyGenerations: 2000,
    label: "Founder",
    price: "$49/mo",
  },
};

export function getUserPlan(): Plan {
  return "free";
}