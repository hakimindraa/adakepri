export type KotaKepri = 'Batam' | 'Tanjungpinang' | 'Bintan' | 'Karimun' | 'Natuna' | 'Anambas' | 'Lingga'

export type Review = {
  id: string
  namaPengguna: string
  rating: number
  komentar: string
  tanggal: string
}

export type Freelancer = {
  id: string
  nama: string
  kota: KotaKepri
  bio: string
  skills: string[]
  portfolioUrl?: string
  instagramUrl?: string
  linkedinUrl?: string
  portfolioImages: string[]
  tarifPerJam?: number
  ketersediaan: 'Tersedia' | 'Sibuk' | 'Tidak Tersedia'
  avatar: string
  terverifikasi: boolean
  totalDilihat: number
  rating: number
  reviews: Review[]
}

export type UMKM = {
  id: string
  namaBisnis: string
  kategori: 'Kuliner' | 'Fashion' | 'Kerajinan' | 'Jasa' | 'Elektronik' | 'Kecantikan' | 'Pertanian' | 'Lainnya'
  deskripsi: string
  kota: string
  alamat: string
  googleMapsUrl: string
  instagramUrl?: string
  tokopediaUrl?: string
  shopeeUrl?: string
  nomorWA: string
  jamBuka: string
  logo: string
  galeriProduk: string[]
  terverifikasi: boolean
  totalDilihat: number
  rating: number
  reviews: Review[]
}

const mockReviews: Review[] = [
  { id: 'r1', namaPengguna: 'Budi Santoso', rating: 5, komentar: 'Sangat profesional dan cepat!', tanggal: '12 Feb 2024' },
  { id: 'r2', namaPengguna: 'Siti Aminah', rating: 4, komentar: 'Hasil memuaskan, komunikasi lancar.', tanggal: '05 Mar 2024' }
]

export const freelancers: Freelancer[] = [
  {
    id: 'f1',
    nama: 'Rizky Hermawan',
    kota: 'Batam',
    bio: 'Web developer fokus pada React/Next.js, sering mengerjakan situs UMKM dan marketplace lokal.',
    skills: ['Web Developer', 'Copywriter'],
    portfolioUrl: 'https://example.com/rizky',
    instagramUrl: 'https://instagram.com/rizkyh',
    linkedinUrl: 'https://linkedin.com/in/rizkyh',
    portfolioImages: ['https://placehold.co/400x300?text=Web+1', 'https://placehold.co/400x300?text=Web+2'],
    tarifPerJam: 120000,
    ketersediaan: 'Tersedia',
    avatar: 'https://i.pravatar.cc/150?u=f1',
    terverifikasi: true,
    totalDilihat: 254,
    rating: 4.8,
    reviews: mockReviews
  },
  {
    id: 'f2',
    nama: 'Siti Marlina',
    kota: 'Tanjungpinang',
    bio: 'Desainer grafis untuk branding, kemasan, dan promosi digital lokal.',
    skills: ['Desain Grafis', 'Social Media'],
    portfolioUrl: '',
    instagramUrl: 'https://instagram.com/sitidesign',
    linkedinUrl: '',
    portfolioImages: ['https://placehold.co/400x300?text=Logo+1', 'https://placehold.co/400x300?text=Poster+2'],
    tarifPerJam: 90000,
    ketersediaan: 'Sibuk',
    avatar: 'https://i.pravatar.cc/150?u=f2',
    terverifikasi: false,
    totalDilihat: 180,
    rating: 4.5,
    reviews: mockReviews
  },
  {
    id: 'f3',
    nama: 'Andi Pratama',
    kota: 'Bintan',
    bio: 'Fotografer & videografer untuk acara pernikahan dan produk kuliner.',
    skills: ['Fotografer', 'Video Editor'],
    portfolioUrl: 'https://example.com/andi',
    instagramUrl: 'https://instagram.com/andiphotos',
    linkedinUrl: 'https://linkedin.com/in/andipratama',
    portfolioImages: ['https://placehold.co/400x300?text=Wedding', 'https://placehold.co/400x300?text=Food+Photo'],
    tarifPerJam: 150000,
    ketersediaan: 'Tersedia',
    avatar: 'https://i.pravatar.cc/150?u=f3',
    terverifikasi: true,
    totalDilihat: 342,
    rating: 4.9,
    reviews: mockReviews
  },
  {
    id: 'f4',
    nama: 'Maya Putri',
    kota: 'Karimun',
    bio: 'Pengelola konten dan social media, spesialis copy untuk produk lokal.',
    skills: ['Social Media', 'Copywriter'],
    portfolioImages: [],
    tarifPerJam: 80000,
    ketersediaan: 'Tersedia',
    avatar: 'https://i.pravatar.cc/150?u=f4',
    terverifikasi: false,
    totalDilihat: 97,
    rating: 4.2,
    reviews: []
  },
  {
    id: 'f5',
    nama: 'Hendra Saputra',
    kota: 'Natuna',
    bio: 'Translator dan data entry untuk kebutuhan dokumen dan marketplace.',
    skills: ['Translator', 'Data Entry'],
    portfolioImages: [],
    tarifPerJam: 60000,
    ketersediaan: 'Tidak Tersedia',
    avatar: 'https://i.pravatar.cc/150?u=f5',
    terverifikasi: true,
    totalDilihat: 63,
    rating: 4.0,
    reviews: []
  },
  {
    id: 'f6',
    nama: 'Lina Rahma',
    kota: 'Anambas',
    bio: 'Pengajar privat dan guru les berbagai mata pelajaran, khusus anak sekolah.',
    skills: ['Guru Les', 'Copywriter'],
    portfolioImages: [],
    tarifPerJam: 70000,
    ketersediaan: 'Tersedia',
    avatar: 'https://i.pravatar.cc/150?u=f6',
    terverifikasi: false,
    totalDilihat: 45,
    rating: 4.7,
    reviews: mockReviews
  },
]

export const umkms: UMKM[] = []

export const semuaKota: KotaKepri[] = ['Batam','Tanjungpinang','Bintan','Karimun','Natuna','Anambas','Lingga']

