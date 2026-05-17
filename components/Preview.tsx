"use client";

import { forwardRef, useEffect, useId, useMemo, useRef, useState } from "react";
import { getSvgPath } from "figma-squircle";
import { BG_IMAGE, ICON_POSITION } from "@/lib/constants";
import { truncateName } from "@/lib/utils/truncateName";

type Props = {
  iconDataUrl: string | null;
  appName: string;
};

export const Preview = forwardRef<HTMLDivElement, Props>(function Preview(
  { iconDataUrl, appName },
  ref
) {
  const clipId = useId();
  const innerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  const squirclePath = useMemo(
    () =>
      getSvgPath({
        width: 1,
        height: 1,
        cornerRadius: 0.2237,
        cornerSmoothing: 0.6,
        preserveSmoothing: true,
      }),
    []
  );

  useEffect(() => {
    const node = innerRef.current;
    if (!node) return;
    const observer = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? node.clientWidth;
      setWidth(w);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const labelFontSize = Math.max(8, Math.round(width * ICON_POSITION.labelFontRatio * 100) / 100);
  const truncated = truncateName(appName);

  return (
    <div
      ref={ref}
      className="relative mx-auto w-full max-w-[420px] overflow-hidden rounded-2xl bg-white preview-shadow"
      style={{ aspectRatio: `${BG_IMAGE.width} / ${BG_IMAGE.height}` }}
    >
      <div ref={innerRef} className="relative h-full w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BG_IMAGE.src}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain"
          draggable={false}
        />

        <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
          <defs>
            <clipPath id={clipId} clipPathUnits="objectBoundingBox">
              <path d={squirclePath} />
            </clipPath>
          </defs>
        </svg>

        {iconDataUrl ? (
          <div
            className="absolute"
            style={{
              left: `${ICON_POSITION.centerX * 100}%`,
              top: `${ICON_POSITION.centerY * 100}%`,
              width: `${ICON_POSITION.sizeRatio * 100}%`,
              aspectRatio: "1 / 1",
              transform: "translate(-50%, -50%)",
              clipPath: `url(#${clipId})`,
              WebkitClipPath: `url(#${clipId})`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={iconDataUrl}
              alt="アプリアイコンプレビュー"
              className="h-full w-full select-none object-cover"
              draggable={false}
            />
          </div>
        ) : null}

        {truncated ? (
          <div
            className="font-apple absolute pointer-events-none select-none text-white"
            style={{
              left: `${ICON_POSITION.centerX * 100}%`,
              top: `${(ICON_POSITION.centerY + ICON_POSITION.labelOffsetY) * 100}%`,
              transform: "translate(-50%, -50%)",
              fontSize: `${labelFontSize}px`,
              lineHeight: 1,
              letterSpacing: "0.01em",
              textShadow: "0 1px 2px rgba(0,0,0,0.35)",
              whiteSpace: "nowrap",
            }}
          >
            {truncated}
          </div>
        ) : null}
      </div>
    </div>
  );
});
