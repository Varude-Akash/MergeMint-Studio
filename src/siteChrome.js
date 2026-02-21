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

export function initSiteChrome() {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const toolsToggle = document.getElementById("tools-toggle");
  const toolsMenu = document.getElementById("tools-menu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  if (toolsToggle && toolsMenu) {
    toolsToggle.addEventListener("click", () => {
      const isOpen = !toolsMenu.classList.contains("hidden");
      toolsMenu.classList.toggle("hidden", isOpen);
      toolsToggle.setAttribute("aria-expanded", String(!isOpen));
    });

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }
      const inside = toolsToggle.contains(target) || toolsMenu.contains(target);
      if (!inside) {
        toolsMenu.classList.add("hidden");
        toolsToggle.setAttribute("aria-expanded", "false");
      }
    });
  }
}

function headerHtml() {
  return `
    <header class="relative z-50 rounded-3xl border border-white/70 bg-white/80 p-4 shadow-lg shadow-slate-200/60 backdrop-blur-xl">
      <div class="flex items-start justify-between gap-3">
        <a href="/" class="group flex items-center gap-3" aria-label="Go to MergeMint Studio home">
          <div class="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 text-sm font-black tracking-wide text-white shadow">MM</div>
          <div>
            <h1 class="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl group-hover:text-cyan-700">MergeMint Studio</h1>
            <p class="text-sm text-slate-600">Fast browser tools for files and text.</p>
          </div>
        </a>

        <button id="menu-toggle" type="button" class="inline-flex cursor-pointer items-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 md:hidden">Menu</button>
      </div>

      <div class="mt-3 hidden items-center gap-2 md:flex">
        <a href="/" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100">Home</a>
        <div class="relative">
          <button id="tools-toggle" type="button" aria-expanded="false" class="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100">Tools</button>
          <div id="tools-menu" class="absolute left-0 z-[70] mt-2 hidden w-72 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
            <p class="px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-500">PDF Tools</p>
            <a href="/merge-pdf/" class="block cursor-pointer rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-cyan-50">Merge PDF</a>
            <a href="/split-pdf/" class="block cursor-pointer rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-cyan-50">Split PDF</a>
            <p class="mt-2 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-500">Data & Text</p>
            <a href="/merge-text/" class="block cursor-pointer rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-cyan-50">Text Merge</a>
            <a href="/merge-csv/" class="block cursor-pointer rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-cyan-50">CSV Merge</a>
          </div>
        </div>
        <a href="/#guides" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100">Guides</a>
      </div>

      <div id="mobile-menu" class="mt-3 hidden space-y-2 md:hidden">
        <a href="/" class="block rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700">Home</a>
        <p class="px-1 text-[11px] font-bold uppercase tracking-wide text-slate-500">Tools</p>
        <a href="/merge-pdf/" class="block rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700">Merge PDF</a>
        <a href="/split-pdf/" class="block rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700">Split PDF</a>
        <a href="/merge-text/" class="block rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700">Text Merge</a>
        <a href="/merge-csv/" class="block rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700">CSV Merge</a>
        <a href="/#guides" class="block rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700">Guides</a>
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
