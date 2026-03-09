import {
  BarChart3,
  BriefcaseBusiness,
  ClipboardList,
  FileClock,
  FolderKanban,
  LayoutDashboard,
} from "lucide-react";
import mockData from "./mockData.json";
import type { AdminMockData } from "../types/admin";

export const adminMockData = mockData as AdminMockData;

export const adminNavItems = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard, end: true },
  { label: "Inquiries", to: "/admin/inquiries", icon: ClipboardList, end: false },
  { label: "Projects", to: "/admin/projects", icon: FolderKanban, end: false },
  { label: "Insights", to: "/admin/insights", icon: BarChart3, end: false },
] as const;

export const adminSummaryCards = [
  {
    title: "Total inquiries",
    value: adminMockData.summary.totalInquiries,
    detail: "Lead requests captured across all channels",
    icon: BriefcaseBusiness,
    gradient: "from-sky-500 via-cyan-400 to-emerald-300",
  },
  {
    title: "Active projects",
    value: adminMockData.summary.activeProjects,
    detail: "Projects currently in sizing, procurement, or delivery",
    icon: FolderKanban,
    gradient: "from-slate-900 via-slate-700 to-slate-500",
  },
  {
    title: "Website visits",
    value: adminMockData.summary.websiteVisits.toLocaleString(),
    detail: "Sessions recorded across homepage, store, and contact flow",
    icon: BarChart3,
    gradient: "from-amber-500 via-orange-400 to-rose-300",
  },
  {
    title: "Pending quotes",
    value: adminMockData.summary.pendingQuotes,
    detail: "High-intent inquiries waiting for commercial response",
    icon: FileClock,
    gradient: "from-emerald-600 via-green-500 to-lime-300",
  },
] as const;
