"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    const name = formData.get("name") as string;
    const image = formData.get("image") as string;

    if (!name || name.trim() === "") {
      return { error: "Nama tidak boleh kosong!" };
    }

    const dataToUpdate: any = { name };
    if (image) {
      dataToUpdate.image = image;
    }

    await db.user.update({
      where: { id: session.user.id },
      data: dataToUpdate,
    });

    revalidatePath("/dashboard");
    return { success: "Profil berhasil diperbarui!" };
  } catch (error) {
    console.error("Update Profile Error:", error);
    return { error: "Terjadi kesalahan saat memperbarui profil." };
  }
}

export async function updatePassword(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return { error: "Semua kolom kata sandi wajib diisi!" };
    }

    if (newPassword !== confirmPassword) {
      return { error: "Kata sandi baru dan konfirmasi tidak cocok!" };
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user || !user.password) {
      return { error: "Pengguna tidak ditemukan atau login dengan metode lain." };
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return { error: "Kata sandi saat ini salah!" };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.user.update({
      where: { id: session.user.id },
      data: { password: hashedPassword },
    });

    return { success: "Kata sandi berhasil diperbarui!" };
  } catch (error) {
    console.error("Update Password Error:", error);
    return { error: "Terjadi kesalahan saat memperbarui kata sandi." };
  }
}
