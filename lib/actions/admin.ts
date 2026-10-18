"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

import { verifyAdminSession } from "@/lib/admin-auth";

/**
 * Helper function to check if the current user is an ADMIN.
 * Prioritizes the dedicated admin session cookie (adakepri_admin_session).
 */
async function checkAdmin() {
  const admin = await verifyAdminSession();
  if (admin?.role === "ADMIN") return true;

  const session = await auth();
  if (session?.user?.id && (session.user as any)?.role === "ADMIN") return true;

  return false;
}

export async function getAdminStats() {
  if (!(await checkAdmin())) return null;

  try {
    const totalUsers = await db.user.count();
    const totalUMKM = await db.uMKM.count();
    const totalFreelancer = await db.freelancer.count();
    const pendingUMKM = await db.uMKM.count({ where: { status: 'PENDING' } });
    const totalReports = await db.report.count({ where: { status: 'UNRESOLVED' } });

    return { totalUsers, totalUMKM, totalFreelancer, pendingUMKM, totalReports };
  } catch (error) {
    console.error("Failed to fetch admin stats:", error);
    return null;
  }
}

export async function getAllUsersAdmin() {
  if (!(await checkAdmin())) return [];
  try {
    return await db.user.findMany({
      orderBy: { id: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
      }
    });
  } catch (error) {
    return [];
  }
}

export async function getAllUMKMsAdmin() {
  if (!(await checkAdmin())) return [];
  try {
    return await db.uMKM.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        owner: { select: { name: true, email: true } }
      }
    });
  } catch (error) {
    return [];
  }
}

export async function getAllFreelancersAdmin() {
  if (!(await checkAdmin())) return [];
  try {
    return await db.freelancer.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true, email: true } }
      }
    });
  } catch (error) {
    return [];
  }
}

export async function toggleVerifyUMKM(id: string, currentStatus: boolean) {
  if (!(await checkAdmin())) return { error: "Unauthorized" };
  try {
    await db.uMKM.update({
      where: { id },
      data: { terverifikasi: !currentStatus }
    });
    revalidatePath("/admin");
    revalidatePath("/umkm");
    revalidatePath("/");
    return { success: "Status verifikasi UMKM berhasil diperbarui!" };
  } catch (error: any) {
    console.error(error);
    return { error: "Gagal memperbarui status UMKM. Detail: " + String(error.message || error) };
  }
}

export async function toggleVerifyFreelancer(id: string, currentStatus: boolean) {
  if (!(await checkAdmin())) return { error: "Unauthorized" };
  try {
    await db.freelancer.update({
      where: { id },
      data: { terverifikasi: !currentStatus }
    });
    revalidatePath("/admin");
    revalidatePath("/freelancers");
    revalidatePath("/");
    return { success: "Status verifikasi Freelancer berhasil diperbarui!" };
  } catch (error) {
    return { error: "Gagal memperbarui status Freelancer." };
  }
}

export async function deleteUMKMAdmin(id: string) {
  if (!(await checkAdmin())) return { error: "Unauthorized" };
  try {
    await db.uMKM.delete({ where: { id } });
    revalidatePath("/admin");
    revalidatePath("/admin/moderation");
    revalidatePath("/umkm");
    revalidatePath("/");
    return { success: "Profil UMKM berhasil dihapus!" };
  } catch (error) {
    return { error: "Gagal menghapus UMKM." };
  }
}

export async function deleteFreelancerAdmin(id: string) {
  if (!(await checkAdmin())) return { error: "Unauthorized" };
  try {
    await db.freelancer.delete({ where: { id } });
    revalidatePath("/admin");
    revalidatePath("/freelancers");
    revalidatePath("/");
    return { success: "Profil Freelancer berhasil dihapus!" };
  } catch (error) {
    return { error: "Gagal menghapus Freelancer." };
  }
}

export async function deleteUserAdmin(id: string) {
  if (!(await checkAdmin())) return { error: "Unauthorized" };
  try {
    const target = await db.user.findUnique({ where: { id } });
    const envAdminEmail = `${(process.env.ADMIN_USERNAME || "admin").trim().toLowerCase()}@adakepri.local`;
    if (target?.email?.toLowerCase() === envAdminEmail) {
      return { error: "Tidak dapat menghapus Super Admin utama dari .env!" };
    }
    await db.user.delete({ where: { id } });
    revalidatePath("/admin");
    revalidatePath("/umkm");
    revalidatePath("/freelancers");
    revalidatePath("/");
    return { success: "Akun Pengguna berhasil dihapus beserta profilnya!" };
  } catch (error) {
    return { error: "Gagal menghapus Pengguna." };
  }
}

// --- Moderation & Reports Actions ---

export async function getPendingUMKMs() {
  if (!(await checkAdmin())) return [];
  try {
    return await db.uMKM.findMany({
      where: { status: 'PENDING' },
      orderBy: { createdAt: 'desc' },
      include: {
        owner: { select: { name: true, email: true } }
      }
    });
  } catch (error) {
    return [];
  }
}

export async function updateUMKMStatus(id: string, status: any) {
  if (!(await checkAdmin())) return { error: "Unauthorized" };
  try {
    await db.uMKM.update({
      where: { id },
      data: { status }
    });
    revalidatePath("/admin/moderation");
    revalidatePath("/admin");
    revalidatePath("/umkm");
    revalidatePath("/");
    return { success: `Status UMKM berhasil diubah menjadi ${status}!` };
  } catch (error) {
    return { error: "Gagal mengubah status UMKM." };
  }
}

export async function updateFreelancerStatus(id: string, status: any) {
  if (!(await checkAdmin())) return { error: "Unauthorized" };
  try {
    await db.freelancer.update({
      where: { id },
      data: { status }
    });
    revalidatePath("/admin/moderation");
    revalidatePath("/admin");
    revalidatePath("/freelancers");
    revalidatePath("/");
    return { success: `Status Freelancer berhasil diubah menjadi ${status}!` };
  } catch (error) {
    return { error: "Gagal mengubah status Freelancer." };
  }
}

export async function getAllReports() {
  if (!(await checkAdmin())) return [];
  try {
    const reports = await db.report.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        reporter: { select: { name: true, email: true } }
      }
    });

    const enrichedReports = await Promise.all(reports.map(async (r) => {
      let targetName = "Data telah dihapus";
      if (r.targetType === "UMKM") {
        const umkm = await db.uMKM.findUnique({ where: { id: r.targetId }, select: { title: true } });
        if (umkm) targetName = umkm.title;
      } else if (r.targetType === "FREELANCER") {
        const f = await db.freelancer.findUnique({ 
          where: { id: r.targetId }, 
          include: { user: { select: { name: true } } } 
        });
        if (f && f.user) targetName = f.user.name || "Anonim";
      }
      return { ...r, targetName };
    }));

    return enrichedReports;
  } catch (error) {
    return [];
  }
}

export async function updateReportStatus(id: string, status: string) {
  if (!(await checkAdmin())) return { error: "Unauthorized" };
  try {
    await db.report.update({
      where: { id },
      data: { status }
    });
    revalidatePath("/admin/reports");
    revalidatePath("/admin");
    return { success: `Status Laporan berhasil diubah menjadi ${status}!` };
  } catch (error) {
    return { error: "Gagal mengubah status Laporan." };
  }
}
