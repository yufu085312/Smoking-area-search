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

// 喫煙所のステータス
export enum SmokingAreaStatus {
  PENDING = 'pending',   // 承認待ち
  APPROVED = 'approved', // 公開中
  REJECTED = 'rejected'  // 非承認
}

// 喫煙所データの型定義
export interface SmokingArea {
  id?: string;
  latitude: number;
  longitude: number;
  memo?: string;
  createdById: string;
  createdAt?: any;
  status: SmokingAreaStatus;
}

// ユーザープロフィールの型定義
export interface UserProfile {
  uid: string;
  email: string | null;
  role: 'admin' | 'user';
  createdAt: any;
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
const USERS_COLLECTION = 'users';

/**
 * 新しい喫煙所を追加
 */
export const addSmokingArea = async (smokingAreaData: Omit<SmokingArea, 'id' | 'createdAt' | 'status'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, SMOKING_AREAS_COLLECTION), {
      ...smokingAreaData,
      status: SmokingAreaStatus.PENDING,
      createdAt: Timestamp.now(),
    });
    console.log('喫煙所が追加されました（承認待ち）。');
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
 */
export const searchNearbySmokingAreas = async (
  lat: number,
  lng: number,
  radiusInMeters: number = 500,
  uid?: string,
  isAdmin: boolean = false
): Promise<SmokingArea[]> => {
  try {
    let q;

    if (isAdmin) {
      // 管理者は全件取得してクライアント側でフィルタリング（開発初期用、データ量が多い場合は要検討）
      q = query(collection(db, SMOKING_AREAS_COLLECTION));
    } else {
      // 一般ユーザーは承認済みのみ取得
      q = query(
        collection(db, SMOKING_AREAS_COLLECTION),
        where('status', '==', SmokingAreaStatus.APPROVED)
      );
    }

    const querySnapshot = await getDocs(q);
    const smokingAreas: SmokingArea[] = [];

    // 自分の投稿（承認待ちなど）を別途取得する必要がある場合
    if (uid && !isAdmin) {
      const myPinsQuery = query(
        collection(db, SMOKING_AREAS_COLLECTION),
        where('createdById', '==', uid)
      );
      const myPinsSnapshot = await getDocs(myPinsQuery);
      myPinsSnapshot.forEach((doc) => {
        const data = doc.data() as SmokingArea;
        // 重複を避ける（approvedかつ自分の投稿の場合）
        if (data.status !== SmokingAreaStatus.APPROVED) {
          smokingAreas.push({ id: doc.id, ...data });
        }
      });
    }

    const R = 6371000; // 地球の半径

    querySnapshot.forEach((doc) => {
      const data = doc.data() as SmokingArea;
      const areaLat = data.latitude;
      const areaLng = data.longitude;

      // 距離を計算
      const dLat = (areaLat - lat) * (Math.PI / 180);
      const dLng = (areaLng - lng) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat * (Math.PI / 180)) * Math.cos(areaLat * (Math.PI / 180)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      if (distance <= radiusInMeters) {
        smokingAreas.push({
          id: doc.id,
          ...data,
        });
      }
    });

    // 距離フィルタリングは重複分には適用されていないので修正が必要だが、
    // いったんシンプルにするため myPins 側も距離チェックを行う

    // 自分のピンの距離チェック
    const filteredAreas = smokingAreas.filter(area => {
      const dLat = (area.latitude - lat) * (Math.PI / 180);
      const dLng = (area.longitude - lng) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat * (Math.PI / 180)) * Math.cos(area.latitude * (Math.PI / 180)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;
      return distance <= radiusInMeters;
    });

    return filteredAreas;
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

/**
 * ユーザープロフィールを取得
 */
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const docRef = doc(db, USERS_COLLECTION, uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('ユーザープロフィールの取得に失敗しました:', error);
    throw error;
  }
};

/**
 * ユーザープロフィールを作成または更新
 */
export const createUserProfile = async (uid: string, email: string | null): Promise<void> => {
  try {
    const docRef = doc(db, USERS_COLLECTION, uid);
    const docSnap = await getDoc(docRef);
    
    // すでに存在する場合は更新しない（roleを上書きしないため）
    if (!docSnap.exists()) {
      await addDoc(collection(db, USERS_COLLECTION), {
        uid,
        email,
        role: 'user',
        createdAt: Timestamp.now(),
      });
    }
  } catch (error) {
    console.error('ユーザープロフィールの作成に失敗しました:', error);
    throw error;
  }
};

// addDoc ではなく setDoc を使うべき（UIDをドキュメントIDにするため）
import { setDoc } from 'firebase/firestore';

export const saveUserProfile = async (uid: string, email: string | null): Promise<void> => {
  try {
    const docRef = doc(db, USERS_COLLECTION, uid);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      await setDoc(docRef, {
        uid,
        email,
        role: 'user',
        createdAt: Timestamp.now(),
      });
      console.log('ユーザープロフィールが作成されました。');
    }
  } catch (error) {
    console.error('ユーザープロフィールの保存に失敗しました:', error);
    throw error;
  }
};
