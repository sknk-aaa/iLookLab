"use client";

import { useState, type RefObject } from "react";
import {
  buildFileName,
  buildIconFileName,
  exportMaskedIconToPng,
  exportNodeToPng,
} from "@/lib/utils/exportImage";

type Props = {
  previewRef: RefObject<HTMLDivElement | null>;
  iconDataUrl: string | null;
  appName: string;
  disabled?: boolean;
};

export function DownloadButton({ previewRef, iconDataUrl, appName, disabled }: Props) {
  const [busyTarget, setBusyTarget] = useState<"preview" | "icon" | null>(null);

  async function handlePreviewClick() {
    const node = previewRef.current;
    if (!node) return;
    setBusyTarget("preview");
    try {
      await exportNodeToPng(node, buildFileName(appName));
    } finally {
      setBusyTarget(null);
    }
  }

  async function handleIconClick() {
    if (!iconDataUrl) return;
    setBusyTarget("icon");
    try {
      await exportMaskedIconToPng(iconDataUrl, buildIconFileName(appName));
    } finally {
      setBusyTarget(null);
    }
  }

  const isDisabled = disabled || busyTarget !== null;

  return (
    <div className="pt-2">
      <button
        type="button"
        onClick={handlePreviewClick}
        disabled={isDisabled}
        className={[
          "group relative inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg px-4 text-[14px] font-medium transition-all duration-150",
          "outline-none focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
          isDisabled
            ? "cursor-not-allowed bg-paper-deep text-ink-mute"
            : "bg-accent text-white shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_8px_24px_-12px_rgba(30,58,138,0.6)] hover:bg-[#16317a] active:translate-y-px",
        ].join(" ")}
      >
        {busyTarget === "preview" ? (
          <>
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            書き出し中…
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 3v10" />
              <path d="m6 9 4 4 4-4" />
              <path d="M4 16h12" />
            </svg>
            PNGをダウンロード
          </>
        )}
      </button>
      <button
        type="button"
        onClick={handleIconClick}
        disabled={isDisabled}
        className={[
          "mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border px-4 text-[14px] font-medium transition-all duration-150",
          "outline-none focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
          isDisabled
            ? "cursor-not-allowed border-line bg-paper-deep text-ink-mute"
            : "border-line bg-white text-ink-soft hover:border-accent/40 hover:text-accent active:translate-y-px",
        ].join(" ")}
      >
        {busyTarget === "icon" ? (
          <>
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-ink-mute/40 border-t-ink-mute" />
            書き出し中…
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="4" width="12" height="12" rx="3" />
              <path d="M10 7v6" />
              <path d="m7.5 10.5 2.5 2.5 2.5-2.5" />
            </svg>
            アイコンだけ保存
          </>
        )}
      </button>
      <p className="mt-2 text-[11px] text-ink-mute">
        {disabled ? "アイコンをアップロードするとダウンロードできます" : "プレビュー全体を高解像度PNGで書き出します"}
      </p>
    </div>
  );
}
