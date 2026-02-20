import "./styles.css";
import { initPdfMerger } from "./pdfMerger.js";
import { initAnalytics } from "./analytics.js";

document.querySelector("#app").innerHTML = `
  <div class="relative min-h-screen overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-emerald-50 px-4 py-6 sm:px-6 lg:px-8">
    <div class="relative mx-auto w-full max-w-7xl">
      <header class="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-lg shadow-slate-200/60 backdrop-blur-xl">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <a href="/" class="group flex items-center gap-3" aria-label="Go to home">
            <div class="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 text-sm font-black tracking-wide text-white shadow">MM</div>
            <div>
              <h1 class="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl group-hover:text-cyan-700">Merge PDF</h1>
              <p class="text-sm text-slate-600">Merge selected pages from two PDFs.</p>
            </div>
          </a>
          <a href="/" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100">Back to Home</a>
        </div>
      </header>

      <main class="mt-5 space-y-4">
        <section class="rounded-3xl border border-white/70 bg-white/85 p-4 shadow-lg shadow-slate-200/60 backdrop-blur-xl">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <h3 class="text-lg font-bold text-slate-900">Merge Controls</h3>
            <div class="flex flex-wrap gap-2">
              <div class="inline-flex rounded-xl border border-slate-200 bg-white p-1">
                <button id="order-ab" type="button" class="rounded-lg px-3 py-2 text-xs font-bold text-white bg-slate-900">A → B</button>
                <button id="order-ba" type="button" class="rounded-lg px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100">B → A</button>
              </div>
              <button id="copy-plan" type="button" class="rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs font-bold text-cyan-800 hover:bg-cyan-100">Copy Merge Plan</button>
              <button id="reset-all" type="button" class="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100">Reset Workspace</button>
              <div id="top-summary" class="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">0 pages selected</div>
            </div>
          </div>
        </section>

        <section class="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <article class="rounded-3xl border border-white/70 bg-white/85 p-4 shadow-lg shadow-slate-200/60 backdrop-blur-xl">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <h3 class="text-lg font-bold text-slate-900">PDF A</h3>
              <div class="flex flex-wrap items-center gap-2">
                <label class="inline-flex cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 px-4 py-2 text-sm font-bold text-white shadow hover:from-cyan-700 hover:to-cyan-600">
                  <input class="hidden" type="file" id="file-a" accept="application/pdf" />
                  Choose PDF A
                </label>
                <button class="hidden rounded-xl border border-rose-300 px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50" id="remove-a" type="button">Remove</button>
              </div>
            </div>
            <p class="mt-3 text-sm text-slate-600" id="meta-a">No file selected.</p>
            <div class="mt-3 flex flex-wrap gap-2" id="actions-a" hidden>
              <button class="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100" type="button" data-action="all" data-target="a">All</button>
              <button class="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100" type="button" data-action="odd" data-target="a">Odd</button>
              <button class="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100" type="button" data-action="even" data-target="a">Even</button>
              <button class="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100" type="button" data-action="none" data-target="a">None</button>
            </div>
            <div class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 2xl:grid-cols-4" id="thumbs-a"></div>
          </article>

          <article class="rounded-3xl border border-white/70 bg-white/85 p-4 shadow-lg shadow-slate-200/60 backdrop-blur-xl">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <h3 class="text-lg font-bold text-slate-900">PDF B</h3>
              <div class="flex flex-wrap items-center gap-2">
                <label class="inline-flex cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-2 text-sm font-bold text-white shadow hover:from-emerald-700 hover:to-emerald-600">
                  <input class="hidden" type="file" id="file-b" accept="application/pdf" />
                  Choose PDF B
                </label>
                <button class="hidden rounded-xl border border-rose-300 px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50" id="remove-b" type="button">Remove</button>
              </div>
            </div>
            <p class="mt-3 text-sm text-slate-600" id="meta-b">No file selected.</p>
            <div class="mt-3 flex flex-wrap gap-2" id="actions-b" hidden>
              <button class="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100" type="button" data-action="all" data-target="b">All</button>
              <button class="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100" type="button" data-action="odd" data-target="b">Odd</button>
              <button class="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100" type="button" data-action="even" data-target="b">Even</button>
              <button class="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100" type="button" data-action="none" data-target="b">None</button>
            </div>
            <div class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 2xl:grid-cols-4" id="thumbs-b"></div>
          </article>
        </section>

        <section class="flex flex-col gap-4 rounded-3xl border border-white/70 bg-white/85 p-5 shadow-lg shadow-slate-200/60 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between" id="merge-panel">
          <div>
            <h3 class="text-lg font-bold text-slate-900">Merge Result</h3>
            <p class="mt-1 text-sm text-slate-600" id="merge-summary">Waiting for files and page selections.</p>
          </div>
          <button class="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-slate-900 to-slate-700 px-6 py-3 text-sm font-extrabold text-white shadow hover:from-slate-800 hover:to-slate-600 disabled:cursor-not-allowed disabled:from-slate-300 disabled:to-slate-300" id="merge-btn" type="button" disabled>
            Merge Selected Pages
          </button>
        </section>

        <section class="rounded-3xl border border-white/70 bg-white/85 p-4 text-sm font-semibold text-slate-700 shadow-lg shadow-slate-200/60 backdrop-blur-xl" aria-live="polite">
          <p id="status">Ready.</p>
        </section>
      </main>
    </div>
  </div>
`;

initPdfMerger();
initAnalytics();
