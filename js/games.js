/* =========================================================================
   games.js — Zona Main: Kuis "Sudah Siap Belum?" + Terminal Mini
   Data kuis diambil dari CONTENT.quiz (js/data.js).
   ========================================================================= */

const $g = (s, scope = document) => scope.querySelector(s);
const $$g = (s, scope = document) => Array.from(scope.querySelectorAll(s));

/* ============================ KUIS =============================== */
const QUIZ_STATE = { answers: [] };

function renderQuiz() {
  const wrap = $g("#quiz-app");
  if (!wrap) return;

  QUIZ_STATE.answers = new Array(CONTENT.quiz.length).fill(null);
  const best = (() => {
    try { return JSON.parse(localStorage.getItem("maba:quiz-best") || "null"); } catch (e) { return null; }
  })();

  wrap.innerHTML = `
    <div class="flex items-center justify-between gap-3 flex-wrap mb-4">
      <div class="font-mono text-[0.72rem] uppercase tracking-widest" style="color:var(--muted)">
        Terjawab <span id="quiz-count">0</span>/${CONTENT.quiz.length}
      </div>
      <div class="chip !py-1" style="border-color:var(--line)">
        Skor terbaik: <strong id="quiz-best" style="color:var(--primary)">${best ?? "—"}</strong>
      </div>
    </div>
    <div id="quiz-questions" class="space-y-5"></div>
    <div id="quiz-result" class="hidden mt-6"></div>
    <div class="mt-6 flex flex-wrap gap-3">
      <button id="quiz-submit" class="btn btn-primary disabled:opacity-40 disabled:cursor-not-allowed" disabled>
        Lihat hasil
      </button>
      <button id="quiz-reset" class="btn btn-ghost">Ulangi</button>
    </div>`;

  const qWrap = $g("#quiz-questions");
  qWrap.innerHTML = CONTENT.quiz
    .map(
      (item, qi) => `
      <div class="card card-flush p-4 sm:p-5" data-q="${qi}">
        <div class="flex items-baseline gap-2 mb-3">
          <span class="font-mono text-xs" style="color:var(--primary)">Q${qi + 1}</span>
          <span class="font-semibold">${item.q}</span>
        </div>
        <div class="space-y-2">
          ${item.options
            .map(
              (o, oi) => `
            <button class="quiz-opt" data-q="${qi}" data-o="${oi}">
              <span class="font-mono text-xs mr-2" style="opacity:.6">${String.fromCharCode(65 + oi)}</span>${o.t}
            </button>`
            )
            .join("")}
        </div>
      </div>`
    )
    .join("");

  const submit = $g("#quiz-submit");
  const countEl = $g("#quiz-count");

  const refreshCount = () => {
    const answered = QUIZ_STATE.answers.filter((a) => a !== null).length;
    countEl.textContent = answered;
    submit.disabled = answered !== CONTENT.quiz.length;
  };

  $$g(".quiz-opt", qWrap).forEach((btn) =>
    btn.addEventListener("click", () => {
      const qi = Number(btn.dataset.q);
      const oi = Number(btn.dataset.o);
      QUIZ_STATE.answers[qi] = oi;
      $$g(`.quiz-opt[data-q="${qi}"]`, qWrap).forEach((b) => b.classList.toggle("picked", b === btn));
      refreshCount();
    })
  );

  submit.addEventListener("click", () => showQuizResult(wrap, best));
  $g("#quiz-reset").addEventListener("click", () => {
    QUIZ_STATE.answers = new Array(CONTENT.quiz.length).fill(null);
    $$g(".quiz-opt", qWrap).forEach((b) => b.classList.remove("picked"));
    $g("#quiz-result").classList.add("hidden");
    refreshCount();
    wrap.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  refreshCount();
}

function showQuizResult(wrap, best) {
  const score = QUIZ_STATE.answers.reduce(
    (sum, oi, qi) => sum + (oi === null ? 0 : CONTENT.quiz[qi].options[oi].p),
    0
  );
  const maxScore = CONTENT.quiz.reduce((m, q) => m + Math.max(...q.options.map((o) => o.p)), 0);
  const band = [...CONTENT.quizResult].reverse().find((b) => score >= b.min) || CONTENT.quizResult[0];
  const pct = Math.round((score / maxScore) * 100);

  const result = $g("#quiz-result");
  result.classList.remove("hidden");
  result.innerHTML = `
    <div class="card p-6 sm:p-8" style="background:var(--ink);color:var(--paper);border-color:var(--ink)">
      <div class="flex items-end gap-4 flex-wrap">
        <div class="font-display text-6xl font-bold tracking-tight" style="color:var(--accent)">${score}<span class="text-2xl opacity-60">/${maxScore}</span></div>
        <div class="font-display text-2xl font-semibold tracking-tight mb-1">${band.title}</div>
      </div>
      <div class="mt-3 h-2 rounded-full overflow-hidden" style="background:rgba(255,255,255,.18)">
        <div style="width:${pct}%;height:100%;background:var(--accent);transition:width .7s cubic-bezier(.22,1,.36,1)"></div>
      </div>
      <p class="mt-4 opacity-90 max-w-xl">${band.text}</p>
      <p class="mt-4 font-mono text-xs opacity-70">Skor terbaikmu: ${Math.max(score, best ?? 0)}</p>
    </div>`;

  if (score > (best ?? -1)) {
    try { localStorage.setItem("maba:quiz-best", JSON.stringify(score)); } catch (e) {}
    const bestEl = $g("#quiz-best");
    if (bestEl) bestEl.textContent = score;
  }

  if (score >= maxScore * 0.8 && typeof confetti === "function") {
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 }, colors: ["#1f39ff", "#d6f94e", "#ff5b3a"], disableForReducedMotion: true });
  }
}

/* ========================= TERMINAL MINI ========================= */
const TERM_HELP = `Perintah yang bisa dicoba:
  help              tampilkan daftar perintah ini
  git --version     cek versi Git
  code --version    cek versi VS Code
  node --version    cek versi Node.js
  pwd               lihat folder saat ini
  ls                lihat isi folder
  whoami            lihat nama pengguna
  clear             bersihkan layar`;

function termResponse(raw) {
  const cmd = raw.trim();
  const lower = cmd.toLowerCase();
  if (lower === "") return "";
  if (lower === "help") return TERM_HELP;
  if (lower === "git --version") return "git version 2.45.1 (simulasi)";
  if (lower === "code --version") return "1.95.0\n3a4f7a2f8b\nx64 (simulasi)";
  if (lower === "node --version") return "v22.10.0 (simulasi)";
  if (lower === "pwd") return "/home/maba/workshop";
  if (lower === "ls") return "index.html   catatan.md   latihan/";
  if (lower === "whoami") return "maba-hmif";
  if (lower === "cd latihan" || lower === "cd latihan/") return "(simulasi) pindah ke folder latihan/";
  if (lower === "echo halo" || lower.startsWith("echo ")) return cmd.slice(5) || "";
  return `command not found: ${cmd}\nKetik 'help' untuk melihat perintah yang tersedia.`;
}

function renderTerminal() {
  const wrap = $g("#terminal-app");
  if (!wrap) return;

  wrap.innerHTML = `
    <div class="term overflow-hidden">
      <div class="flex items-center gap-2 px-4 py-2.5" style="background:#16181d;border-bottom:2px solid var(--line-strong)">
        <span class="w-3 h-3 rounded-full" style="background:#ff5b3a"></span>
        <span class="w-3 h-3 rounded-full" style="background:#d6f94e"></span>
        <span class="w-3 h-3 rounded-full" style="background:#1f39ff"></span>
        <span class="ml-2 text-xs opacity-60">terminal-mini — bash</span>
      </div>
      <div id="term-out" class="term-out p-4 h-56 overflow-y-auto">
        <div class="opacity-70">Selamat datang di Terminal Mini. Ketik <span class="term-prompt">help</span> lalu Enter untuk mulai.</div>
      </div>
      <form id="term-form" class="flex items-center gap-2 px-4 py-3" style="border-top:2px solid #2b2f38">
        <span class="term-prompt font-mono text-sm">maba@hmif:~$</span>
        <input id="term-input" class="term-input" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="ketik perintah…" aria-label="Perintah terminal" />
      </form>
    </div>
    <p class="text-sm mt-3" style="color:var(--muted)">Ini simulasi — tidak ada perintah asli yang dijalankan di laptopmu.</p>`;

  const out = $g("#term-out");
  const form = $g("#term-form");
  const input = $g("#term-input");

  const print = (text, cls = "") => {
    const line = document.createElement("div");
    line.className = cls;
    line.textContent = text;
    out.appendChild(line);
    out.scrollTop = out.scrollHeight;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value;
    print(`maba@hmif:~$ ${value}`, "opacity-60");
    if (value.trim().toLowerCase() === "clear") {
      out.innerHTML = "";
    } else {
      const res = termResponse(value);
      if (res) print(res);
    }
    input.value = "";
    input.focus();
  });

  $g("#terminal-app").addEventListener("click", (e) => {
    if (!e.target.closest("a")) input.focus();
  });
}

/* ----------------------------- Init ------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  renderQuiz();
  renderTerminal();
});
