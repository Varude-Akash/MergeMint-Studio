import "./styles.css";
import { initAnalytics } from "./analytics.js";
import { renderPage, initSiteChrome } from "./siteChrome.js";

document.querySelector("#app").innerHTML = renderPage({
  title: "All tools in one studio",
  subtitle: "Open a tool page directly. Each tool has its own URL for faster mobile UX and better sharing.",
  bodyHtml: `
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

    <section class="rounded-3xl border border-white/70 bg-white/85 p-5 shadow-lg shadow-slate-200/60 backdrop-blur-xl">
      <h3 class="text-lg font-bold text-slate-900">Why MergeMint Studio?</h3>
      <ul class="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
        <li>Consistent simple interface across tools.</li>
        <li>Direct tool URLs for quick access and sharing.</li>
        <li>Privacy-first browser processing for core file tools.</li>
      </ul>
    </section>
  `
});

initSiteChrome();
initAnalytics();
