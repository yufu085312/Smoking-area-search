import React from 'react';

export function TermsContent() {
  return (
    <div className="legal-content">
      <header className="legal-header">
        <div className="legal-icon">📋</div>
        <h1>利用規約・免責事項</h1>
        <p className="legal-last-updated">最終更新日: 2024年4月29日</p>
      </header>

      <section className="legal-section">
        <div className="section-number">01</div>
        <h2>喫煙に関する法令遵守と情報の正確性</h2>
        <div className="section-body">
          <p>
            日本では、健康増進法や各自治体の条例により、喫煙場所が厳しく規制されています。
          </p>
          <div className="info-box warning">
            <div className="info-icon">⚖️</div>
            <div className="info-text">
              <strong>規制の多様性</strong>
              <p>
                国の法律に加え、東京都や大阪府など、自治体独自の厳しい受動喫煙防止条例が存在します。本サービスで提供される情報が、必ずしも全ての地域の最新の条例に合致しているとは限りません。
              </p>
            </div>
          </div>
          <div className="info-box alert">
            <div className="info-icon">⏰</div>
            <div className="info-text">
              <strong>情報の鮮度と変更</strong>
              <p>
                施設側のルールや自治体の条例は頻繁に変更されます。本サービスの情報はユーザー投稿に依存しているため、<strong>情報が古くなっている可能性があります。</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="legal-section">
        <div className="section-number">02</div>
        <h2>免責事項（Disclaimer）</h2>
        <div className="section-body">
          <div className="card-grid">
            <div className="legal-card">
              <div className="card-icon">⚠️</div>
              <h3>情報の非保証</h3>
              <p>
                当サイトで提供される情報の正確性、最新性、完全性、安全性について、運営者は一切の保証をいたしません。利用者は、最終的に現地の掲示やルールをご自身で確認する責任があります。
              </p>
            </div>
            <div className="legal-card">
              <div className="card-icon">🚫</div>
              <h3>責任の限定</h3>
              <p>
                本サイトの情報に基づき利用者が何らかの損害を被ったとしても、運営者は一切の責任を負いません。全ての行動は利用者ご自身の自己責任となります。
              </p>
            </div>
            <div className="legal-card">
              <div className="card-icon">🗑️</div>
              <h3>情報削除の権利</h3>
              <p>
                公序良俗に反する情報や誤情報、第三者の権利を侵害する情報が投稿された場合、運営者の判断で予告なく削除する権利を有します。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="legal-section">
        <div className="section-number">03</div>
        <h2>禁止事項</h2>
        <div className="section-body">
          <p className="mb-4">以下の行為を禁止します：</p>
          <ul className="legal-list">
            <li>
              <span className="list-icon">❌</span>
              <span>虚偽の喫煙所情報を投稿すること</span>
            </li>
            <li>
              <span className="list-icon">❌</span>
              <span>立ち入り禁止区域や私有地など、不適切な場所を喫煙所として登録すること</span>
            </li>
            <li>
              <span className="list-icon">❌</span>
              <span>法令や条例に違反する場所での喫煙を助長する行為</span>
            </li>
            <li>
              <span className="list-icon">❌</span>
              <span>他のユーザーや第三者に迷惑をかける行為</span>
            </li>
            <li>
              <span className="list-icon">❌</span>
              <span>当サイトの運営を妨害する行為</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export function PrivacyContent() {
  return (
    <div className="legal-content">
      <header className="legal-header">
        <div className="legal-icon">🔒</div>
        <h1>プライバシーポリシー</h1>
        <p className="legal-last-updated">最終更新日: 2024年4月29日</p>
      </header>

      <section className="legal-section">
        <div className="section-number">01</div>
        <h2>収集する情報</h2>
        <div className="section-body">
          <p className="mb-4">当サービスでは、以下の情報を収集する場合があります：</p>
          <div className="card-grid">
            <div className="legal-card accent-purple">
              <div className="card-icon">🔐</div>
              <h3>認証情報</h3>
              <p>Googleアカウントでログインする際に提供される基本情報（名前、メールアドレスなど）。</p>
            </div>
            <div className="legal-card accent-blue">
              <div className="card-icon">📝</div>
              <h3>投稿データ</h3>
              <p>喫煙所投稿時のユーザーID、日時、位置情報、コメント内容。</p>
            </div>
            <div className="legal-card accent-green">
              <div className="card-icon">📊</div>
              <h3>利用状況データ</h3>
              <p>解析ツールを使用して収集される閲覧履歴や統計データ。</p>
            </div>
          </div>
        </div>
      </section>

      <section className="legal-section">
        <div className="section-number">02</div>
        <h2>利用目的</h2>
        <div className="section-body">
          <p className="mb-4">収集した情報は、以下の目的で利用します：</p>
          <ul className="legal-list check">
            <li>
              <span className="list-icon">✓</span>
              <span>本サービスの提供および運営のため</span>
            </li>
            <li>
              <span className="list-icon">✓</span>
              <span>ユーザーからのお問い合わせに対応するため</span>
            </li>
            <li>
              <span className="list-icon">✓</span>
              <span>サービスの改善、新機能の開発のため</span>
            </li>
            <li>
              <span className="list-icon">✓</span>
              <span>不正利用の防止、スパム対策のため</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="legal-section">
        <div className="section-number">03</div>
        <h2>第三者への提供</h2>
        <div className="section-body">
          <p className="mb-6">
            法令に基づく場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません。
          </p>
          <div className="info-box outline">
            <div className="info-text full">
              <strong>外部サービスの利用</strong>
              <p>認証やデータベースには <strong>Firebase (Google Inc.)</strong> を、アクセス解析には <strong>Google Analytics</strong> を利用しています。</p>
            </div>
          </div>
        </div>
      </section>

      <section className="legal-section">
        <div className="section-number">04</div>
        <h2>お問い合わせ</h2>
        <div className="section-body">
          <p className="mb-4">本ポリシーに関するお問い合わせは、以下のメールアドレスまでご連絡ください。</p>
          <div className="contact-box">
            <a href="mailto:fuyu0853@icloud.com" className="contact-link">
              <span className="contact-icon">📧</span>
              <span>fuyu0853@icloud.com</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
