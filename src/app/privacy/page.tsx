import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: '100vh', padding: '20px 20px' }} className="bg-background text-text-primary">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Navigation Tabs */}
        <div className="glass rounded-t-2xl p-2 flex gap-2">
          <Link 
            href="/terms"
            className="flex-1 px-6 py-3 rounded-lg font-semibold text-center transition-all hover:bg-white/5"
            style={{ 
              color: '#94a3b8',
              whiteSpace: 'nowrap',
              textDecoration: 'none'
            }}
          >
            📋 利用規約・免責事項
          </Link>
          <div 
            className="flex-1 px-6 py-3 rounded-lg font-semibold text-center transition-all"
            style={{ 
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              color: 'white',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
              whiteSpace: 'nowrap'
            }}
          >
            🔒 プライバシーポリシー
          </div>
        </div>

        {/* Main Content */}
        <div className="glass rounded-b-2xl p-8 md:p-12 shadow-xl">
          <div className="space-y-10 text-text-secondary" style={{ lineHeight: '1.8' }}>
            {/* Section 1 */}
            <section className="relative">
              <div className="flex items-start gap-4 mb-4">
                <div 
                  className="flex-shrink-0 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold"
                  style={{ 
                    width: '40px', 
                    height: '40px',
                    minWidth: '40px',
                    minHeight: '40px'
                  }}
                >
                  1
                </div>
                <h2 className="text-2xl font-bold text-white mt-1">
                  収集する情報
                </h2>
              </div>
              <div className="ml-14">
                <p className="mb-4 text-base" style={{ lineHeight: '1.8' }}>当サービスでは、以下の情報を収集する場合があります：</p>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-purple-900/20">
                    <strong className="text-purple-400 block mb-2">🔐 認証情報</strong>
                    <p style={{ lineHeight: '1.8' }}>
                      Googleアカウントでログインする際に、Googleから提供される基本情報（名前、メールアドレス、プロフィール画像など）。
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-blue-900/20">
                    <strong className="text-blue-400 block mb-2">📝 投稿データ</strong>
                    <p style={{ lineHeight: '1.8' }}>
                      喫煙所情報の投稿時に、投稿者のユーザーID、投稿日時、位置情報（緯度・経度）、コメント内容。
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-green-900/20">
                    <strong className="text-green-400 block mb-2">📊 利用状況データ</strong>
                    <p style={{ lineHeight: '1.8' }}>
                      Google Analytics等の解析ツールを使用して収集される、サイトの閲覧履歴、滞在時間、クリック数などの統計データ。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="relative">
              <div className="flex items-start gap-4 mb-4">
                <div 
                  className="flex-shrink-0 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold"
                  style={{ 
                    width: '40px', 
                    height: '40px',
                    minWidth: '40px',
                    minHeight: '40px'
                  }}
                >
                  2
                </div>
                <h2 className="text-2xl font-bold text-white mt-1">
                  利用目的
                </h2>
              </div>
              <div className="ml-14">
                <p className="mb-4 text-base" style={{ lineHeight: '1.8' }}>収集した情報は、以下の目的で利用します：</p>
                <ul className="space-y-3" style={{ lineHeight: '1.8' }}>
                  <li className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                    <span className="text-primary flex-shrink-0">✓</span>
                    <span>本サービスの提供および運営のため</span>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                    <span className="text-primary flex-shrink-0">✓</span>
                    <span>ユーザーからのお問い合わせに対応するため</span>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                    <span className="text-primary flex-shrink-0">✓</span>
                    <span>サービスの改善、新機能の開発のため</span>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                    <span className="text-primary flex-shrink-0">✓</span>
                    <span>不正利用の防止、スパム対策のため</span>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                    <span className="text-primary flex-shrink-0">✓</span>
                    <span>利用規約に違反する行為への対応のため</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section className="relative">
              <div className="flex items-start gap-4 mb-4">
                <div 
                  className="flex-shrink-0 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold"
                  style={{ 
                    width: '40px', 
                    height: '40px',
                    minWidth: '40px',
                    minHeight: '40px'
                  }}
                >
                  3
                </div>
                <h2 className="text-2xl font-bold text-white mt-1">
                  第三者への提供
                </h2>
              </div>
              <div className="ml-14">
                <p className="mb-4 text-base" style={{ lineHeight: '1.8' }}>
                  法令に基づく場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません。ただし、以下の外部サービスを利用してデータを処理する場合があります。
                </p>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-orange-900/20">
                    <strong className="text-orange-400 block mb-2">🔥 Firebase (Google Inc.)</strong>
                    <p style={{ lineHeight: '1.8' }}>
                      認証、データベース、ホスティングなどのバックエンド機能のため。
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-cyan-900/20">
                    <strong className="text-cyan-400 block mb-2">📈 Google Analytics (Google Inc.)</strong>
                    <p style={{ lineHeight: '1.8' }}>
                      サイトのアクセス解析のため。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="relative">
              <div className="flex items-start gap-4 mb-4">
                <div 
                  className="flex-shrink-0 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold"
                  style={{ 
                    width: '40px', 
                    height: '40px',
                    minWidth: '40px',
                    minHeight: '40px'
                  }}
                >
                  4
                </div>
                <h2 className="text-2xl font-bold text-white mt-1">
                  お問い合わせ
                </h2>
              </div>
              <div className="ml-14">
                <p className="text-base" style={{ lineHeight: '1.8' }}>
                  本ポリシーに関するお問い合わせは、以下のメールアドレスまでご連絡ください。
                </p>
                <div className="mt-4 p-4 rounded-lg bg-primary/10 border border-primary/30">
                  <a 
                    href="mailto:fuyu0853@icloud.com"
                    className="text-primary hover:text-secondary transition-colors font-medium"
                    style={{ textDecoration: 'none' }}
                  >
                    📧 fuyu0853@icloud.com
                  </a>
                </div>
              </div>
            </section>

            {/* Back Button */}
            <div className="pt-8 text-center border-t border-gray-700">
              <Link 
                href="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                トップページに戻る
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
