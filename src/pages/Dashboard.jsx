import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Truck,
  AlertTriangle,
  Compass,
  Zap,
  ArrowUpRight,
  ShieldCheck,
  Radio,
  MapPin,
  Clock,
  Leaf,
  PlusCircle,
  FileText,
  Activity,
  Cpu,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { Link } from 'react-router-dom';

import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import AlertCard from '../components/AlertCard';
import VehicleCard from '../components/VehicleCard';
import Modal from '../components/Modal';
import AnimatedCounter from '../components/AnimatedCounter';

import { VEHICLES } from '../data/vehicles';
import { ROUTES } from '../data/routes';
import { ALERTS } from '../data/alerts';
import { ANALYTICS } from '../data/analytics';

const AI_STATUS_STAGES = [
  'AI ANALYZING CORRIDOR TELEMETRY...',
  'ANALYZING ROAD & MUD CONDITIONS...',
  'ANALYZING MONSOON WEATHER SENSORS...',
  'ANALYZING REMOTE DISTRICT ACCESSIBILITY...',
  'CALCULATING OPTIMAL MULTI-MODAL PATHS...'
];

export default function Dashboard() {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [inspectVehicle, setInspectVehicle] = useState(null);
  const [isSosModalOpen, setIsSosModalOpen] = useState(false);
  const [aiStageIndex, setAiStageIndex] = useState(0);

  // Active items for quick display
  const activeAlerts = ALERTS.slice(0, 3);
  const activeVehicles = VEHICLES.slice(0, 3);

  // Cycle the live AI Intelligence ticker smoothly every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setAiStageIndex((prev) => (prev + 1) % AI_STATUS_STAGES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Framer motion container variants for smooth staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.28, ease: 'easeOut' }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 min-w-0"
    >
      {/* Top Banner */}
      <motion.div
        variants={itemVariants}
        className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 min-w-0"
      >
        <div className="min-w-0 flex-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#EA580C] text-xs font-semibold mb-2 max-w-full">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F97316] flex-shrink-0" />
            <span className="truncate">SIH26002 • North Eastern Region Spatial Intelligence Network</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#111827] tracking-tight break-words">
            Integrated Logistics Operations Center
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1 break-words">
            Real-time multi-modal monitoring across Assam, Arunachal, Meghalaya, Manipur, Mizoram, Nagaland, Tripura & Sikkim.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto flex-shrink-0 flex-wrap sm:flex-nowrap">
          <Link
            to="/live-map"
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] active:scale-95 text-white text-xs font-semibold shadow-xs transition-all whitespace-nowrap"
          >
            <MapPin className="w-4 h-4 flex-shrink-0" />
            Launch Live GIS Map
          </Link>
          <button
            onClick={() => setIsSosModalOpen(true)}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 border border-red-200 hover:bg-red-100 active:scale-95 text-red-700 text-xs font-semibold transition-all whitespace-nowrap"
          >
            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
            Trigger SOS Triage
          </button>
        </div>
      </motion.div>

      {/* AI Logistics Intelligence Alive Banner */}
      <motion.div
        variants={itemVariants}
        className="relative bg-gradient-to-r from-orange-50/90 via-white to-amber-50/50 border border-orange-200/80 rounded-2xl p-4 shadow-xs overflow-hidden min-w-0"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 min-w-0">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="relative flex-shrink-0">
              <span className="absolute -inset-1 rounded-full bg-[#F97316]/30 animate-ping" />
              <div className="relative w-9 h-9 rounded-xl bg-[#F97316] text-white flex items-center justify-center shadow-xs">
                <Cpu className="w-4 h-4 animate-pulse" />
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider whitespace-nowrap">
                  AI Logistics Intelligence
                </span>
                <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex-shrink-0 whitespace-nowrap">
                  REAL-TIME ACTIVE
                </span>
              </div>
              <div className="h-5 flex items-center overflow-hidden mt-0.5 min-w-0">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={aiStageIndex}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.25 }}
                    className="text-xs font-mono font-bold text-[#EA580C] truncate"
                    title={AI_STATUS_STAGES[aiStageIndex]}
                  >
                    {AI_STATUS_STAGES[aiStageIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto text-xs text-slate-600 flex-shrink-0">
            <span className="hidden lg:inline text-slate-500 whitespace-nowrap">Heuristic Solver:</span>
            <span className="font-mono bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs font-semibold text-slate-800 whitespace-nowrap">
              A* Terrain-Weighted
            </span>
            <Link
              to="/route-optimization"
              className="inline-flex items-center gap-1 font-bold text-[#EA580C] hover:underline whitespace-nowrap"
            >
              Optimize <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards Grid with Count-Up Animations */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 min-w-0">
        <StatCard
          title="ACTIVE VEHICLES"
          value="124"
          change="+8"
          trend="up"
          caption="Rolling Convoys"
          badgeType="success"
        />
        <StatCard
          title="DELIVERIES IN TRANSIT"
          value="86"
          change="+12"
          trend="up"
          caption="On Track"
          badgeType="orange"
        />
        <StatCard
          title="DELAYED DELIVERIES"
          value="12"
          change="NH-29"
          trend="down"
          caption="Mud Detours"
          badgeType="warning"
        />
        <StatCard
          title="CRITICAL ALERTS"
          value="07"
          change="2 BRO"
          trend="down"
          caption="Priority Watch"
          badgeType="critical"
        />
        <StatCard
          title="ACCESSIBLE ROUTES"
          value="78%"
          change="+3.4%"
          trend="up"
          caption="Passes Open"
          badgeType="success"
        />
        <StatCard
          title="BLOCKED ROUTES"
          value="14"
          change="-2 today"
          trend="up"
          caption="Debris Cleared"
          badgeType="default"
        />
      </motion.div>

      {/* Secondary Operational Stats Row */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 min-w-0">
        <StatCard
          title="Total Active NER Convoys"
          value={ANALYTICS.summary.totalActiveVehicles}
          change="+8.4%"
          trend="up"
          caption="1,485 Tons cargo rolling"
          icon={Truck}
          badgeText="14 Units Online"
          badgeType="success"
        />

        <StatCard
          title="Active Terrain Hazards"
          value={ANALYTICS.summary.activeHazardAlerts}
          change="2 Critical"
          trend="down"
          caption="NH-29 & Teesta Watch"
          icon={AlertTriangle}
          badgeText="Active Hazards"
          badgeType="critical"
        />

        <StatCard
          title="SLA On-Time Compliance"
          value={`${ANALYTICS.summary.onTimeDeliveryRate}%`}
          change="+1.8% vs Aug"
          trend="up"
          caption="Zero cold-chain breaches"
          icon={Zap}
          badgeText="Optimal"
          badgeType="orange"
        />

        <StatCard
          title="Riverway Fuel Saved"
          value={`${(ANALYTICS.summary.fuelSavedLitersMonth / 1000).toFixed(1)}k L`}
          change={`-${ANALYTICS.summary.carbonOffsetTonsMonth}T CO2`}
          trend="up"
          caption="NW-2 Barge Switching"
          icon={Leaf}
          badgeText="Green Transit"
          badgeType="success"
        />
      </motion.div>

      {/* Priority Hazards & Critical Convoys Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-w-0">
        {/* Left 2 Cols: Live Convoys & Telematics Preview */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6 min-w-0">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-xs min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-2 min-w-0">
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-[#111827] truncate">Active Convoys & High-Altitude Transits</h3>
                <p className="text-xs text-[#64748B] truncate">Real-time GPS coordinates, speed, and fuel telematics</p>
              </div>
              <Link
                to="/vehicles"
                className="text-xs font-semibold text-[#EA580C] hover:underline flex items-center gap-1 flex-shrink-0 whitespace-nowrap"
              >
                View Fleet Registry <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" />
              </Link>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 min-w-0">
              {activeVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onInspect={(v) => setInspectVehicle(v)}
                />
              ))}
            </div>
          </div>

          {/* Corridor Readiness Snapshot */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-xs min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-2 min-w-0">
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-[#111827] truncate">High-Priority Corridors Health</h3>
                <p className="text-xs text-[#64748B] truncate">Automated risk index and bottleneck detection</p>
              </div>
              <Link
                to="/route-optimization"
                className="text-xs font-semibold text-[#EA580C] hover:underline flex items-center gap-1 flex-shrink-0 whitespace-nowrap"
              >
                Run Multi-Modal Solver <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" />
              </Link>
            </div>

            <div className="mt-4 divide-y divide-slate-100 min-w-0">
              {ROUTES.slice(0, 3).map((route) => (
                <motion.div
                  key={route.id}
                  whileHover={{ x: 2 }}
                  className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 px-2 rounded-xl transition-colors min-w-0"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#F97316] flex items-center justify-center font-mono font-bold text-xs flex-shrink-0">
                      {route.id.split('-')[1]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4
                        className="text-xs font-bold text-[#111827] line-clamp-2 break-words leading-snug"
                        title={route.name}
                      >
                        {route.name}
                      </h4>
                      <p
                        className="text-[11px] text-slate-500 truncate mt-0.5"
                        title={`${route.origin.name.split(',')[0]} → ${route.destination.name.split(',')[0]} • ${route.distanceKm} km`}
                      >
                        {route.origin.name.split(',')[0]} → {route.destination.name.split(',')[0]} • {route.distanceKm} km
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 flex-shrink-0 self-start sm:self-center">
                    <StatusBadge status={route.riskLevel} size="xs" />
                    <span className="text-xs font-mono font-semibold text-slate-700 whitespace-nowrap">
                      {route.estimatedDuration}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right 1 Col: Live Hazard Alerts */}
        <motion.div variants={itemVariants} className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col min-w-0">
          <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] gap-2 min-w-0">
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-bold text-[#111827] truncate">Live Terrain Hazards</h3>
              <p className="text-xs text-[#64748B] truncate">IMD & BRO ground sensor alerts</p>
            </div>
            <div className="flex-shrink-0">
              <StatusBadge status="Critical Watch" size="xs" />
            </div>
          </div>

          <div className="mt-4 space-y-3 flex-1 min-w-0">
            {activeAlerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onSelect={(a) => setSelectedAlert(a)}
              />
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 min-w-0">
            <Link
              to="/alerts"
              className="w-full inline-flex items-center justify-center py-2.5 text-xs font-bold text-[#EA580C] bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors whitespace-nowrap text-center"
            >
              Open Incident Triage Center ({ALERTS.length} Alerts)
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Alert Details Modal */}
      <Modal
        isOpen={!!selectedAlert}
        onClose={() => setSelectedAlert(null)}
        title={selectedAlert?.title || 'Hazard Details'}
        subtitle={`Incident Code: ${selectedAlert?.id} • Reported ${selectedAlert?.reportedAt}`}
        icon={AlertTriangle}
      >
        {selectedAlert && (
          <div className="space-y-4 text-xs min-w-0">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 min-w-0">
              <span className="text-slate-500 font-medium">Affected Sector:</span>
              <p className="text-sm font-bold text-slate-900 mt-0.5 break-words">{selectedAlert.location}</p>
              <p className="text-slate-600 mt-1 font-mono break-words">Corridor: {selectedAlert.corridorName}</p>
            </div>

            <div className="min-w-0">
              <h4 className="font-bold text-slate-800 mb-1">Geological / Meteorological Description:</h4>
              <p className="text-slate-600 leading-relaxed bg-white p-3 rounded-xl border border-slate-200 break-words">
                {selectedAlert.description}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 min-w-0">
              <span className="font-bold">Recommended Detour Action:</span>
              <p className="mt-0.5 break-words leading-relaxed">{selectedAlert.recommendedDetour}</p>
            </div>

            <div className="pt-2 flex justify-end gap-2 flex-wrap sm:flex-nowrap">
              <button
                onClick={() => setSelectedAlert(null)}
                className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 whitespace-nowrap"
              >
                Dismiss
              </button>
              <Link
                to="/route-optimization"
                className="px-4 py-2 rounded-xl bg-[#F97316] text-white font-semibold hover:bg-[#EA580C] whitespace-nowrap"
              >
                Compute Emergency Bypass
              </Link>
            </div>
          </div>
        )}
      </Modal>

      {/* Vehicle Telematics Modal */}
      <Modal
        isOpen={!!inspectVehicle}
        onClose={() => setInspectVehicle(null)}
        title={inspectVehicle?.name || 'Vehicle Telematics'}
        subtitle={`ID: ${inspectVehicle?.id} • Plate: ${inspectVehicle?.plateNumber}`}
        icon={Truck}
      >
        {inspectVehicle && (
          <div className="space-y-4 text-xs min-w-0">
            <div className="grid grid-cols-2 gap-3 min-w-0">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 min-w-0">
                <span className="text-slate-400 font-semibold uppercase text-[10px] block truncate">Speed</span>
                <p className="text-lg font-bold text-slate-900 font-mono mt-0.5 truncate">
                  {inspectVehicle.telemetry.speed} {inspectVehicle.telemetry.speedUnit}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 min-w-0">
                <span className="text-slate-400 font-semibold uppercase text-[10px] block truncate">Energy Level</span>
                <p className="text-lg font-bold text-[#EA580C] font-mono mt-0.5 truncate">
                  {inspectVehicle.telemetry.fuelLevel}%
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2 min-w-0">
              <div className="flex justify-between gap-2 min-w-0">
                <span className="text-slate-500 flex-shrink-0">Commander:</span>
                <span className="font-semibold text-slate-900 truncate" title={inspectVehicle.driver.name}>
                  {inspectVehicle.driver.name}
                </span>
              </div>
              <div className="flex justify-between gap-2 min-w-0">
                <span className="text-slate-500 flex-shrink-0">Contact:</span>
                <span className="font-mono text-slate-900 truncate" title={inspectVehicle.driver.phone}>
                  {inspectVehicle.driver.phone}
                </span>
              </div>
              <div className="flex justify-between gap-2 min-w-0">
                <span className="text-slate-500 flex-shrink-0">Current Road:</span>
                <span className="font-medium text-slate-900 truncate" title={inspectVehicle.location.currentRoad}>
                  {inspectVehicle.location.currentRoad}
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 flex-wrap sm:flex-nowrap">
              <button
                onClick={() => setInspectVehicle(null)}
                className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 whitespace-nowrap"
              >
                Close
              </button>
              <Link
                to="/live-map"
                className="px-4 py-2 rounded-xl bg-[#F97316] text-white font-semibold hover:bg-[#EA580C] whitespace-nowrap"
              >
                Locate on GIS Map
              </Link>
            </div>
          </div>
        )}
      </Modal>

      {/* Emergency SOS Broadcast Modal */}
      <Modal
        isOpen={isSosModalOpen}
        onClose={() => setIsSosModalOpen(false)}
        title="Emergency Operations SOS Broadcast"
        subtitle="Publish high-priority alert across all connected convoy radios and mobile apps"
        icon={AlertTriangle}
      >
        <div className="space-y-4 text-xs min-w-0">
          <div>
            <label htmlFor="dash-sos-incident-sector" className="block font-semibold text-slate-700 mb-1">
              Incident Sector
            </label>
            <input
              id="dash-sos-incident-sector"
              type="text"
              defaultValue="NH-29 Kohima Bypass (Rockfall Hazard)"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label htmlFor="dash-sos-advisory" className="block font-semibold text-slate-700 mb-1">
              Advisory Instructions
            </label>
            <textarea
              id="dash-sos-advisory"
              rows={3}
              defaultValue="Halt all non-essential heavy axle freight at Dimapur staging depot until BRO clearance at 16:00 IST."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 leading-relaxed"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2 flex-wrap sm:flex-nowrap">
            <button
              onClick={() => setIsSosModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 whitespace-nowrap"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert('SOS Alert broadcasted successfully to all 142 NER field convoys.');
                setIsSosModalOpen(false);
              }}
              className="px-4 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 shadow-xs whitespace-nowrap"
            >
              Broadcast Immediate SOS
            </button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}
