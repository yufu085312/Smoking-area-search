'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { 
  searchNearbySmokingAreas, 
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
    <div className="flex items-center justify-center h-[50vh] md:h-[600px] glass rounded-xl">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-text-secondary">{MESSAGES.MAP.LOADING_MAP}</p>
      </div>
    </div>
  ),
});

export default function Home() {
  const router = useRouter();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [smokingAreas, setSmokingAreas] = useState<SmokingArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);

  // 喫煙所データを取得
  const fetchNearbyAreas = async (lat: number, lng: number) => {
    try {
      const areas = await searchNearbySmokingAreas(lat, lng, 300, user?.uid, isAdmin);
      setSmokingAreas(areas);
    } catch (error) {
      console.error(MESSAGES.ERROR.DATA_FETCH_FAILED, error);
    } finally {
      setLoading(false);
    }
  };

  // 地図の中心が変更された時に取得
  useEffect(() => {
    if (mapCenter) {
      fetchNearbyAreas(mapCenter.lat, mapCenter.lng);
    }
  }, [mapCenter]);

  // 初期化時に現在地取得
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const center = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setMapCenter(center);
        },
        () => {
          setMapCenter({ lat: 35.6762, lng: 139.6503 });
        }
      );
    } else {
      setMapCenter({ lat: 35.6762, lng: 139.6503 });
    }
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
      alert('喫煙所を追加しました。管理者の承認後に一般公開されます。');
      
      // リストを再取得
      if (mapCenter) {
        fetchNearbyAreas(mapCenter.lat, mapCenter.lng);
      }
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

      <main className="container py-4 md:py-8 animate-fadeIn">
        {/* Hero Section */}
        <div className="text-center" style={{ padding: '20px 0' }}>
          <p className="text-text-secondary text-lg">
            {MESSAGES.HOME.DESCRIPTION}
          </p>
        </div>

        {/* Map Section */}
        <div className="max-w-6xl mx-auto">
          <MapComponent
            smokingAreas={smokingAreas}
            onAddSmokingArea={handleAddSmokingArea}
            onUpdateArea={() => mapCenter && fetchNearbyAreas(mapCenter.lat, mapCenter.lng)}
            onCenterChange={(lat, lng) => setMapCenter({ lat, lng })}
          />
        </div>
      </main>
    </div>
  );
}
