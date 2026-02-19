import "./styles.css";
import { initPdfMerger } from "./pdfMerger.js";
import { initPdfSplitter } from "./pdfSplitter.js";
import { initTextMerge } from "./textMerge.js";
import { initCsvMerge } from "./csvMerge.js";
import { initAnalytics } from "./analytics.js";

document.querySelector("#app").innerHTML = `
  <div class="relative min-h-screen overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-emerald-50 px-4 py-6 sm:px-6 lg:px-8">
    <div class="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan-200/40 blur-3xl"></div>
    <div class="pointer-events-none absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl"></div>

    <div class="relative mx-auto w-full max-w-7xl">
      <header class="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-lg shadow-slate-200/60 backdrop-blur-xl">
        <div class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <a href="/" class="group flex items-center gap-3" aria-label="Go to MergeMint Studio home">
            <div class="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 text-sm font-black tracking-wide text-white shadow">MM</div>
            <div>
              <h1 class="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl group-hover:text-cyan-700">MergeMint Studio</h1>
              <p class="text-sm text-slate-600">One studio for merge, split, and quick file tools.</p>
            </div>
          </a>

          <div class="flex flex-wrap items-center gap-2">
            <a href="/" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100">Home</a>
            <a href="#tools" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100">Tools</a>
            <a href="#guides" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100">Guides</a>
          </div>
        </div>
      </header>

      <main class="mt-5 space-y-4">
        <section class="rounded-3xl border border-white/70 bg-white/85 p-5 shadow-lg shadow-slate-200/60 backdrop-blur-xl">
          <h2 class="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Choose a tool and get it done in minutes.</h2>
          <p class="mt-2 text-sm text-slate-600 sm:text-base">Use Merge for two PDFs, Split for one PDF, and lightweight text/CSV tools for quick work.</p>
        </section>

        <section id="tools" class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <button type="button" data-tool-card="merge" class="tool-card rounded-2xl border border-cyan-300 bg-cyan-50 p-4 text-left shadow-sm">
            <p class="text-xs font-bold uppercase tracking-wide text-cyan-800">Live</p>
            <h3 class="mt-1 text-lg font-extrabold text-slate-900">Merge PDF</h3>
            <p class="mt-1 text-sm text-slate-600">Pick pages from A and B and combine.</p>
          </button>
          <button type="button" data-tool-card="split" class="tool-card rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm hover:border-emerald-300 hover:bg-emerald-50">
            <p class="text-xs font-bold uppercase tracking-wide text-emerald-800">Live</p>
            <h3 class="mt-1 text-lg font-extrabold text-slate-900">Split PDF</h3>
            <p class="mt-1 text-sm text-slate-600">Split one PDF by custom page ranges.</p>
          </button>
          <button type="button" data-tool-card="text" class="tool-card rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm hover:border-emerald-300 hover:bg-emerald-50">
            <p class="text-xs font-bold uppercase tracking-wide text-emerald-800">Live</p>
            <h3 class="mt-1 text-lg font-extrabold text-slate-900">Text Merge</h3>
            <p class="mt-1 text-sm text-slate-600">Combine two text blocks and download.</p>
          </button>
          <button type="button" data-tool-card="csv" class="tool-card rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm hover:border-emerald-300 hover:bg-emerald-50">
            <p class="text-xs font-bold uppercase tracking-wide text-emerald-800">Live</p>
            <h3 class="mt-1 text-lg font-extrabold text-slate-900">CSV Merge</h3>
            <p class="mt-1 text-sm text-slate-600">Merge multiple CSV files into one.</p>
          </button>
          <article class="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm">
            <p class="text-xs font-bold uppercase tracking-wide text-slate-500">Soon</p>
            <h3 class="mt-1 text-lg font-extrabold text-slate-900">Image to PDF</h3>
            <p class="mt-1 text-sm text-slate-600">Combine images into a PDF.</p>
          </article>
        </section>

        <section id="panel-merge" data-tool-panel="merge" class="space-y-4">
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
        </section>

        <section id="panel-split" data-tool-panel="split" class="hidden space-y-4">
          <section class="rounded-3xl border border-white/70 bg-white/85 p-5 shadow-lg shadow-slate-200/60 backdrop-blur-xl">
            <h3 class="text-lg font-bold text-slate-900">Split PDF by Ranges</h3>
            <p class="mt-1 text-sm text-slate-600">Upload one PDF and provide one range per line. Example: 1-3, 4-7, 8-10.</p>
            <div class="mt-4 flex flex-wrap items-center gap-2">
              <label class="inline-flex cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 px-4 py-2 text-sm font-bold text-white shadow hover:from-cyan-700 hover:to-cyan-600">
                <input class="hidden" type="file" id="split-file" accept="application/pdf" />
                Choose PDF
              </label>
              <button class="hidden rounded-xl border border-rose-300 px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50" id="split-remove" type="button">Remove</button>
            </div>
            <p class="mt-3 text-sm text-slate-600" id="split-meta">No file selected.</p>
            <textarea id="split-ranges" class="mt-3 w-full rounded-xl border border-slate-300 p-3 text-sm text-slate-800 focus:border-cyan-500 focus:outline-none" rows="6" placeholder="1-3\n4-8\n9-12"></textarea>
            <div class="mt-3 flex flex-wrap items-center gap-2">
              <button id="split-generate" type="button" class="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-slate-900 to-slate-700 px-5 py-3 text-sm font-extrabold text-white shadow hover:from-slate-800 hover:to-slate-600 disabled:cursor-not-allowed disabled:from-slate-300 disabled:to-slate-300" disabled>Generate Split PDFs</button>
              <button id="split-example" type="button" class="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100">Use Example Ranges</button>
            </div>
            <p class="mt-3 text-sm font-semibold text-slate-700" id="split-status">Ready.</p>
          </section>
        </section>

        <section id="panel-text" data-tool-panel="text" class="hidden space-y-4">
          <section class="rounded-3xl border border-white/70 bg-white/85 p-5 shadow-lg shadow-slate-200/60 backdrop-blur-xl">
            <h3 class="text-lg font-bold text-slate-900">Text Merge Tool</h3>
            <p class="mt-1 text-sm text-slate-600">Paste two text blocks, choose a separator, and download merged text.</p>
            <div class="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
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
        </section>

        <section id="panel-csv" data-tool-panel="csv" class="hidden space-y-4">
          <section class="rounded-3xl border border-white/70 bg-white/85 p-5 shadow-lg shadow-slate-200/60 backdrop-blur-xl">
            <h3 class="text-lg font-bold text-slate-900">CSV Merge Tool</h3>
            <p class="mt-1 text-sm text-slate-600">Upload multiple CSV files and download one merged CSV.</p>
            <div class="mt-4 flex flex-wrap items-center gap-2">
              <label class="inline-flex cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 px-4 py-2 text-sm font-bold text-white shadow hover:from-cyan-700 hover:to-cyan-600">
                <input id="csv-files" class="hidden" type="file" accept=".csv,text/csv" multiple />
                Choose CSV Files
              </label>
              <button id="csv-merge-btn" type="button" class="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300" disabled>Merge CSV</button>
            </div>
            <p id="csv-meta" class="mt-3 text-sm text-slate-600">No CSV files selected.</p>
            <p id="csv-status" class="mt-2 text-sm font-semibold text-slate-700">Ready.</p>
          </section>
        </section>

        <section id="guides" class="rounded-3xl border border-white/70 bg-white/85 p-5 shadow-lg shadow-slate-200/60 backdrop-blur-xl">
          <h3 class="text-lg font-bold text-slate-900">Popular Guides</h3>
          <div class="mt-3 grid gap-3 sm:grid-cols-3">
            <a class="rounded-xl border border-slate-200 bg-white p-3 text-sm font-semibold text-cyan-800 hover:bg-cyan-50" href="/merge-selected-pdf-pages-online/">Merge Selected PDF Pages Online</a>
            <a class="rounded-xl border border-slate-200 bg-white p-3 text-sm font-semibold text-cyan-800 hover:bg-cyan-50" href="/merge-odd-even-pdf-pages/">Merge Odd and Even PDF Pages</a>
            <a class="rounded-xl border border-slate-200 bg-white p-3 text-sm font-semibold text-cyan-800 hover:bg-cyan-50" href="/private-pdf-merger-no-upload/">Private PDF Merger (No Upload)</a>
          </div>
        </section>

        <section class="rounded-3xl border border-white/70 bg-white/85 p-4 text-sm font-semibold text-slate-700 shadow-lg shadow-slate-200/60 backdrop-blur-xl" aria-live="polite">
          <p id="status">Ready.</p>
        </section>
      </main>
    </div>
  </div>
`;

initPdfMerger();
initPdfSplitter();
initTextMerge();
initCsvMerge();
initToolCards();
initAnalytics();

function initToolCards() {
  const cards = document.querySelectorAll("[data-tool-card]");
  const panels = document.querySelectorAll("[data-tool-panel]");

  function setActive(tool) {
    cards.forEach((card) => {
      const active = card.dataset.toolCard === tool;
      card.className = active
        ? "tool-card rounded-2xl border border-cyan-300 bg-cyan-50 p-4 text-left shadow-sm"
        : "tool-card rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm hover:border-emerald-300 hover:bg-emerald-50";
    });

    panels.forEach((panel) => {
      panel.classList.toggle("hidden", panel.dataset.toolPanel !== tool);
    });
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => setActive(card.dataset.toolCard));
  });

  setActive("merge");
}

