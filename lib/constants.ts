export const ICON_POSITION = {
  centerX: 0.396,        // アイコン中心の X 座標（0=左端, 1=右端）
  centerY: 0.597,        // アイコン中心の Y 座標（0=上端, 1=下端）
  sizeRatio: 0.150,      // アイコンの幅 / 画像幅
  labelOffsetY: 0.0485,  // アイコン中心からアプリ名中心までの距離
  labelFontRatio: 0.0280,// アプリ名のフォントサイズ / 画像幅
  labelMaxWidthRatio: 0.22, // アプリ名の最大幅 / 画像幅（iOS の挙動に合わせ、超過分は「…」で省略）
} as const;

export const BG_IMAGE = {
  src: "/assets/iphone-bg.png",
  width: 876,
  height: 1796,
} as const;
