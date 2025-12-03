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
    FORGOT_PASSWORD: 'パスワードを忘れた方',
    RESET_PASSWORD: 'パスワードリセット',
    RESET_PASSWORD_DESCRIPTION: '登録したメールアドレスを入力してください。パスワードリセット用のリンクをお送りします。',
    SEND_RESET_EMAIL: 'リセットメールを送信',
    RESET_EMAIL_SENT: 'パスワードリセット用のメールを送信しました。メールをご確認ください。',
  },

  // 設定
  SETTINGS: {
    TITLE: '設定',
    ACCOUNT_SETTINGS: 'アカウント設定',
    DANGER_ZONE: '危険な操作',
    DELETE_ACCOUNT_DESCRIPTION: 'アカウントを削除すると、全てのデータが完全に削除されます。この操作は元に戻せません。',
    DELETE_ACCOUNT: 'アカウント削除',
    DELETE_ACCOUNT_CONFIRM: '本当にアカウントを削除しますか？この操作は取り消せません。',
    DELETE_ACCOUNT_REAUTH: 'セキュリティのため、再ログインが必要です。ログアウトして再ログインしてから、もう一度お試しください。',
    TERMS: '利用規約・免責事項',
    PRIVACY: 'プライバシーポリシー',
  },

  // ホームページ
  HOME: {
    TITLE: '喫煙所サーチ',
    DESCRIPTION: '近くの喫煙所を探しましょう',
  },

  // 地図関連
  MAP: {
    ADD_SMOKING_AREA: '喫煙所を追加',
    MEMO: 'メモ（任意）',
    CANCEL: 'キャンセル',
    SAVE: '追加',
    LOADING_MAP: '地図を読み込み中...',
    LOCATION_ERROR: '位置情報の取得に失敗しました',
    CURRENT_LOCATION: '現在地',
    REPORT_BUTTON: '報告する',
    REPORT_TITLE: '情報の報告',
    REPORT_DESCRIPTION: 'この喫煙所に関する問題を報告してください',
    REPORT_REASON_LABEL: '報告理由',
    REPORT_COMMENT_LABEL: '詳細（任意）',
    REPORT_SEND: '送信',
    REPORT_SUCCESS: '報告を送信しました。ご協力ありがとうございます。',
    REPORT_ERROR: '報告の送信に失敗しました',
    REASON_CLOSED: '閉鎖された',
    REASON_RELOCATED: '移転した',
    REASON_NO_CIGARETTES: '紙たばこが吸えない',
    REASON_OTHER: 'その他',
    OPEN_IN_GOOGLE_MAPS: 'Google Mapsで開く',
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
    DELETE_ACCOUNT_ERROR: 'アカウント削除エラー:',
  },

  // 成功メッセージ
  SUCCESS: {
    LOGIN: 'ログインに成功しました',
    SIGNUP: 'サインアップに成功しました',
    LOGOUT: 'ログアウトしました',
    GOOGLE_LOGIN: 'Googleログイン成功:',
    DELETE_ACCOUNT: 'アカウントを削除しました',
  },
} as const;

// 型定義をエクスポート
export type Messages = typeof MESSAGES;
