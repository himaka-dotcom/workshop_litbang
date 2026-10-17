/* =========================================================================
   data.js — SATU SUMBER KONTEN
   Panitia cukup edit objek CONTENT di file ini untuk mengubah isi web.
   Tidak perlu menyentuh HTML atau file JS lain.
   ========================================================================= */

const ICONS = {
  vscode:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3 8.5 11 5 8.2 3 9.2l2.5 2.8L3 14.8l2 1 3.5-2.8L17 21l4-1.8V4.8L17 3Z"/><path d="M17 8.4v7.2"/></svg>',
  extensionIconSvg :
   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3 8.5 11 5 8.2 3 9.2l2.5 2.8L3 14.8l2 1 3.5-2.8L17 21l4-1.8V4.8L17 3Z"/><path d="M17 8.4v7.2"/></svg>',
  browser:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.4 2.5 15.6 0 18M12 3c-2.5 2.4-2.5 15.6 0 18"/></svg>',
  git:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="2.4"/><circle cx="6" cy="18" r="2.4"/><circle cx="18" cy="12" r="2.4"/><path d="M6 8.4v7.2M8.2 7.4c5 0 5 4.6 7.4 4.6"/></svg>',
  github:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-4 1.4-4-2.2-5.6-2.6M15 21v-3.2c0-.9.1-1.3-.4-1.8 2.2-.3 4.5-1.1 4.5-4.9 0-1-.4-1.9-1-2.6.1-.3.5-1.3-.1-2.6 0 0-.9-.3-2.8 1a9.6 9.6 0 0 0-5 0c-1.9-1.3-2.8-1-2.8-1-.6 1.3-.2 2.3-.1 2.6-.6.7-1 1.5-1 2.6 0 3.8 2.3 4.6 4.5 4.9-.3.3-.5.7-.5 1.2V21"/></svg>',
  chip:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/></svg>',
  calendar:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>',
  clock:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  pin:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  bag:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
  chat:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v11H9l-5 4V5Z"/></svg>',
  copy:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/></svg>',
  check:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5 9 17.5 20 6.5"/></svg>',
  arrow:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  download:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 10l5 5 5-5M4 20h16"/></svg>',
  sun:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/></svg>',
  moon:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z"/></svg>',
  menu:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  close:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  spark:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/></svg>',
  terminal:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M13 15h4"/></svg>',
  bolt:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M13 3 5 13h6l-1 8 9-11h-6l1-7Z"/></svg>',
  wand:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20 15 9M14 4l.8 2.2L17 7l-2.2.8L14 10l-.8-2.2L11 7l2.2-.8L14 4ZM19 13l.5 1.5L21 15l-1.5.5L19 17l-.5-1.5L17 15l1.5-.5L19 13Z"/></svg>',
  target:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>',
  paint:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14c0-4 3.6-7 8-7s8 2.6 8 6.4c0 2-1.6 3.6-3.6 3.6-1.4 0-2.4-.8-3.4-.8-.9 0-1.4.5-1.4 1.4 0 1 .6 1.6.6 2.4 0 .8-.6 1.4-1.4 1.4C7.4 21 4 18 4 14Z"/><circle cx="9" cy="11" r="1"/></svg>',
  book:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2V4Z"/><path d="M5 18a2 2 0 0 1 2-2h11M9 8h6"/></svg>',
};

const CONTENT = {
  site: {
    shortName: "Himaka",
    org: "Himpunan Mahasiswa Informatika",
    division: "Divisi Penelitian & Pengembangan",
    year: "2026/2027",
  },

  event: {
    kicker: "Workshop Maba 2026",
    title: "Ngoding Pertama",
    titleAccent: "Pertama",
    tagline:
      "Siapkan laptopmu sebelum hari-H. Panduan singkat, checklist berprogres, dan sedikit main — biar workshop lancar, bukan molor.",
    date: "Sabtu, 14 November 2026",
    time: "07.00 – 12.00 WIB",
    place: "Laboratorium Lantai 5, Gedung Rektorat",
    bring: [
      "Laptop + charger",
      "Headset atau earphone (Opsional)",
      "Kuota internet",
      "Alat Tulis",
    ],
    contacts: [
      { name: "Robit", role: "Kepala Devisi", wa: "+62 812-0000-0000" },
      { name: "Novia", role: " Sekertaris Panitia", wa: "+62 813-1111-1111" },
    ],
  },

  stats: [
    { value: "4", label: "tools wajib" },
    { value: "6 jam", label: "materi & praktik" },
    { value: "0", label: "instalasi saat hari-H" },
  ],

  marquee: [
    "Coding",
    "Workshop 1",
    "Himpunan Mahasiswa Informatika",
    ""
  ],

  roadmap: [
    {
      step: "01",
      title: "Siapkan perangkat",
      text: "Pastikan laptop terisi penuh, charger terbawa, dan ruang penyimpanan minimal 2 GB kosong.",
    },
    {
      step: "02",
      title: "Instal Code Editor",
      text: "Code Editor adalah tempat kamu menulis kode. Unduh versi sesuai sistem operasi, lalu instal sampai selesai.",
    },
    {
      step: "03",
      title: "Install Ekstension Yang Diperlukan (Opsional)",
      text: "Ekstension digunakan untuk mempermudah kamu dalam melakukan coding",
    },
    {
      step: "04",
      title: "Install Git & akun GitHub",
      text: "Git mencatat riwayat kode; GitHub jadi tempat menyimpannya. Pasang Git lalu buat akun gratis.",
    },
    {
      step: "05",
      title: "Cek instalasi",
      text: "Buka terminal dan jalankan perintah pengecekan. Kalau muncul nomor versi, kamu siap.",
    },
    {
      step: "06",
      title: "Ikut workshop 1",
      text: "Datang 20 menit lebih awal, bawa checklist yang sudah penuh, dan siap praktik.",
    },
  ],

  tools: [
    {
      id: "vscode",
      name: "VS Code (Rekomendasi)",
      badge: "Editor",
      icon: "vscode",
      tagline: "Tempat kamu menulis dan menjalankan kode.",
      why: "Kami merekomendasikan VS Code sebagai code editor gratis dari Microsoft. Ringan, banyak ekstensi, dan paling umum dipakai saat praktikum.",
      downloadUrl: "https://code.visualstudio.com/download",
      downloadLabel: "code.visualstudio.com/download",
      steps: {
        windows: [
          "Buka code.visualstudio.com/download, pilih Windows (User Installer 64-bit).",
          'Jalankan file .exe yang terunduh.',
          'Centang "Add to PATH" lalu tekan Next sampai Finish.',
        ],
        macos: [
          "Buka code.visualstudio.com/download, pilih macOS.",
          "Buka file .zip, lalu seret Visual Studio Code ke folder Applications.",
          'Buka dari Launchpad; jika diminta, klik "Open" untuk mengizinkan.',
        ],
        linux: [
          "Buka code.visualstudio.com/download, pilih .deb (Debian/Ubuntu) atau .rpm.",
          'Pasang: sudo dpkg -i code_*.deb  (atau sudo rpm -i code-*.rpm).',
          "Atau pasang dari Snap/Flathub bila tersedia di distromu.",
        ],
      },
      verify: {
        command: "code --version",
        note: "Muncul nomor versi di terminal? Berarti VS Code sudah bisa dipanggil dari mana saja.",
      },
    },
      {
      id: "browser",
      name: "Browser Modern",
      badge: "Wajib",
      icon: "browser",
      tagline: "Chrome atau Firefox — pintu masuk ke dokumentasi.",
      why: "Workshop memakai Google Docs, GitHub, dan dokumentasi online. Browser lawas sering gagal menampilkan halaman modern.",
      downloadUrl: "https://www.google.com/chrome/",
      downloadLabel: "google.com/chrome",
      altLink: { url: "https://www.mozilla.org/firefox/new/", label: "atau mozilla.org/firefox" },
      steps: {
        windows: [
          "Buka google.com/chrome atau mozilla.org/firefox.",
          "Klik Unduh dan jalankan installer.",
          "Tunggu selesai, browser terbuka otomatis.",
        ],
        macos: [
          "Buka google.com/chrome atau mozilla.org/firefox.",
          "Buka file .dmg dan seret ikon ke folder Applications.",
          "Buka dari Launchpad saat selesai.",
        ],
        linux: [
          "Chrome: unduh .deb dari google.com/chrome lalu sudo dpkg -i google-chrome*.deb.",
          "Firefox: biasanya sudah terpasang, atau pasang via paket manager distromu.",
          "Alternatif cepat: sudo snap install firefox",
        ],
      },
      verify: {
        command: "navigator.userAgent",
        note: "Buka Console (F12) dan ketik ini — kalau versinya baru, aman.",
      },
    },
    {
      id: "git",
      name: "Git",
      badge: "Wajib",
      icon: "git",
      tagline: "Pencatat riwayat perubahan kodemu.",
      why: "Git menyimpan setiap perubahan kode sehingga kamu bisa kembali ke versi sebelumnya. Dipakai di hampir semua proyek.",
      downloadUrl: "https://git-scm.com/downloads",
      downloadLabel: "git-scm.com/downloads",
      steps: {
        windows: [
          "Buka git-scm.com/downloads, pilih Windows.",
          "Jalankan installer; biarkan semua pilihan default.",
          "Pilih editor VS Code saat diminta, lalu Next sampai Install.",
        ],
        macos: [
          "Cara termudah: buka Terminal dan jalankan git --version.",
          "Kalau muncul tawaran memasang Command Line Tools, klik Install.",
          "Atau unduh installer dari git-scm.com/downloads/mac (pakai Homebrew: brew install git).",
        ],
        linux: [
          "Debian/Ubuntu: sudo apt update && sudo apt install git",
          "Fedora: sudo dnf install git",
          "Arch: sudo pacman -S git",
        ],
      },
      verify: {
        command: "git --version",
        note: "Muncul tulisan seperti git version 2.x — Git sudah terpasang.",
      },
    },
    {
      id: "github",
      name: "Akun GitHub",
      badge: "Akun",
      icon: "github",
      tagline: "Rumah online untuk menyimpan proyekmu.",
      why: "GitHub adalah tempat menyimpan kode secara online. Nanti kamu akan mengumpulkan tugas praktikum lewat sini.",
      downloadUrl: "https://github.com/signup",
      downloadLabel: "github.com/signup",
      steps: {
        windows: [
          "Buka github.com/signup.",
          "Isi email kampus, kata sandi kuat, dan username (pakai namamu).",
          "Verifikasi email, lalu pilih paket gratis (Free).",
        ],
        macos: [
          "Buka github.com/signup.",
          "Isi email, kata sandi, dan username.",
          "Verifikasi email dan selesaikan pengaturan awal.",
        ],
        linux: [
          "Buka github.com/signup dari browser.",
          "Daftar dengan email kampus.",
          "Aktifkan autentikasi dua langkah (2FA) untuk keamanan.",
        ],
      },
      verify: {
        command: "whoami",
        note: "Bukan perintah terminal — buka profilmu di github.com dan pastikan username tampil.",
      },
    },
  ],

  ekstensi :[{
      id: "browser",
      name: "Browser Modern",
      badge: "Wajib",
      icon: "browser",
      tagline: "Chrome atau Firefox — pintu masuk ke dokumentasi.",
      why: "Workshop memakai Google Docs, GitHub, dan dokumentasi online. Browser lawas sering gagal menampilkan halaman modern.",
      downloadUrl: "https://www.google.com/chrome/",
      downloadLabel: "google.com/chrome",
      altLink: { url: "https://www.mozilla.org/firefox/new/", label: "atau mozilla.org/firefox" },
      steps: {
        windows: [
          "Buka google.com/chrome atau mozilla.org/firefox.",
          "Klik Unduh dan jalankan installer.",
          "Tunggu selesai, browser terbuka otomatis.",
        ],
        macos: [
          "Buka google.com/chrome atau mozilla.org/firefox.",
          "Buka file .dmg dan seret ikon ke folder Applications.",
          "Buka dari Launchpad saat selesai.",
        ],
        linux: [
          "Chrome: unduh .deb dari google.com/chrome lalu sudo dpkg -i google-chrome*.deb.",
          "Firefox: biasanya sudah terpasang, atau pasang via paket manager distromu.",
          "Alternatif cepat: sudo snap install firefox",
        ],
      },
      verify: {
        command: "navigator.userAgent",
        note: "Buka Console (F12) dan ketik ini — kalau versinya baru, aman.",
      },
  }],
  extensions: [
    {
      id: "live-server",
      name: "Live Server",
      badge: "Wajib",
      icon: "bolt",
      tagline: "Preview halaman web otomatis saat file disimpan.",
      why: "Menjalankan file HTML di browser dan menyegarkan halaman otomatis tiap kamu menyimpan perubahan. Paling membantu saat latihan membuat halaman.",
      steps: [
        "Buka VS Code, klik ikon Extensions di bilah kiri (Ctrl/Cmd + Shift + X).",
        'Cari "Live Server" (publisher: Ritwick Dey).',
        "Klik Install.",
        'Buka file .html, klik kanan lalu pilih "Open with Live Server".',
      ],
      verify: {
        command: "Ctrl/Cmd + Shift + P",
        note: 'Di palet perintah, ketik "Live Server" — kalau opsinya muncul, ekstensi sudah terpasang.',
      },
      downloadUrl: "https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer",
      downloadLabel: "Marketplace: Live Server",
    },
    {
      id: "prettier",
      name: "Prettier",
      badge: "Wajib",
      icon: "wand",
      tagline: "Merapikan format kode secara otomatis.",
      why: "Menyusun indentasi dan spasi kode agar konsisten. Kamu tidak perlu memikirkan kerapian, cukup fokus ke logika.",
      steps: [
        "Buka panel Extensions (Ctrl/Cmd + Shift + X).",
        'Cari "Prettier - Code formatter" (publisher: Prettier).',
        "Klik Install.",
        "Aktifkan format saat simpan: Settings → cari Format On Save → centang.",
      ],
      verify: {
        command: "Shift + Alt + F",
        note: "Menekan pintasan ini akan merapikan file yang sedang dibuka.",
      },
      downloadUrl: "https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode",
      downloadLabel: "Marketplace: Prettier",
    },
    {
      id: "error-lens",
      name: "Error Lens",
      badge: "Opsional",
      icon: "target",
      tagline: "Menampilkan pesan error langsung di baris kode.",
      why: "Pesan error muncul tepat di samping barisnya, jadi kamu cepat tahu letak kesalahan tanpa membuka panel lain.",
      steps: [
        "Buka panel Extensions.",
        'Cari "Error Lens" (publisher: Alexander).',
        "Klik Install.",
      ],
      downloadUrl: "https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens",
      downloadLabel: "Marketplace: Error Lens",
    },
    {
      id: "material-icon-theme",
      name: "Material Icon Theme",
      badge: "Opsional",
      icon: "paint",
      tagline: "Ikon file berwarna sesuai jenisnya.",
      why: "Membantu membedakan file HTML, CSS, JS, dan gambar dengan cepat lewat ikon di panel Explorer.",
      steps: [
        "Buka panel Extensions.",
        'Cari "Material Icon Theme" (publisher: Philipp Kief).',
        "Klik Install, lalu pilih tema ikon saat diminta.",
      ],
      downloadUrl: "https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme",
      downloadLabel: "Marketplace: Material Icon Theme",
    },
    {
      id: "gitlens",
      name: "GitLens",
      badge: "Opsional",
      icon: "git",
      tagline: "Melihat riwayat perubahan kode di dalam editor.",
      why: "Memperlihatkan siapa mengubah baris apa dan kapan. Berguna setelah kamu mulai memakai Git.",
      steps: [
        "Buka panel Extensions.",
        'Cari "GitLens" (publisher: GitKraken).',
        "Klik Install.",
      ],
      downloadUrl: "https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens",
      downloadLabel: "Marketplace: GitLens",
    },
    {
      id: "indonesian-lang",
      name: "Indonesian Language Pack",
      badge: "Opsional",
      icon: "book",
      tagline: "Mengubah tampilan VS Code ke Bahasa Indonesia.",
      why: "Ingin antarmuka berbahasa Indonesia? Paket ini menerjemahkan menu dan label di dalam VS Code.",
      steps: [
        "Buka panel Extensions.",
        'Cari "Indonesian Language Pack".',
        "Klik Install, lalu Restart VS Code.",
      ],
      downloadUrl: "https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-id",
      downloadLabel: "Marketplace: Language Pack ID",
    },
  ],

  checklist: [
    { id: "laptop", label: "Laptop siap & baterai penuh", hint: "Bawa charger juga ya." },
    { id: "vscode", label: "VS Code sudah terpasang", hint: "Cek: code --version" },
    { id: "browser", label: "Browser modern terpasang", hint: "Chrome atau Firefox versi terbaru." },
    { id: "git", label: "Git sudah terpasang", hint: "Cek: git --version" },
    { id: "github", label: "Akun GitHub sudah dibuat", hint: "Gunakan email kampus." },
    { id: "terminal", label: "Tahu cara membuka terminal", hint: "Windows: PowerShell · macOS/Linux: Terminal." },
    { id: "folder", label: "Folder kerja sudah dibuat", hint: "Misal: Documents/workshop" },
    { id: "internet", label: "Koneksi internet siap", hint: "Siapkan tethering cadangan." },
    { id: "info", label: "Sudah baca info acara", hint: "Tanggal, jam, dan lokasi sudah dicek." },
  ],

  faq: [
    {
      q: "Laptop saya jadul, apakah tetap bisa ikut?",
      a: "Bisa. VS Code tetap berjalan di RAM 4 GB. Matikan aplikasi berat lain saat praktik, dan pilih browser ringan seperti Firefox. Kalau sangat lambat, kabari panitia sebelum hari-H.",
    },
    {
      q: "Internet di rumah lambat, instalasi gagal terus.",
      a: "Unduh installer di tempat dengan Wi-Fi lebih stabil (kampus, warnet, atau rumah teman) lalu simpan file-nya. Instalasi sendiri tidak butuh internet, hanya unduhannya.",
    },
    {
      q: "Instalasi gagal atau muncul error.",
      a: "Jangan panik dan jangan instal ulang berulang. Catat pesan errornya, screenshot, lalu kirim ke panitia lewat kontak di bawah. Tim Litbang akan bantu satu per satu.",
    },
    {
      q: "Saya pakai Linux, apakah langkahnya beda?",
      a: "Ya sedikit. Pilih dulu tab Linux di bagian panduan, di sana langkahnya sudah disesuaikan per distro umum (Debian/Ubuntu, Fedora, Arch).",
    },
    {
      q: "Perlu daftar dulu sebelum ikut workshop?",
      a: "Pendaftaran memakai form eksternal yang dibagikan panitia di grup. Web ini murni untuk persiapan, tidak menyimpan data pendaftaran.",
    },
    {
      q: "Kenapa harus instal sebelum hari-H?",
      a: "Karena waktu workshop terbatas dan dipakai untuk materi, bukan menunggu unduhan. Peserta yang siap dari rumah akan praktik lebih banyak.",
    },
  ],

  quiz: [
    {
      q: "Laptop kamu hari ini sudah siap dibawa?",
      options: [
        { t: "Siap, baterai penuh & charger ada", p: 2 },
        { t: "Ada, tapi belum saya tes", p: 1 },
        { t: "Pinjam / belum pasti", p: 0 },
      ],
    },
    {
      q: "VS Code sudah terpasang di laptopmu?",
      options: [
        { t: "Sudah, dan pernah saya buka", p: 2 },
        { t: "Belum", p: 0 },
        { t: "Belum tahu itu apa", p: 0 },
      ],
    },
    {
      q: "Git sudah terpasang?",
      options: [
        { t: "Sudah", p: 2 },
        { t: "Belum", p: 0 },
        { t: "Baru dengar namanya", p: 0 },
      ],
    },
    {
      q: "Kamu punya akun GitHub?",
      options: [
        { t: "Punya dan sudah login", p: 2 },
        { t: "Punya tapi lupa sandi", p: 1 },
        { t: "Belum punya", p: 0 },
      ],
    },
    {
      q: "Tahu cara membuka terminal / PowerShell?",
      options: [
        { t: "Tahu dan sudah pernah pakai", p: 2 },
        { t: "Pernah lihat, masih ragu", p: 1 },
        { t: "Belum tahu", p: 0 },
      ],
    },
    {
      q: "Siapkan kuota untuk hari-H?",
      options: [
        { t: "Sudah, plus tethering cadangan", p: 2 },
        { t: "Ada kuota seadanya", p: 1 },
        { t: "Belum kepikiran", p: 0 },
      ],
    },
  ],

  quizResult: [
    {
      min: 0,
      title: "Masih ngantuk nih",
      text: "Belum apa-apa, santai. Buka bagian Panduan per Tools, kerjakan dari atas, dan kamu akan siap dalam 30 menit.",
    },
    {
      min: 6,
      title: "Setengah jalan",
      text: "Bagus! Tinggal beberapa langkah lagi. Cek checklist, bereskan yang belum, lalu ulangi kuis ini.",
    },
    {
      min: 10,
      title: "Hampir siap tempur",
      text: "Kerja bagus. Pastikan akun GitHub bisa login dan terminal sudah kamu coba, lalu checklist akan penuh.",
    },
    {
      min: 12,
      title: "Siap tempur!",
      text: "Mantap. Kamu sudah lebih siap dari rata-rata. Sampai jumpa di workshop, jangan lupa bawa charger.",
    },
  ],
};
