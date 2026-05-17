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

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-6 py-8 lg:px-10 lg:py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-10 lg:gap-14">
          <section className="md:col-span-4">
            <div className="space-y-8 md:sticky md:top-8">
              <div className="space-y-1">
                <p className="text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                  Home Screen Simulator
                </p>
                <h2 className="font-display text-[26px] font-semibold leading-tight tracking-tight text-ink">
                  実機に入れる前に、
                  <br />
                  ホーム画面で確かめる。
                </h2>
                <p className="pt-1 text-[13px] leading-relaxed text-ink-soft">
                  アイコンとアプリ名が、他のアプリと並んだときどう見えるか。
                  ブラウザ上で即座にプレビューできます。
                </p>
              </div>

              <div className="space-y-7 rounded-2xl border border-line/80 bg-white/70 p-6 backdrop-blur-sm">
                <IconUploader value={iconImage} onChange={setIconImage} />
                <AppNameInput value={appName} onChange={setAppName} />
                <DownloadButton
                  previewRef={previewRef}
                  appName={appName}
                  disabled={!iconImage}
                />
              </div>

              <p className="text-[11px] leading-relaxed text-ink-mute">
                アップロード画像はサーバーに送信されません。すべてブラウザ内で処理します。
              </p>
            </div>
          </section>

          <section className="md:col-span-6">
            <div className="flex flex-col items-center justify-start gap-4">
              <div className="flex w-full items-center justify-between text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                <span>Preview</span>
                <span>iPhone · iOS</span>
              </div>
              <Preview ref={previewRef} iconDataUrl={iconImage} appName={appName} />
              <p className="max-w-[420px] text-center text-[11px] text-ink-mute">
                破線枠の位置にアイコンが配置されます。<br className="hidden sm:inline" />
                iOS Squircleマスクが自動で適用されます。
              </p>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-line/70 bg-paper/60">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 text-[11px] text-ink-mute lg:px-10">
          <span>© iLookLab</span>
          <span>MVP · iOSのみ対応</span>
        </div>
      </footer>
    </div>
  );
}
