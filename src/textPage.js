import "./styles.css";
import { initTextMerge } from "./textMerge.js";
import { initAnalytics } from "./analytics.js";

document.querySelector("#app").innerHTML = `
  <div class="relative min-h-screen overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-emerald-50 px-4 py-6 sm:px-6 lg:px-8">
    <div class="relative mx-auto w-full max-w-5xl">
      <header class="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-lg shadow-slate-200/60 backdrop-blur-xl">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <a href="/" class="group flex items-center gap-3" aria-label="Go to home">
            <div class="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 text-sm font-black tracking-wide text-white shadow">MM</div>
            <div>
              <h1 class="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl group-hover:text-cyan-700">Text Merge</h1>
              <p class="text-sm text-slate-600">Combine two text blocks and download.</p>
            </div>
          </a>
          <a href="/" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100">Back to Home</a>
        </div>
      </header>

      <main class="mt-5">
        <section class="rounded-3xl border border-white/70 bg-white/85 p-5 shadow-lg shadow-slate-200/60 backdrop-blur-xl">
          <div class="grid grid-cols-1 gap-3 lg:grid-cols-2">
            <textarea id="text-a" class="rounded-xl border border-slate-300 p-3 text-sm text-slate-800 focus:border-cyan-500 focus:outline-none" rows="7" placeholder="Paste text block A"></textarea>
            <textarea id="text-b" class="rounded-xl border border-slate-300 p-3 text-sm text-slate-800 focus:border-cyan-500 focus:outline-none" rows="7" placeholder="Paste text block B"></textarea>
          </div>
          <div class="mt-3 flex flex-wrap items-center gap-2">
            <select id="text-separator" class="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700">
              <option value="newline">New line</option>
              <option value="blank">Blank line</option>
              <option value="line">--- separator line</option>
            </select>
            <button id="text-merge-btn" type="button" class="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800">Merge Text</button>
            <button id="text-clear-btn" type="button" class="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100">Clear</button>
            <button id="text-download-btn" type="button" class="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700 hover:bg-emerald-100" disabled>Download TXT</button>
          </div>
          <textarea id="text-output" class="mt-3 w-full rounded-xl border border-slate-300 p-3 text-sm text-slate-800" rows="8" placeholder="Merged output will appear here"></textarea>
        </section>
      </main>
    </div>
  </div>
`;

initTextMerge();
initAnalytics();
