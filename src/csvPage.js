import "./styles.css";
import { initCsvMerge } from "./csvMerge.js";
import { initAnalytics } from "./analytics.js";

document.querySelector("#app").innerHTML = `
  <div class="relative min-h-screen overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-emerald-50 px-4 py-6 sm:px-6 lg:px-8">
    <div class="relative mx-auto w-full max-w-5xl">
      <header class="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-lg shadow-slate-200/60 backdrop-blur-xl">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <a href="/" class="group flex items-center gap-3" aria-label="Go to home">
            <div class="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 text-sm font-black tracking-wide text-white shadow">MM</div>
            <div>
              <h1 class="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl group-hover:text-cyan-700">CSV Merge</h1>
              <p class="text-sm text-slate-600">Combine multiple CSV files into one.</p>
            </div>
          </a>
          <a href="/" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100">Back to Home</a>
        </div>
      </header>

      <main class="mt-5">
        <section class="rounded-3xl border border-white/70 bg-white/85 p-5 shadow-lg shadow-slate-200/60 backdrop-blur-xl">
          <div class="flex flex-wrap items-center gap-2">
            <label class="inline-flex cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 px-4 py-2 text-sm font-bold text-white shadow hover:from-cyan-700 hover:to-cyan-600">
              <input id="csv-files" class="hidden" type="file" accept=".csv,text/csv" multiple />
              Choose CSV Files
            </label>
            <button id="csv-merge-btn" type="button" class="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300" disabled>Merge CSV</button>
          </div>
          <p id="csv-meta" class="mt-3 text-sm text-slate-600">No CSV files selected.</p>
          <p id="csv-status" class="mt-2 text-sm font-semibold text-slate-700">Ready.</p>
        </section>
      </main>
    </div>
  </div>
`;

initCsvMerge();
initAnalytics();
