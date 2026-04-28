import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomeMapSection from '@/components/HomeMapSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="seo-hero">
          <div className="container">
            <h1 className="seo-hero-title">
              喫煙所サーチ
            </h1>
            <p className="seo-hero-subtitle">
              近くの喫煙スポットを地図から簡単に検索。ユーザー投稿型で、リアルタイムに喫煙所情報を共有できます。
            </p>
          </div>
        </section>

        {/* Map Section */}
        <section className="container" style={{ padding: '8px 16px 24px' }} aria-label="喫煙所マップ">
          <HomeMapSection />
        </section>

        {/* Features Section */}
        <section className="seo-section" aria-label="特徴">
          <div className="container">
            <h2 className="seo-section-title">喫煙所サーチの特徴</h2>
            <div className="seo-features-grid">
              <article className="seo-feature-card">
                <div className="seo-feature-icon">📍</div>
                <h3 className="seo-feature-title">現在地から検索</h3>
                <p className="seo-feature-description">
                  GPS機能を使って、今いる場所から最も近い喫煙所をすぐに見つけられます。出先や旅行先でも簡単に検索できます。
                </p>
              </article>
              <article className="seo-feature-card">
                <div className="seo-feature-icon">🗺️</div>
                <h3 className="seo-feature-title">地図表示で直感的</h3>
                <p className="seo-feature-description">
                  すべての喫煙所が地図上にピン表示されます。場所の確認やルート検索がしやすく、目的地までスムーズにたどり着けます。
                </p>
              </article>
              <article className="seo-feature-card">
                <div className="seo-feature-icon">👥</div>
                <h3 className="seo-feature-title">ユーザー投稿型</h3>
                <p className="seo-feature-description">
                  新しい喫煙所を発見したら、誰でも情報を追加できます。みんなで作る最新の喫煙所データベースです。
                </p>
              </article>
              <article className="seo-feature-card">
                <div className="seo-feature-icon">✅</div>
                <h3 className="seo-feature-title">管理者承認制</h3>
                <p className="seo-feature-description">
                  投稿された喫煙所は管理者が確認後に公開されます。信頼性の高い情報だけをお届けします。
                </p>
              </article>
              <article className="seo-feature-card">
                <div className="seo-feature-icon">📱</div>
                <h3 className="seo-feature-title">スマホ対応</h3>
                <p className="seo-feature-description">
                  スマートフォンからでも快適に利用できるレスポンシブデザイン。外出先でもサッと検索できます。
                </p>
              </article>
              <article className="seo-feature-card">
                <div className="seo-feature-icon">🆓</div>
                <h3 className="seo-feature-title">完全無料</h3>
                <p className="seo-feature-description">
                  会員登録不要で喫煙所の検索が可能。投稿機能を使う場合のみ、無料の会員登録が必要です。
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="seo-section seo-section-alt" aria-label="使い方">
          <div className="container">
            <h2 className="seo-section-title">使い方</h2>
            <div className="seo-steps">
              <div className="seo-step">
                <div className="seo-step-number">1</div>
                <div className="seo-step-content">
                  <h3 className="seo-step-title">地図を開く</h3>
                  <p className="seo-step-description">
                    サイトにアクセスすると、自動的に現在地周辺の地図が表示されます。位置情報の許可を求められた場合は「許可」をタップしてください。
                  </p>
                </div>
              </div>
              <div className="seo-step">
                <div className="seo-step-number">2</div>
                <div className="seo-step-content">
                  <h3 className="seo-step-title">喫煙所を探す</h3>
                  <p className="seo-step-description">
                    地図上に表示されたピンが喫煙所の場所です。ピンをタップすると詳細情報やGoogle Mapsへのリンクを確認できます。
                  </p>
                </div>
              </div>
              <div className="seo-step">
                <div className="seo-step-number">3</div>
                <div className="seo-step-content">
                  <h3 className="seo-step-title">新しい喫煙所を投稿</h3>
                  <p className="seo-step-description">
                    ログインすると、地図上で長押しして新しい喫煙所を追加できます。メモを添えて投稿すると、管理者の承認後に公開されます。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="seo-section" aria-label="よくある質問">
          <div className="container">
            <h2 className="seo-section-title">よくある質問</h2>
            <div className="seo-faq-list">
              <details className="seo-faq-item">
                <summary className="seo-faq-question">利用するのに会員登録は必要ですか？</summary>
                <p className="seo-faq-answer">
                  喫煙所の検索・閲覧は会員登録不要で、どなたでも無料でご利用いただけます。喫煙所の投稿や報告機能をお使いになる場合のみ、無料の会員登録が必要です。
                </p>
              </details>
              <details className="seo-faq-item">
                <summary className="seo-faq-question">投稿した喫煙所はすぐに公開されますか？</summary>
                <p className="seo-faq-answer">
                  投稿された喫煙所は管理者の確認・承認を経てから公開されます。正確な情報をお届けするため、投稿内容の確認にお時間をいただく場合がございます。
                </p>
              </details>
              <details className="seo-faq-item">
                <summary className="seo-faq-question">間違った情報や閉鎖された喫煙所を見つけた場合は？</summary>
                <p className="seo-faq-answer">
                  各喫煙所のピンをタップして表示される詳細画面から「報告する」ボタンで情報の修正を依頼できます。閉鎖・移転・その他の理由を選択して報告してください。
                </p>
              </details>
              <details className="seo-faq-item">
                <summary className="seo-faq-question">対応しているエリアはどこですか？</summary>
                <p className="seo-faq-answer">
                  日本全国の喫煙所に対応しています。ユーザーの皆様の投稿によってデータが充実していきますので、お近くの喫煙所をぜひ追加してください。
                </p>
              </details>
              <details className="seo-faq-item">
                <summary className="seo-faq-question">スマートフォンのブラウザから利用できますか？</summary>
                <p className="seo-faq-answer">
                  はい、iPhone・Androidのブラウザ（Safari、Chrome等）からそのままご利用いただけます。アプリのインストールは不要です。
                </p>
              </details>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
