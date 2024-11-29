import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/navbar";

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full">
      <div className="fixed inset-0 -z-10 h-screen w-screen flex justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_23%,#4a4a4a_3%,#34495e_38%,#2c5282_77%,#FD00FB_95%)]" />
      <div className="min-h-screen flex items-center justify-center">
        <Navbar />
        {children}
        <Toaster />
      </div>
    </div>
  );
}
