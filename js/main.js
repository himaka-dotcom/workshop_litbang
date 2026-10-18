/* =========================================================================
   main.js — navigasi, tema, animasi scroll, render konten, checklist
   ========================================================================= */

const $ = (s, scope = document) => scope.querySelector(s);
const $$ = (s, scope = document) => Array.from(scope.querySelectorAll(s));
const LS = {
  theme: "maba:theme",
  os: "maba:os",
  checklist: "maba:checklist",
  quiz: "maba:quiz-best",
};

const store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      /* localStorage tidak tersedia — abaikan */
    }
  },
};

/* ----------------------------- Toast ----------------------------- */
let toastTimer;
function toast(message) {
  const el = $("#toast");
  if (!el) return;
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 1900);
}

/* ----------------------------- Tema ------------------------------ */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const sun = $("#icon-sun");
  const moon = $("#icon-moon");
  if (sun && moon) {
    sun.style.display = theme === "dark" ? "none" : "block";
    moon.style.display = theme === "dark" ? "block" : "none";
  }
  const meta = $('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "dark" ? "#0e0f12" : "#f2ede2");
}

function initTheme() {
  const saved = store.get(LS.theme, null);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));
  $("#theme-toggle")?.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    store.set(LS.theme, next);
  });
}

/* --------------------------- Navigasi ---------------------------- */
function initNav() {
  const toggle = $("#nav-toggle");
  const menu = $("#mobile-menu");
  const openIcon = $("#icon-menu");
  const closeIcon = $("#icon-close");

  const setOpen = (open) => {
    menu.classList.toggle("hidden", !open);
    openIcon?.classList.toggle("hidden", open);
    closeIcon?.classList.toggle("hidden", !open);
    toggle?.setAttribute("aria-expanded", String(open));
  };

  toggle?.addEventListener("click", () => setOpen(menu.classList.contains("hidden")));
  $$("#mobile-menu a").forEach((a) => a.addEventListener("click", () => setOpen(false)));

  const sections = $$("main section[id]");
  const links = $$("[data-nav]");
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === `#${entry.target.id}`));
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => navObserver.observe(s));
}

/* ------------------------- Ikon inline SVG ----------------------- */
function hydrateIcons() {
  $$("[data-ic]").forEach((el) => {
    const svg = ICONS[el.dataset.ic];
    if (svg) el.innerHTML = svg;
  });
}

/* ----------------------- Reveal saat scroll ---------------------- */
let revealObserver;
function observeReveal(scope = document) {
  const items = $$(".reveal:not(.in)", scope);
  if (!items.length) return;
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("in"));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
  }
  items.forEach((el) => revealObserver.observe(el));
}

/* ------------------------ Render: Marquee ------------------------ */
function renderMarquee() {
  const track = $("#marquee-track");
  if (!track) return;
  const item = (t) =>
    `<span class="font-display text-2xl sm:text-3xl font-bold tracking-tight opacity-80 flex items-center gap-3">
       <span class="inline-block w-2 h-2 rounded-full" style="background:var(--energy)"></span>${t}
     </span>`;
  const html = CONTENT.marquee.map(item).join("");
  track.innerHTML = html + html;
}

/* ------------------------ Render: Statistik ---------------------- */
function renderStats() {
  const wrap = $("#stats");
  if (!wrap) return;
  wrap.innerHTML = CONTENT.stats
    .map(
      (s) => `
      <div class="reveal text-center sm:text-left">
        <div class="font-display text-4xl sm:text-5xl font-bold tracking-tight">${s.value}</div>
        <div class="font-mono text-[0.72rem] uppercase tracking-widest mt-1" style="color:var(--muted)">${s.label}</div>
      </div>`
    )
    .join("");
}

/* ----------------------- Render: Info acara ---------------------- */
function infoCard(icon, label, value) {
  return `
    <div class="card hard-hover p-5">
      <div class="flex items-center gap-3 mb-3">
        <span class="w-9 h-9 grid place-items-center rounded-lg" style="background:var(--accent);color:var(--accent-ink)">
          <span class="w-5 h-5 block">${ICONS[icon]}</span>
        </span>
        <span class="font-mono text-[0.72rem] uppercase tracking-widest" style="color:var(--muted)">${label}</span>
      </div>
      <div class="font-display text-lg font-semibold leading-snug">${value}</div>
    </div>`;
}

function renderEvent() {
  const wrap = $("#event-info");
  if (!wrap) return;
  const e = CONTENT.event;
  wrap.innerHTML = [
    infoCard("calendar", "Tanggal", e.date),
    infoCard("clock", "Waktu", e.time),
    infoCard("pin", "Tempat", e.place),
  ].join("");

  const bring = $("#event-bring");
  if (bring)
    bring.innerHTML = e.bring
      .map(
        (b) => `
        <li class="flex items-start gap-3">
          <span class="mt-0.5 w-5 h-5 flex-none grid place-items-center rounded-full" style="background:var(--primary);color:var(--primary-ink)">
            <span class="w-3 h-3 block">${ICONS.check}</span>
          </span>
          <span>${b}</span>
        </li>`
      )
      .join("");

  const contacts = $("#event-contacts");
  if (contacts)
    contacts.innerHTML = e.contacts
      .map(
        (c) => `
        <div class="flex items-center justify-between gap-4 py-3" style="border-bottom:1.5px dashed var(--line)">
          <div>
            <div class="font-semibold">${c.name} <span class="font-mono text-xs" style="color:var(--muted)">· ${c.role}</span></div>
            <div class="font-mono text-sm" style="color:var(--ink-soft)">${c.wa}</div>
          </div>
          <a class="btn btn-ghost !px-3 !py-2 text-xs" href="https://wa.me/${c.wa.replace(/[^0-9]/g, "")}" target="_blank" rel="noopener">Chat</a>
        </div>`
      )
      .join("");
}

/* ----------------------- Render: Roadmap ------------------------- */
function renderRoadmap() {
  const wrap = $("#roadmap-list");
  if (!wrap) return;
  wrap.innerHTML = CONTENT.roadmap
    .map(
      (r, i) => `
      <div class="reveal relative pl-16 sm:pl-24 pb-10 last:pb-0" style="--d:${i * 90}ms">
        <span class="absolute left-0 top-0 w-11 h-11 sm:w-14 sm:h-14 grid place-items-center rounded-full card font-mono font-bold text-sm sm:text-base">${r.step}</span>
        <div class="absolute left-[21px] sm:left-[27px] top-12 sm:top-16 bottom-0 w-[2px]" style="background:var(--line)"></div>
        <h3 class="font-display text-xl sm:text-2xl font-semibold tracking-tight">${r.title}</h3>
        <p class="mt-2 max-w-xl" style="color:var(--ink-soft)">${r.text}</p>
      </div>`
    )
    .join("");
}

/* ------------------- Render: Panduan per tools ------------------- */
const OS_LABEL = { windows: "Windows", macos: "macOS", linux: "Linux" };

function detectOS() {
  const saved = store.get(LS.os, null);
  if (saved && OS_LABEL[saved]) return saved;
  const ua = (navigator.userAgent || "").toLowerCase();
  // Ponsel/tablet: default Windows, karena mayoritas memakai laptop Windows.
  if (/android|iphone|ipad|ipod|mobile/.test(ua)) return "windows";
  const p = (navigator.platform || "").toLowerCase();
  if (ua.includes("mac") || p.includes("mac")) return "macos";
  if (p.includes("linux") || ua.includes("linux")) return "linux";
  return "windows";
}

/* ---------------- Render generik: kartu accordion ---------------- */
function stepsBlock(steps, { verify, label } = {}) {
  const list = (steps || [])
    .map((s, i) => {
      const isCommand = /^(sudo|git |brew |dnf |apt |pacman|code |npm |snap )/.test(s.trim());
      return `
      <li class="flex gap-3">
        <span class="font-mono text-xs mt-1 flex-none" style="color:var(--muted)">${String(i + 1).padStart(2, "0")}</span>
        <span class="${isCommand ? "font-mono text-sm px-2 py-1 rounded" : ""}" ${isCommand ? 'style="background:var(--surface-2)"' : ""}>${s}</span>
      </li>`;
    })
    .join("");

  const verifyBlock = verify
    ? `
    <div class="mt-4 pt-4" style="border-top:1.5px dashed var(--line)">
      <div class="font-mono text-[0.72rem] uppercase tracking-widest mb-2" style="color:var(--muted)">Cara cek berhasil</div>
      <div class="flex items-center gap-2 flex-wrap">
        <code class="font-mono text-sm px-3 py-1.5 rounded-lg" style="background:var(--ink);color:var(--paper)">${verify.command}</code>
        <button class="copy-btn btn btn-ghost !px-3 !py-1.5 text-xs" data-copy="${verify.command}" aria-label="Salin perintah">
          <span class="w-4 h-4 block">${ICONS.copy}</span> Salin
        </button>
      </div>
      <p class="text-sm mt-2" style="color:var(--ink-soft)">${verify.note}</p>
    </div>`
    : "";

  const head = label
    ? `<div class="font-mono text-[0.72rem] uppercase tracking-widest mb-3" style="color:var(--muted)">${label}</div>`
    : "";

  return `${head}<ol class="space-y-3">${list}</ol>${verifyBlock}`;
}

function accordionCard({ id, icon, name, badge, tagline, bodyHtml }) {
  return `
    <article class="card hard-hover overflow-hidden reveal" data-card="${id}">
      <button class="tool-head w-full text-left p-5 sm:p-6 flex items-center gap-4" aria-expanded="false" aria-controls="panel-${id}">
        <span class="flex-none w-12 h-12 grid place-items-center rounded-xl" style="background:var(--ink);color:var(--paper)">
          <span class="w-6 h-6 block">${ICONS[icon] || ICONS.chip}</span>
        </span>
        <span class="flex-1 min-w-0">
          <span class="flex items-center gap-2 flex-wrap">
            <span class="font-display text-lg font-semibold tracking-tight">${name}</span>
            <span class="chip !py-0.5 !text-[0.62rem]">${badge}</span>
          </span>
          <span class="block text-sm mt-0.5" style="color:var(--ink-soft)">${tagline}</span>
        </span>
        <span class="tool-chevron flex-none transition-transform duration-300 w-5 h-5 block" style="color:var(--muted)">${ICONS.arrow}</span>
      </button>
      <div class="tool-panel" id="panel-${id}">
        <div class="tool-panel-inner">
          <div class="px-5 sm:px-6 pb-6 pt-0">
            <div class="rule mb-5"></div>
            ${bodyHtml}
          </div>
        </div>
      </div>
    </article>`;
}

function downloadButton(url, label) {
  return `<a class="btn btn-primary" href="${url}" target="_blank" rel="noopener">
      <span class="w-4 h-4 block">${ICONS.download}</span> ${label}
    </a>`;
}

/* ------- Kartu spesifik: tools (per OS) & ekstensi (flat) -------- */
function getDonwload(tool, os) {
  if (tool.downloads) {
    return tool.downloads[os] || tool.downloads.windows || Object.values(tool.downloads)[0];
  }
  return { url: tool.downloadUrl, label: tool.downloadLabel };
}

function toolCard(tool, os) {
  const dl = getDonwload(tool, os)
  const body = `
    <p class="mb-4" style="color:var(--ink-soft)">${tool.why}</p>
    ${stepsBlock(tool.steps[os], { verify: tool.verify, label: `Langkah instal · ${OS_LABEL[os]}` })}
    <div class="mt-5 flex flex-wrap gap-3">
      ${downloadButton(dl.url, dl.label)}
      ${tool.altLink ? `<a class="btn btn-ghost" href="${tool.altLink.url}" target="_blank" rel="noopener">${tool.altLink.label}</a>` : ""}
    </div>`;
  return accordionCard({ id: tool.id, icon: tool.icon, name: tool.name, badge: tool.badge, tagline: tool.tagline, bodyHtml: body });
}

function extensionCard(ext) {
  const body = `
    <p class="mb-4" style="color:var(--ink-soft)">${ext.why}</p>
    ${stepsBlock(ext.steps, { verify: ext.verify, label: "Cara memasang" })}
    <div class="mt-5 flex flex-wrap gap-3">
      ${downloadButton(ext.downloadUrl, ext.downloadLabel)}
    </div>`;
  return accordionCard({ id: ext.id, icon: ext.icon, name: ext.name, badge: ext.badge, tagline: ext.tagline, bodyHtml: body });
}

/* ------- Renderer generik: mount + (opsional) tab + kartu -------- */
function renderCardSection({ mountId, tabsId, tabs = [], activeKey, tabStoreKey, items, buildCard }) {
  const mount = $("#" + mountId);
  if (!mount) return;

  const paint = (key) => {
    mount.innerHTML = items.map((it) => buildCard(it, key)).join("");
    bindAccordion(mount);
    bindCopy(mount);
    observeReveal(mount);
  };

  const tabsWrap = tabsId ? $("#" + tabsId) : null;
  if (tabsWrap && tabs.length) {
    tabsWrap.innerHTML = tabs
      .map(
        (t) =>
          `<button class="os-tab" role="tab" data-key="${t.key}" aria-selected="${t.key === activeKey}">${t.label}</button>`
      )
      .join("");
    $$(".os-tab", tabsWrap).forEach((btn) =>
      btn.addEventListener("click", () => {
        const key = btn.dataset.key;
        if (tabStoreKey) store.set(tabStoreKey, key);
        $$(".os-tab", tabsWrap).forEach((t) => t.setAttribute("aria-selected", String(t === btn)));
        paint(key);
      })
    );
  }

  paint(activeKey);
}

function renderOS() {
  const os = detectOS();
  store.set(LS.os, os);
  const tabs = Object.entries(OS_LABEL).map(([key, label]) => ({ key, label }));
  renderCardSection({
    mountId: "tools-list",
    tabsId: "os-tabs",
    tabs,
    activeKey: os,
    tabStoreKey: LS.os,
    items: CONTENT.tools,
    buildCard: toolCard,
  });
}

function renderExtensions() {
  if (!CONTENT.extensions || !CONTENT.extensions.length) return;
  renderCardSection({
    mountId: "extensions-list",
    items: CONTENT.extensions,
    buildCard: extensionCard,
  });
}

function bindAccordion(scope = document) {
  $$(".tool-head", scope).forEach((head) => {
    head.addEventListener("click", () => {
      const card = head.closest("[data-card]");
      const panel = $(".tool-panel", card);
      const open = panel.classList.toggle("open");
      head.setAttribute("aria-expanded", String(open));
      const chev = $(".tool-chevron", head);
      if (chev) chev.style.transform = open ? "rotate(90deg)" : "rotate(0deg)";
    });
  });
}

/* ---------------------- Render: Checklist ------------------------ */
const RING_CIRC = 2 * Math.PI * 52;
let celebrated = false;

function renderChecklist() {
  const wrap = $("#checklist-list");
  const ring = $("#ring-fill");
  if (!wrap) return;

  const saved = store.get(LS.checklist, {});
  wrap.innerHTML = CONTENT.checklist
    .map(
      (c) => `
      <label class="check-row reveal ${saved[c.id] ? "done" : ""}" data-id="${c.id}">
        <input type="checkbox" class="sr-only" ${saved[c.id] ? "checked" : ""} data-check="${c.id}">
        <span class="check-box"><span class="w-4 h-4 block">${ICONS.check}</span></span>
        <span class="flex-1">
          <span class="check-label font-semibold block">${c.label}</span>
          <span class="text-sm block" style="color:var(--muted)">${c.hint}</span>
        </span>
      </label>`
    )
    .join("");

  if (ring) {
    ring.style.strokeDasharray = RING_CIRC;
    ring.style.strokeDashoffset = RING_CIRC;
  }

  const update = () => {
    const state = {};
    $$("[data-check]").forEach((input) => {
      state[input.dataset.check] = input.checked;
      input.closest(".check-row").classList.toggle("done", input.checked);
    });
    store.set(LS.checklist, state);

    const total = CONTENT.checklist.length;
    const done = Object.values(state).filter(Boolean).length;
    const pct = total ? Math.round((done / total) * 100) : 0;

    const text = $("#progress-text");
    const pill = $("#progress-pill");
    if (text) text.textContent = `${done} / ${total}`;
    if (pill) pill.textContent = `${pct}%`;
    if (ring) ring.style.strokeDashoffset = RING_CIRC - (RING_CIRC * pct) / 100;
    if (done === total && total > 0) {
      if (!celebrated) {
        celebrated = true;
        celebrate();
      }
    } else {
      celebrated = false;
    }
  };

  $$("[data-check]").forEach((input) => input.addEventListener("change", update));
  celebrated = CONTENT.checklist.every((c) => saved[c.id]);
  update();

  $("#reset-checklist")?.addEventListener("click", () => {
    $$("[data-check]").forEach((input) => {
      input.checked = false;
    });
    celebrated = false;
    update();
    toast("Checklist direset");
  });
}

function celebrate() {
  toast("Checklist penuh — kamu siap! 🎉");
  if (typeof confetti === "function") {
    const colors = ["#1f39ff", "#d6f94e", "#ff5b3a", "#f2efe4"];
    confetti({ particleCount: 120, spread: 78, origin: { y: 0.7 }, colors, disableForReducedMotion: true });
    setTimeout(() => confetti({ particleCount: 80, angle: 60, spread: 60, origin: { x: 0 }, colors }), 180);
    setTimeout(() => confetti({ particleCount: 80, angle: 120, spread: 60, origin: { x: 1 }, colors }), 320);
  }
}

/* ---------------------- Render: Video ------------------------ */
function getYoutubeId(url) {
  const m = url.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/);
  return m ? m[1] : null;
}

function videoCard(v) {
  const yt = getYoutubeId(v.url);
  const thumb = yt
    ? `<img src="https://img.youtube.com/vi/${yt}/hqdefault.jpg" alt="${v.title}"
         class="absolute inset-0 w-full h-full object-cover" loading="lazy">
       <span class="absolute inset-0 grid place-items-center" style="background:rgba(0,0,0,.35)">
         <span class="w-14 h-14 rounded-full grid place-items-center" style="background:var(--primary);color:var(--primary-ink)">
           <svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 translate-x-0.5"><path d="M8 5v14l11-7z"/></svg>
         </span>
       </span>`
    : `<span class="absolute inset-0 grid place-items-center" style="color:var(--muted)">Video tidak tersedia</span>`;
  return `
    <a href="${v.url}" target="_blank" rel="noopener"
       class="card hard-hover overflow-hidden reveal no-underline">
      <div class="relative aspect-video" style="background:var(--surface-2)">${thumb}</div>
      <div class="p-5">
        <span class="chip !py-0.5 !text-[0.62rem]">${v.badge}</span>
        <h3 class="font-display text-lg font-semibold tracking-tight mt-2" style="color:var(--ink)">${v.title}</h3>
        <p class="text-sm mt-1" style="color:var(--ink-soft)">${v.tagline}</p>
      </div>
    </a>`;
}

const MQ_DESKTOP = window.matchMedia("(min-width: 640px)");
const perPage = () => (MQ_DESKTOP.matches ? 6 : 3);

function renderVideos() {
  const wrap = $("#video-list");
  const pager = $("#video-pager");
  if (!wrap || !Array.isArray(CONTENT.videos) || !CONTENT.videos.length) return;

  const list = CONTENT.videos;
  let current = 1;

  const renderPage = () => {
    const size = perPage();
    const pages = Math.max(1, Math.ceil(list.length / size));
    current = Math.min(Math.max(current, 1), pages);

    wrap.innerHTML = list
      .slice((current - 1) * size, current * size)
      .map(videoCard)
      .join("");
    observeReveal(wrap);

    if (!pager) return;
    if (pages <= 1) { pager.classList.add("hidden"); return; }
    pager.classList.remove("hidden");
    pager.innerHTML = `
      <button class="btn btn-ghost" data-page="prev" ${current === 1 ? "disabled" : ""}>‹ Sebelumnya</button>
      <span class="font-mono text-xs uppercase tracking-widest" style="color:var(--muted)">
        Halaman ${current} / ${pages}
      </span>
      <button class="btn btn-ghost" data-page="next" ${current === pages ? "disabled" : ""}>Berikutnya ›</button>`;

    $$("[data-page]", pager).forEach((btn) =>
      btn.addEventListener("click", () => {
        current += btn.dataset.page === "next" ? 1 : -1;
        renderPage();
        wrap.scrollIntoView({ behavior: "smooth", block: "start" });
      })
    );
  };

  MQ_DESKTOP.addEventListener("change", () => {
    current = 1;
    renderPage();
  });

  renderPage();
}

/* -------------------------- Render: FAQ -------------------------- */
function renderFaq() {
  const wrap = $("#faq-list");
  if (!wrap) return;
  wrap.innerHTML = CONTENT.faq
    .map(
      (f, i) => `
      <details class="card card-flush reveal group overflow-hidden" style="--d:${i * 60}ms">
        <summary class="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
          <span class="font-display font-semibold text-base sm:text-lg tracking-tight">${f.q}</span>
          <span class="flex-none w-6 h-6 grid place-items-center transition-transform duration-300 group-open:rotate-45" style="color:var(--primary)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
          </span>
        </summary>
        <div class="px-5 pb-5 -mt-1" style="color:var(--ink-soft)">${f.a}</div>
      </details>`
    )
    .join("");
}

/* ---------------------- Render: Countdown ------------------------ */
function renderCountdown() {
  const grid = $("#countdown-grid");
  const note = $("#countdown-note");
  if (!grid || !note) return;

  const target = new Date(CONTENT.event.startISO);
  if (Number.isNaN(target.getTime())) return;

  const UNITS = [
    { key: "d", label: "Hari" },
    { key: "h", label: "Jam" },
    { key: "m", label: "Menit" },
    { key: "s", label: "Detik" },
  ];
  const pad2 = (n) => String(n).padStart(2, "0");

  grid.innerHTML = UNITS.map(
    (u) => `
    <div class="text-center py-3 sm:py-4 rounded-[var(--radius)]"
      style="background:var(--surface-2);border:1.5px solid var(--line)">
      <div class="font-display text-2xl sm:text-4xl font-bold tracking-tight tabular-nums"
        data-cd="${u.key}" style="color:var(--ink)">00</div>
      <div class="font-mono text-[0.62rem] uppercase tracking-widest mt-1"
        style="color:var(--muted)">${u.label}</div>
    </div>`
  ).join("");
  note.textContent = `Menuju Workshop 1 · ${CONTENT.event.date} · ${CONTENT.event.time}`;

  const finish = () => {
    grid.classList.add("hidden");
    const live = new Date();
    const sameDay =
      live.getFullYear() === target.getFullYear() &&
      live.getMonth() === target.getMonth() &&
      live.getDate() === target.getDate();
    note.innerHTML = sameDay
      ? `<span class="font-display text-lg font-semibold" style="color:var(--accent-ink);background:var(--accent);padding:0.2em 0.5em;border-radius:8px">Hari-H sudah tiba! 🎉</span>
         <div class="mt-2">Sampai jumpa di Laboratorium Lantai 5.</div>`
      : `<span class="font-display text-lg font-semibold" style="color:var(--ink)">Workshop 1 sudah selesai</span>
         <div class="mt-2">Sampai jumpa di Workshop 2!</div>`;
  };

  const cells = {};
  UNITS.forEach((u) => (cells[u.key] = $(`[data-cd="${u.key}"]`, grid)));

  let timer = null;
  let done = false;
  const tick = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) {
      done = true;
      clearInterval(timer);
      timer = null;
      finish();
      return;
    }
    cells.d.textContent = pad2(Math.floor(diff / 86400000));
    cells.h.textContent = pad2(Math.floor(diff / 3600000) % 24);
    cells.m.textContent = pad2(Math.floor(diff / 60000) % 60);
    cells.s.textContent = pad2(Math.floor((diff % 60000) / 1000));
  };

  const start = () => {
    if (done || timer) return;
    tick();
    if (!done) timer = setInterval(tick, 1000);
  };
  const stop = () => {
    clearInterval(timer);
    timer = null;
  };

  start();
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });
}

/* --------------------------- Copy button ------------------------- */
function bindCopy(scope = document) {
  $$(".copy-btn", scope).forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(text);
        toast(`Tersalin: ${text}`);
      } catch (e) {
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); toast(`Tersalin: ${text}`); } catch (_) { }
        ta.remove();
      }
    });
  });
}

/* --------------------------- Footer ------------------------------ */
function renderFooter() {
  const y = $("#footer-year");
  if (y) y.textContent = new Date().getFullYear();
}

/* ----------------------------- Init ------------------------------ */
function init() {
  hydrateIcons();
  initTheme();
  initNav();
  renderMarquee();
  renderStats();
  renderCountdown();
  renderEvent();
  renderRoadmap();
  renderOS();
  renderExtensions();
  renderVideos();
  renderChecklist();
  renderFaq();
  renderFooter();
  observeReveal();
}

document.addEventListener("DOMContentLoaded", init);
