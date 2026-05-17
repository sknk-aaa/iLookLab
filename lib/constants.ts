// 値は public/assets/iphone-bg.png (876×1796) をImageMagickで実測:
// 破線枠の真の外形 bounding box は x=283..411, y=1009..1137 (中心 347, 1073 / サイズ 128×128)
// 「My App」ラベル中心は y≈1180 → アイコン中心からのオフセット 107px
// sizeRatio は枠 128px より少し大きめにして、破線を完全に覆い隠す
export const ICON_POSITION = {
  centerX: 0.396,
  centerY: 0.597,
  sizeRatio: 0.148,
  labelOffsetY: 0.060,
  labelFontRatio: 0.0285,
} as const;

export const BG_IMAGE = {
  src: "/assets/iphone-bg.png",
  width: 876,
  height: 1796,
} as const;

export const MAX_LABEL_CHARS = 7;
