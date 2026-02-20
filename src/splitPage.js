import "./styles.css";
import { initPdfSplitter } from "./pdfSplitter.js";
import { initAnalytics } from "./analytics.js";
import { renderPage } from "./siteChrome.js";

document.querySelector("#app").innerHTML = renderPage({
  title: "Split PDF",
  subtitle: "Split one PDF into multiple files using ranges or single pages.",
  bodyHtml: `
    <section class="rounded-3xl border border-white/70 bg-white/85 p-5 shadow-lg shadow-slate-200/60 backdrop-blur-xl">
      <p class="mt-1 text-sm text-slate-600">Upload one PDF and provide ranges with newline/comma/semicolon. Single page is allowed (example: 1-4,5,8-10).</p>
      <div class="mt-4 flex flex-wrap items-center gap-2">
        <label class="inline-flex cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 px-4 py-2 text-sm font-bold text-white shadow hover:from-cyan-700 hover:to-cyan-600">
          <input class="hidden" type="file" id="split-file" accept="application/pdf" />
          Choose PDF
        </label>
        <button class="hidden rounded-xl border border-rose-300 px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50" id="split-remove" type="button">Remove</button>
      </div>
      <p class="mt-3 text-sm text-slate-600" id="split-meta">No file selected.</p>
      <textarea id="split-ranges" class="mt-3 w-full rounded-xl border border-slate-300 p-3 text-sm text-slate-800 focus:border-cyan-500 focus:outline-none" rows="6" placeholder="1-4\n5\n8-10"></textarea>
      <div class="mt-3 flex flex-wrap items-center gap-2">
        <button id="split-generate" type="button" class="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-slate-900 to-slate-700 px-5 py-3 text-sm font-extrabold text-white shadow hover:from-slate-800 hover:to-slate-600 disabled:cursor-not-allowed disabled:from-slate-300 disabled:to-slate-300" disabled>Generate Split PDFs</button>
        <button id="split-example" type="button" class="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100">Use Example Ranges</button>
      </div>
      <p class="mt-3 text-sm font-semibold text-slate-700" id="split-status">Ready.</p>
    </section>
  `
});

initPdfSplitter();
initAnalytics();
