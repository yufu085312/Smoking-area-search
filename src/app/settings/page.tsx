'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { deleteAccount, signOut, resetPassword } from '@/utils/auth';
import { MESSAGES } from '@/constants/messages';
import { useState } from 'react';

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeModal, setActiveModal] = useState<'terms' | 'privacy' | null>(null);
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  const handleDeleteAccount = async () => {
    if (!user) return;

    if (!window.confirm(MESSAGES.SETTINGS.DELETE_ACCOUNT_CONFIRM)) {
      return;
    }

    try {
      await deleteAccount(user);
      alert(MESSAGES.SUCCESS.DELETE_ACCOUNT);
      router.push('/login');
    } catch (error: any) {
      console.error(MESSAGES.ERROR.DELETE_ACCOUNT_ERROR, error);
      if (error.message === 'セキュリティのため、再ログインが必要です') {
        alert(MESSAGES.SETTINGS.DELETE_ACCOUNT_REAUTH);
        await signOut();
        router.push('/login');
      } else {
        alert(MESSAGES.ERROR.DELETE_ACCOUNT_ERROR + '\n' + error.message);
      }
    }
  };

  const handlePasswordReset = async () => {
    if (!user?.email) return;
    
    try {
      await resetPassword(user.email);
      setResetMessage(MESSAGES.AUTH.RESET_EMAIL_SENT);
      setTimeout(() => setResetMessage(null), 5000);
    } catch (error: any) {
      setResetMessage('パスワードリセットに失敗しました: ' + error.message);
      setTimeout(() => setResetMessage(null), 5000);
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f172a',
        color: '#f1f5f9'
      }}>
        <div style={{ fontSize: '20px' }}>{MESSAGES.COMMON.LOADING}</div>
      </div>
    );
  }

  return (
    <>
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0f172a',
        paddingTop: '80px',
        paddingLeft: '16px',
        paddingRight: '16px'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '30px',
            fontWeight: 'bold',
            color: '#f1f5f9',
            marginBottom: '32px'
          }}>
            {MESSAGES.SETTINGS.TITLE}
          </h1>

          {/* General Settings Menu */}
          <div style={{
            backgroundColor: 'rgba(30, 41, 59, 0.5)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '32px',
            overflow: 'hidden'
          }}>
            <button 
              onClick={() => setActiveModal('terms')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                color: '#f1f5f9',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                textAlign: 'left'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <span>{MESSAGES.SETTINGS.TERMS}</span>
              <svg style={{ width: '20px', height: '20px', color: '#94a3b8' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button 
              onClick={() => setActiveModal('privacy')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                color: '#f1f5f9',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                textAlign: 'left'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <span>{MESSAGES.SETTINGS.PRIVACY}</span>
              <svg style={{ width: '20px', height: '20px', color: '#94a3b8' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Authenticated User Settings */}
          {user && (
            <>
              <div style={{
                backgroundColor: 'rgba(30, 41, 59, 0.5)',
                borderRadius: '12px',
                padding: '24px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                marginBottom: '32px'
              }}>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#f1f5f9',
                  marginBottom: '16px'
                }}>
                  {MESSAGES.SETTINGS.ACCOUNT_SETTINGS}
                </h2>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#94a3b8',
                    marginBottom: '4px'
                  }}>
                    {MESSAGES.AUTH.EMAIL}
                  </label>
                  <div style={{
                    color: '#f1f5f9',
                    padding: '12px',
                    backgroundColor: 'rgba(15, 23, 42, 0.5)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    {user.email}
                  </div>
                </div>

                {/* Password Reset */}
                <div style={{
                  marginTop: '24px',
                  paddingTop: '24px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div style={{ marginBottom: '16px' }}>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#f1f5f9',
                      marginBottom: '8px'
                    }}>
                      {MESSAGES.AUTH.RESET_PASSWORD}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#94a3b8',
                      marginBottom: '12px'
                    }}>
                      パスワードをリセットするためのメールを送信します。
                    </p>
                  </div>

                  {resetMessage && (
                    <div style={{
                      padding: '12px',
                      backgroundColor: resetMessage.includes('失敗') ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                      border: resetMessage.includes('失敗') ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid rgba(34, 197, 94, 0.2)',
                      borderRadius: '8px',
                      color: resetMessage.includes('失敗') ? '#ef4444' : '#4ade80',
                      fontSize: '14px',
                      marginBottom: '12px'
                    }}>
                      {resetMessage}
                    </div>
                  )}

                  <button
                    onClick={handlePasswordReset}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(99, 102, 241, 0.5)',
                      borderRadius: '8px',
                      color: '#6366f1',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.1)';
                      e.currentTarget.style.borderColor = '#6366f1';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)';
                    }}
                  >
                    {MESSAGES.AUTH.SEND_RESET_EMAIL}
                  </button>
                </div>
              </div>

              <div style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderRadius: '12px',
                padding: '24px',
                border: '1px solid rgba(239, 68, 68, 0.2)'
              }}>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#ef4444',
                  marginBottom: '16px'
                }}>
                  {MESSAGES.SETTINGS.DANGER_ZONE}
                </h2>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  flexWrap: 'wrap'
                }}>
                  <p style={{
                    color: '#94a3b8',
                    fontSize: '14px',
                    flex: '1',
                    minWidth: '200px'
                  }}>
                    {MESSAGES.SETTINGS.DELETE_ACCOUNT_DESCRIPTION}
                  </p>
                  <button
                    onClick={handleDeleteAccount}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      borderRadius: '8px',
                      border: 'none',
                      fontSize: '14px',
                      fontWeight: '500',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
                  >
                    {MESSAGES.SETTINGS.DELETE_ACCOUNT}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Back Button */}
          <div style={{
            paddingTop: '32px',
            paddingBottom: '48px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            marginTop: '32px',
            textAlign: 'center'
          }}>
            <button
              onClick={() => router.push('/')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px 32px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(99, 102, 241, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)';
              }}
            >
              <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              トップページに戻る
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {activeModal && (
        <div
          onClick={() => setActiveModal(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
            overflowY: 'auto'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#1e293b',
              borderRadius: '16px',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModal(null)}
              style={{
                position: 'sticky',
                top: '16px',
                float: 'right',
                marginRight: '16px',
                marginTop: '16px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#f1f5f9',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                zIndex: 10,
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
            >
              ×
            </button>

            <div style={{ padding: '32px' }}>
              {activeModal === 'terms' ? <TermsContent /> : <PrivacyContent />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Terms Content Component
function TermsContent() {
  return (
    <div style={{ color: '#94a3b8', lineHeight: '1.8' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#f1f5f9', marginBottom: '32px' }}>
        📋 利用規約・免責事項
      </h1>
      
      {/* Section 1 */}
      <section style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'start', gap: '16px', marginBottom: '16px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            minWidth: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold'
          }}>
            1
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#f1f5f9', marginTop: '4px' }}>
            喫煙に関する法令遵守と情報の正確性
          </h2>
        </div>
        <div style={{ marginLeft: '56px' }}>
          <p style={{ marginBottom: '16px' }}>
            日本では、健康増進法や各自治体の条例により、喫煙場所が厳しく規制されています。
          </p>
          <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: 'rgba(59, 130, 246, 0.1)', marginBottom: '16px' }}>
            <strong style={{ color: '#60a5fa', display: 'block', marginBottom: '8px' }}>⚖️ 規制の多様性</strong>
            <p>
              国の法律に加え、東京都や大阪府など、自治体独自の厳しい受動喫煙防止条例が存在します。本サービスで提供される情報が、必ずしも全ての地域の最新の条例に合致しているとは限りません。
            </p>
          </div>
          <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: 'rgba(234, 179, 8, 0.1)' }}>
            <strong style={{ color: '#fbbf24', display: 'block', marginBottom: '8px' }}>⏰ 情報の鮮度と変更</strong>
            <p>
              施設側のルールや自治体の条例は頻繁に変更されます（例：路上の喫煙禁止エリアの変更、商業施設の喫煙所閉鎖）。本サービスの情報はユーザー投稿に依存しているため、<strong style={{ color: '#ef4444' }}>情報が古くなっている可能性があります。</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'start', gap: '16px', marginBottom: '16px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            minWidth: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold'
          }}>
            2
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#f1f5f9', marginTop: '4px' }}>
            免責事項（Disclaimer）
          </h2>
        </div>
        <div style={{ marginLeft: '56px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
            <strong style={{ color: '#ef4444', display: 'block', marginBottom: '8px' }}>⚠️ 情報の非保証</strong>
            <p>
              当サイトで提供される情報（特にユーザー投稿によるもの）の正確性、最新性、完全性、安全性について、運営者は一切の保証をいたしません。利用者は、最終的に現地の掲示やルールをご自身で確認する責任があります。
            </p>
          </div>
          <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
            <strong style={{ color: '#ef4444', display: 'block', marginBottom: '8px' }}>🚫 責任の限定</strong>
            <p>
              本サイトの情報に基づき利用者が何らかの損害（罰金、過料、施設からのクレーム、第三者とのトラブルなど）を被ったとしても、運営者は一切の責任を負いません。全ての行動は利用者ご自身の自己責任となります。
            </p>
          </div>
          <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
            <strong style={{ color: '#ef4444', display: 'block', marginBottom: '8px' }}>🗑️ 情報削除の権利</strong>
            <p>
              公序良俗に反する情報、誤情報、または第三者の権利を侵害する情報が投稿された場合、運営者の判断で予告なく削除する権利を有します。
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section>
        <div style={{ display: 'flex', alignItems: 'start', gap: '16px', marginBottom: '16px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            minWidth: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold'
          }}>
            3
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#f1f5f9', marginTop: '4px' }}>
            禁止事項
          </h2>
        </div>
        <div style={{ marginLeft: '56px' }}>
          <p style={{ marginBottom: '16px' }}>以下の行為を禁止します：</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'start', gap: '12px', padding: '12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
              <span style={{ color: '#ef4444' }}>❌</span>
              <span>虚偽の喫煙所情報を投稿すること</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'start', gap: '12px', padding: '12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
              <span style={{ color: '#ef4444' }}>❌</span>
              <span>立ち入り禁止区域や私有地など、不適切な場所を喫煙所として登録すること</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'start', gap: '12px', padding: '12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
              <span style={{ color: '#ef4444' }}>❌</span>
              <span>法令や条例に違反する場所での喫煙を助長する行為</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'start', gap: '12px', padding: '12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
              <span style={{ color: '#ef4444' }}>❌</span>
              <span>他のユーザーや第三者に迷惑をかける行為</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'start', gap: '12px', padding: '12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
              <span style={{ color: '#ef4444' }}>❌</span>
              <span>当サイトの運営を妨害する行為</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Privacy Content Component
function PrivacyContent() {
  return (
    <div style={{ color: '#94a3b8', lineHeight: '1.8' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#f1f5f9', marginBottom: '32px' }}>
        🔒 プライバシーポリシー
      </h1>

      {/* Section 1 */}
      <section style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'start', gap: '16px', marginBottom: '16px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            minWidth: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold'
          }}>
            1
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#f1f5f9', marginTop: '4px' }}>
            収集する情報
          </h2>
        </div>
        <div style={{ marginLeft: '56px' }}>
          <p style={{ marginBottom: '16px' }}>当サービスでは、以下の情報を収集する場合があります：</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: 'rgba(147, 51, 234, 0.1)' }}>
              <strong style={{ color: '#a78bfa', display: 'block', marginBottom: '8px' }}>🔐 認証情報</strong>
              <p>
                Googleアカウントでログインする際に、Googleから提供される基本情報（名前、メールアドレス、プロフィール画像など）。
              </p>
            </div>
            <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
              <strong style={{ color: '#60a5fa', display: 'block', marginBottom: '8px' }}>📝 投稿データ</strong>
              <p>
                喫煙所情報の投稿時に、投稿者のユーザーID、投稿日時、位置情報（緯度・経度）、コメント内容。
              </p>
            </div>
            <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>
              <strong style={{ color: '#4ade80', display: 'block', marginBottom: '8px' }}>📊 利用状況データ</strong>
              <p>
                Google Analytics等の解析ツールを使用して収集される、サイトの閲覧履歴、滞在時間、クリック数などの統計データ。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'start', gap: '16px', marginBottom: '16px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            minWidth: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold'
          }}>
            2
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#f1f5f9', marginTop: '4px' }}>
            利用目的
          </h2>
        </div>
        <div style={{ marginLeft: '56px' }}>
          <p style={{ marginBottom: '16px' }}>収集した情報は、以下の目的で利用します：</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'start', gap: '12px', padding: '12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
              <span style={{ color: '#6366f1' }}>✓</span>
              <span>本サービスの提供および運営のため</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'start', gap: '12px', padding: '12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
              <span style={{ color: '#6366f1' }}>✓</span>
              <span>ユーザーからのお問い合わせに対応するため</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'start', gap: '12px', padding: '12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
              <span style={{ color: '#6366f1' }}>✓</span>
              <span>サービスの改善、新機能の開発のため</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'start', gap: '12px', padding: '12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
              <span style={{ color: '#6366f1' }}>✓</span>
              <span>不正利用の防止、スパム対策のため</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'start', gap: '12px', padding: '12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
              <span style={{ color: '#6366f1' }}>✓</span>
              <span>利用規約に違反する行為への対応のため</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'start', gap: '16px', marginBottom: '16px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            minWidth: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold'
          }}>
            3
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#f1f5f9', marginTop: '4px' }}>
            第三者への提供
          </h2>
        </div>
        <div style={{ marginLeft: '56px' }}>
          <p style={{ marginBottom: '16px' }}>
            法令に基づく場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません。ただし、以下の外部サービスを利用してデータを処理する場合があります。
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: 'rgba(249, 115, 22, 0.1)' }}>
              <strong style={{ color: '#fb923c', display: 'block', marginBottom: '8px' }}>🔥 Firebase (Google Inc.)</strong>
              <p>
                認証、データベース、ホスティングなどのバックエンド機能のため。
              </p>
            </div>
            <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: 'rgba(6, 182, 212, 0.1)' }}>
              <strong style={{ color: '#22d3ee', display: 'block', marginBottom: '8px' }}>📈 Google Analytics (Google Inc.)</strong>
              <p>
                サイトのアクセス解析のため。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section>
        <div style={{ display: 'flex', alignItems: 'start', gap: '16px', marginBottom: '16px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            minWidth: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold'
          }}>
            4
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#f1f5f9', marginTop: '4px' }}>
            お問い合わせ
          </h2>
        </div>
        <div style={{ marginLeft: '56px' }}>
          <p style={{ marginBottom: '16px' }}>
            本ポリシーに関するお問い合わせは、以下のメールアドレスまでご連絡ください。
          </p>
          <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
            <a 
              href="mailto:fuyu0853@icloud.com"
              style={{ color: '#6366f1', textDecoration: 'none', fontWeight: '500' }}
            >
              📧 fuyu0853@icloud.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
