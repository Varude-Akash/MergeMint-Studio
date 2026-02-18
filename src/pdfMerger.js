import { PDFDocument } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { trackEvent } from "./analytics.js";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

function emptyDocState() {
  return {
    name: "",
    bytes: null,
    pages: [],
    selected: new Set()
  };
}

export function initPdfMerger() {
  const state = {
    a: emptyDocState(),
    b: emptyDocState(),
    mergeOrder: "ab"
  };

  const refs = {
    fileA: document.getElementById("file-a"),
    fileB: document.getElementById("file-b"),
    orderAB: document.getElementById("order-ab"),
    orderBA: document.getElementById("order-ba"),
    resetAll: document.getElementById("reset-all"),
    copyPlan: document.getElementById("copy-plan"),
    topSummary: document.getElementById("top-summary"),
    removeA: document.getElementById("remove-a"),
    removeB: document.getElementById("remove-b"),
    metaA: document.getElementById("meta-a"),
    metaB: document.getElementById("meta-b"),
    thumbsA: document.getElementById("thumbs-a"),
    thumbsB: document.getElementById("thumbs-b"),
    actionsA: document.getElementById("actions-a"),
    actionsB: document.getElementById("actions-b"),
    mergeBtn: document.getElementById("merge-btn"),
    mergeSummary: document.getElementById("merge-summary"),
    status: document.getElementById("status")
  };

  refs.fileA.addEventListener("change", (event) => handleFileUpload("a", event.target.files?.[0]));
  refs.fileB.addEventListener("change", (event) => handleFileUpload("b", event.target.files?.[0]));
  refs.removeA.addEventListener("click", () => removePdf("a"));
  refs.removeB.addEventListener("click", () => removePdf("b"));
  refs.orderAB.addEventListener("click", () => setMergeOrder("ab"));
  refs.orderBA.addEventListener("click", () => setMergeOrder("ba"));
  refs.resetAll.addEventListener("click", resetWorkspace);
  refs.copyPlan.addEventListener("click", copyMergePlan);

  document.querySelectorAll("button[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;
      const target = button.dataset.target;
      if (!target || !state[target]) {
        return;
      }

      if (action === "all") {
        state[target].selected = new Set(state[target].pages.map((item) => item.index));
      }

      if (action === "none") {
        state[target].selected.clear();
      }

      if (action === "odd") {
        state[target].selected = new Set(
          state[target].pages.filter((item) => item.pageNumber % 2 === 1).map((item) => item.index)
        );
      }

      if (action === "even") {
        state[target].selected = new Set(
          state[target].pages.filter((item) => item.pageNumber % 2 === 0).map((item) => item.index)
        );
      }

      trackEvent("selection_bulk_action", {
        slot: target,
        action,
        selected_pages: state[target].selected.size
      });
      syncCheckboxes(target);
      refreshMergeControls();
    });
  });

  refs.mergeBtn.addEventListener("click", mergeSelectedPages);
  syncOrderButtons();
  refreshMergeControls();

  async function handleFileUpload(target, file) {
    if (!file) {
      return;
    }

    setStatus(`Loading ${file.name}...`);
    resetDoc(target);

    try {
      const fileBuffer = await file.arrayBuffer();
      const previewBytes = new Uint8Array(fileBuffer.slice(0));
      const mergeBytes = new Uint8Array(fileBuffer.slice(0));
      const pdf = await pdfjsLib.getDocument({ data: previewBytes }).promise;

      state[target].name = file.name;
      state[target].bytes = mergeBytes;
      state[target].pages = [];

      updateMeta(target, `${file.name} - ${pdf.numPages} pages`);
      getActionsNode(target).hidden = false;
      getRemoveNode(target).classList.remove("hidden");
      trackEvent("pdf_upload", {
        slot: target,
        file_name: file.name,
        pages: pdf.numPages
      });

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 0.22 });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d", { alpha: false });
        canvas.width = Math.max(1, Math.floor(viewport.width));
        canvas.height = Math.max(1, Math.floor(viewport.height));

        await page.render({ canvasContext: ctx, viewport }).promise;

        state[target].pages.push({
          index: pageNumber - 1,
          pageNumber,
          image: canvas.toDataURL("image/png")
        });
        state[target].selected.add(pageNumber - 1);
      }

      renderPageTiles(target);
      setStatus(`Loaded ${file.name}.`);
    } catch (error) {
      console.error(error);
      resetDoc(target);
      updateMeta(target, "Could not read this PDF. Please try another file.");
      setStatus("Error reading PDF.");
      trackEvent("pdf_upload_failed", {
        slot: target,
        reason: "parse_error"
      });
    }

    refreshMergeControls();
  }

  function renderPageTiles(target) {
    const root = getThumbsNode(target);
    root.textContent = "";

    state[target].pages.forEach((item) => {
      const tile = document.createElement("label");
      tile.className =
        "cursor-pointer rounded-xl border border-slate-200 bg-white p-2 shadow-sm transition hover:-translate-y-0.5 hover:shadow";

      const preview = document.createElement("img");
      preview.className = "aspect-[3/4] w-full rounded-md border border-slate-200 bg-white object-contain";
      preview.src = item.image;
      preview.alt = `Page ${item.pageNumber} preview`;

      const line = document.createElement("div");
      line.className = "mt-2 flex items-center justify-between";

      const text = document.createElement("span");
      text.className = "text-xs font-medium text-slate-700";
      text.textContent = `Page ${item.pageNumber}`;

      const check = document.createElement("input");
      check.type = "checkbox";
      check.className = "h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500";
      check.checked = true;
      check.dataset.target = target;
      check.dataset.index = String(item.index);
      check.addEventListener("change", handlePageSelectionChange);

      line.append(text, check);
      tile.append(preview, line);
      root.append(tile);
    });
  }

  function handlePageSelectionChange(event) {
    const checkbox = event.currentTarget;
    const target = checkbox.dataset.target;
    const index = Number.parseInt(checkbox.dataset.index || "", 10);

    if (!target || Number.isNaN(index) || !state[target]) {
      return;
    }

    if (checkbox.checked) {
      state[target].selected.add(index);
    } else {
      state[target].selected.delete(index);
    }

    trackEvent("page_selection_change", {
      slot: target,
      selected_pages: state[target].selected.size
    });
    refreshMergeControls();
  }

  function syncCheckboxes(target) {
    const root = getThumbsNode(target);
    root.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
      const index = Number.parseInt(checkbox.dataset.index || "", 10);
      checkbox.checked = state[target].selected.has(index);
    });
  }

  function refreshMergeControls() {
    const selectedA = state.a.selected.size;
    const selectedB = state.b.selected.size;
    const totalSelected = selectedA + selectedB;
    const orderText = state.mergeOrder === "ab" ? "A -> B" : "B -> A";

    refs.mergeSummary.textContent = `PDF A: ${selectedA} pages | PDF B: ${selectedB} pages | Total: ${totalSelected} | Order: ${orderText}`;
    refs.topSummary.textContent = `${totalSelected} pages selected`;
    refs.mergeBtn.disabled = totalSelected === 0;
  }

  async function mergeSelectedPages() {
    const primary = state.mergeOrder === "ab" ? "a" : "b";
    const secondary = state.mergeOrder === "ab" ? "b" : "a";
    const picks = [
      ...selectedList(primary).map((index) => ({ source: primary, index })),
      ...selectedList(secondary).map((index) => ({ source: secondary, index }))
    ];

    if (picks.length === 0) {
      setStatus("Select at least one page.");
      return;
    }

    try {
      refs.mergeBtn.disabled = true;
      setStatus("Merging selected pages...");
      trackEvent("merge_attempt", {
        total_pages: picks.length,
        order: state.mergeOrder
      });

      const merged = await PDFDocument.create();
      const sourceDocs = {};

      for (const sourceKey of ["a", "b"]) {
        if (state[sourceKey].bytes) {
          sourceDocs[sourceKey] = await PDFDocument.load(state[sourceKey].bytes);
        }
      }

      for (const pick of picks) {
        const source = sourceDocs[pick.source];
        if (!source) {
          continue;
        }
        const [copied] = await merged.copyPages(source, [pick.index]);
        merged.addPage(copied);
      }

      const mergedBytes = await merged.save();
      const blob = new Blob([mergedBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `merged-${timestamp()}.pdf`;
      anchor.click();

      setTimeout(() => URL.revokeObjectURL(url), 2500);
      setStatus("Merged PDF downloaded.");
      trackEvent("merge_success", {
        total_pages: picks.length,
        order: state.mergeOrder
      });
    } catch (error) {
      console.error(error);
      setStatus("Merge failed. Try again.");
      trackEvent("merge_failed", {
        total_pages: picks.length,
        order: state.mergeOrder
      });
    }

    refreshMergeControls();
  }

  function selectedList(target) {
    return [...state[target].selected].sort((x, y) => x - y);
  }

  function resetDoc(target) {
    state[target] = emptyDocState();
    getThumbsNode(target).textContent = "";
    getActionsNode(target).hidden = true;
    getFileInputNode(target).value = "";
    getRemoveNode(target).classList.add("hidden");
    updateMeta(target, "No file selected.");
  }

  function removePdf(target) {
    const hadFile = Boolean(state[target].bytes);
    resetDoc(target);
    refreshMergeControls();
    setStatus(hadFile ? `Removed PDF ${target.toUpperCase()}.` : "Nothing to remove.");
    if (hadFile) {
      trackEvent("pdf_removed", { slot: target });
    }
  }

  function setMergeOrder(order) {
    state.mergeOrder = order;
    syncOrderButtons();
    refreshMergeControls();
    setStatus(`Merge order set to ${order === "ab" ? "A -> B" : "B -> A"}.`);
    trackEvent("merge_order_change", { order });
  }

  function syncOrderButtons() {
    if (state.mergeOrder === "ab") {
      refs.orderAB.className = "rounded-lg px-3 py-2 text-xs font-bold text-white bg-slate-900";
      refs.orderBA.className = "rounded-lg px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100";
      return;
    }

    refs.orderAB.className = "rounded-lg px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100";
    refs.orderBA.className = "rounded-lg px-3 py-2 text-xs font-bold text-white bg-slate-900";
  }

  function resetWorkspace() {
    resetDoc("a");
    resetDoc("b");
    state.mergeOrder = "ab";
    syncOrderButtons();
    refreshMergeControls();
    setStatus("Workspace reset.");
    trackEvent("workspace_reset");
  }

  async function copyMergePlan() {
    const primary = state.mergeOrder === "ab" ? "a" : "b";
    const secondary = state.mergeOrder === "ab" ? "b" : "a";
    const plan = [
      `Merge order: ${state.mergeOrder === "ab" ? "A -> B" : "B -> A"}`,
      `PDF A (${state.a.name || "not loaded"}): pages ${toPageList("a")}`,
      `PDF B (${state.b.name || "not loaded"}): pages ${toPageList("b")}`,
      `Final sequence: ${toPageList(primary, primary.toUpperCase())}, ${toPageList(secondary, secondary.toUpperCase())}`
    ].join("\\n");

    try {
      await navigator.clipboard.writeText(plan);
      setStatus("Merge plan copied to clipboard.");
      trackEvent("copy_merge_plan");
    } catch (error) {
      console.error(error);
      setStatus("Clipboard blocked. Could not copy merge plan.");
      trackEvent("copy_merge_plan_failed");
    }
  }

  function updateMeta(target, text) {
    if (target === "a") {
      refs.metaA.textContent = text;
      return;
    }
    refs.metaB.textContent = text;
  }

  function getThumbsNode(target) {
    return target === "a" ? refs.thumbsA : refs.thumbsB;
  }

  function getActionsNode(target) {
    return target === "a" ? refs.actionsA : refs.actionsB;
  }

  function getFileInputNode(target) {
    return target === "a" ? refs.fileA : refs.fileB;
  }

  function getRemoveNode(target) {
    return target === "a" ? refs.removeA : refs.removeB;
  }

  function setStatus(message) {
    refs.status.textContent = message;
  }

  function timestamp() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const hh = String(now.getHours()).padStart(2, "0");
    const min = String(now.getMinutes()).padStart(2, "0");
    return `${yyyy}${mm}${dd}-${hh}${min}`;
  }

  function toPageList(target, prefix = "") {
    const selected = selectedList(target).map((index) => index + 1);
    if (selected.length === 0) {
      return "none";
    }
    const mapped = selected.map((page) => (prefix ? `${prefix}${page}` : `${page}`));
    return mapped.join(", ");
  }
}
