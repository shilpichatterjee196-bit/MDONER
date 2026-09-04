import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Database,
  Radio,
  Globe,
  RefreshCw,
  CheckCircle2,
  Save,
  Volume2,
  Eye,
  SlidersHorizontal,
  Layers,
  Key
} from 'lucide-react';

export default function Settings() {
  const [gpsInterval, setGpsInterval] = useState('15');
  const [weatherInterval, setWeatherInterval] = useState('10');
  const [satelliteProvider, setSatelliteProvider] = useState('ISRO NavIC / GSAT-7');
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [autoDetourDrone, setAutoDetourDrone] = useState(true);
  const [isClearingCache, setIsClearingCache] = useState(false);
  const [cacheStatus, setCacheStatus] = useState('14 items cached (1.2 MB)');
  const [saveBanner, setSaveBanner] = useState('');

  const handleClearCache = () => {
    setIsClearingCache(true);
    setTimeout(() => {
      setIsClearingCache(false);
      setCacheStatus('0 items (Cache cleared & re-synchronized with central server)');
      setTimeout(() => setCacheStatus('14 items cached (1.2 MB)'), 3000);
    }, 800);
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSaveBanner('Platform configuration successfully updated and broadcasted to local telemetry daemons.');
    setTimeout(() => setSaveBanner(''), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#111827]">System Configuration & GIS Telemetry Settings</h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 text-[#EA580C]">
              Operational Gateway
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Configure telemetry polling frequencies, satellite transponders, offline cache synchronization, and emergency alert protocols.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSaveSettings}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold shadow-xs transition-colors"
        >
          <Save className="w-4 h-4" />
          Save Configuration
        </motion.button>
      </div>

      {/* Save Notification Banner */}
      <AnimatePresence>
        {saveBanner && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between shadow-2xs"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{saveBanner}</span>
            </div>
            <button onClick={() => setSaveBanner('')} className="text-emerald-700 hover:text-emerald-900">
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 1: Telemetry & Sensor Refresh */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.05 }}
          whileHover={{ y: -2, scale: 1.006 }}
          className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4 will-change-transform"
        >
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Radio className="w-4 h-4 text-[#F97316]" />
            <h3 className="text-sm font-bold text-slate-900">Telemetry & Transponder Frequencies</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label htmlFor="setting-gps-ping-rate" className="block font-semibold text-slate-700 mb-1">
                GPS Fleet Transponder Ping Rate
              </label>
              <select
                id="setting-gps-ping-rate"
                value={gpsInterval}
                onChange={(e) => setGpsInterval(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]"
              >
                <option value="5">Every 5 seconds (High Frequency Mountain Escort)</option>
                <option value="15">Every 15 seconds (Standard Operational Default)</option>
                <option value="30">Every 30 seconds (Eco Satellite Bandwidth)</option>
                <option value="60">Every 60 seconds (Low Bandwidth Satellite Fallback)</option>
              </select>
            </div>

            <div>
              <label htmlFor="setting-weather-radar-rate" className="block font-semibold text-slate-700 mb-1">
                IMD Landslide & Weather Radar Ingestion
              </label>
              <select
                id="setting-weather-radar-rate"
                value={weatherInterval}
                onChange={(e) => setWeatherInterval(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]"
              >
                <option value="5">Every 5 minutes (Real-time Doppler Influx)</option>
                <option value="10">Every 10 minutes (Recommended Operational Mode)</option>
                <option value="30">Every 30 minutes</option>
              </select>
            </div>

            <div>
              <label htmlFor="setting-satellite-provider" className="block font-semibold text-slate-700 mb-1">
                Primary Satellite Constellation
              </label>
              <select
                id="setting-satellite-provider"
                value={satelliteProvider}
                onChange={(e) => setSatelliteProvider(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]"
              >
                <option value="ISRO NavIC / GSAT-7">ISRO NavIC / GSAT-7 (India Sovereign Satellite Grid)</option>
                <option value="GPS + GLONASS Dual Band">GPS + GLONASS Dual Band</option>
                <option value="Iridium SBD Fallback">Iridium SBD Satellite Emergency Fallback</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Section 2: GIS & Spatial Grid Settings */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.1 }}
          whileHover={{ y: -2, scale: 1.006 }}
          className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4 will-change-transform"
        >
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Globe className="w-4 h-4 text-[#F97316]" />
            <h3 className="text-sm font-bold text-slate-900">GIS Coordinates & Spatial References</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <span className="font-semibold text-slate-800">Geodetic Reference Frame</span>
                <p className="text-[11px] text-slate-500">Cartographic projection standard</p>
              </div>
              <span className="font-mono font-bold text-slate-700">WGS 84 (EPSG:4326)</span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <span className="font-semibold text-slate-800">Regional Focal Point (NER Hub)</span>
                <p className="text-[11px] text-slate-500">Guwahati Operations Center</p>
              </div>
              <span className="font-mono font-bold text-slate-700">26.2006° N, 92.9376° E</span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <span className="font-semibold text-slate-800">Tile Layer Provider</span>
                <p className="text-[11px] text-slate-500">Vector street and topography tiles</p>
              </div>
              <span className="font-semibold text-[#EA580C]">OpenStreetMap Global (Cache Enabled)</span>
            </div>
          </div>
        </motion.div>

        {/* Section 3: Offline Storage & Local Cache Management */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.15 }}
          whileHover={{ y: -2, scale: 1.006 }}
          className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4 will-change-transform"
        >
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Database className="w-4 h-4 text-[#F97316]" />
            <h3 className="text-sm font-bold text-slate-900">Offline Resilience & Storage Sync</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-600">Local Cache Database:</span>
                <span className="text-emerald-700 font-bold">IndexedDB (Online)</span>
              </div>
              <div className="flex justify-between text-slate-500 text-[11px]">
                <span>Storage Footprint:</span>
                <span className="font-mono">{cacheStatus}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-600 text-[11px]">
                Purge locally cached route segments and re-download fresh corridor coordinates:
              </span>
              <button
                type="button"
                onClick={handleClearCache}
                disabled={isClearingCache}
                className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 font-bold text-slate-700 text-xs flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-[#F97316] ${isClearingCache ? 'animate-spin' : ''}`} />
                {isClearingCache ? 'Syncing...' : 'Resync Cache'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Section 4: Emergency SOS & Accessibility Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.2 }}
          whileHover={{ y: -2, scale: 1.006 }}
          className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4 will-change-transform"
        >
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Bell className="w-4 h-4 text-[#F97316]" />
            <h3 className="text-sm font-bold text-slate-900">Emergency Protocol & Audio Triggers</h3>
          </div>

          <div className="space-y-3 text-xs text-slate-700">
            <label htmlFor="setting-sound-alerts" className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer">
              <div>
                <span className="font-semibold block text-slate-800">Acoustic Audio Alarm on Critical Landslide</span>
                <span className="text-[11px] text-slate-500">Play distinctive chime when SOS alert is broadcasted</span>
              </div>
              <input
                id="setting-sound-alerts"
                type="checkbox"
                checked={soundAlerts}
                onChange={(e) => setSoundAlerts(e.target.checked)}
                className="rounded text-[#F97316] focus:ring-2 focus:ring-[#F97316]"
              />
            </label>

            <label htmlFor="setting-auto-drone-detour" className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer">
              <div>
                <span className="font-semibold block text-slate-800">Auto-Authorize Drone Reroute for Cold-Chain</span>
                <span className="text-[11px] text-slate-500">Permit autonomous VTOL detour if road delay exceeds 4 hours</span>
              </div>
              <input
                id="setting-auto-drone-detour"
                type="checkbox"
                checked={autoDetourDrone}
                onChange={(e) => setAutoDetourDrone(e.target.checked)}
                className="rounded text-[#F97316] focus:ring-2 focus:ring-[#F97316]"
              />
            </label>

            <label htmlFor="setting-high-contrast" className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer">
              <div>
                <span className="font-semibold block text-slate-800">High-Contrast Accessibility Mode</span>
                <span className="text-[11px] text-slate-500">Enhance borders and contrast for field sunlight readability</span>
              </div>
              <input
                id="setting-high-contrast"
                type="checkbox"
                checked={highContrast}
                onChange={(e) => setHighContrast(e.target.checked)}
                className="rounded text-[#F97316] focus:ring-2 focus:ring-[#F97316]"
              />
            </label>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
