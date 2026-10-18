"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { ModerationStatus } from "@prisma/client";

export async function createOrUpdateFreelancer(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    if (!session.user.name || !session.user.email) {
      return { error: "Silakan lengkapi Profil Akun (Nama & Email) Anda terlebih dahulu sebelum mendaftar sebagai Freelancer." };
    }

    const profession = formData.get("profession") as string;
    const skillsString = formData.get("skills") as string;
    const hourlyRate = parseFloat(formData.get("hourlyRate") as string);
    const about = formData.get("about") as string;
    const kota = formData.get("kota") as string;
    const ketersediaan = formData.get("ketersediaan") as string;
    const whatsapp = formData.get("whatsapp") as string;
    
    // Convert avatar URL if provided
    const avatar = formData.get("avatar") as string || "https://placehold.co/150x150?text=FL";

    if (!profession || !skillsString || isNaN(hourlyRate) || !about || !kota || !ketersediaan) {
      return { error: "Kolom wajib belum diisi!" };
    }

    const skills = skillsString.split(",").map((s) => s.trim()).filter((s) => s !== "");

    const data = {
      profession,
      skills,
      hourlyRate,
      about,
      kota,
      ketersediaan,
      avatar,
      whatsapp: whatsapp || null,
      portfolioUrls: [],
    };

    await db.freelancer.upsert({
      where: { userId: session.user.id },
      update: data,
      create: {
        userId: session.user.id,
        ...data,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/freelancers");
    return { success: "Profil Freelancer berhasil disimpan!" };
  } catch (error) {
    console.error("Freelancer Error:", error);
    return { error: "Terjadi kesalahan saat menyimpan profil." };
  }
}

export async function getAllFreelancers() {
  try {
    const dbFreelancers = await db.freelancer.findMany({
      where: {
        status: ModerationStatus.APPROVED
      },
      include: {
        user: {
          select: {
            name: true,
          }
        }
      }
    });
    
    return dbFreelancers.map((f) => ({
      id: f.id,
      nama: f.user.name || "Freelancer",
      profession: f.profession || "",
      kota: f.kota,
      bio: f.about,
      skills: f.skills,
      portfolioUrl: f.portfolioUrls[0] || "",
      instagramUrl: "",
      linkedinUrl: "",
      portfolioImages: [],
      tarifPerJam: f.hourlyRate,
      ketersediaan: f.ketersediaan,
      avatar: f.avatar || `https://i.pravatar.cc/150?u=${f.id}`,
      whatsapp: f.whatsapp,
      terverifikasi: f.terverifikasi,
      totalDilihat: f.totalDilihat,
      rating: f.rating,
      reviews: [] as any[]
    }));
  } catch (error) {
    console.error("Get Freelancers Error:", error);
    return [];
  }
}

export async function getFreelancerByUserId(userId: string) {
  try {
    return await db.freelancer.findUnique({
      where: { userId }
    });
  } catch (error) {
    return null;
  }
}

export async function getFreelancerById(id: string) {
  try {
    const f = await db.freelancer.findUnique({
      where: { id, status: ModerationStatus.APPROVED },
      include: {
        user: {
          select: { name: true }
        }
      }
    });

    if (!f) return null;

    return {
      id: f.id,
      nama: f.user.name || "Freelancer",
      profession: f.profession || "",
      kota: f.kota,
      bio: f.about,
      skills: f.skills,
      portfolioUrl: f.portfolioUrls[0] || "",
      instagramUrl: "",
      linkedinUrl: "",
      portfolioImages: [],
      tarifPerJam: f.hourlyRate,
      ketersediaan: f.ketersediaan,
      avatar: f.avatar || `https://i.pravatar.cc/150?u=${f.id}`,
      whatsapp: f.whatsapp,
      terverifikasi: f.terverifikasi,
      totalDilihat: f.totalDilihat,
      rating: f.rating,
      reviews: [] as any[]
    };
  } catch (error) {
    console.error("Get Freelancer Error:", error);
    return null;
  }
}
