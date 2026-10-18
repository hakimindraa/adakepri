import { getPendingUMKMs } from "@/lib/actions/admin";
import ModerationClient from "./ModerationClient";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Moderasi UMKM | Admin Dasbor",
};

export default async function ModerationPage() {
  const pendingUMKMs = await getPendingUMKMs();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-950 transition-colors mb-3"
        >
          <ArrowLeft size={13} />
          Kembali ke Dasbor Admin
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
          Moderasi Profil UMKM
        </h1>
        <p className="text-sm text-zinc-500 mt-1 font-normal">
          Tinjau profil usaha baru yang didaftarkan pengguna sebelum dipublikasikan ke Beranda.
        </p>
      </div>

      <ModerationClient initialData={pendingUMKMs} />
    </div>
  );
}
