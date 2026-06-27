"use client"
import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'

export default function ContactModal({ defaultWa }: { defaultWa?: string }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ name, email, message })
    setOpen(false)
    alert('Pesan terkirim!')
  }

  return (
    <div className="w-full">
      <div className="flex flex-col gap-3">
        {defaultWa && (
          <a
            href={`https://wa.me/${defaultWa}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:opacity-90 text-white rounded-xl font-500 transition-all shadow-sm"
          >
            <MessageCircle size={18} />
            Chat WhatsApp
          </a>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-slide-up">
            <div className="px-8 py-6 border-b border-[#E2E8F0] flex justify-between items-center bg-[#F8FAFC]">
              <h3 className="text-xl font-600 text-[#1A202C]">Kirim Pesan</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-[#64748B] hover:text-[#1A202C] transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={submit} className="p-8 space-y-5">
              <div>
                <label className="block text-xs font-600 text-[#64748B] uppercase tracking-wider mb-2">Nama Lengkap</label>
                <input
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-600 text-[#64748B] uppercase tracking-wider mb-2">Email Anda</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="budi@example.com"
                  className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-600 text-[#64748B] uppercase tracking-wider mb-2">Pesan</label>
                <textarea
                  required
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Tulis pesan Anda untuk freelancer..."
                  rows={4}
                  className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl transition-all text-sm resize-none"
                />
              </div>

              <div className="pt-4 flex flex-col gap-3">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#047857] to-[#036046] hover:from-[#064E3B] hover:to-[#047857] text-white shadow-md py-3.5 rounded-xl font-600 transition-all"
                >
                  Kirim Pesan Sekarang
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-full text-[#64748B] font-500 py-2 hover:text-[#1A202C] transition-colors"
                >
                  Batalkan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
