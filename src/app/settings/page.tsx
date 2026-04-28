'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { deleteAccount, signOut, resetPassword } from '@/utils/auth';
import { MESSAGES } from '@/constants/messages';
import { useState } from 'react';
import { TermsContent, PrivacyContent } from '@/components/LegalContent';

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeModal, setActiveModal] = useState<'terms' | 'privacy' | 'contact' | null>(null);
  const [resetMessage, setResetMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://formspree.io/f/maqarerq', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json' 
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Contact Form Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <button 
              onClick={() => setActiveModal('contact')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                color: '#f1f5f9',
                backgroundColor: 'transparent',
                border: 'none',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                textAlign: 'left'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <span>お問い合わせ</span>
              <svg style={{ width: '20px', height: '20px', color: '#94a3b8' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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

            <div style={{ padding: '48px 32px' }}>
              {activeModal === 'terms' && <TermsContent />}
              {activeModal === 'privacy' && <PrivacyContent />}
              {activeModal === 'contact' && (
                <div style={{ color: '#f1f5f9' }}>
                  <header style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📧</div>
                    <h1 style={{ 
                      fontSize: '2rem', 
                      fontWeight: '800', 
                      marginBottom: '8px',
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      お問い合わせ
                    </h1>
                    <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>ご意見・ご要望・不具合報告など</p>
                  </header>

                  {submitStatus === 'success' ? (
                    <div style={{ 
                      textAlign: 'center', 
                      padding: '40px', 
                      backgroundColor: 'rgba(34, 197, 94, 0.1)', 
                      borderRadius: '24px', 
                      border: '1px solid rgba(34, 197, 94, 0.2)' 
                    }}>
                      <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</div>
                      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '12px' }}>送信完了いたしました</h2>
                      <p style={{ color: '#94a3b8', marginBottom: '24px' }}>お問い合わせありがとうございます。内容を確認次第、必要に応じてご連絡させていただきます。</p>
                      <button 
                        onClick={() => setActiveModal(null)}
                        style={{ 
                          padding: '12px 40px', 
                          backgroundColor: '#22c55e', 
                          color: 'white', 
                          borderRadius: '9999px', 
                          fontWeight: 'bold', 
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        閉じる
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#94a3b8', marginBottom: '8px' }}>お名前</label>
                        <input 
                          type="text" 
                          name="name" 
                          required 
                          defaultValue={user?.displayName || ''}
                          style={{ 
                            width: '100%', 
                            backgroundColor: '#0f172a', 
                            border: '1px solid rgba(255, 255, 255, 0.1)', 
                            borderRadius: '12px', 
                            padding: '14px 16px', 
                            color: '#f1f5f9',
                            fontSize: '1rem',
                            outline: 'none'
                          }}
                          placeholder="あなたの名前"
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#94a3b8', marginBottom: '8px' }}>メールアドレス</label>
                        <input 
                          type="email" 
                          name="email" 
                          required 
                          defaultValue={user?.email || ''}
                          style={{ 
                            width: '100%', 
                            backgroundColor: '#0f172a', 
                            border: '1px solid rgba(255, 255, 255, 0.1)', 
                            borderRadius: '12px', 
                            padding: '14px 16px', 
                            color: '#f1f5f9',
                            fontSize: '1rem',
                            outline: 'none'
                          }}
                          placeholder="example@mail.com"
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#94a3b8', marginBottom: '8px' }}>メッセージ</label>
                        <textarea 
                          name="message" 
                          required 
                          rows={5}
                          style={{ 
                            width: '100%', 
                            backgroundColor: '#0f172a', 
                            border: '1px solid rgba(255, 255, 255, 0.1)', 
                            borderRadius: '12px', 
                            padding: '14px 16px', 
                            color: '#f1f5f9',
                            fontSize: '1rem',
                            outline: 'none',
                            resize: 'none',
                            lineHeight: '1.6'
                          }}
                          placeholder="お問い合わせ内容を入力してください"
                        ></textarea>
                      </div>

                      {submitStatus === 'error' && (
                        <p style={{ color: '#ef4444', fontSize: '0.9rem' }}>エラーが発生しました。時間をおいて再度お試しください。</p>
                      )}

                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        style={{ 
                          width: '100%', 
                          padding: '16px', 
                          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', 
                          color: 'white', 
                          borderRadius: '12px', 
                          fontWeight: 'bold', 
                          fontSize: '1.1rem',
                          border: 'none',
                          cursor: isSubmitting ? 'not-allowed' : 'pointer',
                          opacity: isSubmitting ? 0.7 : 1,
                          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                          transition: 'all 0.2s'
                        }}
                      >
                        {isSubmitting ? '送信中...' : 'メッセージを送信する'}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
