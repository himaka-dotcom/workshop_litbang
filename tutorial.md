# Tutorial — Cara Menambah Fitur

Panduan untuk anggota Litbang yang mau mengembangkan web persiapan workshop ini.
Semua contoh memakai kode yang benar-benar ada di repo.

---

## 0. Peta file singkat

```
index.html        struktur halaman (section + titik tempel <div id="...">)
js/data.js        SEMUA konten + ikon  → edit di sini paling sering
js/main.js        render konten, navigasi, tema, animasi, checklist
js/games.js       mini game (kuis + terminal)
css/custom.css    palet warna, animasi, komponen
assets/img/       favicon & gambar
```

**Urutan script di `index.html` tidak boleh diubah:**
`data.js` → `main.js` → `games.js`.

Kunci penyimpanan browser (`localStorage`):

| Kunci | Isi |
| --- | --- |
| `maba:theme` | tema terang/gelap |
| `maba:os` | OS yang dipilih |
| `maba:checklist` | centang checklist |
| `maba:quiz-best` | skor kuis terbaik |

---

## 1. Menambah ke bagian yang sudah ada (paling gampang)

Cukup tambah entri ke `CONTENT` di `js/data.js`. Tidak perlu sentuh HTML/JS lain.

### Checklist
```js
checklist: [
  // ...item lama
  { id: "webcam", label: "Webcam berfungsi", hint: "Tes lewat Google Meet." },
],
```
`id` harus unik. Centang otomatis tersimpan & progress bar ikut naik.

### Panduan per tools (dengan tab OS)
```js
tools: [
  // ...tool lama
  {
    id: "nodejs",
    name: "Node.js",
    badge: "Opsional",
    icon: "chip",                    // pakai nama ikon dari ICONS
    tagline: "Menjalankan JavaScript di luar browser.",
    why: "Dibutuhkan saat materinya masuk ke sisi server.",
    steps: {
      windows: ["Unduh dari nodejs.org (LTS).", "Jalankan installer, Next sampai selesai."],
      macos:   ["Pakai Homebrew: brew install node"],
      linux:   ["Debian/Ubuntu: sudo apt install nodejs npm"],
    },
    verify: { command: "node --version", note: "Muncul v20.x berarti berhasil." },
    downloadUrl: "https://nodejs.org/",
    downloadLabel: "nodejs.org",
    // altLink: { url: "...", label: "..." }   // opsional
  },
],
```
Langkah yang diawali `sudo`/`git `/`code ` dll otomatis di-render sebagai kode monospace dengan tombol salin.

### Ekstensi (tanpa tab OS)
```js
extensions: [
  // ...item lama
  {
    id: "eslint",
    name: "ESLint",
    badge: "Opsional",
    icon: "target",
    tagline: "Menandai kesalahan JavaScript lebih awal.",
    why: "Membantu menangkap typo sebelum kode dijalankan.",
    steps: ["Buka panel Extensions.", 'Cari "ESLint".', "Klik Install."],
    downloadUrl: "https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint",
    downloadLabel: "Marketplace: ESLint",
  },
],
```

### FAQ, Roadmap, Marquee, Statistik, Kuis
Semua pola sama — tambah objek ke array-nya:
```js
faq:       [{ q: "Pertanyaan?", a: "Jawaban." }],
roadmap:   [{ step: "06", title: "Judul", text: "Penjelasan." }],
marquee:   ["VS Code", "Git"],
stats:     [{ value: "4", label: "tools wajib" }],
quiz:      [{ q: "Pertanyaan?", options: [{ t: "Opsi", p: 2 }] }], // p = poin
```

### Info acara & kontak
```js
event: {
  date: "Sabtu, 8 November 2026",
  // ...
  contacts: [{ name: "Ilham", role: "Litbang", wa: "+62 812-0000-0000" }],
},
```
Tombol WhatsApp dibuat otomatis dari `wa` (angka saja yang dipakai).

---

## 2. Menambah ikon

Tambah entri di `ICONS` (`js/data.js`), lalu pakai namanya sebagai `icon`:
```js
const ICONS = {
  // ...ikon lama
  rocket:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 15c-1 3 0 5 0 5s2 1 5 0M14 4c3 0 6 3 6 6-2 6-9 9-9 9l-6-6s3-7 9-9Z"/><circle cx="15" cy="9" r="1.6"/></svg>',
};
```
Aturan ikon: pakai `stroke="currentColor"` dan `fill="none"` supaya warnanya ikut tema. Untuk memakai di HTML statis, tambahkan `data-ic="rocket"` pada elemen — `hydrateIcons()` akan mengisinya otomatis.

---

## 3. Menambah section baru (pola render generik)

### Langkah 1 — tambah data di `js/data.js`
```js
CONTENT.checkpoints = [
  { id: "cp1", name: "Checkpoint 1", badge: "Hari 1", icon: "chip",
    tagline: "Ringkasan singkat.", why: "Kenapa ini penting.",
    steps: ["Langkah 1.", "Langkah 2."],
    downloadUrl: "https://example.com", downloadLabel: "Materi" },
];
```

### Langkah 2 — tambah titik tempel di `index.html`
```html
<section id="checkpoint" class="mx-auto max-w-[1180px] px-4 sm:px-6 py-16 sm:py-24">
  <div class="reveal mb-8 max-w-2xl">
    <div class="section-no">08 — Checkpoint</div>
    <h2 class="headline mt-3 text-4xl sm:text-5xl">Judul <span class="mark">section</span></h2>
    <p class="mt-4" style="color:var(--ink-soft)">Deskripsi singkat.</p>
  </div>

  <div id="checkpoint-list" class="grid gap-4"></div>
</section>
```

### Langkah 3 — tambah renderer di `js/main.js`
```js
function checkpointCard(cp) {
  const body = `
    <p class="mb-4" style="color:var(--ink-soft)">${cp.why}</p>
    ${stepsBlock(cp.steps, { label: "Langkah" })}
    <div class="mt-5">${downloadButton(cp.downloadUrl, cp.downloadLabel)}</div>`;
  return accordionCard({ id: cp.id, icon: cp.icon, name: cp.name,
    badge: cp.badge, tagline: cp.tagline, bodyHtml: body });
}

function renderCheckpoints() {
  renderCardSection({
    mountId: "checkpoint-list",
    items: CONTENT.checkpoints,
    buildCard: checkpointCard,
  });
}
```
Lalu panggil di `init()` **sebelum** `observeReveal()`:
```js
renderCheckpoints();
```

### Butuh tab pemilih (seperti tab OS)?
Kirim `tabsId`, `tabs`, `activeKey`, dan `tabStoreKey`:
```js
renderCardSection({
  mountId: "checkpoint-list",
  tabsId: "checkpoint-tabs",          // <div id="checkpoint-tabs" role="tablist">
  tabs: [{ key: "hari1", label: "Hari 1" }, { key: "hari2", label: "Hari 2" }],
  activeKey: "hari1",
  tabStoreKey: "maba:checkpoint-tab", // ingat pilihan pengguna
  items: CONTENT.checkpoints,
  buildCard: (item, key) => checkpointCard(item, key),
});
```

### Referensi fungsi renderer

| Fungsi | Kegunaan |
| --- | --- |
| `renderCardSection(opts)` | isi `mount` + (opsional) tab, sekaligus bind accordion/salin/reveal |
| `accordionCard({id,icon,name,badge,tagline,bodyHtml})` | kerangka kartu yang bisa dilipat |
| `stepsBlock(steps, {verify,label})` | daftar langkah bernomor + blok "cara cek" + tombol salin |
| `downloadButton(url,label)` | tombol unduh utama |

> Setiap kali `renderCardSection` menggambar ulang, ia memanggil `observeReveal(mount)`
> agar animasi muncul tetap jalan. Jadi **jangan** lupa memakai `renderCardSection`
> (bukan `innerHTML` manual) bila kontenmu perlu animasi reveal.

---

## 4. Menambah mini game

Semua di `js/games.js`.

1. Tambah data pertanyaan/perintah di `CONTENT` (`js/data.js`).
2. Buat fungsi `renderGameBaru()` yang mengisi sebuah `<div id="game-baru">` di HTML.
3. Daftarkan di blok paling bawah `js/games.js`:
```js
document.addEventListener("DOMContentLoaded", () => {
  renderQuiz();
  renderTerminal();
  renderGameBaru(); // <-- tambahkan
});
```
Simpan skor ke `localStorage`, mis. `localStorage.setItem("maba:game-baru-best", skor)`.

---

## 5. Menambah tautan navigasi

Nav ada di **3 tempat** di `index.html` — tambahkan di semuanya:
1. Nav desktop (baris `.nav-link` dengan `data-nav`),
2. Menu mobile (`#mobile-menu`),
3. Footer.

Contoh:
```html
<a class="nav-link" data-nav href="#checkpoint">Checkpoint</a>
```
`data-nav` membuat tautan itu ikut ter-“highlight” saat section-nya terlihat.

---

## 6. Mengubah warna / identitas HMIF

Cukup edit blok `:root` dan `[data-theme="dark"]` di `css/custom.css`:
```css
:root {
  --primary: #1f39ff;   /* warna utama / tombol */
  --accent: #d6f94e;    /* warna stabilo (.mark) */
  --energy: #ff5b3a;    /* aksen energi */
  --paper: #f2ede2;     /* latar */
  --ink: #14110c;       /* teks */
}
```
Ganti nilai hex-nya; seluruh halaman ikut berubah tanpa edit lain.

---

## 7. Cek sebelum commit

```bash
node --check js/data.js && node --check js/main.js && node --check js/games.js
python3 -m http.server 8000    # buka http://localhost:8000
```

Checklist manual:
- [ ] Tidak ada error di Console (F12).
- [ ] Muncul saat di-scroll (animasi reveal jalan).
- [ ] Buka/tutup accordion berfungsi.
- [ ] Tema terang **dan** gelap enak dilihat.
- [ ] Tampilan rapi di lebar HP (390px) dan laptop.
- [ ] `prefers-reduced-motion` masih dihormati.

---

## Konvensi cepat

- **Jangan** tambah library baru tanpa perlu; cukup vanilla + Tailwind CDN.
- Teks pakai Bahasa Indonesia santai, kalimat pendek, jargon diberi penjelasan.
- Setiap data butuh `id` unik (dipakai untuk `id`/`aria-controls`).
- Urutan panggilan di `init()` penting: render dulu, `observeReveal()` paling akhir.
- Hindari `innerHTML` manual untuk konten yang perlu animasi — pakai `renderCardSection`.
