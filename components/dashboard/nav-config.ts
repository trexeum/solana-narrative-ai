export type DashboardNavItem = {
  href: string;
  label: string;
};

export const dashboardNavItems: DashboardNavItem[] = [
  { href: "/dashboard/generate", label: "Generate Posts" },
  { href: "/dashboard/raid-replies", label: "Raid Replies" },
  { href: "/dashboard/narrative", label: "Narrative Finder" },
  { href: "/dashboard/calendar", label: "Content Calendar" },
  { href: "/dashboard/saved", label: "Saved Generations" },
  { href: "/dashboard/settings", label: "Settings" },
];
