export function renderPage({ title, subtitle, bodyHtml, showGuides = true }) {
  return `
    <div class="relative min-h-screen overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-emerald-50 px-4 py-6 sm:px-6 lg:px-8">
      <div class="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan-200/40 blur-3xl"></div>
      <div class="pointer-events-none absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl"></div>

      <div class="relative mx-auto w-full max-w-7xl">
        ${headerHtml()}

        <main class="mt-5 space-y-4">
          <section class="rounded-3xl border border-white/70 bg-white/85 p-5 shadow-lg shadow-slate-200/60 backdrop-blur-xl">
            <h2 class="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">${title}</h2>
            <p class="mt-2 text-sm text-slate-600 sm:text-base">${subtitle}</p>
          </section>

          ${bodyHtml}

          ${showGuides ? guidesHtml() : ""}
        </main>
      </div>
    </div>
  `;
}

function headerHtml() {
  return `
    <header class="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-lg shadow-slate-200/60 backdrop-blur-xl">
      <div class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <a href="/" class="group flex items-center gap-3" aria-label="Go to MergeMint Studio home">
          <div class="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 text-sm font-black tracking-wide text-white shadow">MM</div>
          <div>
            <h1 class="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl group-hover:text-cyan-700">MergeMint Studio</h1>
            <p class="text-sm text-slate-600">Fast browser tools for files and text.</p>
          </div>
        </a>

        <nav class="flex flex-wrap items-center gap-2">
          <a href="/" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100">Home</a>
          <a href="/merge-pdf/" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100">Merge PDF</a>
          <a href="/split-pdf/" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100">Split PDF</a>
          <a href="/merge-text/" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100">Text Merge</a>
          <a href="/merge-csv/" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100">CSV Merge</a>
          <a href="/#guides" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100">Guides</a>
        </nav>
      </div>
    </header>
  `;
}

function guidesHtml() {
  return `
    <section id="guides" class="rounded-3xl border border-white/70 bg-white/85 p-5 shadow-lg shadow-slate-200/60 backdrop-blur-xl">
      <h3 class="text-lg font-bold text-slate-900">Guides & Information</h3>
      <p class="mt-1 text-sm text-slate-600">Learn best practices and quick workflows for each tool.</p>
      <div class="mt-3 grid gap-3 sm:grid-cols-3">
        <a class="rounded-xl border border-slate-200 bg-white p-3 text-sm font-semibold text-cyan-800 hover:bg-cyan-50" href="/merge-selected-pdf-pages-online/">Merge Selected PDF Pages Online</a>
        <a class="rounded-xl border border-slate-200 bg-white p-3 text-sm font-semibold text-cyan-800 hover:bg-cyan-50" href="/merge-odd-even-pdf-pages/">Merge Odd and Even PDF Pages</a>
        <a class="rounded-xl border border-slate-200 bg-white p-3 text-sm font-semibold text-cyan-800 hover:bg-cyan-50" href="/private-pdf-merger-no-upload/">Private PDF Merger (No Upload)</a>
      </div>
    </section>
  `;
}
