"use client";

import { useRef, useState } from "react";

type Props = {
  value: string | null;
  onChange: (dataUrl: string | null) => void;
};

const ACCEPT = "image/png,image/jpeg,image/webp,image/svg+xml";

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function IconUploader({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setDragging] = useState(false);

  async function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    const url = await readAsDataUrl(file);
    onChange(url);
  }

  return (
    <section aria-labelledby="step-icon" className="space-y-3">
      <div className="flex items-baseline gap-3">
        <span className="step-num">01</span>
        <h2 id="step-icon" className="text-[15px] font-medium text-ink">
          アイコン
        </h2>
      </div>

      <label
        className={[
          "group relative block cursor-pointer overflow-hidden rounded-lg border border-dashed bg-white/60 px-5 py-6 transition-colors duration-150",
          isDragging
            ? "border-accent bg-accent-soft/30"
            : "border-line hover:border-accent/60",
        ].join(" ")}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          void handleFiles(e.dataTransfer.files);
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          className="sr-only"
          onChange={(e) => void handleFiles(e.target.files)}
        />

        {value ? (
          <div className="flex items-center gap-4">
            <div
              className="h-16 w-16 shrink-0 overflow-hidden bg-paper-deep"
              style={{ borderRadius: "22.37%" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt="アップロード済みアイコン"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium text-ink">アイコンを読み込みました</p>
              <p className="text-[12px] text-ink-soft">
                クリックして変更、または下のボタンでクリア
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onChange(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
              className="rounded-md border border-line bg-white px-2.5 py-1 text-[11px] text-ink-soft transition-colors hover:border-accent/40 hover:text-accent"
            >
              クリア
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1.5 text-center">
            <div
              aria-hidden
              className="grid h-12 w-12 place-items-center rounded-md border border-line bg-white text-ink-mute transition-colors group-hover:border-accent/40 group-hover:text-accent"
              style={{ borderRadius: "22.37%" }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13V4" />
                <path d="m6 8 4-4 4 4" />
                <path d="M4 14v1.5A1.5 1.5 0 0 0 5.5 17h9a1.5 1.5 0 0 0 1.5-1.5V14" />
              </svg>
            </div>
            <p className="text-[13px] text-ink">
              ドラッグ&ドロップ、またはクリックして選択
            </p>
            <p className="text-[11px] text-ink-mute">
              PNG / JPG / WebP / SVG ・ 推奨 512×512px 以上
            </p>
          </div>
        )}
      </label>
    </section>
  );
}
