import "./styles.css";
import { initTextMerge } from "./textMerge.js";
import { initAnalytics } from "./analytics.js";
import { renderPage } from "./siteChrome.js";

document.querySelector("#app").innerHTML = renderPage({
  title: "Text Merge",
  subtitle: "Combine two text blocks, choose separator style, and download output.",
  bodyHtml: `
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
  `
});

initTextMerge();
initAnalytics();
