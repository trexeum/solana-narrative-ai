import Link from "next/link";

export function AuthLandingNav() {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Link
        href="/dashboard"
        className="rounded-full border border-white/10 px-3 py-2 text-sm text-zinc-300 hover:text-white"
      >
        Dashboard
      </Link>
      <div className="rounded-full border border-white/10 px-3 py-2 text-sm text-white/70">
        Guest
      </div>
    </div>
  );
}