import { getAllReports } from "@/lib/actions/admin";
import ReportsClient from "./ReportsClient";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Laporan Pengguna | Admin Dasbor",
};

export default async function ReportsPage() {
  const reports = await getAllReports();

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
          Laporan Pengaduan Pengguna
        </h1>
        <p className="text-sm text-zinc-500 mt-1 font-normal">
          Kelola laporan masyarakat mengenai profil tidak pantas, informasi palsu, atau spam.
        </p>
      </div>

      <ReportsClient initialData={reports} />
    </div>
  );
}
