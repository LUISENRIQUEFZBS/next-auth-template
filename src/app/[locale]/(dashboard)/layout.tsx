import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen ">
      <Navbar />
      <main className="p-6">{children}</main>
    </div>
  );
}