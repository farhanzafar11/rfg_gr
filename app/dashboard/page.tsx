import { Header } from "@/components/Header";
import { DashboardClient } from "./DashboardClient";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex-1 flex flex-col bg-gc-bg-dark min-h-screen">
      <Header />
      <main className="flex-1">
        <DashboardClient />
      </main>
    </div>
  );
}
