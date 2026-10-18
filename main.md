# Penjelasan `js/main.js`

File ini mengatur seluruh perilaku interaktif halaman: navigasi, tema, ikon, animasi scroll, render konten dinamis, dan checklist. Urutan script di `index.html`: `data.js` → `main.js` → `games.js`.

## Utilitas dasar

- `$` / `$$` — shortcut `querySelector` / `querySelectorAll` (mengembalikan array).
- `LS` — nama kunci `localStorage`.
- `store` — wrapper aman untuk `localStorage` (get/set dengan `try/catch`, fallback jika tidak tersedia).

## Toast

- `toast(message)` — menampilkan notifikasi sementara (1,9 detik) pada elemen `#toast`.

## Tema

- `applyTheme(theme)` — set atribut `data-theme` di `<html>`, toggle ikon matahari/bulan, dan ubah `theme-color`.
- `initTheme()` — baca tema tersimpan atau preferensi OS; toggle tema saat tombol `#theme-toggle` diklik dan simpan ke `localStorage`.

## Navigasi

- `initNav()` — buka/tutup menu mobile, tandai link aktif berdasarkan section yang terlihat (IntersectionObserver dengan rootMargin tengah layar).

## Ikon & animasi scroll

- `hydrateIcons()` — isi elemen `[data-ic]` dengan SVG dari `ICONS`.
- `observeReveal(scope)` — animasi muncul saat elemen `.reveal` masuk viewport; fallback langsung tampil jika browser tidak mendukung IntersectionObserver.

## Render konten

- `renderMarquee()` — duplikasi teks marquee untuk efek loop.
- `renderStats()` — render statistik dari `CONTENT.stats`.
- `infoCard()` / `renderEvent()` — kartu info acara (tanggal, waktu, tempat), daftar barang bawaan, dan kontak (dengan link WhatsApp).
- `renderRoadmap()` — daftar roadmap bertahap.
- `detectOS()` — deteksi OS (Windows/macOS/Linux), default Windows untuk mobile.
- `stepsBlock()` — blok langkah instalasi; perintah (diawali sudo/git/brew/dll.) ditampilkan sebagai kode; opsional blok verifikasi + tombol salin.
- `accordionCard()` — template kartu accordion (header + panel).
- `toolCard()` / `extensionCard()` — kartu spesifik untuk tools (per OS) dan ekstensi (flat).
- `renderCardSection()` — renderer generik: mount kartu, opsional tab OS, bind accordion & copy, animasi reveal.
- `renderOS()` — render section tools dengan tab OS aktif (deteksi awal + simpan pilihan).
- `renderExtensions()` — render section ekstensi.
- `bindAccordion()` — toggle panel accordion + rotasi chevron.
- `bindCopy()` — salin teks ke clipboard (fallback `execCommand`).

## Checklist

- `renderChecklist()` — render daftar checklist dari `CONTENT.checklist`, pulihkan state dari `localStorage`.
- Progress ring dihitung dari jumlah item selesai; saat semua selesai, panggil `celebrate()` (toast + confetti) sekali.
- Tombol `#reset-checklist` mereset semua centang.
- State disimpan ke `maba:checklist` setiap perubahan.

## FAQ & Footer

- `renderFaq()` — render daftar FAQ sebagai `<details>`.
- `renderFooter()` — isi tahun di `#footer-year`.

## Inisialisasi

- `init()` — jalankan semua render & init saat `DOMContentLoaded`.
- Semua fungsi render bergantung pada data dari `js/data.js` (`CONTENT`, `ICONS`).
