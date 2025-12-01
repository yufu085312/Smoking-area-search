import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div style={{ minHeight: '100vh', padding: '20px 20px' }} className="bg-background text-text-primary">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Navigation Tabs */}
        <div className="glass rounded-t-2xl p-2 flex gap-2">
          <div 
            className="flex-1 px-6 py-3 rounded-lg font-semibold text-center transition-all"
            style={{ 
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              color: 'white',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
              whiteSpace: 'nowrap'
            }}
          >
            📋 利用規約・免責事項
          </div>
          <Link 
            href="/privacy"
            className="flex-1 px-6 py-3 rounded-lg font-semibold text-center transition-all hover:bg-white/5"
            style={{ 
              color: '#94a3b8',
              whiteSpace: 'nowrap',
              textDecoration: 'none'
            }}
          >
            🔒 プライバシーポリシー
          </Link>
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
                  喫煙に関する法令遵守と情報の正確性
                </h2>
              </div>
              <div className="ml-14">
                <p className="mb-4 text-base" style={{ lineHeight: '1.8' }}>
                  日本では、健康増進法や各自治体の条例により、喫煙場所が厳しく規制されています。
                </p>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-blue-900/20">
                    <strong className="text-blue-400 block mb-2">⚖️ 規制の多様性</strong>
                    <p style={{ lineHeight: '1.8' }}>
                      国の法律に加え、東京都や大阪府など、自治体独自の厳しい受動喫煙防止条例が存在します。本サービスで提供される情報が、必ずしも全ての地域の最新の条例に合致しているとは限りません。
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-yellow-900/20">
                    <strong className="text-yellow-400 block mb-2">⏰ 情報の鮮度と変更</strong>
                    <p style={{ lineHeight: '1.8' }}>
                      施設側のルールや自治体の条例は頻繁に変更されます（例：路上の喫煙禁止エリアの変更、商業施設の喫煙所閉鎖）。本サービスの情報はユーザー投稿に依存しているため、<strong className="text-red-400">情報が古くなっている可能性があります。</strong>
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
                  免責事項（Disclaimer）
                </h2>
              </div>
              <div className="ml-14 space-y-4">
                <div className="p-4 rounded-lg bg-red-900/20">
                  <strong className="text-red-400 block mb-2">⚠️ 情報の非保証</strong>
                  <p style={{ lineHeight: '1.8' }}>
                    当サイトで提供される情報（特にユーザー投稿によるもの）の正確性、最新性、完全性、安全性について、運営者は一切の保証をいたしません。利用者は、最終的に現地の掲示やルールをご自身で確認する責任があります。
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-red-900/20">
                  <strong className="text-red-400 block mb-2">🚫 責任の限定</strong>
                  <p style={{ lineHeight: '1.8' }}>
                    本サイトの情報に基づき利用者が何らかの損害（罰金、過料、施設からのクレーム、第三者とのトラブルなど）を被ったとしても、運営者は一切の責任を負いません。全ての行動は利用者ご自身の自己責任となります。
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-red-900/20">
                  <strong className="text-red-400 block mb-2">🗑️ 情報削除の権利</strong>
                  <p style={{ lineHeight: '1.8' }}>
                    公序良俗に反する情報、誤情報、または第三者の権利を侵害する情報が投稿された場合、運営者の判断で予告なく削除する権利を有します。
                  </p>
                </div>
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
                  禁止事項
                </h2>
              </div>
              <div className="ml-14">
                <p className="mb-4 text-base" style={{ lineHeight: '1.8' }}>以下の行為を禁止します：</p>
                <ul className="space-y-3" style={{ lineHeight: '1.8' }}>
                  <li className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                    <span className="text-red-400 flex-shrink-0">❌</span>
                    <span>虚偽の喫煙所情報を投稿すること</span>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                    <span className="text-red-400 flex-shrink-0">❌</span>
                    <span>立ち入り禁止区域や私有地など、不適切な場所を喫煙所として登録すること</span>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                    <span className="text-red-400 flex-shrink-0">❌</span>
                    <span>法令や条例に違反する場所での喫煙を助長する行為</span>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                    <span className="text-red-400 flex-shrink-0">❌</span>
                    <span>他のユーザーや第三者に迷惑をかける行為</span>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                    <span className="text-red-400 flex-shrink-0">❌</span>
                    <span>当サイトの運営を妨害する行為</span>
                  </li>
                </ul>
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
