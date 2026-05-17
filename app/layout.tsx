import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "iLookLab — アイコン見え方ラボ",
  description:
    "アプリのアイコンと名前が、iPhoneのホーム画面で実際にどう見えるかをブラウザ上で確認できるツール。",
  openGraph: {
    title: "iLookLab — アイコン見え方ラボ",
    description:
      "アプリのアイコンと名前が、iPhoneのホーム画面で実際にどう見えるかをブラウザ上で確認できるツール。",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "iLookLab — アイコン見え方ラボ",
    description:
      "アプリのアイコンと名前が、iPhoneのホーム画面で実際にどう見えるかを確認できるツール。",
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
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
