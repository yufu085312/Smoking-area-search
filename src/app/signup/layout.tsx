import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '新規登録 - 喫煙所サーチ',
  description: '喫煙所サーチに新規登録して、喫煙所情報を投稿・検索しましょう。',
  robots: {
    index: false,
    follow: true,
  },
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
