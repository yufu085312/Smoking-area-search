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
    </>
  );
}
