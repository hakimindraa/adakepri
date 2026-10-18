"use client"
import { useState } from 'react'
import Link from 'next/link'
import { User, LayoutDashboard, Settings, MessageSquare, Image as ImageIcon, Store, LogOut, Briefcase, MapPin, CheckCircle, Lock } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { updateProfile, updatePassword } from '@/lib/actions/user'
import { createOrUpdateFreelancer } from '@/lib/actions/freelancer'
import { createOrUpdateUMKM } from '@/lib/actions/umkm'
import { UploadButton } from '@/lib/uploadthing'

export default function DashboardClient({ user, umkm, freelancer, initialMessages }: { user: any, umkm: any, freelancer: any, initialMessages: any[] }) {
  const [activeTab, setActiveTab] = useState('profil')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })
  
  const [userImageUrl, setUserImageUrl] = useState(user?.image || '')
  const [freelancerAvatarUrl, setFreelancerAvatarUrl] = useState(freelancer?.avatar || '')
  const [umkmImageUrl, setUmkmImageUrl] = useState(umkm?.imageUrls?.[0] || '')

  const unreadCount = initialMessages?.filter(m => !m.isRead).length || 0

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ text: '', type: '' })
    const formData = new FormData(e.target as HTMLFormElement)
    const res = await updateProfile(formData)
    if (res?.error) setMessage({ text: res.error, type: 'error' })
    if (res?.success) setMessage({ text: res.success, type: 'success' })
    setLoading(false)
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ text: '', type: '' })
    const formData = new FormData(e.target as HTMLFormElement)
    const res = await updatePassword(formData)
    if (res?.error) setMessage({ text: res.error, type: 'error' })
    if (res?.success) {
      setMessage({ text: res.success, type: 'success' })
      ;(e.target as HTMLFormElement).reset()
    }
    setLoading(false)
  }

  const handleUpdateFreelancer = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ text: '', type: '' })
    const formData = new FormData(e.target as HTMLFormElement)
    const res = await createOrUpdateFreelancer(formData)
    if (res?.error) setMessage({ text: res.error, type: 'error' })
    if (res?.success) setMessage({ text: res.success, type: 'success' })
    setLoading(false)
  }

  const handleUpdateUMKM = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ text: '', type: '' })
    const formData = new FormData(e.target as HTMLFormElement)
    const res = await createOrUpdateUMKM(formData)
    if (res?.error) setMessage({ text: res.error, type: 'error' })
    if (res?.success) setMessage({ text: res.success, type: 'success' })
    setLoading(false)
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 768px) {
          .dashboard-layout { flex-direction: row !important; }
          .dashboard-sidebar { width: 16rem !important; }
          .dashboard-card { padding: 2rem !important; }
          .dashboard-grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .dashboard-col-span-2 { grid-column: span 2 / span 2 !important; }
        }
      `}} />
      <main className="container-custom py-10 flex-1 flex flex-col dashboard-layout gap-8 animate-fade-in">
      {/* Sidebar Dasbor */}
      <aside className="w-full dashboard-sidebar flex-shrink-0">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden sticky top-24">
          <div className="p-6 border-b border-[#E2E8F0] text-center">
            <div className="w-20 h-20 bg-[#047857]/10 rounded-full mx-auto flex items-center justify-center text-[#0077B6] mb-3 overflow-hidden">
              {user?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.image} alt={user.name || "User"} className="w-full h-full object-cover" />
              ) : (
                <User size={32} />
              )}
            </div>
            <h2 className="text-lg font-600 text-[#1A202C]">{user?.name || 'Pengguna'}</h2>
            <p className="text-sm text-[#64748B]">{user?.email}</p>
          </div>
          <nav className="p-4 space-y-2">
            <button onClick={() => {setActiveTab('profil'); setMessage({text:'', type:''})}} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-500 transition-colors ${activeTab === 'profil' ? 'bg-[#047857]/10 text-[#0077B6]' : 'text-[#64748B] hover:bg-slate-50'}`}>
              <LayoutDashboard size={18} /> Akun Saya
            </button>
            <button onClick={() => {setActiveTab('umkm'); setMessage({text:'', type:''})}} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-500 transition-colors ${activeTab === 'umkm' ? 'bg-[#047857]/10 text-[#0077B6]' : 'text-[#64748B] hover:bg-slate-50'}`}>
              <Store size={18} /> Profil UMKM
            </button>
            <button onClick={() => {setActiveTab('portofolio'); setMessage({text:'', type:''})}} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-500 transition-colors ${activeTab === 'portofolio' ? 'bg-[#047857]/10 text-[#0077B6]' : 'text-[#64748B] hover:bg-slate-50'}`}>
              <Briefcase size={18} /> Profil Freelancer
            </button>
            <button onClick={() => {setActiveTab('pesan'); setMessage({text:'', type:''})}} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-500 transition-colors ${activeTab === 'pesan' ? 'bg-[#047857]/10 text-[#0077B6]' : 'text-[#64748B] hover:bg-slate-50'}`}>
              <MessageSquare size={18} /> Pesan {unreadCount > 0 && <span className="ml-auto bg-[#D97706] text-white text-[10px] px-2 py-0.5 rounded-full">{unreadCount}</span>}
            </button>
            <button onClick={() => {setActiveTab('pengaturan'); setMessage({text:'', type:''})}} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-500 transition-colors ${activeTab === 'pengaturan' ? 'bg-[#047857]/10 text-[#0077B6]' : 'text-[#64748B] hover:bg-slate-50'}`}>
              <Settings size={18} /> Pengaturan
            </button>
            <hr className="border-[#E2E8F0] my-2" />
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-500 text-rose-600 hover:bg-rose-50 transition-colors">
              <LogOut size={18} /> Keluar
            </button>
          </nav>
        </div>
      </aside>

      {/* Konten Utama Dasbor */}
      <div className="flex-1">
        {message.text && (
          <div className={`mb-6 p-4 rounded-xl text-sm font-500 border ${message.type === 'error' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
            {message.text}
          </div>
        )}

        {activeTab === 'profil' && (
          <div className="bg-white rounded-2xl p-6 dashboard-card border border-[#E2E8F0] shadow-sm animate-fade-in">
            <h1 className="text-2xl font-600 text-[#1A202C] mb-6">Detail Akun</h1>
            <form onSubmit={handleUpdateProfile} className="space-y-5">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-full sm:w-auto flex flex-col items-center gap-3 bg-slate-50 p-4 rounded-xl border border-[#E2E8F0]">
                  <div className="text-xs font-600 text-[#64748B] uppercase tracking-wider text-center">Foto Profil</div>
                  {userImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={userImageUrl} alt="Profil" className="w-24 h-24 rounded-full object-cover border-2 border-white shadow-sm" />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
                      <User size={32} />
                    </div>
                  )}
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      if (res?.[0]) {
                        setUserImageUrl(res[0].url);
                        setMessage({ text: 'Foto berhasil diunggah! Klik Simpan untuk menyimpan.', type: 'success' });
                      }
                    }}
                    onUploadError={(error: Error) => {
                      setMessage({ text: `Upload gagal: ${error.message}`, type: 'error' });
                    }}
                    appearance={{
                      button: "bg-[#047857] text-white text-xs py-1.5 px-3 rounded-lg w-auto h-8",
                      allowedContent: "hidden"
                    }}
                  />
                  <input type="hidden" name="image" value={userImageUrl} />
                </div>

                <div className="flex-1 space-y-5 w-full">
                  <div>
                    <label className="block text-xs font-600 text-[#64748B] uppercase tracking-wider mb-1">Nama Lengkap</label>
                    <input required name="name" type="text" defaultValue={user?.name || ''} className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-600 text-[#64748B] uppercase tracking-wider mb-1">Email (Tidak dapat diubah)</label>
                    <input disabled type="email" defaultValue={user?.email || ''} className="w-full bg-slate-50 border border-[#E2E8F0] outline-none px-4 py-3 rounded-xl text-sm text-[#64748B] cursor-not-allowed" />
                  </div>
                </div>
              </div>
              <button disabled={loading} type="submit" className="px-6 py-3 bg-[#047857] hover:bg-[#036046] text-white rounded-xl font-600 transition-colors shadow-sm disabled:opacity-70 mt-4">
                {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'umkm' && (
          <div className="bg-white rounded-2xl p-6 dashboard-card border border-[#E2E8F0] shadow-sm animate-fade-in">
            <h1 className="text-2xl font-600 text-[#1A202C] mb-6">Profil UMKM Anda</h1>
            {user?.role === 'ADMIN' ? (
              <div className="flex flex-col items-center justify-center py-16 text-center bg-slate-50 rounded-xl border-2 border-dashed border-[#E2E8F0]">
                <div className="w-16 h-16 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center mb-4">
                  <Lock size={32} />
                </div>
                <h3 className="text-lg font-600 text-[#1A202C]">Konfigurasi UMKM Dikunci</h3>
                <p className="text-[#64748B] mt-2 max-w-md">Sebagai Super Admin, Anda tidak perlu dan tidak diizinkan untuk membuat profil UMKM demi mencegah ketidaksengajaan.</p>
              </div>
            ) : (
            <div className="space-y-5">
              {umkm && (
                <div className="p-3.5 rounded-xl border border-zinc-200 bg-zinc-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold text-zinc-900">Status Publikasi Profil:</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">
                      {umkm.status === 'APPROVED' ? 'Profil usaha Anda telah aktif dan dapat dilihat oleh publik di Beranda.' :
                       umkm.status === 'PENDING' ? 'Profil usaha Anda sedang dalam antrean kurasi oleh Super Admin.' :
                       'Profil usaha Anda sedang ditinjau ulang.'}
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${
                    umkm.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' :
                    umkm.status === 'PENDING' ? 'bg-amber-100 text-amber-800' :
                    'bg-rose-100 text-rose-800'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${
                      umkm.status === 'APPROVED' ? 'bg-emerald-500' :
                      umkm.status === 'PENDING' ? 'bg-amber-500' :
                      'bg-rose-500'
                    }`}></span>
                    {umkm.status === 'APPROVED' ? 'Aktif (Disetujui)' :
                     umkm.status === 'PENDING' ? 'Menunggu Kurasi' :
                     'Ditolak'}
                  </span>
                </div>
              )}
            <form onSubmit={handleUpdateUMKM} className="space-y-5">
              <div className="grid grid-cols-1 dashboard-grid-2 gap-5">
                <div>
                  <label className="block text-xs font-600 text-[#64748B] uppercase tracking-wider mb-1">Nama Bisnis / Toko</label>
                  <input required name="title" type="text" defaultValue={umkm?.title || ''} placeholder="Contoh: Kopi Senja" className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-600 text-[#64748B] uppercase tracking-wider mb-1">Kategori</label>
                  <select required name="category" defaultValue={umkm?.category || 'Kuliner'} className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl transition-all text-sm bg-white">
                    <option value="Kuliner">Kuliner</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Kriya & Kerajinan">Kriya & Kerajinan</option>
                    <option value="Jasa">Jasa</option>
                    <option value="Otomotif">Otomotif</option>
                    <option value="Agribisnis">Agribisnis</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-600 text-[#64748B] uppercase tracking-wider mb-1">Lokasi (Kota/Kabupaten)</label>
                  <select required name="location" defaultValue={umkm?.location || 'Batam'} className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl transition-all text-sm bg-white">
                    <option value="Batam">Batam</option>
                    <option value="Tanjungpinang">Tanjungpinang</option>
                    <option value="Bintan">Bintan</option>
                    <option value="Karimun">Karimun</option>
                    <option value="Natuna">Natuna</option>
                    <option value="Anambas">Anambas</option>
                    <option value="Lingga">Lingga</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-600 text-[#64748B] uppercase tracking-wider mb-1">Harga Mulai Dari (Opsional)</label>
                  <input name="targetFunding" type="number" defaultValue={umkm?.targetFunding || ''} placeholder="Contoh: 10000" className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-600 text-[#64748B] uppercase tracking-wider mb-1">Nomor WhatsApp (Opsional)</label>
                  <input name="whatsapp" type="text" defaultValue={umkm?.whatsapp || ''} placeholder="Contoh: 6281234567890" className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-600 text-[#64748B] uppercase tracking-wider mb-1">Link Google Maps (Opsional)</label>
                  <input name="gmapsUrl" type="text" defaultValue={umkm?.gmapsUrl || ''} placeholder="Contoh: https://maps.app.goo.gl/..." className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl transition-all text-sm" />
                </div>
                <div className="flex flex-col items-center gap-3 bg-slate-50 p-4 rounded-xl border border-[#E2E8F0]">
                  <div className="text-xs font-600 text-[#64748B] uppercase tracking-wider text-center">Foto UMKM</div>
                  {umkmImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={umkmImageUrl} alt="UMKM" className="w-24 h-24 rounded-xl object-cover border-2 border-white shadow-sm" />
                  ) : (
                    <div className="w-24 h-24 rounded-xl bg-slate-200 flex items-center justify-center text-slate-400">
                      <Store size={32} />
                    </div>
                  )}
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      if (res?.[0]) {
                        setUmkmImageUrl(res[0].ufsUrl || res[0].url);
                        setMessage({ text: 'Foto berhasil diunggah! Klik Simpan untuk menyimpan.', type: 'success' });
                      }
                    }}
                    onUploadError={(error: Error) => {
                      setMessage({ text: `Upload gagal: ${error.message}`, type: 'error' });
                    }}
                    appearance={{
                      button: "bg-[#047857] text-white text-xs py-1.5 px-3 rounded-lg w-auto h-8",
                      allowedContent: "hidden"
                    }}
                  />
                  <input type="hidden" name="existingImageUrl" value={umkmImageUrl} />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-600 text-[#64748B] uppercase tracking-wider mb-1">Deskripsi Bisnis</label>
                <textarea required name="description" rows={4} defaultValue={umkm?.description || ''} placeholder="Ceritakan tentang produk atau layanan bisnis Anda..." className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl transition-all text-sm resize-none"></textarea>
              </div>

              <button disabled={loading} type="submit" className="px-6 py-3 bg-[#047857] hover:bg-[#036046] text-white rounded-xl font-600 transition-colors shadow-sm disabled:opacity-70 mt-4">
                {loading ? 'Menyimpan...' : (umkm ? 'Update Profil UMKM' : 'Buat Profil UMKM')}
              </button>
            </form>
            </div>
            )}
          </div>
        )}

        {activeTab === 'portofolio' && (
          <div className="bg-white rounded-2xl p-6 dashboard-card border border-[#E2E8F0] shadow-sm animate-fade-in">
            <h1 className="text-2xl font-600 text-[#1A202C] mb-6">Profil Freelancer</h1>
            {user?.role === 'ADMIN' ? (
              <div className="flex flex-col items-center justify-center py-16 text-center bg-slate-50 rounded-xl border-2 border-dashed border-[#E2E8F0]">
                <div className="w-16 h-16 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center mb-4">
                  <Lock size={32} />
                </div>
                <h3 className="text-lg font-600 text-[#1A202C]">Konfigurasi Freelancer Dikunci</h3>
                <p className="text-[#64748B] mt-2 max-w-md">Sebagai Super Admin, Anda tidak perlu dan tidak diizinkan untuk membuat profil Freelancer demi mencegah ketidaksengajaan.</p>
              </div>
            ) : (
            <form onSubmit={handleUpdateFreelancer} className="space-y-5">
              <div className="grid grid-cols-1 dashboard-grid-2 gap-5">
                <div>
                  <label className="block text-xs font-600 text-[#64748B] uppercase tracking-wider mb-1">Profesi</label>
                  <input required name="profession" type="text" defaultValue={freelancer?.profession || ''} placeholder="Contoh: Web Developer" className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl transition-all text-sm" />
                </div>
                  <input type="hidden" name="hourlyRate" value="0" />
                <div>
                  <label className="block text-xs font-600 text-[#64748B] uppercase tracking-wider mb-1">Kota Domisili</label>
                  <select required name="kota" defaultValue={freelancer?.kota || 'Batam'} className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl transition-all text-sm bg-white">
                    <option value="Batam">Batam</option>
                    <option value="Tanjungpinang">Tanjungpinang</option>
                    <option value="Bintan">Bintan</option>
                    <option value="Karimun">Karimun</option>
                    <option value="Natuna">Natuna</option>
                    <option value="Anambas">Anambas</option>
                    <option value="Lingga">Lingga</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-600 text-[#64748B] uppercase tracking-wider mb-1">Ketersediaan</label>
                  <select required name="ketersediaan" defaultValue={freelancer?.ketersediaan || 'Tersedia'} className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl transition-all text-sm bg-white">
                    <option value="Tersedia">Tersedia</option>
                    <option value="Sibuk">Sibuk</option>
                    <option value="Tidak Tersedia">Tidak Tersedia</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-600 text-[#64748B] uppercase tracking-wider mb-1">Nomor WhatsApp (Opsional)</label>
                  <input name="whatsapp" type="text" defaultValue={freelancer?.whatsapp || ''} placeholder="Contoh: 6281234567890" className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl transition-all text-sm" />
                </div>
                <div className="dashboard-col-span-2 flex flex-col items-center gap-3 bg-slate-50 p-4 rounded-xl border border-[#E2E8F0]">
                  <div className="text-xs font-600 text-[#64748B] uppercase tracking-wider text-center">Avatar Freelancer</div>
                  {freelancerAvatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={freelancerAvatarUrl} alt="Avatar" className="w-24 h-24 rounded-full object-cover border-2 border-white shadow-sm" />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
                      <Briefcase size={32} />
                    </div>
                  )}
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      if (res?.[0]) {
                        setFreelancerAvatarUrl(res[0].ufsUrl || res[0].url);
                        setMessage({ text: 'Avatar berhasil diunggah! Klik Simpan untuk menyimpan.', type: 'success' });
                      }
                    }}
                    onUploadError={(error: Error) => {
                      setMessage({ text: `Upload gagal: ${error.message}`, type: 'error' });
                    }}
                    appearance={{
                      button: "bg-[#047857] text-white text-xs py-1.5 px-3 rounded-lg w-auto h-8",
                      allowedContent: "hidden"
                    }}
                  />
                  <input type="hidden" name="avatar" value={freelancerAvatarUrl} />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-600 text-[#64748B] uppercase tracking-wider mb-1">Keahlian (Pisahkan dengan koma)</label>
                <input required name="skills" type="text" defaultValue={freelancer?.skills?.join(', ') || ''} placeholder="React, Node.js, Design" className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl transition-all text-sm" />
              </div>
              
              <div>
                <label className="block text-xs font-600 text-[#64748B] uppercase tracking-wider mb-1">Bio / Tentang Saya</label>
                <textarea required name="about" rows={4} defaultValue={freelancer?.about || ''} placeholder="Ceritakan tentang pengalaman dan layanan Anda..." className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl transition-all text-sm resize-none"></textarea>
              </div>

              <button disabled={loading} type="submit" className="px-6 py-3 bg-[#047857] hover:bg-[#036046] text-white rounded-xl font-600 transition-colors shadow-sm disabled:opacity-70 mt-4">
                {loading ? 'Menyimpan...' : (freelancer ? 'Update Profil Freelancer' : 'Buat Profil Freelancer')}
              </button>
            </form>
            )}
          </div>
        )}

        {activeTab === 'pesan' && (
          <div className="bg-white rounded-2xl p-6 dashboard-card border border-[#E2E8F0] shadow-sm animate-fade-in">
            <h1 className="text-2xl font-600 text-[#1A202C] mb-6">Kotak Masuk</h1>
            {initialMessages && initialMessages.length > 0 ? (
              <div className="space-y-4">
                {initialMessages.map((msg) => (
                  <div key={msg.id} className={`p-4 rounded-xl border ${msg.isRead ? 'bg-white border-[#E2E8F0]' : 'bg-emerald-50 border-emerald-200'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-600 text-[#1A202C]">{msg.sender.name}</div>
                      <div className="text-xs text-[#64748B]">{new Date(msg.createdAt).toLocaleDateString('id-ID', {day: 'numeric', month:'short', year:'numeric'})}</div>
                    </div>
                    <p className="text-sm text-[#64748B]">{msg.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border-2 border-dashed border-[#E2E8F0] rounded-xl bg-slate-50">
                <MessageSquare size={48} className="mx-auto text-slate-300 mb-4" />
                <p className="text-[#64748B]">Belum ada pesan masuk.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'pengaturan' && (
          <div className="bg-white rounded-2xl p-6 dashboard-card border border-[#E2E8F0] shadow-sm animate-fade-in">
            <h1 className="text-2xl font-600 text-[#1A202C] mb-6">Ubah Kata Sandi</h1>
            <form onSubmit={handleUpdatePassword} className="space-y-5 max-w-md">
              <div>
                <label className="block text-xs font-600 text-[#64748B] uppercase tracking-wider mb-1">Kata Sandi Saat Ini</label>
                <input required name="currentPassword" type="password" placeholder="••••••••" className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl transition-all text-sm" />
              </div>
              <div>
                <label className="block text-xs font-600 text-[#64748B] uppercase tracking-wider mb-1">Kata Sandi Baru</label>
                <input required name="newPassword" type="password" placeholder="••••••••" className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl transition-all text-sm" />
              </div>
              <div>
                <label className="block text-xs font-600 text-[#64748B] uppercase tracking-wider mb-1">Konfirmasi Kata Sandi Baru</label>
                <input required name="confirmPassword" type="password" placeholder="••••••••" className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl transition-all text-sm" />
              </div>
              <button disabled={loading} type="submit" className="px-6 py-3 bg-[#1A202C] hover:bg-[#0f172a] text-white rounded-xl font-600 transition-colors shadow-sm disabled:opacity-70">
                {loading ? 'Menyimpan...' : 'Ubah Kata Sandi'}
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
    </>
  )
}
