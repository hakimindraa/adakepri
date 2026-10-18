"use server";

import { createAdminSession, destroyAdminSession, verifyAdminSession } from "@/lib/admin-auth";
import { redirect } from "next/navigation";

export async function loginAdminAction(formData: FormData) {
  try {
    const username = (formData.get("username") as string)?.trim();
    const password = (formData.get("password") as string)?.trim();

    if (!username || !password) {
      return { error: "Username dan Kata Sandi wajib diisi!" };
    }

    const envUser = (process.env.ADMIN_USERNAME || "admin").trim();
    const envPass = (process.env.ADMIN_PASSWORD || "adminkepri12").trim();

    if (username.toLowerCase() !== envUser.toLowerCase() || password !== envPass) {
      return { error: "Kredensial salah atau Anda tidak memiliki akses Super Admin." };
    }

    // Create isolated admin session cookie
    await createAdminSession(envUser);

    return { success: true };
  } catch (err: any) {
    console.error("Admin Login Error:", err);
    return { error: "Terjadi kesalahan sistem saat memproses login admin." };
  }
}

export async function logoutAdminAction() {
  await destroyAdminSession();
  redirect("/admin/login");
}

export async function checkAdminStatusAction() {
  const admin = await verifyAdminSession();
  return { isAdmin: !!admin, admin };
}
