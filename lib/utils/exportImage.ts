import { toPng } from "html-to-image";
import { getSvgPath } from "figma-squircle";

const ICON_EXPORT_SIZE = 1024;
const SQUIRCLE_RADIUS_RATIO = 0.2237;
const SQUIRCLE_SMOOTHING = 0.6;

export async function exportNodeToPng(node: HTMLElement, fileName: string): Promise<void> {
  const dataUrl = await toPng(node, {
    pixelRatio: 3,
    cacheBust: true,
    skipFonts: true,
  });
  downloadDataUrl(dataUrl, fileName);
}

export async function exportMaskedIconToPng(
  iconDataUrl: string,
  fileName: string
): Promise<void> {
  const image = await loadImage(iconDataUrl);
  const canvas = document.createElement("canvas");
  canvas.width = ICON_EXPORT_SIZE;
  canvas.height = ICON_EXPORT_SIZE;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported in this browser.");

  const squirclePath = getSvgPath({
    width: ICON_EXPORT_SIZE,
    height: ICON_EXPORT_SIZE,
    cornerRadius: ICON_EXPORT_SIZE * SQUIRCLE_RADIUS_RATIO,
    cornerSmoothing: SQUIRCLE_SMOOTHING,
    preserveSmoothing: true,
  });

  const sourceSize = Math.min(image.naturalWidth, image.naturalHeight);
  const sourceX = (image.naturalWidth - sourceSize) / 2;
  const sourceY = (image.naturalHeight - sourceSize) / 2;

  ctx.clearRect(0, 0, ICON_EXPORT_SIZE, ICON_EXPORT_SIZE);
  ctx.save();
  ctx.clip(new Path2D(squirclePath));
  ctx.drawImage(
    image,
    sourceX,
    sourceY,
    sourceSize,
    sourceSize,
    0,
    0,
    ICON_EXPORT_SIZE,
    ICON_EXPORT_SIZE
  );
  ctx.restore();

  downloadDataUrl(canvas.toDataURL("image/png"), fileName);
}

export function buildFileName(appName: string): string {
  const trimmed = appName.trim();
  if (!trimmed) return "homescreen.png";
  const safe = trimmed.replace(/[\\/:*?"<>|]/g, "_");
  return `homescreen-${safe}.png`;
}

export function buildIconFileName(appName: string): string {
  const trimmed = appName.trim();
  if (!trimmed) return "icon.png";
  const safe = trimmed.replace(/[\\/:*?"<>|]/g, "_");
  return `icon-${safe}.png`;
}

function downloadDataUrl(dataUrl: string, fileName: string): void {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = fileName;
  link.click();
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load icon image."));
    image.src = src;
  });
}
