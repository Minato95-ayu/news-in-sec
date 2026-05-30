import Link from "next/link";
import { UserAvatar } from "./user-avatar";
import { ThemeToggle } from "./theme-toggle";
import { BookOpen } from "lucide-react";
import { Logo } from "@/components/shared/logo";

export function Navbar() {
  return (
    <div className="flex items-center justify-between p-4 border-b h-16 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-x-4">
        {/* Mobile placeholder for sidebar toggle */}
        <div className="flex items-center md:hidden transform scale-75 origin-left">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        {/* Add dynamic page title here if needed */}
      </div>
      <div className="flex items-center gap-x-4">
        <ThemeToggle />
        <UserAvatar />
      </div>
    </div>
  );
}
