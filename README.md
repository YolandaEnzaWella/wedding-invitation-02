# Undangan Pernikahan — Raisa &amp; Dimas

Undangan pernikahan digital bertema **Romantic &amp; Soft**: biru langit, putih,
bunga watercolor, dan banyak ruang kosong. Dibangun sebagai satu halaman React
yang digulir dari atas ke bawah, dengan animasi Framer Motion di setiap bagian.

Temanya sengaja dibuat **netral** — tanpa unsur adat atau agama tertentu —
supaya bisa dipakai lintas budaya dan keyakinan hanya dengan menyunting satu
berkas isi.

---

## Cara menjalankan

Butuh **Node.js 20 atau lebih baru**.

```bash
npm install
```

```bash
npm run dev
```

Lalu buka `http://localhost:5173`. Untuk melihat sapaan nama tamu, tambahkan
parameter `?to=`:

```
http://localhost:5173/?to=Keluarga%20Bapak%20Hartono
```

Perintah lain:

| Perintah | Kegunaan |
| --- | --- |
| `npm run build` | Membuat versi siap unggah di folder `dist/` |
| `npm run preview` | Menjalankan hasil `build` seperti di server sungguhan |
| `npm run images` | Mengolah ulang gambar sumber → `public/img/` (butuh Python + Pillow) |

---

## Menyesuaikan isi

**Hampir semua yang perlu Anda ubah ada di satu berkas: [`src/data/content.js`](src/data/content.js).**
Tidak perlu menyentuh satu pun komponen untuk memakai undangan ini bagi
pasangan lain.

| Yang ingin diubah | Bagian di `content.js` |
| --- | --- |
| Tanggal &amp; jam akad | `event.date` |
| Nama mempelai, orang tua, Instagram | `couple` |
| Nama acara, jam, lokasi, tautan Maps | `agenda` |
| Kutipan / ayat | `quote` |
| Perjalanan cinta | `loveStory` |
| Foto galeri | `gallery` |
| Rekening &amp; alamat kado | `gift` |
| Ucapan yang sudah tampil sejak awal | `seedWishes` |
| Kalimat penutup | `closing` |

### Tanggal hanya ditulis satu kali

`event.date` adalah **satu-satunya** tempat tanggal ditulis. Semua tanggal yang
muncul di halaman — termasuk nama harinya — dihitung dari sana lewat
[`src/lib/date.js`](src/lib/date.js), jadi tidak mungkin tertulis "Sabtu"
padahal tanggalnya jatuh di hari Senin.

Pengecualiannya hanya `<title>` dan tag `meta` di [`index.html`](index.html),
karena keduanya dibaca browser sebelum JavaScript sempat berjalan. Sunting
manual di sana kalau nama atau tanggalnya berganti.

Jam acara selalu ditampilkan dalam **WIB**, berapa pun zona waktu perangkat
tamu — jadi tamu di luar negeri tetap melihat jam yang benar.

### Nama acara bebas

`agenda[].title` tidak dikunci ke istilah tertentu. Isi "Akad Nikah",
"Pemberkatan", "Holy Matrimony", "Tea Pai", "Resepsi" — apa pun yang sesuai.
Begitu juga `quote`, yang secara bawaan netral dan bisa diganti ayat sesuai
keyakinan pasangan.

---

## Warna dan huruf

Palet dan tipografi didefinisikan sebagai token Tailwind di
[`src/index.css`](src/index.css), bukan ditulis mentah di tiap komponen.

Skala `sky-*` bawaan Tailwind sengaja **ditimpa** dengan biru langit yang jauh
lebih lembut. Jadi `bg-sky-200` atau `text-sky-700` di seluruh komponen otomatis
memakai warna tema ini — mengubah satu nilai di `@theme` akan mengubah seluruh
undangan sekaligus.

| Token | Nilai | Dipakai untuk |
| --- | --- | --- |
| `sky-300` | `#BFE1F0` | Biru langit lembut |
| `sky-400` | `#A9CDE8` | Warna utama |
| `sky-600` | `#7FAFD1` | Biru dusty, tombol, aksen |
| `sky-900` | `#3C5A73` | Teks di atas putih |
| `gilt` | `#C9B18A` | Detail emas pastel |

Huruf: **Great Vibes** (judul script), **Cormorant Garamond** (judul serif),
**Quicksand** (isi) — dimuat dari Google Fonts di `index.html`.

---

## Susunan berkas

```
src/
 ├─ App.jsx                 Menyusun urutan section & membuka cover
 ├─ main.jsx                Titik masuk React
 ├─ index.css               Palet, huruf, dan utilitas Tailwind
 ├─ data/content.js         SEMUA ISI UNDANGAN ADA DI SINI
 ├─ lib/
 │   ├─ date.js             Hitung tanggal, nama hari, hitung mundur
 │   └─ motion.js           Pola animasi yang dipakai berulang
 ├─ hooks/
 │   ├─ useInViewAnimation.js
 │   └─ useWishes.js        Ucapan tamu (localStorage)
 └─ components/
     ├─ CoverScreen.jsx     Layar pembuka + tombol "Buka Undangan"
     ├─ Navbar.jsx          Navigasi kaca, sembunyi saat scroll ke bawah
     ├─ Section.jsx         Kerangka judul + pembatas bunga
     ├─ HeroSection.jsx     Nama, tanggal, foto, parallax awan
     ├─ CountdownSection.jsx
     ├─ QuoteSection.jsx
     ├─ CoupleSection.jsx
     ├─ EventSection.jsx
     ├─ LoveStorySection.jsx
     ├─ GallerySection.jsx  Grid + lightbox
     ├─ RSVPSection.jsx     Formulir konfirmasi
     ├─ GiftSection.jsx     Amplop digital & alamat kado
     ├─ WishesSection.jsx   Daftar ucapan
     ├─ FooterSection.jsx   Penutup + tombol kembali ke atas
     ├─ MusicPlayer.jsx     Tombol musik mengambang
     ├─ Icons.jsx           Ikon garis tipis (SVG)
     └─ decor/
         ├─ FloralDivider.jsx
         ├─ CloudLayer.jsx
         └─ RibbonAccent.jsx
```

---

## Gambar

Gambar sumber (PNG mentah, ±52 MB) ada di `assets/img/` dan **tidak ikut
di-commit** — lihat [`.gitignore`](.gitignore). Yang diunduh tamu adalah hasil
olahannya di `public/img/` (±4,5 MB WebP).

```bash
npm run images
```

Perintah itu menjalankan [`tools/optimize-images.py`](tools/optimize-images.py),
yang mengubah ukuran, mengubah ke WebP, dan memberi nama yang bermakna
(`photo/hero.webp`, `floral/corner-a.webp`, …). Daftar pemetaannya ada di
bagian `JOBS` pada berkas itu.

> **Simpan sendiri cadangan `assets/img/`.** Karena tidak ikut ke GitHub, kalau
> foldernya hilang, berkas WebP tidak bisa dibuat ulang.

Musik latar: taruh berkas Anda di `public/audio/music.mp3`. Gunakan lagu yang
Anda punya haknya — bebas royalti atau dengan izin pemiliknya.

---

## Ucapan &amp; doa: batasnya saat ini

Ucapan yang ditulis tamu disimpan di **localStorage browser tamu itu sendiri**.
Artinya setiap tamu hanya melihat ucapannya sendiri ditambah ucapan awal di
`seedWishes` — **ucapan antar tamu tidak saling terlihat**.

Ini disengaja supaya undangan tetap bisa dideploy sebagai situs statis tanpa
server. Begitu juga konfirmasi RSVP: tersimpan di perangkat tamu, belum terkirim
ke mana pun.

### Menyambungkan ucapan ke database

Kalau ingin semua tamu melihat ucapan yang sama, dan konfirmasi RSVP benar-benar
masuk ke Anda, sambungkan ke Firestore:

1. Buat project di [Firebase Console](https://console.firebase.google.com),
   tambahkan aplikasi Web, salin `firebaseConfig`.
2. Aktifkan **Firestore Database** (mode production, lokasi `asia-southeast2`).
3. Buka tab **Rules**, tempelkan isi [`firestore.rules`](firestore.rules),
   lalu Publish. Aturan itu membatasi tamu hanya boleh menambah ucapan, tidak
   menghapus atau mengubah milik orang lain.
4. Ganti isi `load` dan `add` di
   [`src/hooks/useWishes.js`](src/hooks/useWishes.js) dengan panggilan Firestore.
   Sisa komponen tidak perlu diubah sama sekali — `WishesSection` dan
   `RSVPSection` hanya mengenal `wishes` dan `add`.

> `apiKey` Firebase memang bersifat publik dan aman dilihat orang. Yang
> melindungi data Anda adalah Rules di langkah 3, bukan kunci itu.

---

## Deploy ke GitHub Pages

`base` di [`vite.config.js`](vite.config.js) sudah disetel ke
`/wedding-invitation-02/`, sesuai nama repo ini. Kalau nanti dipasang di domain
sendiri, ubah menjadi `'/'`.

```bash
npm run build
```

Lalu unggah isi `dist/` ke branch `gh-pages`, atau pakai GitHub Actions.

---

## Aksesibilitas

- Tamu yang mengaktifkan **"kurangi gerak"** di sistemnya mendapat undangan
  tanpa animasi — semua transisi dipangkas, bukan sekadar dipercepat.
- Lightbox galeri bisa ditutup dengan `Esc` dan digeser dengan panah kiri/kanan.
- Musik tidak pernah berbunyi sendiri; selalu menunggu tamu menekan
  **Buka Undangan**.

---

## Folder `legacy/`

Berisi sisa percobaan versi HTML/JS murni sebelum project ini dipindah ke React.
Tidak dipakai oleh aplikasi, aman dihapus kalau sudah tidak diperlukan.
