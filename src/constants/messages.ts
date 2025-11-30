/**
 * アプリケーション全体で使用するメッセージ定数
 */

export const MESSAGES = {
  // 共通
  COMMON: {
    LOADING: '読み込み中...',
    PROCESSING: '処理中...',
    OR: 'または',
  },

  // 認証関連
  AUTH: {
    LOGIN: 'ログイン',
    SIGNUP: 'サインアップ',
    LOGOUT: 'ログアウト',
    EMAIL: 'メールアドレス',
    PASSWORD: 'パスワード',
    CONFIRM_PASSWORD: 'パスワード（確認）',
    GOOGLE_LOGIN: 'Googleでログイン',
    GOOGLE_SIGNUP: 'Googleでサインアップ',
    WELCOME: 'ようこそ',
    NO_ACCOUNT: 'アカウントをお持ちでないですか？',
    HAS_ACCOUNT: '既にアカウントをお持ちですか？',
    PASSWORD_MISMATCH: 'パスワードが一致しません',
    LOGIN_REQUIRED: 'ログインが必要です',
  },

  // ホームページ
  HOME: {
    TITLE: '喫煙所検索',
    DESCRIPTION: '近くの喫煙所を探しましょう',
  },

  // 地図関連
  MAP: {
    CLICK_TO_ADD: '地図をクリックして喫煙所を追加',
    ADD_SMOKING_AREA: '喫煙所を追加',
    MEMO: 'メモ（任意）',
    CANCEL: 'キャンセル',
    SAVE: '保存',
    LOADING_MAP: '地図を読み込み中...',
    LOCATION_ERROR: '位置情報の取得に失敗しました',
    CURRENT_LOCATION: '現在地',
  },

  // エラーメッセージ
  ERROR: {
    DATA_FETCH_FAILED: 'データの取得に失敗しました:',
    SMOKING_AREA_ADD_FAILED: '喫煙所の追加に失敗しました:',
    LOGOUT_ERROR: 'ログアウトエラー:',
    LOGIN_ERROR: 'ログインエラー:',
    SIGNUP_ERROR: 'サインアップエラー:',
    GOOGLE_LOGIN_ERROR: 'Googleログインエラー:',
    PASSWORD_MISMATCH: 'パスワードが一致しません',
  },

  // 成功メッセージ
  SUCCESS: {
    LOGIN: 'ログインに成功しました',
    SIGNUP: 'サインアップに成功しました',
    LOGOUT: 'ログアウトしました',
    GOOGLE_LOGIN: 'Googleログイン成功:',
  },
} as const;

// 型定義をエクスポート
export type Messages = typeof MESSAGES;
