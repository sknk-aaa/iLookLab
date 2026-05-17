"use client";

type Props = {
  value: string;
  onChange: (next: string) => void;
};

export function AppNameInput({ value, onChange }: Props) {
  return (
    <section aria-labelledby="step-name" className="space-y-3">
      <div className="flex items-baseline gap-3">
        <span className="step-num">02</span>
        <h2 id="step-name" className="text-[15px] font-medium text-ink">
          アプリ名
        </h2>
      </div>

      <div className="space-y-1.5">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="アプリ名"
          className="w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-[14px] text-ink placeholder:text-ink-mute outline-none transition-shadow duration-150 focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
        <p className="text-[11px] text-ink-mute">
          一定の幅を超えると末尾が「…」で省略されます（iOS と同じ挙動）
        </p>
      </div>
    </section>
  );
}
