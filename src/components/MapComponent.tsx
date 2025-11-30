'use client';

import { useEffect, useState } from 'react';
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

// 地図クリックイベントとズームイベントを処理するコンポーネント
function MapClickHandler({ 
  onMapClick, 
  onZoomChange 
}: { 
  onMapClick: (lat: number, lng: number) => void;
  onZoomChange: (zoom: number) => void;
}) {
  const map = useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
    zoomend() {
      onZoomChange(map.getZoom());
    },
  });
  return null;
}

// 地図の中心を更新するコンポーネント
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMapEvents({});
  
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  
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
    }
  };

  const handleCancel = () => {
    setMemo('');
    setShowModal(false);
    setSelectedPosition(null);
  };

  return (
    <div className="relative h-[600px] w-full rounded-xl overflow-hidden shadow-2xl" style={{ zIndex: 1 }}>
      <MapContainer
        center={[userLocation.lat, userLocation.lng]}
        zoom={17}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater center={[userLocation.lat, userLocation.lng]} />
        
        <MapClickHandler 
          onMapClick={handleMapClick} 
          onZoomChange={setCurrentZoom}
        />

        {/* 現在地マーカー */}
        {locationObtained && (
          <CircleMarker
            center={[userLocation.lat, userLocation.lng]}
            radius={10}
            pathOptions={{
              color: '#4285F4',
              fillColor: '#4285F4',
              fillOpacity: 0.8,
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
          >
            {area.memo && currentZoom >= 17 && (
              <Tooltip direction="top" offset={[-15, -20]} opacity={0.9} permanent={true}>
                {area.memo}
              </Tooltip>
            )}
          </Marker>
        ))}
      </MapContainer>

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
