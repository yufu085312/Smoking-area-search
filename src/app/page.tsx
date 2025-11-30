'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  getAllSmokingAreas, 
  addSmokingArea,
  SmokingArea
} from '@/utils/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from '@/utils/auth';
import Link from 'next/link';

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
        console.error('データの取得に失敗しました:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSmokingAreas();
  }, []);

  const handleAddSmokingArea = async () => {
    if (!user) {
      alert('ログインが必要です');
      router.push('/login');
      return;
    }

    try {
      const newArea = {
        name: 'サンプル喫煙所',
        address: '東京都渋谷区',
        latitude: 35.6595,
        longitude: 139.7004,
        description: 'テスト用の喫煙所です',
        createdBy: user.uid,
      };
      
      const areaId = await addSmokingArea(newArea);
      console.log('追加された喫煙所のID:', areaId);
      
      // リストを再取得
      const areas = await getAllSmokingAreas();
      setSmokingAreas(areas);
    } catch (error) {
      console.error('喫煙所の追加に失敗しました:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('ログアウトエラー:', error);
    }
  };

  if (authLoading || loading) {
    return <div>読み込み中...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <header style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>喫煙所検索</h1>
        <div>
          {user ? (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span>ようこそ, {user.email}</span>
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
                ログアウト
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link href="/login" style={{ padding: '8px 16px', backgroundColor: '#0070f3', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
                ログイン
              </Link>
              <Link href="/signup" style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
                サインアップ
              </Link>
            </div>
          )}
        </div>
      </header>

      <main>
        <p>近くの喫煙所を探しましょう</p>
        
        <button
          onClick={handleAddSmokingArea}
          style={{
            padding: '12px 24px',
            marginTop: '20px',
            backgroundColor: user ? '#0070f3' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: user ? 'pointer' : 'not-allowed',
          }}
        >
          喫煙所を追加（テスト）
        </button>
        
        <h2 style={{ marginTop: '30px' }}>喫煙所リスト</h2>
        {smokingAreas.length === 0 ? (
          <p>喫煙所が登録されていません</p>
        ) : (
          <ul>
            {smokingAreas.map((area) => (
              <li key={area.id} style={{ marginBottom: '10px' }}>
                <strong>{area.name}</strong> - {area.address}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
