import Link from 'next/link';
import { Metadata } from 'next';
import Header from '@/components/Header';
import { TermsContent } from '@/components/LegalContent';

export const metadata: Metadata = {
  title: '利用規約・免責事項 - 喫煙所サーチ',
  description: '喫煙所サーチの利用規約と免責事項についてご確認いただけます。法令遵守や情報の正確性、免責事項に関する重要事項を記載しています。',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12 px-4 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Top Back Link */}
          <div className="mb-12">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors duration-200 font-medium"
            >
              <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              トップページに戻る
            </Link>
          </div>

          <TermsContent />
          
          {/* Bottom Back Button */}
          <div className="mt-24 pt-16 pb-20 text-center border-t border-white/10">
            <Link 
              href="/"
              className="inline-flex items-center justify-center gap-3 px-12 py-5 bg-gradient-to-r from-primary to-secondary rounded-full text-white text-xl font-black hover:scale-110 hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all duration-300 shadow-xl"
            >
              <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              トップページに戻る
            </Link>
            <p className="mt-6 text-text-muted text-sm">喫煙所サーチのご利用ありがとうございます</p>
          </div>
        </div>
      </main>
    </div>
  );
}
