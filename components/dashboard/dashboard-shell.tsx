"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { dashboardNavItems } from "./nav-config";

function LogoMark() {
  return (
    <div
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-solana-purple to-emerald-400 shadow-[0_0_20px_-4px_rgba(20,241,149,0.5)]"
      aria-hidden
    >
      <span className="font-mono text-sm font-bold text-black">S</span>
    </div>
  );
}

function GridBackdrop() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(153,69,255,0.22),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_100%_50%,rgba(20,241,149,0.06),transparent)]" />
      <div
        className="absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}

function GuestButton() {
  return (
    <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">
      Guest
    </div>
  );
}

function NavLink({
  href,
  label,
  active,
  onNavigate,
}: {
  href: string;
  label: string;
  active: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`group flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-300 ease-out ${
        active
          ? "border-solana-purple/40 bg-gradient-to-r from-solana-purple/15 to-emerald-500/10 text-white shadow-[0_0_24px_-8px_rgba(153,69,255,0.45)]"
          : "border-transparent text-zinc-400 hover:border-white/[0.08] hover:bg-white/[0.04] hover:text-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300 ${
          active
            ? "bg-solana-green shadow-[0_0_10px_#14f195]"
            : "bg-zinc-600 group-hover:bg-solana-purple"
        }`}
      />
      {label}
    </Link>
  );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <div className="relative min-h-screen bg-black text-zinc-100">
      <GridBackdrop />

      <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-3 border-b border-white/[0.06] bg-black/65 px-4 backdrop-blur-xl lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition hover:border-solana-purple/35 hover:bg-white/[0.07]"
          aria-expanded={mobileOpen}
          aria-controls="dashboard-sidebar"
          aria-label="Open navigation menu"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>

        <Link
          href="/dashboard"
          className="flex min-w-0 flex-1 items-center justify-center gap-2"
        >
          <LogoMark />
          <span className="truncate text-sm font-semibold text-white">
            SolanaNarrativeAI
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-2">
          <GuestButton />
          <Link
            href="/"
            className="text-xs font-medium text-zinc-500 transition hover:text-solana-green"
          >
            Home
          </Link>
        </div>
      </header>

      <button
        type="button"
        aria-label="Close menu"
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      <div className="flex min-h-[calc(100vh-3.5rem)] lg:min-h-screen">
        <aside
          id="dashboard-sidebar"
          className={`fixed inset-y-0 left-0 z-50 flex w-[min(100vw-3rem,17.5rem)] flex-col border-r border-white/[0.06] bg-[#050508]/90 backdrop-blur-2xl transition-transform duration-300 ease-out lg:static lg:w-64 lg:translate-x-0 lg:bg-black/40 ${
            mobileOpen
              ? "translate-x-0 shadow-[8px_0_48px_-12px_rgba(153,69,255,0.35)]"
              : "-translate-x-full"
          }`}
        >
          <div className="flex h-14 items-center gap-3 border-b border-white/[0.06] px-4 lg:h-auto lg:flex-col lg:items-stretch lg:gap-4 lg:border-b-0 lg:p-6">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-xl transition hover:bg-white/[0.04]"
              onClick={() => setMobileOpen(false)}
            >
              <LogoMark />
              <div className="min-w-0 leading-tight">
                <p className="truncate text-sm font-semibold text-white">
                  SolanaNarrativeAI
                </p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                  Dashboard
                </p>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="ml-auto rounded-lg p-2 text-zinc-500 transition hover:bg-white/10 hover:text-white lg:hidden"
              aria-label="Close navigation menu"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4 pt-2 lg:pt-0">
            <p className="mb-2 px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              Workspace
            </p>

            {dashboardNavItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                active={pathname === item.href}
                onNavigate={() => setMobileOpen(false)}
              />
            ))}
          </nav>

          <div className="border-t border-white/[0.06] p-4">
            <div className="mb-3 flex justify-center lg:justify-start">
              <GuestButton />
            </div>

            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] py-2.5 text-xs font-medium text-zinc-400 transition duration-300 hover:border-solana-purple/30 hover:text-white"
            >
              ← Back to landing
            </Link>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:py-10">
          <div className="mx-auto max-w-5xl">{children}</div>
        </main>
      </div>
    </div>
  );
}