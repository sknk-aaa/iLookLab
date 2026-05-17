"use client";

import { useRef, useState } from "react";
import { Header } from "@/components/Header";
import { IconUploader } from "@/components/IconUploader";
import { AppNameInput } from "@/components/AppNameInput";
import { Preview } from "@/components/Preview";
import { DownloadButton } from "@/components/DownloadButton";

export default function Home() {
  const [iconImage, setIconImage] = useState<string | null>(null);
  const [appName, setAppName] = useState("");
  const previewRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative z-10 flex min-h-full flex-1 flex-col">
      <Header />

      <main className="mx-auto w-full max-w-280 flex-1 px-6 py-8 lg:px-10 lg:py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-10 lg:gap-14">
          <section className="md:col-span-4">
            <div className="space-y-8 md:sticky md:top-8">
              <div className="space-y-1">
                <p className="text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                  Home Screen Simulator
                </p>
                <h2 className="font-display text-[26px] font-semibold leading-tight tracking-tight text-ink">
                  アイコン見え方ラボ
                </h2>
                <p className="pt-1 text-[13px] leading-relaxed text-ink-soft">
                  アップロードしたアイコンは、iOS の角丸（Squircle）に自動でクロップ。
                  アプリ名と並んだ実機ホーム画面の見え方を、ブラウザで即座にプレビューできます。
                </p>
              </div>

              <div className="space-y-7 rounded-2xl border border-line/80 bg-white/70 p-6 backdrop-blur-sm">
                <IconUploader value={iconImage} onChange={setIconImage} />
                <AppNameInput value={appName} onChange={setAppName} />
                <DownloadButton
                  previewRef={previewRef}
                  iconDataUrl={iconImage}
                  appName={appName}
                  disabled={!iconImage}
                />
              </div>

            </div>
          </section>

          <section className="md:col-span-6">
            <div className="flex flex-col items-center justify-start gap-4">
              <div className="w-full text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                <span>Preview</span>
              </div>
              <Preview ref={previewRef} iconDataUrl={iconImage} appName={appName} />
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-line/70 bg-paper/70">
        <div className="mx-auto flex max-w-280 flex-col items-center gap-1 px-6 py-4 text-center text-[11px] leading-relaxed text-ink-mute lg:px-10">
          <p>アップロード画像はサーバーに送信されません。すべてブラウザ内で処理します。</p>
          <p>
            © iLookLab{" "}
            <a
              href="https://x.com/Aizawa_dev"
              target="_blank"
              rel="noreferrer"
              className="text-ink-mute/80 transition-colors hover:text-ink-soft"
            >
              by Aizawa
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
