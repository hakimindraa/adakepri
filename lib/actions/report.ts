"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function createReport(targetId: string, targetType: string, reason: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Anda harus login untuk melaporkan konten ini." };
    }

    if (!reason) {
      return { error: "Alasan pelaporan harus diisi." };
    }

    await db.report.create({
      data: {
        reporterId: session.user.id,
        targetId,
        targetType,
        reason,
        status: "UNRESOLVED",
      }
    });

    return { success: "Laporan berhasil dikirim. Terima kasih atas bantuan Anda." };
  } catch (error) {
    console.error("Create Report Error:", error);
    return { error: "Gagal mengirim laporan. Coba lagi nanti." };
  }
}
