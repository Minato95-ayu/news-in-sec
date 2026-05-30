import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/shared/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "News In Sec — AI Content Creation Platform",
    template: "%s | News In Sec",
  },
  description:
    "Generate viral business reels, LinkedIn posts, stunning visuals, and SEO tags — all powered by AI in seconds.",
  keywords: [
    "AI content creation",
    "social media automation",
    "LinkedIn posts",
    "Instagram reels",
    "content generator",
    "AI scripts",
  ],
  authors: [{ name: "News In Sec" }],
  openGraph: {
    title: "News In Sec — AI Content Creation Platform",
    description:
      "Generate viral business reels, LinkedIn posts, stunning visuals, and SEO tags in seconds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <TooltipProvider>
            {children}
            <Toaster richColors position="bottom-right" />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
