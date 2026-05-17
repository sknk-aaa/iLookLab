import { toPng } from "html-to-image";

export async function exportNodeToPng(node: HTMLElement, fileName: string): Promise<void> {
  const dataUrl = await toPng(node, {
    pixelRatio: 3,
    cacheBust: true,
  });
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = fileName;
  link.click();
}

export function buildFileName(appName: string): string {
  const trimmed = appName.trim();
  if (!trimmed) return "homescreen.png";
  const safe = trimmed.replace(/[\\/:*?"<>|]/g, "_");
  return `homescreen-${safe}.png`;
}
