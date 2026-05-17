// 値は public/assets/iphone-bg.png (876×1796) をImageMagickで実測:
// 破線枠の bounding box は x=287..410, y=1010..1135 (中心 348.5, 1072.5 / サイズ 123×125)
// 「My App」ラベル中心は y≈1180 → アイコン中心からのオフセット 107.5px
export const ICON_POSITION = {
  centerX: 0.398,
  centerY: 0.597,
  sizeRatio: 0.142,
  labelOffsetY: 0.060,
  labelFontRatio: 0.0285,
} as const;

export const BG_IMAGE = {
  src: "/assets/iphone-bg.png",
  width: 876,
  height: 1796,
} as const;

export const MAX_LABEL_CHARS = 7;
