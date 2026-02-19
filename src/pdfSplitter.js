import { PDFDocument } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { trackEvent } from "./analytics.js";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

export function initPdfSplitter() {
  const refs = {
    file: document.getElementById("split-file"),
    remove: document.getElementById("split-remove"),
    meta: document.getElementById("split-meta"),
    ranges: document.getElementById("split-ranges"),
    generate: document.getElementById("split-generate"),
    example: document.getElementById("split-example"),
    status: document.getElementById("split-status")
  };

  if (!refs.file || !refs.generate) {
    return;
  }

  const state = {
    name: "",
    bytes: null,
    pageCount: 0
  };

  refs.file.addEventListener("change", (event) => handleFile(event.target.files?.[0]));
  refs.remove.addEventListener("click", clearFile);
  refs.example.addEventListener("click", applyExampleRanges);
  refs.generate.addEventListener("click", generateSplits);
  refs.ranges.addEventListener("input", refreshGenerateButton);

  async function handleFile(file) {
    if (!file) {
      return;
    }

    setStatus(`Loading ${file.name}...`);
    clearFile(false);

    try {
      const buffer = await file.arrayBuffer();
      const previewBytes = new Uint8Array(buffer.slice(0));
      const splitBytes = new Uint8Array(buffer.slice(0));
      const pdf = await pdfjsLib.getDocument({ data: previewBytes }).promise;

      state.name = file.name;
      state.bytes = splitBytes;
      state.pageCount = pdf.numPages;

      refs.meta.textContent = `${file.name} - ${pdf.numPages} pages`;
      refs.remove.classList.remove("hidden");
      setStatus("PDF ready for split.");
      refreshGenerateButton();

      trackEvent("split_upload", {
        file_name: file.name,
        pages: pdf.numPages
      });
    } catch (error) {
      console.error(error);
      clearFile(false);
      refs.meta.textContent = "Could not read this PDF.";
      setStatus("Error reading PDF.");
      trackEvent("split_upload_failed");
    }
  }

  function clearFile(setMessage = true) {
    state.name = "";
    state.bytes = null;
    state.pageCount = 0;
    refs.file.value = "";
    refs.remove.classList.add("hidden");
    refs.meta.textContent = "No file selected.";
    if (setMessage) {
      setStatus("Split workspace reset.");
    }
    refreshGenerateButton();
  }

  function applyExampleRanges() {
    if (!state.pageCount) {
      refs.ranges.value = "1-3\n4-6";
    } else {
      const mid = Math.max(1, Math.floor(state.pageCount / 2));
      refs.ranges.value = `1-${mid}\n${mid + 1}-${state.pageCount}`;
    }
    refreshGenerateButton();
    setStatus("Example ranges added.");
  }

  function refreshGenerateButton() {
    refs.generate.disabled = !state.bytes || !refs.ranges.value.trim();
  }

  async function generateSplits() {
    if (!state.bytes) {
      setStatus("Upload a PDF first.");
      return;
    }

    const parsed = parseRanges(refs.ranges.value, state.pageCount);
    if (!parsed.ok) {
      setStatus(parsed.message);
      return;
    }

    try {
      refs.generate.disabled = true;
      setStatus("Generating split files...");
      trackEvent("split_attempt", { ranges: parsed.ranges.length });

      const source = await PDFDocument.load(state.bytes);
      const baseName = safeBaseName(state.name);

      for (let i = 0; i < parsed.ranges.length; i += 1) {
        const [start, end] = parsed.ranges[i];
        const doc = await PDFDocument.create();
        const pageIndexes = [];
        for (let p = start; p <= end; p += 1) {
          pageIndexes.push(p - 1);
        }

        const copied = await doc.copyPages(source, pageIndexes);
        copied.forEach((page) => doc.addPage(page));

        const bytes = await doc.save();
        const blob = new Blob([bytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = `${baseName}-part-${i + 1}-p${start}-${end}.pdf`;
        anchor.click();
        setTimeout(() => URL.revokeObjectURL(url), 2500);
      }

      setStatus(`Generated ${parsed.ranges.length} split PDF files.`);
      trackEvent("split_success", { ranges: parsed.ranges.length });
    } catch (error) {
      console.error(error);
      setStatus("Split failed. Try again.");
      trackEvent("split_failed");
    }

    refreshGenerateButton();
  }

  function parseRanges(input, pageCount) {
    const lines = input
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length === 0) {
      return { ok: false, message: "Enter at least one range (example: 1-3)." };
    }

    const ranges = [];
    for (const line of lines) {
      const match = line.match(/^(\d+)(?:-(\d+))?$/);
      if (!match) {
        return { ok: false, message: `Invalid range: ${line}` };
      }

      const start = Number.parseInt(match[1], 10);
      const end = Number.parseInt(match[2] || match[1], 10);

      if (start < 1 || end < 1 || start > end || end > pageCount) {
        return {
          ok: false,
          message: `Range out of bounds: ${line}. PDF has ${pageCount} pages.`
        };
      }

      ranges.push([start, end]);
    }

    return { ok: true, ranges };
  }

  function safeBaseName(fileName) {
    const withoutExt = fileName.replace(/\.pdf$/i, "");
    return withoutExt.replace(/[^a-zA-Z0-9-_]+/g, "-");
  }

  function setStatus(message) {
    refs.status.textContent = message;
  }
}
