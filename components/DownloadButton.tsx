"use client";

import { useState, type RefObject } from "react";
import { buildFileName, exportNodeToPng } from "@/lib/utils/exportImage";

type Props = {
  previewRef: RefObject<HTMLDivElement | null>;
  appName: string;
  disabled?: boolean;
};

export function DownloadButton({ previewRef, appName, disabled }: Props) {
  const [isBusy, setBusy] = useState(false);

  async function handleClick() {
    const node = previewRef.current;
    if (!node) return;
    setBusy(true);
    try {
      await exportNodeToPng(node, buildFileName(appName));
    } finally {
      setBusy(false);
    }
  }

  const isDisabled = disabled || isBusy;

  return (
    <div className="pt-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={isDisabled}
        className={[
          "group relative inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg px-4 text-[14px] font-medium transition-all duration-150",
          "outline-none focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
          isDisabled
            ? "cursor-not-allowed bg-paper-deep text-ink-mute"
            : "bg-accent text-white shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_8px_24px_-12px_rgba(30,58,138,0.6)] hover:bg-[#16317a] active:translate-y-px",
        ].join(" ")}
      >
        {isBusy ? (
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
      <p className="mt-2 text-[11px] text-ink-mute">
        {disabled ? "アイコンをアップロードするとダウンロードできます" : "プレビュー全体を高解像度PNGで書き出します"}
      </p>
    </div>
  );
}
