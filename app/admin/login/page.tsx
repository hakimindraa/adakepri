import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import AdminLoginClient from "./AdminLoginClient";

export const metadata = {
  title: "Admin Login | Ada Kepri",
};

export default async function AdminLoginPage() {
  const session = await auth();

  // If already logged in
  if (session?.user?.id) {
    const user = await db.user.findUnique({
      where: { id: session.user.id }
    });
    
    // If they are admin, send them to dashboard
    if (user?.role === "ADMIN") {
      redirect("/admin");
    }
    // If they are not admin, send them back to home
    else {
      redirect("/");
    }
  }

  return <AdminLoginClient />;
}
