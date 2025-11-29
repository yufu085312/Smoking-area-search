'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { 
  getAllSmokingAreas, 
  addSmokingArea 
} from '@/utils/firestore';

// 喫煙所の型定義
interface SmokingArea {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  description?: string;
  createdBy: string;
}

export default function Home() {
  const t = useTranslations('Index');
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

  // 新しい喫煙所を追加する例
  const handleAddSmokingArea = async () => {
    try {
      const newArea = {
        name: 'サンプル喫煙所',
        address: '東京都渋谷区',
        latitude: 35.6595,
        longitude: 139.7004,
        description: 'テスト用の喫煙所です',
        createdBy: 'user123',
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

  if (loading) {
    return <div>読み込み中...</div>;
  }

  return (
    <div>
      <main>
        <h1>{t('title')}</h1>
        <p>{t('description')}</p>
        
        <button onClick={handleAddSmokingArea}>
          喫煙所を追加（テスト）
        </button>
        
        <h2>喫煙所リスト</h2>
        {smokingAreas.length === 0 ? (
          <p>喫煙所が登録されていません</p>
        ) : (
          <ul>
            {smokingAreas.map((area) => (
              <li key={area.id}>
                <strong>{area.name}</strong> - {area.address}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
