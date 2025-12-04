import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '設定 - 喫煙所サーチ',
  description: 'アカウント設定とプライバシー設定を管理します。',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
