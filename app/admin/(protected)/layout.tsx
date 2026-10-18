import { verifyAdminSession } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import AdminNavbar from "@/components/admin/AdminNavbar";
import Footer from "@/components/layout/Footer";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await verifyAdminSession();

  if (!admin || admin.role !== "ADMIN") {
    redirect("/admin/login");
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-zinc-900">
      <AdminNavbar />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-8 py-8 sm:py-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
