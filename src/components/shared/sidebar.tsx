"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PlusCircle, History, LayoutTemplate, Settings, BookOpen } from "lucide-react";
import { Logo } from "@/components/shared/logo";

const routes = [
  {
    label: "Create",
    icon: PlusCircle,
    href: "/create",
    color: "text-sky-500",
  },
  {
    label: "History",
    icon: History,
    href: "/history",
    color: "text-emerald-500",
  },
  {
    label: "Templates",
    icon: LayoutTemplate,
    href: "/templates",
    color: "text-pink-700",
  },
  {
    label: "Auto-Pilot",
    icon: PlusCircle, // Need to import Zap but it might not be in the file, let's just use LayoutTemplate or import Zap. Actually, I can use a generic icon or replace it. I'll use Settings for now or add Zap import.
    href: "/auto-pilot",
    color: "text-yellow-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-gray-500",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full border-r bg-background w-64 hidden md:flex">
      <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex items-center pl-3 mb-10">
          <Logo />
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-lg transition-colors hover:bg-muted/50",
                pathname === route.href ? "bg-muted text-primary" : "text-muted-foreground"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className="h-5 w-5 mr-3 text-muted-foreground group-hover:text-foreground transition-colors" />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
