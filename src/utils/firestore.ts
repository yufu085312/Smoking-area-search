import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';

// 喫煙所データの型定義
export interface SmokingArea {
  id?: string;
  latitude: number;
  longitude: number;
  memo?: string;
  createdById: string;
  createdAt?: any;
}

// 報告理由のenum
export enum ReportReason {
  CLOSED = 'closed',              // 閉鎖
  RELOCATED = 'relocated',        // 移転
  NO_CIGARETTES = 'no_cigarettes', // 紙たばこ不可
  OTHER = 'other'                 // その他
}

// 報告データの型定義
export interface Report {
  id?: string;
  smokingAreaId: string;
  reason: ReportReason;
  comment?: string;
  reportedById: string;
  reportedAt?: any;
}

// コレクション名
const SMOKING_AREAS_COLLECTION = 'smokingAreas';
const REPORTS_COLLECTION = 'reports';

/**
 * 新しい喫煙所を追加
 */
export const addSmokingArea = async (smokingAreaData: Omit<SmokingArea, 'id' | 'createdAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, SMOKING_AREAS_COLLECTION), {
      ...smokingAreaData,
      createdAt: Timestamp.now(),
    });
    console.log('喫煙所が追加されました。');
    return docRef.id;
  } catch (error) {
    console.error('喫煙所の追加に失敗しました:', error);
    throw error;
  }
};

/**
 * すべての喫煙所を取得
 */
export const getAllSmokingAreas = async (): Promise<SmokingArea[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, SMOKING_AREAS_COLLECTION));
    const smokingAreas: SmokingArea[] = [];
    querySnapshot.forEach((doc) => {
      smokingAreas.push({
        id: doc.id,
        ...doc.data(),
      } as SmokingArea);
    });
    return smokingAreas;
  } catch (error) {
    console.error('喫煙所の取得に失敗しました:', error);
    throw error;
  }
};

/**
 * 特定の喫煙所を取得
 */
export const getSmokingArea = async (areaId: string): Promise<SmokingArea | null> => {
  try {
    const docRef = doc(db, SMOKING_AREAS_COLLECTION, areaId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as SmokingArea;
    } else {
      console.log('喫煙所が見つかりません');
      return null;
    }
  } catch (error) {
    console.error('喫煙所の取得に失敗しました:', error);
    throw error;
  }
};

/**
 * 喫煙所を更新
 */
export const updateSmokingArea = async (areaId: string, updateData: Partial<Omit<SmokingArea, 'id'>>): Promise<void> => {
  try {
    const docRef = doc(db, SMOKING_AREAS_COLLECTION, areaId);
    await updateDoc(docRef, updateData);
    console.log('喫煙所が更新されました');
  } catch (error) {
    console.error('喫煙所の更新に失敗しました:', error);
    throw error;
  }
};

/**
 * 喫煙所を削除
 */
export const deleteSmokingArea = async (areaId: string): Promise<void> => {
  try {
    const docRef = doc(db, SMOKING_AREAS_COLLECTION, areaId);
    await deleteDoc(docRef);
    console.log('喫煙所が削除されました');
  } catch (error) {
    console.error('喫煙所の削除に失敗しました:', error);
    throw error;
  }
};

/**
 * 位置情報に基づいて近くの喫煙所を検索
 * 注: Firestoreのジオクエリには制限があるため、
 * より高度な位置検索にはGeoFirestoreなどのライブラリを使用することを推奨
 */
export const searchNearbySmokingAreas = async (latitude: number, longitude: number, radiusKm: number = 5): Promise<SmokingArea[]> => {
  // 簡易的な実装例
  // 実際の実装では、緯度経度の範囲を計算して検索する必要があります
  try {
    const allAreas = await getAllSmokingAreas();
    // ここで距離計算とフィルタリングを行う
    return allAreas;
  } catch (error) {
    console.error('近くの喫煙所の検索に失敗しました:', error);
    throw error;
  }
};

/**
 * 報告を追加
 */
export const addReport = async (reportData: Omit<Report, 'id' | 'reportedAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, REPORTS_COLLECTION), {
      ...reportData,
      reportedAt: Timestamp.now(),
    });
    console.log('報告が追加されました。');
    return docRef.id;
  } catch (error) {
    console.error('報告の追加に失敗しました:', error);
    throw error;
  }
};

/**
 * 特定の喫煙所の報告を取得（管理用）
 */
export const getReportsForArea = async (areaId: string): Promise<Report[]> => {
  try {
    const q = query(
      collection(db, REPORTS_COLLECTION),
      where('smokingAreaId', '==', areaId),
      orderBy('reportedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const reports: Report[] = [];
    querySnapshot.forEach((doc) => {
      reports.push({
        id: doc.id,
        ...doc.data(),
      } as Report);
    });
    return reports;
  } catch (error) {
    console.error('報告の取得に失敗しました:', error);
    throw error;
  }
};
