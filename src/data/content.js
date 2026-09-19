/* ===========================================================================
   SELURUH ISI UNDANGAN ADA DI BERKAS INI
   ---------------------------------------------------------------------------
   Untuk memakai undangan ini bagi pasangan lain, cukup sunting berkas ini —
   tidak perlu menyentuh satu pun komponen di src/components/.

   Catatan penting soal tanggal: nama hari ("Sabtu", "Senin", …) TIDAK ditulis
   manual di mana pun. Semuanya dihitung dari `event.date` di bawah, supaya
   tidak mungkin tertulis "Sabtu" padahal tanggalnya jatuh di hari Senin.
   =========================================================================== */

/** Menyiapkan path gambar agar tetap benar saat dideploy ke sub-folder
 *  (GitHub Pages). Jangan tulis path gambar langsung di komponen. */
const img = (path) => `${import.meta.env.BASE_URL}img/${path}`

/** Sama, untuk berkas non-gambar di public/. */
export const publicFile = (path) => `${import.meta.env.BASE_URL}${path}`

/* ---------------------------------------------------------------------------
   1. WAKTU ACARA — SATU-SATUNYA TEMPAT MENGUBAH TANGGAL
   --------------------------------------------------------------------------- */
export const event = {
  /** Waktu akad dalam WIB (UTC+7). Format: YYYY-MM-DDTHH:mm:ss+07:00 */
  date: '2026-10-12T08:00:00+07:00',
  /** Dipakai untuk hitung mundur dan nama hari di seluruh halaman. */
  timeZoneLabel: 'WIB',
}

/* ---------------------------------------------------------------------------
   2. MEMPELAI
   --------------------------------------------------------------------------- */
export const couple = {
  // Dipakai di cover, hero, dan footer.
  bride: {
    short: 'Raisa',
    full: 'Raisa Anindita',
    role: 'Putri dari',
    parents: 'Bapak Budi Hermawan\n& Ibu Dewi Lestari',
    photo: img('photo/bride-2.webp'),
    instagram: 'raisa.anindita',
  },
  groom: {
    short: 'Dimas',
    full: 'Dimas Pratama',
    role: 'Putra dari',
    parents: 'Bapak Ahmad Santoso\n& Ibu Siti Nurhayati',
    photo: img('photo/groom-1.webp'),
    instagram: 'dimas.pratama',
  },
  /** Urutan nama di cover & hero. 'bride-first' atau 'groom-first'. */
  order: 'bride-first',
  monogram: 'R & D',
  tagline: 'Two souls, one journey,\na lifetime of love',
  eyebrow: 'The Wedding Of',
}

/* ---------------------------------------------------------------------------
   3. TIGA NILAI DI BAWAH PROFIL MEMPELAI
   --------------------------------------------------------------------------- */
export const values = [
  { icon: 'heart', label: 'Saling\nMelengkapi' },
  { icon: 'rings', label: 'Bersama\nMenuju Halal' },
  { icon: 'infinity', label: 'Selamanya' },
]

/* ---------------------------------------------------------------------------
   4. SUSUNAN ACARA
   ---------------------------------------------------------------------------
   `title` sengaja bebas diisi — "Akad Nikah", "Pemberkatan", "Holy Matrimony",
   "Resepsi", "Tea Pai", dsb. — supaya tema ini tetap netral lintas keyakinan.
   `start`/`end` memakai jam 24 (WIB). `end` boleh null kalau tidak dibatasi.
   --------------------------------------------------------------------------- */
export const agenda = [
  {
    id: 'akad',
    icon: 'rings',
    title: 'Akad Nikah',
    start: '08:00',
    end: null,
    venue: 'Masjid Al-Falah',
    address: 'Jl. Melati No. 10, Bandung',
    maps: 'https://maps.google.com/?q=Masjid+Al-Falah+Bandung',
  },
  {
    id: 'resepsi',
    icon: 'glass',
    title: 'Resepsi',
    start: '11:00',
    end: '14:00',
    venue: 'The Samaya Bali',
    address: 'Jl. Raya Uluwatu, Bali',
    maps: 'https://maps.google.com/?q=The+Samaya+Bali+Uluwatu',
  },
]

/* ---------------------------------------------------------------------------
   5. KUTIPAN
   ---------------------------------------------------------------------------
   Netral secara default. Bisa diganti ayat/kitab sesuai keyakinan pasangan,
   dan `source` boleh dikosongkan bila tidak perlu.
   --------------------------------------------------------------------------- */
export const quote = {
  text:
    'Cinta bukan tentang menemukan seseorang yang sempurna, ' +
    'tetapi tentang melihat kesempurnaan dalam ketidaksempurnaan.',
  source: '',
}

/* ---------------------------------------------------------------------------
   6. PERJALANAN CINTA
   --------------------------------------------------------------------------- */
export const loveStory = [
  {
    year: '2019',
    title: 'Pertemuan',
    text: 'Kita bertemu dalam keadaan yang sederhana, namun berkesan.',
    photo: img('photo/couple-1.webp'),
  },
  {
    year: '2021',
    title: 'Menjalin Cerita',
    text: 'Perjalanan penuh tawa, dukungan, dan pelajaran berharga.',
    photo: img('photo/couple-3.webp'),
  },
  {
    year: '2024',
    title: 'Lamaran',
    text: 'Dengan keyakinan dan doa, kami melangkah lebih serius menuju masa depan.',
    photo: img('photo/bride-3.webp'),
  },
  {
    year: '2026',
    title: 'Hari Bahagia',
    text: 'Kini, kami siap memulai bab baru sebagai suami istri.',
    photo: img('photo/couple-2.webp'),
  },
]

/* ---------------------------------------------------------------------------
   7. GALERI
   ---------------------------------------------------------------------------
   Foto pertama tampil lebih besar (span 2 kolom) di grid.
   --------------------------------------------------------------------------- */
export const gallery = [
  { src: img('photo/couple-1.webp'), alt: 'Raisa dan Dimas berdampingan', wide: true },
  { src: img('photo/bride-1.webp'), alt: 'Raisa dengan buket pengantin' },
  { src: img('photo/couple-2.webp'), alt: 'Raisa dan Dimas saling menatap' },
  { src: img('photo/groom-2.webp'), alt: 'Dimas di balkon dengan latar laut' },
  { src: img('photo/bride-3.webp'), alt: 'Senyum Raisa' },
  { src: img('photo/couple-3.webp'), alt: 'Raisa dan Dimas berjalan bersama' },
]

/* ---------------------------------------------------------------------------
   8. AMPLOP DIGITAL
   ---------------------------------------------------------------------------
   Kosongkan array `accounts` bila tidak ingin menampilkan rekening.
   --------------------------------------------------------------------------- */
export const gift = {
  note: 'Doa dan restu Anda adalah hadiah terindah bagi kami.',
  accounts: [
    { bank: 'BCA', number: '1234567890', holder: 'Raisa Anindita' },
    { bank: 'Mandiri', number: '0987654321', holder: 'Dimas Pratama' },
  ],
  /** Alamat kirim kado fisik. Kosongkan ('') untuk menyembunyikannya. */
  address: 'Jl. Melati No. 10, Bandung, Jawa Barat 40123',
}

/* ---------------------------------------------------------------------------
   9. UCAPAN AWAL
   ---------------------------------------------------------------------------
   Ucapan dari tamu tersimpan di localStorage browser masing-masing dan
   ditambahkan ke atas daftar ini. Lihat catatan di README soal cara
   menyambungkannya ke database agar ucapan terlihat oleh semua tamu.
   --------------------------------------------------------------------------- */
export const seedWishes = [
  {
    id: 'seed-1',
    name: 'Salsabila',
    date: '10 Okt 2026',
    message:
      'Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. ' +
      'Selamat menempuh hidup baru!',
  },
  {
    id: 'seed-2',
    name: 'Rizky & Amel',
    date: '9 Okt 2026',
    message: 'Happy wedding Raisa & Dimas! Semoga selalu bahagia dan saling melengkapi ❤️',
  },
]

/* ---------------------------------------------------------------------------
   10. PENUTUP
   --------------------------------------------------------------------------- */
export const closing = {
  title: 'Terima Kasih',
  text:
    'Atas doa, restu, dan kehadiran Anda dalam perjalanan cinta kami. ' +
    'Sampai jumpa di hari bahagia!',
}

/* ---------------------------------------------------------------------------
   11. ASET & NAVIGASI (jarang perlu diubah)
   --------------------------------------------------------------------------- */
export const assets = {
  music: publicFile('audio/music.mp3'),
  hero: img('photo/hero.webp'),
  bg: {
    sky: img('bg/sky.webp'),
    arch: img('bg/arch.webp'),
    balcony: img('bg/balcony.webp'),
  },
  floral: {
    swag: img('floral/swag.webp'),
    wreath: img('floral/wreath.webp'),
    archGold: img('floral/arch-gold.webp'),
    frameHex: img('floral/frame-hex.webp'),
    bouquet: img('floral/bouquet.webp'),
    leaf: img('floral/leaf.webp'),
    ribbon: img('floral/ribbon.webp'),
    cornerA: img('floral/corner-a.webp'),
    cornerB: img('floral/corner-b.webp'),
    cornerC: img('floral/corner-c.webp'),
    cornerD: img('floral/corner-d.webp'),
    cornerE: img('floral/corner-e.webp'),
  },
}

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'couple', label: 'Couple' },
  { id: 'event', label: 'Event' },
  { id: 'story', label: 'Love Story' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'rsvp', label: 'RSVP' },
  { id: 'gift', label: 'Gift' },
]

/** Sapaan default bila URL tidak memakai ?to= */
export const defaultGuest = 'Bapak/Ibu/Saudara/i'
