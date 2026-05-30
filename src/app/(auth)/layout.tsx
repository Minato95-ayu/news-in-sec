import React from "react";
import Link from "next/link";
import { Newspaper } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Left side: Beautiful Gradient / Branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 text-white relative overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 animate-gradient" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,transparent_100%)]" />
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Newspaper className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight">News In Sec</span>
          </Link>
        </div>
        
        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Stay informed in seconds.
          </h1>
          <p className="text-lg text-zinc-300">
            Join thousands of professionals who get their daily dose of curated news, distilled for quick consumption without losing the context.
          </p>
        </div>
      </div>

      {/* Right side: Auth Form */}
      <div className="flex flex-col w-full lg:w-1/2 items-center justify-center p-8 sm:p-12">
        <div className="flex lg:hidden items-center gap-2 mb-8 self-start">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Newspaper className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">News In Sec</span>
        </div>
        
        <div className="w-full max-w-[400px]">
          {children}
        </div>
      </div>
    </div>
  );
}
