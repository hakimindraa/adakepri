"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { ModerationStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getAllUMKM() {
  try {
    const umkmList = await db.uMKM.findMany({
      where: {
        status: 'APPROVED'
      },
      include: {
        owner: {
          select: { name: true, email: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });
    return umkmList;
  } catch (error) {
    console.error("Get All UMKM Error:", error);
    return [];
  }
}

export async function getUMKMById(id: string) {
  try {
    const umkm = await db.uMKM.findUnique({
      where: { id, status: 'APPROVED' },
      include: {
        owner: {
          select: { name: true, email: true }
        }
      }
    });
    return umkm;
  } catch (error) {
    console.error("Get UMKM By ID Error:", error);
    return null;
  }
}

export async function createOrUpdateUMKM(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Anda harus login terlebih dahulu!" };
    }

    if (!session.user.name || !session.user.email) {
      return { error: "Silakan lengkapi Profil Akun (Nama & Email) Anda terlebih dahulu sebelum membuat Profil UMKM." };
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const location = formData.get("location") as string;
    const targetFundingStr = formData.get("targetFunding") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const gmapsUrl = formData.get("gmapsUrl") as string;
    
    // Parse uploaded image URLs (supporting both multiple URLs and single fallback)
    const rawImageUrls = formData.getAll("imageUrls") as string[];
    const existingImageUrl = formData.get("existingImageUrl") as string;
    
    let imageUrls: string[] = [];
    if (rawImageUrls && rawImageUrls.length > 0) {
      imageUrls = rawImageUrls.filter((u) => typeof u === "string" && u.trim() !== "");
    } else if (existingImageUrl && existingImageUrl.trim() !== "") {
      imageUrls = [existingImageUrl.trim()];
    }

    if (!title || !description || !category || !location) {
      return { error: "Kolom wajib (Nama Bisnis, Deskripsi, Kategori, Lokasi) harus diisi!" };
    }

    const targetFunding = targetFundingStr ? parseFloat(targetFundingStr) : 0;

    const data = {
      title,
      description,
      category,
      location,
      targetFunding,
      imageUrls,
      whatsapp: whatsapp || null,
      gmapsUrl: gmapsUrl || null,
      status: ModerationStatus.PENDING,
    };

    await db.uMKM.upsert({
      where: { ownerId: session.user.id },
      update: data,
      create: {
        ownerId: session.user.id,
        ...data,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/admin/moderation");
    revalidatePath("/admin");
    revalidatePath("/umkm");
    revalidatePath("/");

    return { success: "Profil UMKM berhasil disimpan dan sedang menunggu kurasi Admin!" };
  } catch (error) {
    console.error("Create UMKM Error:", error);
    return { error: "Terjadi kesalahan sistem saat menyimpan profil UMKM." };
  }
}

export async function getMyUMKM() {
  try {
    const session = await auth();
    if (!session?.user?.id) return null;

    const umkm = await db.uMKM.findUnique({
      where: { ownerId: session.user.id }
    });

    return umkm;
  } catch (error) {
    console.error("Get UMKM Error:", error);
    return null;
  }
}
