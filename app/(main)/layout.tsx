import { ReactNode } from "react";
import { NavBar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen animate-in fade-in bg-[#F5EFE0] dark:bg-[#121212] overflow-x-hidden w-full max-w-[100vw]">
      <NavBar />
      <main className="flex flex-col grow h-full w-full overflow-x-hidden pt-[36px] bg-[#F5EFE0] dark:bg-[#121212]">{children}</main>
      <Footer />
    </div>
  );
}
