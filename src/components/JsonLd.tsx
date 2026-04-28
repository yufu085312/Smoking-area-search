import React from 'react';

interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  description: string;
}

interface WebSiteSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  description: string;
  potentialAction: {
    '@type': string;
    target: {
      '@type': string;
      urlTemplate: string;
    };
    'query-input': string;
  };
}

interface FAQPageSchema {
  '@context': string;
  '@type': string;
  mainEntity: Array<{
    '@type': string;
    name: string;
    acceptedAnswer: {
      '@type': string;
      text: string;
    };
  }>;
}

export default function JsonLd() {
  const organizationSchema: OrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '喫煙所サーチ',
    url: 'https://smoking.yu-fu.site',
    description: 'あなたの近くの喫煙可能な場所を簡単に見つけられる無料のマップアプリ',
  };

  const webSiteSchema: WebSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '喫煙所サーチ',
    url: 'https://smoking.yu-fu.site',
    description: '喫煙所サーチは、あなたの近くの喫煙可能な場所を簡単に見つけられる無料のマップアプリです。ユーザー投稿型で、リアルタイムに喫煙所情報を共有・検索できます。',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://smoking.yu-fu.site/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const faqSchema: FAQPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '利用するのに会員登録は必要ですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '喫煙所の検索・閲覧は会員登録不要で、どなたでも無料でご利用いただけます。喫煙所の投稿や報告機能をお使いになる場合のみ、無料の会員登録が必要です。',
        },
      },
      {
        '@type': 'Question',
        name: '投稿した喫煙所はすぐに公開されますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '投稿された喫煙所は管理者の確認・承認を経てから公開されます。正確な情報をお届けするため、投稿内容の確認にお時間をいただく場合がございます。',
        },
      },
      {
        '@type': 'Question',
        name: '間違った情報や閉鎖された喫煙所を見つけた場合は？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '各喫煙所のピンをタップして表示される詳細画面から「報告する」ボタンで情報の修正を依頼できます。閉鎖・移転・その他の理由を選択して報告してください。',
        },
      },
      {
        '@type': 'Question',
        name: '対応しているエリアはどこですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '日本全国の喫煙所に対応しています。ユーザーの皆様の投稿によってデータが充実していきますので、お近くの喫煙所をぜひ追加してください。',
        },
      },
      {
        '@type': 'Question',
        name: 'スマートフォンのブラウザから利用できますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'はい、iPhone・Androidのブラウザ（Safari、Chrome等）からそのままご利用いただけます。アプリのインストールは不要です。',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webSiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}
