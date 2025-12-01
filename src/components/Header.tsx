'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import { MESSAGES } from '@/constants/messages';
import Button from './ui/Button';

export default function Header() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error(MESSAGES.ERROR.LOGOUT_ERROR, error);
    }
  };

  return (
    <header 
      className="sticky top-0 z-[1001] w-full animate-slideDown"
      style={{
        backgroundColor: 'rgba(30, 41, 59, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1001
      }}
    >
      <div className="container mx-auto px-4" style={{ width: '100%', maxWidth: '1280px', margin: '0 auto' }}>
        <div className="flex h-16 items-center justify-between" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform"
              style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '20px', height: '20px', color: 'white' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #6366f1, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              className="sm-show-inline text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
              {MESSAGES.HOME.TITLE}
            </span>
          </Link>

          {/* Navigation Buttons (Always Visible) */}
          <nav className="flex items-center space-x-4" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Legal Documents Icons */}
            <Link
              href="/terms"
              title="利用規約・免責事項"
              style={{
                color: '#94a3b8',
                transition: 'color 0.2s',
                display: 'flex',
                alignItems: 'center'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#6366f1'}
              onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
            >
              <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </Link>

            <Link
              href="/privacy"
              title="プライバシーポリシー"
              style={{
                color: '#94a3b8',
                transition: 'color 0.2s',
                display: 'flex',
                alignItems: 'center'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#6366f1'}
              onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
            >
              <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </Link>

            {user ? (
              <div className="flex items-center space-x-4" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="text-sm text-text-secondary hidden md:inline" style={{ color: '#94a3b8', fontSize: '14px' }}>
                  {MESSAGES.AUTH.WELCOME}, <span className="text-text-primary font-medium" style={{ color: '#f1f5f9', fontWeight: 500 }}>{user.email}</span>
                </span>
                <button
                  onClick={handleLogout}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#f1f5f9',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  {MESSAGES.AUTH.LOGOUT}
                </button>
              </div>
            ) : (
                <div className="flex items-center space-x-3" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Link href="/login" style={{ textDecoration: 'none' }}>
                  <div
                    style={{
                        padding: '6px 12px',
                      color: '#f1f5f9',
                        fontSize: '13px',
                      cursor: 'pointer',
                      borderRadius: '8px',
                        transition: 'all 0.2s',
                        whiteSpace: 'nowrap'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    {MESSAGES.AUTH.LOGIN}
                  </div>
                </Link>

                <Link href="/signup" style={{ textDecoration: 'none' }}>
                  <div
                    style={{
                        padding: '6px 12px',
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      color: 'white',
                        fontSize: '13px',
                      fontWeight: 500,
                        cursor: 'pointer',
                      borderRadius: '8px',
                        transition: 'all 0.2s',
                        boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)',
                        whiteSpace: 'nowrap'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(99, 102, 241, 0.3)';
                    }}
                  >
                    {MESSAGES.AUTH.SIGNUP}
                  </div>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
