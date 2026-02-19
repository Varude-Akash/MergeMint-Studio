import { trackEvent } from "./analytics.js";

export function initCsvMerge() {
  const refs = {
    input: document.getElementById("csv-files"),
    merge: document.getElementById("csv-merge-btn"),
    status: document.getElementById("csv-status"),
    meta: document.getElementById("csv-meta")
  };

  if (!refs.input || !refs.merge) {
    return;
  }

  refs.input.addEventListener("change", refreshMeta);
  refs.merge.addEventListener("click", mergeCsvFiles);

  function refreshMeta() {
    const count = refs.input.files?.length || 0;
    refs.meta.textContent = count > 0 ? `${count} CSV file(s) selected.` : "No CSV files selected.";
    refs.merge.disabled = count < 2;
  }

  async function mergeCsvFiles() {
    const files = [...(refs.input.files || [])];
    if (files.length < 2) {
      setStatus("Select at least 2 CSV files.");
      return;
    }

    try {
      setStatus("Merging CSV files...");
      let header = "";
      const mergedRows = [];

      for (let i = 0; i < files.length; i += 1) {
        const text = await files[i].text();
        const rows = text.split(/\r?\n/).filter((row) => row.trim().length > 0);
        if (rows.length === 0) {
          continue;
        }

        if (i === 0) {
          header = rows[0];
          mergedRows.push(header, ...rows.slice(1));
          continue;
        }

        if (rows[0].trim() === header.trim()) {
          mergedRows.push(...rows.slice(1));
        } else {
          mergedRows.push(...rows);
        }
      }

      const output = mergedRows.join("\n");
      const blob = new Blob([output], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "merged.csv";
      anchor.click();
      setTimeout(() => URL.revokeObjectURL(url), 2500);

      setStatus("Merged CSV downloaded.");
      trackEvent("csv_merge_success", { files: files.length });
    } catch (error) {
      console.error(error);
      setStatus("CSV merge failed.");
      trackEvent("csv_merge_failed");
    }
  }

  function setStatus(message) {
    refs.status.textContent = message;
  }
}
