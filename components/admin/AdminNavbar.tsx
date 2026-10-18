"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAdminAction } from "@/lib/actions/admin-auth";
import { ShieldCheck, ExternalLink, LogOut, LayoutDashboard, CheckSquare, Flag } from "lucide-react";
import { useState } from "react";

export default function AdminNavbar() {
  const pathname = usePathname();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await logoutAdminAction();
  };

  const navItems = [
    { href: "/admin", label: "Ikhtisar & Data", icon: <LayoutDashboard size={15} /> },
    { href: "/admin/moderation", label: "Moderasi UMKM", icon: <CheckSquare size={15} /> },
    { href: "/admin/reports", label: "Laporan", icon: <Flag size={15} /> },
  ];

  return (
    <header className="bg-white border-b border-zinc-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Brand & Admin Tag */}
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tight text-zinc-950">
                Ada<span className="text-zinc-500 font-medium">Kepri</span>
              </span>
            </Link>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-950 text-white text-[10px] font-semibold tracking-wide uppercase">
              <ShieldCheck size={11} />
              <span>Admin Panel</span>
            </span>
          </div>

          {/* Center: Admin Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? "bg-zinc-100 text-zinc-950"
                      : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right: Public Web Link + Logout */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 hover:text-zinc-950 transition-colors py-1.5 px-2.5 rounded-lg border border-zinc-200 hover:bg-zinc-50"
              title="Buka Website Publik di Tab Baru"
            >
              <span>Buka Web Publik</span>
              <ExternalLink size={12} />
            </Link>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 py-1.5 px-3 rounded-lg border border-rose-200 transition-colors cursor-pointer disabled:opacity-50"
            >
              <LogOut size={13} />
              <span>{loggingOut ? "Keluar..." : "Keluar Admin"}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden items-center gap-1 py-2 border-t border-zinc-100 overflow-x-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap ${
                  isActive
                    ? "bg-zinc-950 text-white"
                    : "text-zinc-600 hover:bg-zinc-100"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
