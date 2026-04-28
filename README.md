# 喫煙所サーチ

## 概要
喫煙所を検索するアプリケーションです。
ユーザが独自に追加できます。

## 技術スタック

### フロントエンド
- React + Next.js
- Tailwind CSS

### 地図ライブラリ
- Leaflet (react-leaflet)

### バックエンド
- Firebase (Firestore, Authentication)

## 環境構築

### 前提条件
- Node.js (v20以上推奨)
- npm

### 1. リポジトリのクローンとパッケージのインストール

```bash
git clone <リポジトリのURL>
cd Smoking-area-search
npm install
```

### 2. 環境変数の設定

プロジェクトのルートディレクトリに `.env.local` ファイルを作成し、以下の設定値を記述してください。（実際の値は環境に合わせて変更してください）

```env
NEXT_PUBLIC_FIREBASE_API_KEY="あなたのAPIキー"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="あなたのAUTH_DOMAIN"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="あなたのPROJECT_ID"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="あなたのSTORAGE_BUCKET"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="あなたのMESSAGING_SENDER_ID"
NEXT_PUBLIC_FIREBASE_APP_ID="あなたのAPP_ID"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="あなたのMEASUREMENT_ID"
NEXT_PUBLIC_GA_ID="あなたのGA_ID"
```

### 3. ローカルサーバーの起動

以下のコマンドで開発用サーバーを起動します。

```bash
npm run dev
```

ブラウザで `http://localhost:3000` にアクセスして動作を確認します。

### Dockerを使用する場合

Docker Composeを使用して、本番環境相当でビルド・実行することも可能です。

```bash
docker compose up -d
```

起動後、ブラウザで `http://localhost:3000` にアクセスしてください。コンテナを停止する場合は以下のコマンドを実行します。

```bash
docker compose down
```
