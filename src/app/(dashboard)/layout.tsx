import { Navbar } from "@/components/shared/navbar";
import { Sidebar } from "@/components/shared/sidebar";
import { AICopilot } from "@/components/shared/ai-copilot";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-[80]">
        <Sidebar />
      </div>
      <main className="md:pl-64 h-full relative">
        <Navbar />
        <div className="p-4 md:p-8">
          {children}
        </div>
        <AICopilot />
      </main>
    </div>
  );
}
