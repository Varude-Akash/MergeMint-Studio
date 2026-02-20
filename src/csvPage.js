import "./styles.css";
import { initCsvMerge } from "./csvMerge.js";
import { initAnalytics } from "./analytics.js";
import { renderPage } from "./siteChrome.js";

document.querySelector("#app").innerHTML = renderPage({
  title: "CSV Merge",
  subtitle: "Upload multiple CSV files and download a single merged CSV.",
  bodyHtml: `
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
  `
});

initCsvMerge();
initAnalytics();
