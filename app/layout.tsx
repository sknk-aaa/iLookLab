import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ilook-lab.vercel.app"),
  title: "アイコン見え方ラボ | アプリアイコンのホーム画面プレビュー",
  description:
    "アイコン見え方ラボは、アプリアイコンとアプリ名がiPhoneホーム画面でどう見えるかをブラウザで確認できる開発者向けツールです。アップロード画像はサーバーに送信されません。",
  openGraph: {
    title: "アイコン見え方ラボ | アプリアイコンのホーム画面プレビュー",
    description:
      "アイコン見え方ラボは、アプリアイコンとアプリ名がiPhoneホーム画面でどう見えるかをブラウザで確認できる開発者向けツールです。",
    type: "website",
    images: [
      {
        url: "/ogp.png",
        width: 1731,
        height: 909,
        alt: "アイコン見え方ラボ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "アイコン見え方ラボ | アプリアイコンのホーム画面プレビュー",
    description:
      "アイコン見え方ラボは、アプリアイコンの「ホーム画面で見るとなんか違う」をリリース前に防ぐための確認ツールです。",
    images: ["/ogp.png"],
  },
  verification: {
    google: "sCUFBC5u_EjtLZ3TO8ujTQnVLFvHGQ4fIM6Fzm6TgnQ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${inter.variable} ${notoSansJp.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
