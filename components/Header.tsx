export function Header() {
  return (
    <header className="relative z-10 border-b border-line/70 bg-paper/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-4 px-6 lg:px-10">
        <div className="flex items-center gap-3">
          <span aria-hidden className="diamond-mark" />
          <h1 className="font-display text-[19px] font-semibold tracking-tight text-ink">
            iLookLab
          </h1>
        </div>
        <span aria-hidden className="hidden h-4 w-px bg-line sm:block" />
        <p className="hidden text-[12px] text-ink-soft sm:block">
          アイコン見え方ラボ
          <span className="mx-1.5 text-ink-mute">—</span>
          ホーム画面シミュレーター
        </p>
        <span className="ml-auto hidden text-[11px] uppercase tracking-[0.18em] text-ink-mute md:inline">
          iOS · Preview Tool
        </span>
      </div>
    </header>
  );
}
