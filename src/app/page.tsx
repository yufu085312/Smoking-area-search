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
import { MESSAGES } from '@/constants/messages';
import Header from '@/components/Header';

// MapComponentを動的インポート（SSR無効化）
const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[600px] glass rounded-xl">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-text-secondary">{MESSAGES.MAP.LOADING_MAP}</p>
      </div>
    </div>
  ),
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

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">{MESSAGES.COMMON.LOADING}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container py-8 animate-fadeIn">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {MESSAGES.HOME.TITLE}
          </h1>
          <p className="text-text-secondary text-lg mb-2">
            {MESSAGES.HOME.DESCRIPTION}
          </p>
          <p className="text-text-muted text-sm">
            {MESSAGES.MAP.CLICK_TO_ADD}
          </p>
        </div>

        {/* Map Section */}
        <div className="max-w-6xl mx-auto">
          <MapComponent
            smokingAreas={smokingAreas}
            onAddSmokingArea={handleAddSmokingArea}
          />
        </div>
      </main>
    </div>
  );
}
