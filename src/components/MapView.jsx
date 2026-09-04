import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ZoomIn, ZoomOut, Compass, Radio, Layers } from 'lucide-react';

// Controller to smoothly animate map viewpoint when center/zoom changes
function MapCameraController({ center, zoom }) {
  const map = useMap();

  // Invalidate map size shortly after mount to ensure crisp rendering inside animated containers
  useEffect(() => {
    if (!map) return;
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 150);
    return () => clearTimeout(timer);
  }, [map]);

  useEffect(() => {
    if (center && map) {
      map.flyTo(center, zoom || map.getZoom(), {
        duration: 1.2,
        easeLinearity: 0.25
      });
    }
  }, [center, zoom, map]);

  return null;
}

export default function MapView({
  center = [26.2006, 92.9376], // NER Geographical Center (Assam/Meghalaya intersection)
  zoom = 7,
  children,
  className = '',
  height = '620px',
  onRecenter,
  activeLayerName = 'OpenStreetMap Standard',
  onToggleLayer
}) {
  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-xs bg-slate-100 ${className}`}
      style={{ height }}
    >
      {/* Top Left HUD Badge */}
      <div className="absolute top-4 left-4 z-[400] flex items-center gap-2 bg-white/95 backdrop-blur-md border border-[#E2E8F0] px-3 py-1.5 rounded-xl shadow-xs text-xs">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-bold text-slate-800">NER Spatial Telemetry Grid</span>
        <span className="text-[10px] font-mono text-slate-400 border-l border-slate-200 pl-2">
          8 States Active
        </span>
      </div>

      {/* Top Right Quick Map Controls */}
      <div className="absolute top-4 right-4 z-[400] flex items-center gap-1.5">
        {onToggleLayer && (
          <button
            onClick={onToggleLayer}
            className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md border border-[#E2E8F0] px-3 py-1.5 rounded-xl shadow-xs text-xs font-semibold text-slate-700 hover:text-[#EA580C] hover:bg-orange-50 transition-colors"
            title="Toggle Map Basemap"
          >
            <Layers className="w-3.5 h-3.5 text-[#F97316]" />
            <span className="hidden sm:inline">{activeLayerName}</span>
          </button>
        )}

        {onRecenter && (
          <button
            onClick={onRecenter}
            className="flex items-center gap-1 bg-white/95 backdrop-blur-md border border-[#E2E8F0] px-3 py-1.5 rounded-xl shadow-xs text-xs font-semibold text-slate-700 hover:text-[#EA580C] hover:bg-orange-50 transition-colors"
            title="Recenter Map on NER Hub"
          >
            <Compass className="w-3.5 h-3.5 text-[#F97316]" />
            <span className="hidden sm:inline">Recenter</span>
          </button>
        )}
      </div>

      {/* React-Leaflet Map Instance */}
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
        zoomControl={false} // Clean custom controls instead of default top-left
      >
        <MapCameraController center={center} zoom={zoom} />

        {/* Standard High-Quality OpenStreetMap Tile Layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={18}
        />

        {/* Child Markers, Polylines, Circles, etc. */}
        {children}
      </MapContainer>

      {/* Bottom Coordinates & Scale Ribbon */}
      <div className="absolute bottom-3 left-4 z-[400] flex items-center gap-2 text-[10px] font-mono text-slate-600 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
        <span>Datum: WGS 84</span>
        <span>•</span>
        <span>Center: {center[0].toFixed(3)}°N, {center[1].toFixed(3)}°E</span>
      </div>
    </div>
  );
}
