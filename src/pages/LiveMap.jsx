import React, { useState, useEffect } from 'react';
import { Marker, Popup, Polyline, Circle } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Layers,
  Filter,
  Compass,
  AlertTriangle,
  Truck,
  Eye,
  Activity,
  Fuel,
  Gauge,
  Phone,
  Navigation,
  MountainSnow,
  CheckCircle2,
  X,
  Radio,
  Clock,
  Package,
  ThermometerSnowflake,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

import MapView from '../components/MapView';
import StatusBadge from '../components/StatusBadge';
import AnimatedPolyline from '../components/AnimatedPolyline';
import { VEHICLES } from '../data/vehicles';
import { ROUTES } from '../data/routes';
import { ALERTS } from '../data/alerts';
import {
  createVehicleMarker,
  createHazardMarker,
  createStrategicHubMarker
} from '../utils/leafletIcons';

// Strategic Supply Hubs and Mountain Passes across NER
const STRATEGIC_HUBS = [
  { name: 'Guwahati Port Hub', type: 'Hub', state: 'Assam', pos: [26.1445, 91.7362] },
  { name: 'Silchar Supply Depot', type: 'Hub', state: 'Assam', pos: [24.8333, 92.7789] },
  { name: 'Itanagar SkyLink Droneport', type: 'Hub', state: 'Arunachal Pradesh', pos: [27.0844, 93.6053] },
  { name: 'Tawang Forward Base', type: 'Hub', state: 'Arunachal Pradesh', pos: [27.5861, 91.8594] },
  { name: 'Dimapur Transshipment Yard', type: 'Hub', state: 'Nagaland', pos: [25.9063, 93.7275] },
  { name: 'Kohima Central Supply', type: 'Hub', state: 'Nagaland', pos: [25.6751, 94.1086] },
  { name: 'Imphal Distribution Center', type: 'Hub', state: 'Manipur', pos: [24.817, 93.9368] },
  { name: 'Aizawl North Hub', type: 'Hub', state: 'Mizoram', pos: [23.7271, 92.7176] },
  { name: 'Gangtok Goods Depot', type: 'Hub', state: 'Sikkim', pos: [27.3389, 88.6065] },
  { name: 'Agartala Integrated Checkpost', type: 'Hub', state: 'Tripura', pos: [23.8315, 91.2868] },
  { name: 'Pandu River Port (NW-2)', type: 'Port', state: 'Assam', pos: [26.1754, 91.6888] },
  { name: 'Dhubri Inland Port', type: 'Port', state: 'Assam', pos: [26.0207, 89.9744] },
  { name: 'Sela Pass (13,700 ft)', type: 'Pass', state: 'Arunachal Pradesh', pos: [27.5054, 92.1039] },
  { name: 'Nathu La Pass (14,140 ft)', type: 'Pass', state: 'Sikkim', pos: [27.3865, 88.831] },
  { name: 'Bomdila Pass (8,500 ft)', type: 'Pass', state: 'Arunachal Pradesh', pos: [27.2644, 92.4239] }
];

// State focus quick zoom coordinates
const STATE_VIEWS = {
  'All NER': { center: [26.2006, 92.9376], zoom: 7 },
  'Assam': { center: [26.2006, 92.9376], zoom: 8 },
  'Arunachal': { center: [27.5000, 93.5000], zoom: 8 },
  'Sikkim': { center: [27.3500, 88.5500], zoom: 9 },
  'Nagaland': { center: [25.9000, 94.1000], zoom: 9 },
  'Manipur': { center: [24.8170, 93.9368], zoom: 9 },
  'Mizoram': { center: [23.7000, 92.7000], zoom: 9 },
  'Meghalaya': { center: [25.5700, 91.8900], zoom: 9 },
  'Tripura': { center: [23.8300, 91.3000], zoom: 9 }
};

export default function LiveMap() {
  const [mapCenter, setMapCenter] = useState([26.2006, 92.9376]);
  const [mapZoom, setMapZoom] = useState(7);
  const [selectedItem, setSelectedItem] = useState(null); // Vehicle or Hazard object
  const [selectedType, setSelectedType] = useState(null); // 'vehicle' | 'hazard' | 'hub'
  const [recommendedRouteId, setRecommendedRouteId] = useState('CORR-01');
  const [vehiclesList, setVehiclesList] = useState(VEHICLES);
  const [activeState, setActiveState] = useState('All NER');

  // Subtle simulated vehicle movement for 2 demonstration vehicles along corridors
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let step = 0;
    const interval = setInterval(() => {
      step = (step + 1) % 40;
      // Gentle oscillating offset along highway vector (approx 1 km variance)
      const deltaLatTrk = Math.sin(step * 0.15) * 0.007;
      const deltaLngTrk = Math.cos(step * 0.15) * 0.008;

      const deltaLatBrg = Math.sin(step * 0.12) * 0.005;
      const deltaLngBrg = Math.cos(step * 0.12) * 0.007;

      setVehiclesList((prev) =>
        prev.map((v) => {
          if (v.id === 'NER-TRK-101') {
            return {
              ...v,
              location: {
                ...v.location,
                lat: 26.1445 + deltaLatTrk,
                lng: 91.7362 + deltaLngTrk
              }
            };
          }
          if (v.id === 'NER-BRG-201') {
            return {
              ...v,
              location: {
                ...v.location,
                lat: 26.1754 + deltaLatBrg,
                lng: 91.6888 + deltaLngBrg
              }
            };
          }
          return v;
        })
      );
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // Layer filter toggles
  const [layers, setLayers] = useState({
    vehicles: true,
    corridors: true,
    hazards: true,
    hubs: true,
    riskPolygons: true
  });

  const toggleLayer = (layerKey) => {
    setLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const handleStateSelect = (stateName) => {
    setActiveState(stateName);
    const target = STATE_VIEWS[stateName];
    if (target) {
      setMapCenter(target.center);
      setMapZoom(target.zoom);
    }
  };

  const handleVehicleClick = (vehicle) => {
    setSelectedItem(vehicle);
    setSelectedType('vehicle');
    setMapCenter([vehicle.location.lat, vehicle.location.lng]);
    setMapZoom(9);
  };

  const handleHazardClick = (hazard) => {
    setSelectedItem(hazard);
    setSelectedType('hazard');
    setMapCenter([hazard.coordinates.lat, hazard.coordinates.lng]);
    setMapZoom(9);
  };

  return (
    <div className="space-y-4">
      {/* Top Header & State Focus Bar */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#111827]">NER Live GIS Telemetry & Spatial Intelligence</h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              Live GPS Feed Active
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            Real-time geospatial tracking covering 8 North Eastern states, high-altitude Himalayan passes, and Brahmaputra waterways.
          </p>
        </div>

        {/* State Quick-Jump Pills */}
        <div className="flex items-center gap-1.5 flex-wrap overflow-x-auto pb-1 max-w-full">
          {Object.keys(STATE_VIEWS).map((s) => (
            <button
              key={s}
              onClick={() => handleStateSelect(s)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all ${
                activeState === s
                  ? 'bg-[#F97316] text-white border-[#EA580C] shadow-xs'
                  : 'bg-slate-50 hover:bg-orange-50 hover:text-[#EA580C] hover:border-orange-200 border-[#E2E8F0] text-slate-700'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Main GIS Canvas Container with Layer Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Sidebar: Controls & Telemetry Stream (Desktop order 1, Mobile order 2) */}
        <div className="order-2 lg:order-1 space-y-4 lg:col-span-1 flex flex-col">
          {/* Layer Visibility Toggles */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#F97316]" />
              Geospatial Layers
            </h3>

            <div className="space-y-2 text-xs">
              <label htmlFor="layer-convoys" className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#F97316]" />
                  <span className="font-semibold text-slate-700">Active Convoys & Fleet</span>
                </div>
                <input
                  id="layer-convoys"
                  aria-label="Toggle Active Convoys and Fleet layer"
                  type="checkbox"
                  checked={layers.vehicles}
                  onChange={() => toggleLayer('vehicles')}
                  className="rounded text-[#F97316] focus:ring-2 focus:ring-[#F97316]"
                />
              </label>

              <label htmlFor="layer-hazards" className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="font-semibold text-slate-700">Hazard & Incident Alerts</span>
                </div>
                <input
                  id="layer-hazards"
                  aria-label="Toggle Hazard and Incident Alerts layer"
                  type="checkbox"
                  checked={layers.hazards}
                  onChange={() => toggleLayer('hazards')}
                  className="rounded text-[#F97316] focus:ring-2 focus:ring-[#F97316]"
                />
              </label>

              <label htmlFor="layer-corridors" className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="font-semibold text-slate-700">Strategic Corridors</span>
                </div>
                <input
                  id="layer-corridors"
                  aria-label="Toggle Strategic Corridors layer"
                  type="checkbox"
                  checked={layers.corridors}
                  onChange={() => toggleLayer('corridors')}
                  className="rounded text-[#F97316] focus:ring-2 focus:ring-[#F97316]"
                />
              </label>

              <label htmlFor="layer-hubs" className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-600" />
                  <span className="font-semibold text-slate-700">Mountain Passes & Hubs</span>
                </div>
                <input
                  id="layer-hubs"
                  aria-label="Toggle Mountain Passes and Strategic Hubs layer"
                  type="checkbox"
                  checked={layers.hubs}
                  onChange={() => toggleLayer('hubs')}
                  className="rounded text-[#F97316] focus:ring-2 focus:ring-[#F97316]"
                />
              </label>

              <label htmlFor="layer-risk-polygons" className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="font-semibold text-slate-700">Risk Polygons & Floods</span>
                </div>
                <input
                  id="layer-risk-polygons"
                  aria-label="Toggle Risk Polygons and Flood Inundation layer"
                  type="checkbox"
                  checked={layers.riskPolygons}
                  onChange={() => toggleLayer('riskPolygons')}
                  className="rounded text-[#F97316] focus:ring-2 focus:ring-[#F97316]"
                />
              </label>
            </div>
          </div>

          {/* Real-time Telemetry Stream Ticker */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs flex-1 flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                Live Convoy Telemetry
              </span>
              <span className="text-[10px] font-mono text-slate-400">15s refresh</span>
            </div>

            <div className="mt-3 space-y-2 overflow-y-auto max-h-[380px] text-xs divide-y divide-slate-100">
              {VEHICLES.map((v) => (
                <div
                  key={v.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`Inspect vehicle ${v.id} telemetry`}
                  onClick={() => handleVehicleClick(v)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleVehicleClick(v);
                    }
                  }}
                  className={`pt-2 cursor-pointer group transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#F97316] rounded-xl p-1 ${
                    selectedItem?.id === v.id ? 'bg-orange-50/60 p-2 rounded-xl' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[#EA580C] group-hover:underline">
                      {v.id}
                    </span>
                    <span className="font-mono text-[11px] text-slate-600">
                      {v.telemetry.speed} {v.telemetry.speedUnit}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-700 font-medium truncate mt-0.5">
                    {v.name}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                    <span className="truncate max-w-[120px]">{v.location.currentRoad}</span>
                    <span className="text-emerald-600 font-semibold">{v.telemetry.fuelLevel}% Fuel</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Map Viewport Container (Desktop order 2, Mobile order 1) */}
        <div className="order-1 lg:order-2 lg:col-span-3 relative">
          <MapView
            center={mapCenter}
            zoom={mapZoom}
            height="660px"
            onRecenter={() => {
              setActiveState('All NER');
              setMapCenter([26.2006, 92.9376]);
              setMapZoom(7);
            }}
          >
            {/* 1. Strategic Transport Corridor Polylines with Progressive Animation */}
            {layers.corridors &&
              ROUTES.map((route) => {
                const positions = route.waypoints.map((wp) => [wp.lat, wp.lng]);
                const isWaterway = route.id === 'CORR-03';
                const isCritical = route.riskLevel === 'Critical';
                const isRecommended = route.id === recommendedRouteId;

                if (isRecommended) {
                  return (
                    <AnimatedPolyline
                      key={`rec-${route.id}`}
                      positions={positions}
                      duration={1400}
                      pathOptions={{
                        color: '#F97316',
                        weight: 5,
                        opacity: 0.95
                      }}
                    >
                      <Popup>
                        <div className="text-xs p-1 min-w-[200px]">
                          <div className="flex items-center gap-1.5 pb-1 border-b border-orange-100">
                            <span className="font-bold text-[#EA580C] font-mono">{route.id}</span>
                            <span className="text-[9px] bg-orange-100 text-[#EA580C] font-extrabold px-1.5 py-0.5 rounded uppercase">
                              Active Corridor
                            </span>
                          </div>
                          <h4 className="font-bold text-slate-900 mt-1">{route.name}</h4>
                          <p className="text-slate-600 mt-0.5">{route.distanceKm} km • {route.estimatedDuration}</p>
                          <p className="text-slate-500 text-[11px] mt-1">{route.roadCondition}</p>
                        </div>
                      </Popup>
                    </AnimatedPolyline>
                  );
                }

                return (
                  <Polyline
                    key={route.id}
                    positions={positions}
                    eventHandlers={{
                      click: () => setRecommendedRouteId(route.id)
                    }}
                    pathOptions={{
                      color: isWaterway ? '#60A5FA' : isCritical ? '#F87171' : '#94A3B8',
                      weight: isWaterway ? 4 : 3,
                      opacity: 0.55,
                      dashArray: isWaterway ? '6, 6' : '4, 4'
                    }}
                  >
                    <Popup>
                      <div className="text-xs p-1">
                        <span className="font-bold text-slate-600 font-mono">{route.id}</span>
                        <h4 className="font-bold text-slate-900 mt-0.5">{route.name}</h4>
                        <p className="text-slate-600 mt-1">{route.distanceKm} km • {route.estimatedDuration}</p>
                        <button
                          onClick={() => setRecommendedRouteId(route.id)}
                          className="mt-2 w-full py-1 text-center font-bold text-white bg-[#F97316] rounded-md text-[10px]"
                        >
                          Highlight & Animate Corridor
                        </button>
                      </div>
                    </Popup>
                  </Polyline>
                );
              })}

            {/* 2. Hazard Risk Circles & Polygons */}
            {layers.riskPolygons && (
              <>
                {/* Chumukedima NH-29 Landslide Vulnerability Circle */}
                <Circle
                  center={[25.7582, 93.8561]}
                  radius={18000}
                  pathOptions={{
                    color: '#DC2626',
                    fillColor: '#DC2626',
                    fillOpacity: 0.2,
                    weight: 2
                  }}
                />
                {/* Majuli Monsoon Flood Undercurrent Zone */}
                <Circle
                  center={[26.8521, 94.2183]}
                  radius={22000}
                  pathOptions={{
                    color: '#2563EB',
                    fillColor: '#3B82F6',
                    fillOpacity: 0.18,
                    weight: 2
                  }}
                />
                {/* Sela Pass Sub-Zero Black Ice Zone */}
                <Circle
                  center={[27.5054, 92.1039]}
                  radius={14000}
                  pathOptions={{
                    color: '#D97706',
                    fillColor: '#F59E0B',
                    fillOpacity: 0.18,
                    weight: 2
                  }}
                />
              </>
            )}

            {/* 3. Strategic Supply Hubs & Mountain Passes */}
            {layers.hubs &&
              STRATEGIC_HUBS.map((hub, idx) => (
                <Marker
                  key={`hub-${idx}`}
                  position={hub.pos}
                  icon={createStrategicHubMarker(hub.name, hub.type)}
                >
                  <Popup>
                    <div className="text-xs p-1">
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">
                        {hub.type}
                      </span>
                      <h4 className="font-bold text-slate-900 mt-1">{hub.name}</h4>
                      <p className="text-slate-500 text-[11px]">{hub.state}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}

            {/* 4. Active Fleet Vehicle Markers with Simulated Movement and Selection Pulse */}
            {layers.vehicles &&
              vehiclesList.map((vehicle) => (
                <Marker
                  key={vehicle.id}
                  position={[vehicle.location.lat, vehicle.location.lng]}
                  icon={createVehicleMarker(vehicle, selectedItem?.id === vehicle.id)}
                  eventHandlers={{
                    click: () => handleVehicleClick(vehicle)
                  }}
                >
                  <Popup>
                    <div className="text-xs p-1 min-w-[200px]">
                      <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                        <span className="font-mono font-bold text-[#EA580C]">{vehicle.id}</span>
                        <StatusBadge status={vehicle.status} size="xs" />
                      </div>
                      <h4 className="font-bold text-slate-900 mt-1">{vehicle.name}</h4>
                      <p className="text-slate-500 text-[11px]">{vehicle.location.currentRoad}</p>
                      <div className="mt-2 grid grid-cols-2 gap-1 bg-slate-50 p-1.5 rounded text-[11px]">
                        <span>Speed: <strong>{vehicle.telemetry.speed} {vehicle.telemetry.speedUnit}</strong></span>
                        <span>Fuel: <strong>{vehicle.telemetry.fuelLevel}%</strong></span>
                      </div>
                      <button
                        onClick={() => handleVehicleClick(vehicle)}
                        className="mt-2 w-full py-1 text-center font-bold text-white bg-[#F97316] rounded-md text-[11px]"
                      >
                        Inspect Telemetry
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}

            {/* 5. Terrain Hazard Alert Markers */}
            {layers.hazards &&
              ALERTS.map((alert) => (
                <Marker
                  key={alert.id}
                  position={[alert.coordinates.lat, alert.coordinates.lng]}
                  icon={createHazardMarker(alert)}
                  eventHandlers={{
                    click: () => handleHazardClick(alert)
                  }}
                >
                  <Popup>
                    <div className="text-xs p-1 min-w-[220px]">
                      <span className="font-mono font-bold text-rose-600">{alert.id}</span>
                      <h4 className="font-bold text-slate-900 mt-0.5">{alert.title}</h4>
                      <p className="text-slate-600 text-[11px] mt-1">{alert.location}</p>
                      <p className="text-slate-500 text-[10px] mt-1 bg-slate-50 p-1 rounded">
                        Clearance: {alert.estimatedClearance}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
          </MapView>

          {/* Floating Telemetry Inspector Sheet (Animated with Framer Motion) */}
          <AnimatePresence>
            {selectedItem && (
              <motion.div
                key="telemetry-sheet"
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.96 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-[500] bg-white/95 backdrop-blur-md border border-[#E2E8F0] rounded-2xl p-4 shadow-elevated"
              >
                <div className="flex items-start justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#EA580C]">
                      {selectedItem.id}
                    </span>
                    <StatusBadge
                      status={selectedType === 'vehicle' ? selectedItem.status : selectedItem.severity}
                      size="xs"
                    />
                  </div>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                    aria-label="Close telemetry drawer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {selectedType === 'vehicle' ? (
                  <div className="mt-3 space-y-2.5 text-xs">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{selectedItem.name}</h3>
                      <p className="text-slate-500 text-[11px] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#F97316]" />
                        {selectedItem.location.currentRoad}, {selectedItem.location.state}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center bg-slate-50 p-2 rounded-xl border border-slate-200/70">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Speed</span>
                        <p className="font-bold text-slate-900 font-mono">
                          {selectedItem.telemetry.speed} {selectedItem.telemetry.speedUnit}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Reserve</span>
                        <p className="font-bold text-[#EA580C] font-mono">
                          {selectedItem.telemetry.fuelLevel}%
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Altitude</span>
                        <p className="font-bold text-slate-900 font-mono">
                          {selectedItem.telemetry.altitude}m
                        </p>
                      </div>
                    </div>

                    {selectedItem.cargo && (
                      <div className="bg-orange-50/50 border border-orange-100 p-2 rounded-xl">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-orange-950 flex items-center gap-1">
                            <Package className="w-3.5 h-3.5 text-[#EA580C]" />
                            {selectedItem.cargo.consignmentId}
                          </span>
                          {selectedItem.cargo.temperatureControl && (
                            <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">
                              {selectedItem.cargo.currentTemp}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1 truncate">
                          {selectedItem.cargo.description}
                        </p>
                      </div>
                    )}

                    <div className="pt-2 flex items-center gap-2">
                      <button
                        onClick={() => alert(`Calling Convoy Commander: ${selectedItem.driver.phone}`)}
                        className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#F97316]" />
                        Call Driver
                      </button>
                      <button
                        onClick={() => alert(`Rerouting ${selectedItem.id} around active hazard sectors.`)}
                        className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold text-xs shadow-2xs transition-colors"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        Reroute
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 space-y-2.5 text-xs">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{selectedItem.title}</h3>
                      <p className="text-slate-500 text-[11px] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        {selectedItem.location}
                      </p>
                    </div>

                    <p className="text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      {selectedItem.description}
                    </p>

                    <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl text-amber-950">
                      <span className="font-bold">Detour Advisory: </span>
                      <span>{selectedItem.recommendedDetour}</span>
                    </div>

                    <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Est. Clearance: {selectedItem.estimatedClearance}</span>
                      <span className="font-semibold text-rose-600">{selectedItem.severity}</span>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
