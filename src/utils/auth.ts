import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  UserCredential,
} from 'firebase/auth';
import { auth } from './firebase';

/**
 * メール/パスワードでサインアップ
 */
export const signUpWithEmail = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log('サインアップ成功:', userCredential.user.email);
    return userCredential;
  } catch (error: any) {
    console.error('サインアップエラー:', error);
    throw new Error(getAuthErrorMessage(error.code));
  }
};

/**
 * メール/パスワードでログイン
 */
export const signInWithEmail = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log('ログイン成功:', userCredential.user.email);
    return userCredential;
  } catch (error: any) {
    console.error('ログインエラー:', error);
    throw new Error(getAuthErrorMessage(error.code));
  }
};

/**
 * Googleアカウントでログイン
 */
export const signInWithGoogle = async (): Promise<UserCredential> => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    console.log('Googleログイン成功:', userCredential.user.email);
    return userCredential;
  } catch (error: any) {
    console.error('Googleログインエラー:', error);
    throw new Error(getAuthErrorMessage(error.code));
  }
};

/**
 * ログアウト
 */
export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
    console.log('ログアウト成功');
  } catch (error) {
    console.error('ログアウトエラー:', error);
    throw error;
  }
};

/**
 * パスワードリセットメールを送信
 */
export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log('パスワードリセットメール送信成功');
  } catch (error: any) {
    console.error('パスワードリセットエラー:', error);
    throw new Error(getAuthErrorMessage(error.code));
  }
};

/**
 * Firebase Authのエラーコードを日本語メッセージに変換
 */
const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'このメールアドレスは既に使用されています';
    case 'auth/invalid-email':
      return 'メールアドレスの形式が正しくありません';
    case 'auth/operation-not-allowed':
      return 'この操作は許可されていません';
    case 'auth/weak-password':
      return 'パスワードが弱すぎます（6文字以上必要）';
    case 'auth/user-disabled':
      return 'このアカウントは無効化されています';
    case 'auth/user-not-found':
      return 'ユーザーが見つかりません';
    case 'auth/wrong-password':
      return 'パスワードが正しくありません';
    case 'auth/too-many-requests':
      return 'リクエストが多すぎます。しばらく待ってから再試行してください';
    default:
      return '認証エラーが発生しました';
  }
};

// Aliases for backward compatibility
export const signIn = signInWithEmail;
export const signUp = signUpWithEmail;
