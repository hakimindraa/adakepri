"use client"
import { useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import { User, LayoutDashboard, Settings, MessageSquare, Image as ImageIcon, LogOut } from 'lucide-react'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('profil')

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Perubahan profil berhasil disimpan! (Mockup)')
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar />
      
      <main className="container-custom py-10 flex-1 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Dasbor */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden sticky top-24">
            <div className="p-6 border-b border-[#E2E8F0] text-center">
              <div className="w-20 h-20 bg-[#047857]/10 rounded-full mx-auto flex items-center justify-center text-[#0077B6] mb-3">
                <User size={32} />
              </div>
              <h2 className="text-lg font-600 text-[#1A202C]">Budi Santoso</h2>
              <p className="text-sm text-[#64748B]">Freelancer</p>
            </div>
            <nav className="p-4 space-y-2">
              <button
                onClick={() => setActiveTab('profil')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-500 transition-colors ${activeTab === 'profil' ? 'bg-[#047857]/10 text-[#0077B6]' : 'text-[#64748B] hover:bg-slate-50'}`}
              >
                <LayoutDashboard size={18} />
                Edit Profil
              </button>
              <button
                onClick={() => setActiveTab('portofolio')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-500 transition-colors ${activeTab === 'portofolio' ? 'bg-[#047857]/10 text-[#0077B6]' : 'text-[#64748B] hover:bg-slate-50'}`}
              >
                <ImageIcon size={18} />
                Galeri & Portofolio
              </button>
              <button
                onClick={() => setActiveTab('pesan')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-500 transition-colors ${activeTab === 'pesan' ? 'bg-[#047857]/10 text-[#0077B6]' : 'text-[#64748B] hover:bg-slate-50'}`}
              >
                <MessageSquare size={18} />
                Pesan Masuk <span className="ml-auto bg-[#D97706] text-white text-[10px] px-2 py-0.5 rounded-full">3</span>
              </button>
              <button
                onClick={() => setActiveTab('pengaturan')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-500 transition-colors ${activeTab === 'pengaturan' ? 'bg-[#047857]/10 text-[#0077B6]' : 'text-[#64748B] hover:bg-slate-50'}`}
              >
                <Settings size={18} />
                Pengaturan Akun
              </button>
              <hr className="border-[#E2E8F0] my-2" />
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-500 text-rose-600 hover:bg-rose-50 transition-colors">
                <LogOut size={18} />
                Keluar
              </button>
            </nav>
          </div>
        </aside>

        {/* Konten Utama Dasbor */}
        <div className="flex-1">
          {activeTab === 'profil' && (
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E2E8F0] shadow-sm animate-fade-in">
              <h1 className="text-2xl font-600 text-[#1A202C] mb-6">Edit Profil Anda</h1>
              <form onSubmit={handleSave} className="space-y-6">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center border-2 border-dashed border-[#CBD5E1]">
                    <span className="text-xs text-[#64748B] text-center px-2">Preview Foto</span>
                  </div>
                  <div>
                    <input type="file" className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-500 file:bg-[#047857]/10 file:text-[#0077B6] hover:file:bg-[#047857]/20" />
                    <p className="text-xs text-[#64748B] mt-2">JPG, PNG atau GIF. Maksimal 2MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-600 text-[#64748B] uppercase tracking-wider mb-2">Nama Lengkap / Nama Bisnis</label>
                    <input defaultValue="Budi Santoso" className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-600 text-[#64748B] uppercase tracking-wider mb-2">Email</label>
                    <input defaultValue="budi@email.com" readOnly className="w-full bg-slate-50 border border-[#E2E8F0] px-4 py-3 rounded-xl text-sm text-[#64748B]" />
                  </div>
                  <div>
                    <label className="block text-xs font-600 text-[#64748B] uppercase tracking-wider mb-2">Nomor WhatsApp</label>
                    <input defaultValue="628111222333" className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-600 text-[#64748B] uppercase tracking-wider mb-2">Instagram URL</label>
                    <input defaultValue="https://instagram.com/budi" className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-600 text-[#64748B] uppercase tracking-wider mb-2">LinkedIn URL</label>
                    <input defaultValue="https://linkedin.com/in/budi" className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl text-sm" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-600 text-[#64748B] uppercase tracking-wider mb-2">Bio Singkat / Deskripsi Bisnis</label>
                    <textarea defaultValue="Saya adalah desainer grafis dan web developer..." rows={4} className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl text-sm resize-none" />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0] flex justify-end">
                  <button type="submit" className="px-8 py-3 bg-gradient-to-r from-[#047857] to-[#036046] hover:from-[#064E3B] hover:to-[#047857] text-white shadow-md rounded-xl font-600 transition-colors">
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'portofolio' && (
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E2E8F0] shadow-sm animate-fade-in">
              <h1 className="text-2xl font-600 text-[#1A202C] mb-2">Kelola Portofolio / Galeri</h1>
              <p className="text-[#64748B] text-sm mb-6">Unggah foto hasil kerja atau produk terbaik Anda.</p>
              
              <div className="border-2 border-dashed border-[#CBD5E1] rounded-2xl p-10 text-center mb-8 hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="w-16 h-16 bg-[#047857]/10 text-[#0077B6] rounded-full flex items-center justify-center mx-auto mb-4">
                  <ImageIcon size={24} />
                </div>
                <p className="text-[#1A202C] font-600 mb-1">Klik untuk mengunggah gambar</p>
                <p className="text-xs text-[#64748B]">atau seret dan lepas gambar ke area ini</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Mockup Galeri */}
                <div className="aspect-video bg-slate-100 rounded-xl border border-[#E2E8F0] flex items-center justify-center text-xs text-[#64748B]">Gambar 1</div>
                <div className="aspect-video bg-slate-100 rounded-xl border border-[#E2E8F0] flex items-center justify-center text-xs text-[#64748B]">Gambar 2</div>
                <div className="aspect-video bg-slate-100 rounded-xl border border-[#E2E8F0] flex items-center justify-center text-xs text-[#64748B]">Gambar 3</div>
              </div>
            </div>
          )}

          {activeTab === 'pesan' && (
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E2E8F0] shadow-sm animate-fade-in text-center py-20">
              <MessageSquare size={48} className="mx-auto text-slate-300 mb-4" />
              <h2 className="text-xl font-600 text-[#1A202C] mb-2">Pesan Masuk</h2>
              <p className="text-[#64748B]">Fitur pesan internal saat ini belum diaktifkan.</p>
            </div>
          )}

          {activeTab === 'pengaturan' && (
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E2E8F0] shadow-sm animate-fade-in text-center py-20">
              <Settings size={48} className="mx-auto text-slate-300 mb-4" />
              <h2 className="text-xl font-600 text-[#1A202C] mb-2">Pengaturan Akun</h2>
              <p className="text-[#64748B]">Ganti password dan preferensi notifikasi akan tersedia di sini.</p>
            </div>
          )}
        </div>

      </main>
      
      <Footer />
    </div>
  )
}
