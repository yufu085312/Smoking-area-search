import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ログイン - 喫煙所サーチ',
  description: '喫煙所サーチにログインして、喫煙所情報を共有しましょう。',
  robots: {
    index: false,
    follow: true,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
