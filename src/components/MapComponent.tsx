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
  onBoundsChange?: (bounds: { minLat: number, maxLat: number, minLng: number, maxLng: number }) => void;
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
  onZoomChange,
  onBoundsChange,
}: { 
  onZoomChange: (zoom: number) => void;
    onBoundsChange?: (bounds: L.LatLngBounds) => void;
}) {
  const map = useMapEvents({
    zoomend() {
      onZoomChange(map.getZoom());
      if (onBoundsChange) {
        onBoundsChange(map.getBounds());
      }
    },
    moveend() {
      if (onBoundsChange) {
        onBoundsChange(map.getBounds());
      }
    },
  });

  // 初期表示時にも範囲を通知
  useEffect(() => {
    if (onBoundsChange) {
      onBoundsChange(map.getBounds());
    }
  }, [map, onBoundsChange]);

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
        title={MESSAGES.MAP.CURRENT_LOCATION}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
        </svg>
      </button>
    </div>
  );
}

// 追加モード切り替えボタンのコンポーネント
function AddModeToggleButton({ isAddMode, onToggle }: { isAddMode: boolean; onToggle: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // マウント時にLeafletのクリック伝播を完全に無効化
  useEffect(() => {
    if (containerRef.current) {
      L.DomEvent.disableClickPropagation(containerRef.current);
    }
  }, []);

  // 追加モード中は非表示（ConfirmLocationControls側にキャンセルボタンがあるため）
  if (isAddMode) return null;

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
          width: '48px',
          height: '48px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          border: 'none',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s',
          color: 'white'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(99, 102, 241, 0.6)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.4)';
        }}
        title="喫煙所を追加"
      >
        <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}

// 決定・キャンセルボタンコンポーネント
function ConfirmLocationControls({ onConfirm, onCancel }: { onConfirm: () => void, onCancel: () => void }) {
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
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        width: '100%',
        pointerEvents: 'none' // コンテナ自体はクリックを透過
      }}
    >
      <button
        onClick={onConfirm}
        style={{
          pointerEvents: 'auto',
          padding: '12px 24px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          border: 'none',
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'all 0.3s',
          fontSize: '16px',
          fontWeight: 600,
          color: 'white',
          whiteSpace: 'nowrap'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.6)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.4)';
        }}
      >
        <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        この場所に追加
      </button>

      <button
        onClick={onCancel}
        style={{
          pointerEvents: 'auto',
          padding: '8px 20px',
          borderRadius: '20px',
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          transition: 'all 0.3s',
          fontSize: '14px',
          fontWeight: 500,
          color: '#cbd5e1'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = 'rgba(239, 68, 68, 0.9)';
          e.currentTarget.style.color = 'white';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'rgba(15, 23, 42, 0.8)';
          e.currentTarget.style.color = '#cbd5e1';
        }}
      >
        <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        キャンセル
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

// 中心座標を取得するためのコンポーネント
function CenterCoordinateTracker({ onCenterChange }: { onCenterChange: (lat: number, lng: number) => void }) {
  const map = useMapEvents({
    move() {
      const center = map.getCenter();
      onCenterChange(center.lat, center.lng);
    },
    moveend() {
      const center = map.getCenter();
      onCenterChange(center.lat, center.lng);
    }
  });
  return null;
}

export default function MapComponent({
  smokingAreas,
  onAddSmokingArea,
  onBoundsChange
}: MapComponentProps) {
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
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);

  // ユーザーの現在地を取得
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(newLocation);
          setMapCenter(newLocation);
          setLocationObtained(true);
        },
        (error) => {
          // エラー時は東京をデフォルトとして使用
          setMapCenter(userLocation);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setMapCenter(userLocation);
    }
  }, []);

  const handleConfirmLocation = () => {
    if (mapCenter) {
      setSelectedPosition(mapCenter);
      setShowModal(true);
    }
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

  const handleBoundsChange = (bounds: L.LatLngBounds) => {
    if (onBoundsChange) {
      onBoundsChange({
        minLat: bounds.getSouth(),
        maxLat: bounds.getNorth(),
        minLng: bounds.getWest(),
        maxLng: bounds.getEast(),
      });
    }
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
            maxZoom={21}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={21}
            />

            <InitialMapUpdater center={[userLocation.lat, userLocation.lng]} shouldUpdate={locationObtained} />
            <CenterCoordinateTracker onCenterChange={(lat, lng) => setMapCenter({ lat, lng })} />

            <MapClickHandler 
              onZoomChange={setCurrentZoom}
              onBoundsChange={handleBoundsChange}
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

            {/* Add Mode Toggle Button (Hidden when in add mode) */}
            <AddModeToggleButton isAddMode={isAddMode} onToggle={() => setIsAddMode(!isAddMode)} />

            {/* Confirm & Cancel Controls (Only in Add Mode) */}
            {isAddMode && (
              <ConfirmLocationControls
                onConfirm={handleConfirmLocation}
                onCancel={() => setIsAddMode(false)}
              />
            )}

          </MapContainer>

          {/* Center Fixed Pin (Overlay) */}
          {isAddMode && (
            <div 
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -100%)', // Pin tip at center
                zIndex: 1000,
                pointerEvents: 'none'
              }}
            >
              <div className="custom-pin-icon">
                <div className="pin-container">
                  <div className="pin-top" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}></div>
                  <div className="pin-bottom" style={{ borderTopColor: '#059669' }}></div>
                </div>
              </div>
            </div>
          )}

          {/* Add Mode Help Message */}
          {isAddMode && (
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '90%',
                maxWidth: '600px',
                padding: '12px 20px',
                background: 'rgba(15, 23, 42, 0.8)',
                backdropFilter: 'blur(8px)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                zIndex: 1000,
                color: 'white',
                fontSize: '14px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                animation: 'slideDown 0.3s ease-out',
                whiteSpace: 'normal',
                textAlign: 'center'
              }}
            >
              <span style={{ color: '#10b981', flexShrink: 0 }}>📍</span>
              <span>地図を動かして追加したい場所にピンを合わせてください</span>
            </div>
          )}
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

          <div style={{ fontSize: '12px', color: '#94a3b8', padding: '8px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '6px' }}>
            <p style={{ marginBottom: '4px', fontWeight: 'bold', color: '#f87171' }}>⚠️ 注意事項</p>
            投稿内容が正確であること、法令を遵守していることを確認してください。不適切な投稿は削除される場合があります。
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
