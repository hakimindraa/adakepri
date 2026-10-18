"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UploadDropzone } from '@/lib/uploadthing'
import { createOrUpdateUMKM } from '@/lib/actions/umkm'

export default function CreateUMKMClient() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = new FormData(e.target as HTMLFormElement)
    
    // Append uploaded image URLs to form data
    imageUrls.forEach(url => form.append("imageUrls", url))

    const res = await createOrUpdateUMKM(form)
    if (res?.error) {
      setError(res.error)
      setLoading(false)
    } else if (res?.success) {
      alert(res.success)
      router.push('/dashboard')
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl p-8 border border-zinc-200 shadow-xs">
        <div className="mb-8 border-b border-zinc-200 pb-6">
          <h1 className="text-2xl font-bold text-zinc-950">Buat Profil UMKM Anda</h1>
          <p className="text-sm text-zinc-500 mt-1">Lengkapi data usaha Anda untuk mulai memajang produk di direktori AdaKepri.</p>
        </div>

        {error && (
          <div className="bg-rose-50 text-rose-600 p-3 rounded-xl text-sm mb-6 border border-rose-200">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">Nama Bisnis / Usaha</label>
              <input required name="title" placeholder="Contoh: Kerupuk Palang Tradisional" className="w-full border border-zinc-200 focus:border-zinc-950 outline-none px-4 py-2.5 rounded-xl transition-all text-sm" />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">Deskripsi Bisnis</label>
              <textarea required name="description" rows={4} placeholder="Jelaskan mengenai produk, keunikan, dan penawaran UMKM Anda..." className="w-full border border-zinc-200 focus:border-zinc-950 outline-none px-4 py-2.5 rounded-xl transition-all text-sm" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">Kategori</label>
              <select name="category" required className="w-full border border-zinc-200 focus:border-zinc-950 outline-none px-4 py-2.5 rounded-xl transition-all text-sm bg-white">
                <option value="Kuliner">Kuliner</option>
                <option value="Fashion">Fashion & Pakaian</option>
                <option value="Kerajinan">Kerajinan & Kriya</option>
                <option value="Agribisnis">Agribisnis & Perikanan</option>
                <option value="Jasa">Jasa Lokal</option>
                <option value="Teknologi">Teknologi</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">Lokasi / Kota</label>
              <select name="location" required className="w-full border border-zinc-200 focus:border-zinc-950 outline-none px-4 py-2.5 rounded-xl transition-all text-sm bg-white">
                <option value="Batam">Batam</option>
                <option value="Tanjungpinang">Tanjungpinang</option>
                <option value="Bintan">Bintan</option>
                <option value="Karimun">Karimun</option>
                <option value="Lingga">Lingga</option>
                <option value="Natuna">Natuna</option>
                <option value="Anambas">Kepulauan Anambas</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">Nomor WhatsApp Bisnis</label>
              <input name="whatsapp" placeholder="Contoh: 628123456789" className="w-full border border-zinc-200 focus:border-zinc-950 outline-none px-4 py-2.5 rounded-xl transition-all text-sm" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">Link Google Maps (Opsional)</label>
              <input name="gmapsUrl" placeholder="https://maps.app.goo.gl/..." className="w-full border border-zinc-200 focus:border-zinc-950 outline-none px-4 py-2.5 rounded-xl transition-all text-sm" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">Foto Produk / Usaha</label>
              <div className="border border-dashed border-zinc-300 rounded-xl p-4 bg-zinc-50">
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res) {
                      const urls = res.map(file => file.url)
                      setImageUrls(prev => [...prev, ...urls])
                      alert("Foto berhasil diunggah!")
                    }
                  }}
                  onUploadError={(err) => {
                    alert(`Gagal mengunggah foto: ${err.message}`)
                  }}
                />
                {imageUrls.length > 0 && (
                  <div className="flex gap-2 mt-4 flex-wrap">
                    {imageUrls.map((url, idx) => (
                      <img key={idx} src={url} alt={`Preview ${idx}`} className="w-20 h-20 object-cover rounded-lg border border-zinc-200" />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-200">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-sm font-semibold transition-all disabled:opacity-70 shadow-xs cursor-pointer"
            >
              {loading ? "Menyimpan Data..." : "Kirim untuk Moderasi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
