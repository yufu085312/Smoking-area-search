'use client';

import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, CircleMarker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { SmokingArea } from '@/utils/firestore';
import { MESSAGES } from '@/constants/messages';
import Modal from './ui/Modal';
import Button from './ui/Button';

// Leafletのデフォルトアイコン設定を修正
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapComponentProps {
  smokingAreas: SmokingArea[];
  onAddSmokingArea: (lat: number, lng: number, memo?: string) => void;
}

// カスタム3Dピンアイコンを作成
const createCustomPinIcon = () => {
  return L.divIcon({
    className: 'custom-pin-icon',
    html: `
      <div class="pin-container">
        <div class="pin-top"></div>
        <div class="pin-bottom"></div>
      </div>
    `,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -42]
  });
};

// 地図クリックイベントとズームイベントを処理するコンポーネント
function MapClickHandler({ 
  onMapClick, 
  onZoomChange,
  isAddMode
}: { 
  onMapClick: (lat: number, lng: number) => void;
  onZoomChange: (zoom: number) => void;
    isAddMode: boolean;
}) {
  const map = useMapEvents({
    click(e) {
      if (isAddMode) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      }
    },
    zoomend() {
      onZoomChange(map.getZoom());
    },
  });
  return null;
}

// 現在地に戻るボタンのコンポーネント
function RecenterControl({ lat, lng }: { lat: number; lng: number }) {
  const map = useMapEvents({});
  const containerRef = useRef<HTMLDivElement>(null);

  // マウント時にLeafletのクリック伝播を完全に無効化
  useEffect(() => {
    if (containerRef.current) {
      L.DomEvent.disableClickPropagation(containerRef.current);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        zIndex: 1000
      }}
    >
      <button
        onClick={() => map.setView([lat, lng], 17)}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          border: 'none',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(99, 102, 241, 0.6)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.4)';
        }}
        title="現在地に移動"
      >
        <svg style={{ width: '24px', height: '24px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    </div>
  );
}

// 追加モード切り替えボタンのコンポーネント
function AddModeToggleButton({ isAddMode, onToggle }: { isAddMode: boolean; onToggle: () => void }) {
  const map = useMapEvents({});
  const containerRef = useRef<HTMLDivElement>(null);

  // マウント時にLeafletのクリック伝播を完全に無効化
  useEffect(() => {
    if (containerRef.current) {
      L.DomEvent.disableClickPropagation(containerRef.current);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        bottom: '80px',
        right: '20px',
        zIndex: 1000
      }}
    >
      <button
        onClick={() => onToggle()}
        style={{
          width: isAddMode ? 'auto' : '48px',
          height: '48px',
          padding: isAddMode ? '0 16px' : '0',
          borderRadius: '24px',
          background: isAddMode
            ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
            : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          border: 'none',
          boxShadow: isAddMode
            ? '0 4px 12px rgba(16, 185, 129, 0.4)'
            : '0 4px 12px rgba(99, 102, 241, 0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'all 0.3s',
          fontSize: '14px',
          fontWeight: 500,
          color: 'white'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = isAddMode
            ? '0 6px 16px rgba(16, 185, 129, 0.6)'
            : '0 6px 16px rgba(99, 102, 241, 0.6)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = isAddMode
            ? '0 4px 12px rgba(16, 185, 129, 0.4)'
            : '0 4px 12px rgba(99, 102, 241, 0.4)';
        }}
        title={isAddMode ? '追加モードをキャンセル' : '喫煙所を追加'}
      >
        {isAddMode ? (
          <>
            <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            キャンセル
          </>
        ) : (
          <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        )}
      </button>
    </div>
  );
}

// 初回のみ地図の中心を更新するコンポーネント
function InitialMapUpdater({ center, shouldUpdate }: { center: [number, number], shouldUpdate: boolean }) {
  const map = useMapEvents({});
  const [hasUpdated, setHasUpdated] = useState(false);
  
  useEffect(() => {
    if (shouldUpdate && !hasUpdated) {
      map.setView(center, map.getZoom());
      setHasUpdated(true);
    }
  }, [shouldUpdate, hasUpdated, center, map]);
  
  return null;
}

export default function MapComponent({ smokingAreas, onAddSmokingArea }: MapComponentProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [memo, setMemo] = useState('');
  const [currentZoom, setCurrentZoom] = useState(17);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>({
    lat: 35.6762,
    lng: 139.6503,
  }); // デフォルトは東京
  const [locationObtained, setLocationObtained] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);

  // ユーザーの現在地を取得
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationObtained(true);
        },
        (error) => {
          // エラー時は東京をデフォルトとして使用
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    }
  }, []);

  const handleMapClick = (lat: number, lng: number) => {
    setSelectedPosition({ lat, lng });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPosition) {
      onAddSmokingArea(
        selectedPosition.lat,
        selectedPosition.lng,
        memo || undefined
      );
      // フォームをリセット
      setMemo('');
      setShowModal(false);
      setSelectedPosition(null);
      setIsAddMode(false);
    }
  };

  const handleCancel = () => {
    setMemo('');
    setShowModal(false);
    setSelectedPosition(null);
    setIsAddMode(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Gradient Border Container */}
      <div style={{
        padding: '3px',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
        boxShadow: '0 0 40px rgba(99, 102, 241, 0.3), 0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        {/* Map Container */}
        <div style={{
          height: 'min(600px, 70vh)',
          borderRadius: '18px',
          overflow: 'hidden',
          backgroundColor: '#1e293b',
          position: 'relative'
        }}>
      <MapContainer
        center={[userLocation.lat, userLocation.lng]}
        zoom={17}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <InitialMapUpdater center={[userLocation.lat, userLocation.lng]} shouldUpdate={locationObtained} />
        
        <MapClickHandler 
          onMapClick={handleMapClick} 
          onZoomChange={setCurrentZoom}
              isAddMode={isAddMode}
        />

        {/* 現在地マーカー */}
        {locationObtained && (
          <CircleMarker
            center={[userLocation.lat, userLocation.lng]}
            radius={10}
            pathOptions={{
              color: 'white',
              fillColor: '#4285F4',
              fillOpacity: 0.9,
              weight: 3,
            }}
          >
            <Tooltip direction="top" offset={[0, -10]} opacity={0.9} permanent={false}>
              {MESSAGES.MAP.CURRENT_LOCATION}
            </Tooltip>
          </CircleMarker>
        )}

            {/* 一時的な選択位置マーカー（追加モード時） */}
            {selectedPosition && isAddMode && (
              <CircleMarker
                center={[selectedPosition.lat, selectedPosition.lng]}
                radius={12}
                pathOptions={{
                  color: '#10b981',
                  fillColor: '#10b981',
                  fillOpacity: 0.6,
                  weight: 3,
                }}
              >
                <Tooltip direction="top" offset={[0, -15]} opacity={0.9} permanent={true}>
                  ここに追加
                </Tooltip>
              </CircleMarker>
            )}

        {smokingAreas.map((area) => (
          <Marker
            key={area.id}
            position={[area.latitude, area.longitude]}
            icon={createCustomPinIcon()}
          >
            {area.memo && currentZoom >= 17 && (
              <Tooltip direction="top" offset={[0, -40]} opacity={0.9} permanent={true}>
                {area.memo}
              </Tooltip>
            )}
          </Marker>
        ))}


            {/* Floating Recenter Button */}
            {locationObtained && <RecenterControl lat={userLocation.lat} lng={userLocation.lng} />}

            {/* Add Mode Toggle Button */}
            <AddModeToggleButton isAddMode={isAddMode} onToggle={() => setIsAddMode(!isAddMode)} />

            {/* Add Mode Help Message */}
            {isAddMode && (
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: '24px',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
                  zIndex: 1000,
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  animation: 'slideDown 0.3s ease-out'
                }}
              >
                <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
            )}
      </MapContainer>

        </div>
      </div>

      {/* 追加モーダル */}
      <Modal
        isOpen={showModal}
        onClose={handleCancel}
        title={MESSAGES.MAP.ADD_SMOKING_AREA}
        size="sm"
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label htmlFor="memo" style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#94a3b8', marginBottom: '8px' }}>
              {MESSAGES.MAP.MEMO}
            </label>
            <textarea
              id="memo"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              rows={3}
              placeholder="例：屋外、灰皿あり"
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#f1f5f9',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.2s',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={handleCancel}
              style={{
                padding: '8px 16px',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '8px',
                color: '#f1f5f9',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {MESSAGES.MAP.CANCEL}
            </button>
            <button
              type="submit"
              style={{
                padding: '8px 16px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
              }}
            >
              {MESSAGES.MAP.SAVE}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
