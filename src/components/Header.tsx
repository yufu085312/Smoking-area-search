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
      className="sticky top-0 z-40 w-full animate-slideDown"
      style={{
        backgroundColor: 'rgba(30, 41, 59, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        position: 'sticky',
        top: 0
      }}
    >
      <div className="container mx-auto px-4" style={{ width: '100%', maxWidth: '1280px', margin: '0 auto' }}>
        <div className="flex h-16 items-center justify-between" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform"
                 style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '20px', height: '20px', color: 'white' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                  style={{ fontSize: '20px', fontWeight: 'bold', background: 'linear-gradient(to right, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {MESSAGES.HOME.TITLE}
            </span>
          </Link>

          {/* Navigation Buttons (Always Visible) */}
          <nav className="flex items-center space-x-4" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
              <div className="flex items-center space-x-3" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Link href="/login" style={{ textDecoration: 'none' }}>
                  <div
                    style={{
                      padding: '8px 16px',
                      color: '#f1f5f9',
                      fontSize: '14px',
                      cursor: 'pointer',
                      borderRadius: '8px',
                      transition: 'all 0.2s'
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
                      padding: '8px 16px',
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: 500,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
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
