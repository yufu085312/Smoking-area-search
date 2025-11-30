'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, CircleMarker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { SmokingArea } from '@/utils/firestore';
import { MESSAGES } from '@/constants/messages';

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
    <div style={{ position: 'relative', height: '600px', width: '100%' }}>
      <MapContainer
        center={[userLocation.lat, userLocation.lng]}
        zoom={17}
        style={{ height: '100%', width: '100%' }}
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
      {showModal && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 1000,
            minWidth: '320px',
          }}
        >
          <h2 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>
            {MESSAGES.MAP.ADD_SMOKING_AREA}
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label
                htmlFor="memo"
                style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}
              >
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
                  padding: '8px',
                  fontSize: '14px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  resize: 'vertical',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={handleCancel}
                style={{
                  padding: '8px 16px',
                  fontSize: '14px',
                  backgroundColor: '#f0f0f0',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                {MESSAGES.MAP.CANCEL}
              </button>
              <button
                type="submit"
                style={{
                  padding: '8px 16px',
                  fontSize: '14px',
                  backgroundColor: '#0070f3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                {MESSAGES.MAP.SAVE}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* モーダル背景 */}
      {showModal && (
        <div
          onClick={handleCancel}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999,
          }}
        />
      )}
    </div>
  );
}
