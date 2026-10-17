# PRD – Web Persiapan Workshop Maba

**Divisi Penelitian dan Pengembangan (Litbang) – Himpunan Mahasiswa Informatika** Versi 0.1 · Penyusun: Ilham · Status: Draft

## 1. Ringkasan

Web statis satu tujuan: membantu mahasiswa baru (maba) **menyiapkan diri sebelum workshop**. Isinya panduan persiapan (instal VS Code, browser, dll), dikemas dengan animasi, tampilan yang mudah dipahami, dan sedikit elemen interaktif seperti checklist berprogres dan mini game, supaya maba tidak merasa sedang membaca dokumentasi yang membosankan.

Teknologi sengaja sederhana: **HTML, Tailwind CSS, dan JavaScript biasa**, tanpa framework dan tanpa backend.

## 2. Latar Belakang dan Masalah

- Workshop sering molor karena peserta belum siap: belum instal tools, laptop bermasalah, atau tidak tahu harus bawa apa.
- Panduan persiapan biasanya dibagikan lewat chat atau PDF yang panjang, jarang dibaca sampai habis.
- Maba belum terbiasa dengan istilah teknis, jadi butuh panduan visual dan langkah demi langkah.

## 3. Tujuan dan Indikator Keberhasilan

| Tujuan | Indikator |
| --- | --- |
| Maba datang dalam kondisi siap | Mayoritas peserta menyelesaikan checklist sebelum hari H |
| Panduan mudah dipahami | Maba bisa instal tools tanpa bertanya berulang ke panitia |
| Pengalaman menyenangkan | Maba mau membuka web lebih dari sekali dan menyelesaikan mini game |
| Beban panitia berkurang | Pertanyaan teknis dasar di grup berkurang |

Indikator bisa dicek secara sederhana lewat tanya langsung di awal workshop ("siapa yang sudah selesai checklist?"), tanpa perlu analytics.

## 4. Pengguna Target

**Utama:** maba Informatika, mayoritas pemula, memakai laptop Windows (sebagian macOS/Linux), dan membuka web dari HP maupun laptop.

**Sekunder:** panitia/divisi Litbang yang ingin membagikan satu link ke peserta dan memperbarui konten dengan mudah.

## 5. Ruang Lingkup

**Termasuk (In scope)**

- Satu halaman web (single page) dengan beberapa bagian
- Panduan persiapan per tools, dengan tab untuk Windows / macOS / Linux
- Checklist interaktif dengan progress bar
- Animasi scroll dan transisi
- 2–3 mini game ringan bertema persiapan workshop
- Info acara: tanggal, waktu, tempat, hal yang dibawa, kontak panitia
- Responsif untuk HP dan laptop

**Tidak termasuk (Out of scope)**

- Login, akun, atau database
- Pendaftaran peserta (memakai form eksternal bila perlu)
- Leaderboard online atau penyimpanan skor di server
- Backend apa pun

## 6. Struktur Halaman dan Konten

1. **Hero:** judul workshop, tagline, tanggal/lokasi, tombol "Mulai Persiapan", animasi masuk.
2. **Info Acara:** jadwal, tempat, apa yang dibawa (laptop, charger, dll), kontak panitia.
3. **Roadmap Persiapan:** langkah bernomor (timeline vertikal) yang muncul berurutan saat di-scroll.
4. **Panduan per Tools:** kartu/accordion untuk tiap tools, misalnya VS Code, browser (Chrome/Firefox), Git, akun GitHub, dan lainnya sesuai materi workshop. Tiap kartu berisi: untuk apa tools ini, langkah instal singkat, cara cek berhasil, dan tombol link unduh resmi.
5. **Checklist Kesiapan:** daftar centang dengan progress bar dan perayaan kecil saat 100%.
6. **Zona Main (mini game):** lihat bagian 8.
7. **FAQ dan Troubleshooting:** masalah umum (laptop jadul, internet lambat, instal gagal) dan cara minta bantuan.
8. **Footer:** kredit Litbang HMIF, kontak, tautan media sosial.

## 7. Kebutuhan Fungsional

| ID | Fitur | Kriteria Penerimaan |
| --- | --- | --- |
| F1 | Navigasi satu halaman | Menu tetap di atas, klik menggulir halus ke bagian terkait, menu berubah jadi hamburger di HP |
| F2 | Panduan tools dengan tab OS | Pengguna bisa memilih Windows/macOS/Linux dan langkah berubah sesuai pilihan |
| F3 | Checklist berprogres | Centang tersimpan di `localStorage`, progress bar bertambah, tetap tersimpan setelah halaman dimuat ulang |
| F4 | Tombol salin perintah | Perintah (misal `git --version`) bisa disalin dengan satu klik, muncul notifikasi "tersalin" |
| F5 | Animasi scroll | Elemen muncul bertahap saat masuk layar, memakai IntersectionObserver |
| F6 | Mode gelap/terang | Toggle tema, pilihan tersimpan |
| F7 | Mini game | Minimal 2 game berjalan lancar di HP dan laptop |
| F8 | Konten mudah diubah | Isi panduan dan checklist diambil dari satu objek data di JS, sehingga panitia cukup edit satu file |

## 8. Ide Interaktif dan Mini Game (pilih sesuai waktu)

Prioritas dari yang paling mudah dibuat:

1. **Kuis "Sudah Siap Belum?":** 5–7 pertanyaan pilihan ganda tentang persiapan, hasil berupa skor dan komentar lucu.
2. **Susun Urutan Instal (drag and drop):** peserta mengurutkan langkah instal VS Code dengan benar.
3. **Tebak Ikon Tools:** cocokkan logo/ikon dengan nama tools (memory game kartu).
4. **Terminal Mini:** kotak seperti terminal yang menerima perintah sederhana (`help`, `git --version`, `code .`) dan membalas dengan jawaban simulasi, sekaligus mengenalkan perintah dasar.
5. **Ketik Cepat:** mengetik potongan kode HTML sederhana dengan penghitung kecepatan.

Catatan: skor disimpan di `localStorage` saja, tanpa leaderboard online.

## 9. Desain dan Animasi

- **Gaya:** bersih, berwarna cerah, bernuansa "teknologi ramah pemula"; sesuaikan warna dengan identitas HMIF.
- **Bahasa:** Indonesia santai, kalimat pendek, minim jargon; istilah teknis selalu disertai penjelasan satu kalimat.
- **Tipografi:** satu font untuk teks dan satu font monospace untuk kode.
- **Animasi yang dipakai:** fade/slide saat scroll, hover pada kartu, progress bar mulus, confetti saat checklist selesai, mikro-interaksi pada tombol.
- **Aksesibilitas:** hormati pengaturan `prefers-reduced-motion`, kontras warna cukup, ukuran tombol nyaman disentuh.
- **Mobile first:** mayoritas akan membuka dari HP lewat link yang dibagikan di grup.

## 10. Spesifikasi Teknis

- **Stack:** HTML5, Tailwind CSS (via CDN agar tanpa proses build; atau build CLI bila ingin lebih ringan), JavaScript vanilla (ES6).
- **Pustaka opsional (via CDN):** canvas-confetti untuk efek perayaan. Selebihnya cukup JS biasa.
- **Struktur folder:**

  ```
  /
  ├── index.html
  ├── assets/
  │   ├── img/
  │   └── icons/
  ├── js/
  │   ├── data.js      (konten panduan, checklist, kuis)
  │   ├── main.js      (navigasi, tema, animasi scroll)
  │   └── games.js     (mini game)
  └── css/
      └── custom.css   (animasi khusus)
  ```
- **Penyimpanan:** `localStorage` untuk checklist, tema, dan skor.
- **Hosting:** GitHub Pages, Netlify, atau Vercel (gratis, cukup untuk situs statis).
- **Kompatibilitas:** Chrome, Firefox, Safari, dan Edge versi terbaru, serta browser HP.

## 11. Kebutuhan Non-Fungsional

- Waktu muat cepat (target di bawah 3 detik di koneksi biasa); gambar dikompres.
- Ukuran total halaman ringan karena sebagian peserta memakai kuota.
- Berfungsi tanpa login dan tanpa instalasi apa pun.
- Konten mudah diperbarui oleh anggota Litbang lain tanpa paham seluruh kode.

## 12. Rencana Pengerjaan

| Tahap | Isi | Estimasi |
| --- | --- | --- |
| 1. Konten | Tentukan daftar tools, langkah instal, info acara, teks FAQ | 1–2 hari |
| 2. Desain | Sketsa tata letak, pilih palet warna dan font | 1 hari |
| 3. Kerangka | Buat HTML dan layout Tailwind semua bagian | 1–2 hari |
| 4. Interaksi | Checklist, tab OS, salin perintah, tema | 1–2 hari |
| 5. Animasi dan game | Animasi scroll, 2 mini game | 2–3 hari |
| 6. Uji | Coba di HP dan laptop, minta 2–3 maba/teman mencoba | 1 hari |
| 7. Rilis | Deploy dan bagikan link ke grup maba | 1 hari |

Target selesai: minimal **3–5 hari sebelum workshop** agar maba punya waktu menyiapkan diri.

## 13. Risiko dan Mitigasi

| Risiko | Mitigasi |
| --- | --- |
| Terlalu banyak fitur sehingga tidak selesai | Kerjakan checklist dan panduan dulu (wajib), game belakangan (bonus) |
| Animasi berat di HP lama | Pakai animasi CSS ringan, hormati reduced-motion |
| Link unduh atau langkah instal berubah | Gunakan link ke halaman resmi, bukan file langsung; cek ulang sebelum rilis |
| Maba tetap tidak membaca | Bagikan link bersama pengingat singkat di grup dan umumkan "bonus" bagi yang checklist-nya penuh |

## 14. Pertanyaan Terbuka

1. Apa tema/materi inti workshop? Ini menentukan tools apa saja yang masuk panduan (Python, Git, Node.js, dll).
2. Berapa perkiraan jumlah maba dan OS apa yang paling banyak dipakai?
3. Apakah ada identitas visual HMIF (logo, warna) yang wajib dipakai?
4. Apakah perlu bukti kesiapan, misalnya peserta menunjukkan layar checklist saat registrasi ulang?
5. Siapa yang akan merawat konten setelah web rilis?
