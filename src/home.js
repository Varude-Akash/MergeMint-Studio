import "./styles.css";
import { initAnalytics } from "./analytics.js";

document.querySelector("#app").innerHTML = `
  <div class="relative min-h-screen overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-emerald-50 px-4 py-6 sm:px-6 lg:px-8">
    <div class="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan-200/40 blur-3xl"></div>
    <div class="pointer-events-none absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl"></div>

    <div class="relative mx-auto w-full max-w-7xl">
      <header class="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-lg shadow-slate-200/60 backdrop-blur-xl">
        <div class="flex items-center gap-3">
          <div class="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 text-sm font-black tracking-wide text-white shadow">MM</div>
          <div>
            <h1 class="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">MergeMint Studio</h1>
            <p class="text-sm text-slate-600">Pick a tool to get started.</p>
          </div>
        </div>
      </header>

      <main class="mt-5 space-y-4">
        <section class="rounded-3xl border border-white/70 bg-white/85 p-5 shadow-lg shadow-slate-200/60 backdrop-blur-xl">
          <h2 class="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">All tools in one studio</h2>
          <p class="mt-2 text-sm text-slate-600 sm:text-base">Open a tool page directly. Each tool has its own URL for faster mobile UX and better sharing.</p>
        </section>

        <section class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <a href="/merge-pdf/" class="rounded-2xl border border-cyan-300 bg-cyan-50 p-4 shadow-sm hover:-translate-y-0.5 transition">
            <p class="text-xs font-bold uppercase tracking-wide text-cyan-800">Live</p>
            <h3 class="mt-1 text-lg font-extrabold text-slate-900">Merge PDF</h3>
            <p class="mt-1 text-sm text-slate-600">Combine pages from two PDFs.</p>
          </a>
          <a href="/split-pdf/" class="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 shadow-sm hover:-translate-y-0.5 transition">
            <p class="text-xs font-bold uppercase tracking-wide text-emerald-800">Live</p>
            <h3 class="mt-1 text-lg font-extrabold text-slate-900">Split PDF</h3>
            <p class="mt-1 text-sm text-slate-600">Split one PDF by ranges or single pages.</p>
          </a>
          <a href="/merge-text/" class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:-translate-y-0.5 transition hover:border-cyan-300">
            <p class="text-xs font-bold uppercase tracking-wide text-slate-500">Live</p>
            <h3 class="mt-1 text-lg font-extrabold text-slate-900">Text Merge</h3>
            <p class="mt-1 text-sm text-slate-600">Merge two text blocks quickly.</p>
          </a>
          <a href="/merge-csv/" class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:-translate-y-0.5 transition hover:border-cyan-300">
            <p class="text-xs font-bold uppercase tracking-wide text-slate-500">Live</p>
            <h3 class="mt-1 text-lg font-extrabold text-slate-900">CSV Merge</h3>
            <p class="mt-1 text-sm text-slate-600">Merge multiple CSV files.</p>
          </a>
        </section>
      </main>
    </div>
  </div>
`;

initAnalytics();
