import { dark } from "@clerk/themes";

export const clerkAppearance = {
  baseTheme: dark,
  variables: {
    colorPrimary: "#9945ff",
    colorSuccess: "#14f195",
    colorDanger: "#f87171",
    colorText: "#f4f4f5",
    colorTextSecondary: "#a1a1aa",
    colorBackground: "#030303",
    colorInputBackground: "#0a0a0d",
    colorInputText: "#fafafa",
    colorNeutral: "#3f3f46",
    borderRadius: "0.75rem",
    fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
  },
  elements: {
    rootBox: "mx-auto w-full max-w-md",
    card: "border border-white/[0.08] bg-[#0c0c10]/95 shadow-[0_0_48px_-20px_rgba(153,69,255,0.35)] backdrop-blur-xl",
    headerTitle: "text-white tracking-tight",
    headerSubtitle: "text-zinc-400",
    socialButtonsBlockButton:
      "border border-white/10 bg-white/[0.03] text-zinc-100 transition hover:bg-white/[0.07]",
    formButtonPrimary:
      "bg-gradient-to-r from-[#9945ff] to-emerald-500 text-black font-semibold shadow-[0_0_24px_-8px_rgba(153,69,255,0.5)] hover:brightness-110",
    formFieldInput:
      "border-white/10 bg-black/50 text-white placeholder:text-zinc-600",
    formFieldLabel: "text-zinc-300",
    footerActionLink: "text-solana-green hover:text-emerald-300",
    identityPreviewText: "text-white",
    identityPreviewEditButton: "text-solana-purple",
    userButtonPopoverCard: "border border-white/10 bg-[#0c0c10]",
    userButtonPopoverActionButton: "text-zinc-200 hover:bg-white/10",
    userButtonPopoverActionButtonText: "text-zinc-200",
    userButtonPopoverFooter: "hidden",
  },
};
