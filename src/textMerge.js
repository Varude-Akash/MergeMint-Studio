import { trackEvent } from "./analytics.js";

export function initTextMerge() {
  const refs = {
    a: document.getElementById("text-a"),
    b: document.getElementById("text-b"),
    separator: document.getElementById("text-separator"),
    output: document.getElementById("text-output"),
    merge: document.getElementById("text-merge-btn"),
    clear: document.getElementById("text-clear-btn"),
    download: document.getElementById("text-download-btn")
  };

  if (!refs.merge) {
    return;
  }

  refs.merge.addEventListener("click", mergeText);
  refs.clear.addEventListener("click", clearAll);
  refs.download.addEventListener("click", downloadText);

  function mergeText() {
    const partA = refs.a.value;
    const partB = refs.b.value;
    const separator = parseSeparator(refs.separator.value);

    refs.output.value = `${partA}${separator}${partB}`.trim();
    refs.download.disabled = !refs.output.value;

    trackEvent("text_merge_run", {
      chars_a: partA.length,
      chars_b: partB.length
    });
  }

  function clearAll() {
    refs.a.value = "";
    refs.b.value = "";
    refs.output.value = "";
    refs.download.disabled = true;
  }

  function downloadText() {
    if (!refs.output.value.trim()) {
      return;
    }

    const blob = new Blob([refs.output.value], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "merged-text.txt";
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 2500);

    trackEvent("text_merge_download");
  }

  function parseSeparator(option) {
    if (option === "blank") return "\n\n";
    if (option === "line") return "\n---\n";
    return "\n";
  }
}
