"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function sendMessage(receiverId: string, content: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    if (!content || content.trim() === "") {
      return { error: "Pesan tidak boleh kosong!" };
    }

    await db.message.create({
      data: {
        senderId: session.user.id,
        receiverId,
        content,
      },
    });

    revalidatePath("/dashboard");
    return { success: "Pesan terkirim!" };
  } catch (error) {
    console.error("Send Message Error:", error);
    return { error: "Gagal mengirim pesan." };
  }
}

export async function getInbox() {
  try {
    const session = await auth();
    if (!session?.user?.id) return [];

    const messages = await db.message.findMany({
      where: { receiverId: session.user.id },
      include: {
        sender: {
          select: { name: true, email: true, image: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return messages;
  } catch (error) {
    console.error("Get Inbox Error:", error);
    return [];
  }
}

export async function getSentMessages() {
  try {
    const session = await auth();
    if (!session?.user?.id) return [];

    const messages = await db.message.findMany({
      where: { senderId: session.user.id },
      include: {
        receiver: {
          select: { name: true, email: true, image: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return messages;
  } catch (error) {
    console.error("Get Sent Messages Error:", error);
    return [];
  }
}

export async function markAsRead(messageId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    await db.message.update({
      where: { id: messageId },
      data: { isRead: true },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return { error: "Gagal memperbarui status pesan." };
  }
}
