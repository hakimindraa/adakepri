import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KepriHub | Direktori Freelancer & UMKM",
  description: "Satu platform untuk semua kebutuhan lokal di Kepulauan Riau (Kepri).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full">
      <body className={`${inter.className} antialiased min-h-full flex flex-col bg-slate-50 text-slate-900`}>
        {children}
      </body>
    </html>
  );
}
