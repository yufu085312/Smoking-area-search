'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { 
  getAllSmokingAreas, 
  addSmokingArea,
  SmokingArea
} from '@/utils/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from '@/utils/auth';
import Link from 'next/link';
import { MESSAGES } from '@/constants/messages';

// MapComponentを動的インポート（SSR無効化）
const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => <div>{MESSAGES.MAP.LOADING_MAP}</div>,
});

export default function Home() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [smokingAreas, setSmokingAreas] = useState<SmokingArea[]>([]);
  const [loading, setLoading] = useState(true);

  // 喫煙所データを取得
  useEffect(() => {
    const fetchSmokingAreas = async () => {
      try {
        const areas = await getAllSmokingAreas();
        setSmokingAreas(areas);
      } catch (error) {
        console.error(MESSAGES.ERROR.DATA_FETCH_FAILED, error);
      } finally {
        setLoading(false);
      }
    };

    fetchSmokingAreas();
  }, []);

  const handleAddSmokingArea = async (
    lat: number,
    lng: number,
    memo?: string
  ) => {
    if (!user) {
      alert(MESSAGES.AUTH.LOGIN_REQUIRED);
      router.push('/login');
      return;
    }

    try {
      const newArea: any = {
        latitude: lat,
        longitude: lng,
        createdById: user.uid,
      };
      
      // memoが存在する場合のみmemoフィールドを追加
      if (memo) {
        newArea.memo = memo;
      }

      await addSmokingArea(newArea);
      
      // リストを再取得
      const areas = await getAllSmokingAreas();
      setSmokingAreas(areas);
    } catch (error) {
      console.error(MESSAGES.ERROR.SMOKING_AREA_ADD_FAILED, error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error(MESSAGES.ERROR.LOGOUT_ERROR, error);
    }
  };

  if (authLoading || loading) {
    return <div>{MESSAGES.COMMON.LOADING}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <header style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>{MESSAGES.HOME.TITLE}</h1>
        <div>
          {user ? (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span>{MESSAGES.AUTH.WELCOME}, {user.email}</span>
              <button
                onClick={handleLogout}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                {MESSAGES.AUTH.LOGOUT}
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link href="/login" style={{ padding: '8px 16px', backgroundColor: '#0070f3', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
                  {MESSAGES.AUTH.LOGIN}
              </Link>
              <Link href="/signup" style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
                  {MESSAGES.AUTH.SIGNUP}
              </Link>
            </div>
          )}
        </div>
      </header>

      <main>
        <p style={{ marginBottom: '16px' }}>{MESSAGES.HOME.DESCRIPTION}</p>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
          {MESSAGES.MAP.CLICK_TO_ADD}
        </p>
        
        <MapComponent
          smokingAreas={smokingAreas}
          onAddSmokingArea={handleAddSmokingArea}
        />
      </main>
    </div>
  );
}
