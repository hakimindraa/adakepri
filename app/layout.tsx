import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@uploadthing/react/styles.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AdaKepri | Direktori Freelancer & UMKM",
  description: "Satu platform untuk semua kebutuhan lokal di Kepulauan Riau (Kepri).",
};

import AuthProvider from "@/components/providers/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full">
      <body className={`${inter.className} antialiased min-h-full flex flex-col bg-[#FAFAFA] text-zinc-900 selection:bg-zinc-900 selection:text-white`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
