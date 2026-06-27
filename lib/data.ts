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

export const umkms: UMKM[] = [
  {
    id: 'u1',
    namaBisnis: 'Warung Nasi Lamak',
    kategori: 'Kuliner',
    deskripsi: 'Masakan Melayu & seafood khas Batam, resep turun-temurun, buka tiap hari.',
    kota: 'Batam',
    alamat: 'Jl. Engku Putri No.12, Batam Center',
    googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.0',
    instagramUrl: 'https://instagram.com/warungnasilamak',
    tokopediaUrl: '',
    shopeeUrl: '',
    nomorWA: '6281234567890',
    jamBuka: '08.00 - 21.00',
    logo: 'https://placehold.co/100x100?text=WN',
    galeriProduk: ['https://placehold.co/400x300?text=Menu+1', 'https://placehold.co/400x300?text=Suasana'],
    terverifikasi: true,
    totalDilihat: 520,
    rating: 4.8,
    reviews: mockReviews
  },
  {
    id: 'u2',
    namaBisnis: 'Batik Kepri',
    kategori: 'Fashion',
    deskripsi: 'Koleksi batik modern terinspirasi motif lokal Kepulauan Riau.',
    kota: 'Tanjungpinang',
    alamat: 'Jl. Sultan Sulaiman No.5, Tanjungpinang',
    googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.0',
    instagramUrl: 'https://instagram.com/batikkepri',
    tokopediaUrl: 'https://www.tokopedia.com/batikkepri',
    shopeeUrl: '',
    nomorWA: '6281987654321',
    jamBuka: '09.00 - 18.00',
    logo: 'https://placehold.co/100x100?text=BK',
    galeriProduk: ['https://placehold.co/400x300?text=Batik+1', 'https://placehold.co/400x300?text=Batik+2'],
    terverifikasi: false,
    totalDilihat: 210,
    rating: 4.6,
    reviews: mockReviews
  },
  {
    id: 'u3',
    namaBisnis: 'Kriya Laut Karimun',
    kategori: 'Kerajinan',
    deskripsi: 'Kerajinan tangan dari bahan laut, suvenir khas Karimun.',
    kota: 'Karimun',
    alamat: 'Jl. Pelabuhan No.3, Karimun',
    googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3990.0',
    instagramUrl: '',
    tokopediaUrl: '',
    shopeeUrl: 'https://shopee.co.id/kriyalautkarimun',
    nomorWA: '6281122334455',
    jamBuka: '10.00 - 17.00',
    logo: 'https://placehold.co/100x100?text=KL',
    galeriProduk: [],
    terverifikasi: true,
    totalDilihat: 134,
    rating: 4.4,
    reviews: []
  },
  {
    id: 'u4',
    namaBisnis: 'Salon Cantik Bintan',
    kategori: 'Kecantikan',
    deskripsi: 'Salon lengkap: potong rambut, facial, dan perawatan kecantikan.',
    kota: 'Bintan',
    alamat: 'Jl. Pantai Indah No.8, Bintan',
    googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3991.0',
    instagramUrl: 'https://instagram.com/saloncantikbintan',
    nomorWA: '6281199988877',
    jamBuka: '09.00 - 20.00',
    logo: 'https://placehold.co/100x100?text=SC',
    galeriProduk: ['https://placehold.co/400x300?text=Haircut'],
    terverifikasi: false,
    totalDilihat: 76,
    rating: 4.5,
    reviews: mockReviews
  },
  {
    id: 'u5',
    namaBisnis: 'Tani Segar Natuna',
    kategori: 'Pertanian',
    deskripsi: 'Pemasok sayur dan buah lokal segar dari Natuna ke Batam dan sekitarnya.',
    kota: 'Natuna',
    alamat: 'Desa Tani, Natuna',
    googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3992.0',
    nomorWA: '6281777665544',
    jamBuka: '07.00 - 15.00',
    logo: 'https://placehold.co/100x100?text=TS',
    galeriProduk: [],
    terverifikasi: false,
    totalDilihat: 39,
    rating: 4.0,
    reviews: []
  },
  {
    id: 'u6',
    namaBisnis: 'Elektronik Sentra Lingga',
    kategori: 'Elektronik',
    deskripsi: 'Toko elektronik kecil dengan layanan service dan sparepart.',
    kota: 'Lingga',
    alamat: 'Jl. Merdeka No.2, Lingga',
    googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3993.0',
    instagramUrl: '',
    tokopediaUrl: '',
    shopeeUrl: '',
    nomorWA: '6281333444555',
    jamBuka: '08.00 - 17.00',
    logo: 'https://placehold.co/100x100?text=ES',
    galeriProduk: [],
    terverifikasi: true,
    totalDilihat: 88,
    rating: 4.3,
    reviews: []
  },
]

export const semuaKota: KotaKepri[] = ['Batam','Tanjungpinang','Bintan','Karimun','Natuna','Anambas','Lingga']
