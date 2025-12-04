import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/contexts/AuthContext';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import JsonLd from '@/components/JsonLd';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
 
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
 
export const metadata: Metadata = {
  metadataBase: new URL('https://smoking.yu-fu.site'),
  title: "喫煙所サーチ - 近くの喫煙スポットを簡単検索",
  description: "喫煙所サーチは、あなたの近くの喫煙可能な場所を簡単に見つけられる無料のマップアプリです。ユーザー投稿型で、リアルタイムに喫煙所情報を共有・検索できます。",
  keywords: ["喫煙所", "喫煙スポット", "喫煙場所", "タバコ", "マップ", "地図", "検索", "位置情報"],
  authors: [{ name: "喫煙所サーチ" }],
  creator: "喫煙所サーチ",
  publisher: "喫煙所サーチ",
  verification: {
    google: "JQSbQx1wj9btOCmKI620pKGQbu_vRN-od4Lx7g3cFSo",
  },
  openGraph: {
    title: "喫煙所サーチ - 近くの喫煙スポットを簡単検索",
    description: "喫煙所サーチは、あなたの近くの喫煙可能な場所を簡単に見つけられる無料のマップアプリです。",
    url: "https://smoking.yu-fu.site",
    siteName: "喫煙所サーチ",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "喫煙所サーチ - 近くの喫煙スポットを簡単検索",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "喫煙所サーチ - 近くの喫煙スポットを簡単検索",
    description: "喫煙所サーチは、あなたの近くの喫煙可能な場所を簡単に見つけられる無料のマップアプリです。",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <JsonLd />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        <AuthProvider>
          {children}
        </AuthProvider>
        <div id="modal-root" />
      </body>
    </html>
  );
}
