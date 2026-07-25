export interface DiffLine {
  type: "add" | "delete" | "same";
  value: string;
}

/**
 * Compares two text contents line-by-line and returns an array of structured diff entries.
 * Uses a lightweight matching algorithm to identify added, removed, and identical lines.
 *
 * @param oldText - Original local component file content
 * @param newText - Latest registry component file content
 */
export function compareLines(oldText: string, newText: string): DiffLine[] {
  const oldLines = oldText.split(/\r?\n/);
  const newLines = newText.split(/\r?\n/);

  const diffs: DiffLine[] = [];

  let i = 0;
  let j = 0;

  while (i < oldLines.length || j < newLines.length) {
    if (i < oldLines.length && j < newLines.length && oldLines[i] === newLines[j]) {
      diffs.push({ type: "same", value: oldLines[i] });
      i++;
      j++;
    } else if (
      j < newLines.length &&
      (i >= oldLines.length || !oldLines.slice(i).includes(newLines[j]))
    ) {
      diffs.push({ type: "add", value: newLines[j] });
      j++;
    } else if (i < oldLines.length) {
      diffs.push({ type: "delete", value: oldLines[i] });
      i++;
    }
  }

  return diffs;
}