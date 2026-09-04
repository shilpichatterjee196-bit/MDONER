import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Marker, Popup, Polyline } from 'react-leaflet';
import {
  Compass,
  Zap,
  ArrowRight,
  Clock,
  Navigation,
  MountainSnow,
  AlertTriangle,
  CheckCircle2,
  SlidersHorizontal,
  Leaf,
  Fuel,
  ShieldCheck,
  Truck,
  Layers,
  FileCheck,
  Send,
  RefreshCw,
  Package,
  ThermometerSnowflake,
  ExternalLink,
  Cpu,
  Activity,
  MapPin
} from 'lucide-react';

import MapView from '../components/MapView';
import AnimatedPolyline from '../components/AnimatedPolyline';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import { ROUTES } from '../data/routes';
import { ALERTS } from '../data/alerts';
import { createStrategicHubMarker } from '../utils/leafletIcons';

const ORIGIN_HUBS = [
  { id: 'hub-ghy', name: 'Guwahati Multi-Modal Logistic Hub', state: 'Assam' },
  { id: 'hub-pnd', name: 'Pandu Inland River Port (NW-2)', state: 'Assam' },
  { id: 'hub-slc', name: 'Silchar Logistics Park', state: 'Assam' },
  { id: 'hub-dmp', name: 'Dimapur Transshipment Railhead', state: 'Nagaland' },
  { id: 'hub-slg', name: 'Siliguri Strategic Gateway Park', state: 'West Bengal / NER Border' },
  { id: 'hub-itn', name: 'Itanagar SkyLink Droneport', state: 'Arunachal Pradesh' }
];

const DESTINATION_HUBS = [
  { id: 'dest-twn', name: 'Tawang Civil Supply Depot', state: 'Arunachal Pradesh', corridorId: 'CORR-01' },
  { id: 'dest-imp', name: 'Imphal Capital Distribution Center', state: 'Manipur', corridorId: 'CORR-04' },
  { id: 'dest-khm', name: 'Kohima Central Supply Depot', state: 'Nagaland', corridorId: 'CORR-04' },
  { id: 'dest-aiz', name: 'Aizawl North Logistic Depot', state: 'Mizoram', corridorId: 'CORR-05' },
  { id: 'dest-slc', name: 'Silchar Barak Valley Depot', state: 'Assam', corridorId: 'CORR-02' },
  { id: 'dest-gtk', name: 'Gangtok Central Goods Depot', state: 'Sikkim', corridorId: 'CORR-06' },
  { id: 'dest-dhb', name: 'Dhubri Inland Border Port', state: 'Assam', corridorId: 'CORR-03' }
];

const CARGO_TYPES = [
  { id: 'med', label: 'Cold-Chain Vaccines & Blood Units', tempRequired: '2°C to 8°C', priority: 'Critical' },
  { id: 'food', label: 'Disaster Relief High-Protein Food Rations', tempRequired: 'Ambient', priority: 'High' },
  { id: 'fuel', label: 'High-Altitude Kerosene & Heating Fuel', tempRequired: 'Hazardous', priority: 'High' },
  { id: 'bulk', label: 'Agro-Fertilizers & Construction Steel', tempRequired: 'Dry Cargo', priority: 'Standard' }
];

const PROCESSING_STEPS = [
  { id: 1, text: 'Analyzing road conditions...' },
  { id: 2, text: 'Analyzing weather...' },
  { id: 3, text: 'Analyzing accessibility...' },
  { id: 4, text: 'Calculating optimal route...' }
];

export default function RouteOptimization() {
  const [origin, setOrigin] = useState(ORIGIN_HUBS[0].id);
  const [destination, setDestination] = useState(DESTINATION_HUBS[0].id);
  const [cargoType, setCargoType] = useState(CARGO_TYPES[0].id);

  // Constraint parameters
  const [avoidLandslides, setAvoidLandslides] = useState(true);
  const [enableWaterway, setEnableWaterway] = useState(true);
  const [enableDrones, setEnableDrones] = useState(true);
  const [priorityMode, setPriorityMode] = useState('speed');

  const [isSolving, setIsSolving] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [solution, setSolution] = useState(null);
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  const [dispatchSuccess, setDispatchSuccess] = useState(false);

  // Run AI Solver Simulation with 4 requested sequential steps
  const handleSolveRoute = () => {
    setIsSolving(true);
    setSolution(null);
    setCurrentStepIndex(0);

    setTimeout(() => {
      setCurrentStepIndex(1);
    }, 450);

    setTimeout(() => {
      setCurrentStepIndex(2);
    }, 900);

    setTimeout(() => {
      setCurrentStepIndex(3);
    }, 1350);

    setTimeout(() => {
      setIsSolving(false);

      const destObj = DESTINATION_HUBS.find((d) => d.id === destination);
      const matchedCorridor = ROUTES.find((r) => r.id === destObj?.corridorId) || ROUTES[0];
      const isDroneApplicable = cargoType === 'med' && enableDrones;
      const isWaterwayApplicable = enableWaterway && (destination === 'dest-dhb' || destination === 'dest-twn');

      setSolution({
        originName: ORIGIN_HUBS.find((h) => h.id === origin)?.name,
        destinationName: destObj?.name,
        cargo: CARGO_TYPES.find((c) => c.id === cargoType),
        corridor: matchedCorridor,
        recommended: {
          title: isDroneApplicable
            ? 'Garuda SkyWay: Autonomous VTOL Drone Flight'
            : isWaterwayApplicable
            ? 'Green Hybrid: River Ro-Pax + High-Ground 4x4 Convoy'
            : 'Reinforced 6x6 Off-Road Weather-Hardened Corridor',
          modalityBadge: isDroneApplicable
            ? 'VTOL Drone Flight'
            : isWaterwayApplicable
            ? 'Riverway (NW-2) + 4x4 Road'
            : 'Multi-Axle Highway Convoy',
          transitTime: isDroneApplicable ? '2h 15m' : isWaterwayApplicable ? '10h 45m' : '14h 30m',
          distanceKm: isDroneApplicable ? 190 : isWaterwayApplicable ? 385 : 485,
          riskScore: isDroneApplicable ? 14 : isWaterwayApplicable ? 24 : 68,
          fuelSavedPct: isDroneApplicable ? 65 : isWaterwayApplicable ? 42 : 8,
          carbonOffsetKg: isDroneApplicable ? 140 : isWaterwayApplicable ? 320 : 45,
          elevationProfile: isDroneApplicable
            ? 'Flight Level 85 (2,600m MSL Cruise)'
            : 'Sea-level 55m ascending to 2,800m pass',
          itinerary: [
            {
              segment: 'Stage 1: Dispatch from Origin Hub',
              mode: 'Loading & Pre-Flight / Convoy Telemetry Check',
              duration: '25 mins',
              status: 'Clear'
            },
            {
              segment: isWaterwayApplicable
                ? 'Stage 2: NW-2 Riverway Freight to Tezpur Transshipment Port'
                : 'Stage 2: Lowland Bypass avoiding landslide-prone hairpins',
              mode: isWaterwayApplicable ? 'Inland River Barge (Luit Express)' : 'Paved 4-Lane Sector',
              duration: isWaterwayApplicable ? '5h 30m' : '4h 15m',
              status: 'Optimal Flow'
            },
            {
              segment: 'Stage 3: Mountain Ridge Incline with Terrain Radar Telemetry',
              mode: 'Reinforced 4x4 Convoy with Snow/Mud Grip Tracking',
              duration: '3h 50m',
              status: 'Caution (Mist)'
            },
            {
              segment: 'Stage 4: Final Mile Arrival & Secure Depot Offload',
              mode: 'Destination Verification & Cold-Chain Handover',
              duration: '30 mins',
              status: 'Verified Safe'
            }
          ]
        },
        alternative: {
          title: 'Direct National Highway Corridor (Standard Road)',
          transitTime: '15h 10m',
          distanceKm: 485,
          riskScore: 78,
          warning: 'Traverses active landslide warning zone near Chumukedima / Bhalukpong with 6.5 hr expected clearance delay.'
        }
      });
    }, 1800);
  };

  // Initial solve on mount
  React.useEffect(() => {
    handleSolveRoute();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#111827]">AI Multi-Modal Route Optimization Engine</h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 text-[#EA580C]">
              A* Heuristic Solver Active
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Dynamic terrain routing that synthesizes live IMD landslide feeds, river navigability on NW-2, elevation slope resistance, and drone corridors.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSolveRoute}
          disabled={isSolving}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-semibold shadow-xs transition-all disabled:opacity-50"
        >
          {isSolving ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Zap className="w-4 h-4" />
          )}
          {isSolving ? 'Optimizing with AI...' : 'OPTIMIZE WITH AI'}
        </motion.button>
      </div>

      {/* Main Grid: Parameters Configuration & Solver Output */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Route Configuration Parameters */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#F97316]" />
              Optimization Parameters
            </h3>
            <span className="text-[10px] font-mono text-slate-400">v3.4 Engine</span>
          </div>

          {/* Origin Hub */}
          <div>
            <label htmlFor="origin-hub-select" className="block text-xs font-semibold text-slate-700 mb-1">
              Origin Logistics Hub (NER)
            </label>
            <select
              id="origin-hub-select"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-hidden focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]"
            >
              {ORIGIN_HUBS.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name} ({h.state})
                </option>
              ))}
            </select>
          </div>

          {/* Destination Hub */}
          <div>
            <label htmlFor="destination-hub-select" className="block text-xs font-semibold text-slate-700 mb-1">
              Destination Outpost / Supply Depot
            </label>
            <select
              id="destination-hub-select"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-hidden focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]"
            >
              {DESTINATION_HUBS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.state})
                </option>
              ))}
            </select>
          </div>

          {/* Cargo Classification */}
          <div>
            <label htmlFor="cargo-type-select" className="block text-xs font-semibold text-slate-700 mb-1">
              Cargo Classification & Sensitivity
            </label>
            <select
              id="cargo-type-select"
              value={cargoType}
              onChange={(e) => setCargoType(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-hidden focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]"
            >
              {CARGO_TYPES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label} [{c.priority}]
                </option>
              ))}
            </select>
          </div>

          {/* Optimization Priority Mode */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Optimization Priority</label>
            <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-xl text-xs">
              <button
                type="button"
                onClick={() => setPriorityMode('speed')}
                className={`py-1.5 font-semibold rounded-lg transition-colors ${
                  priorityMode === 'speed'
                    ? 'bg-white text-[#EA580C] shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Fastest
              </button>
              <button
                type="button"
                onClick={() => setPriorityMode('safety')}
                className={`py-1.5 font-semibold rounded-lg transition-colors ${
                  priorityMode === 'safety'
                    ? 'bg-white text-[#EA580C] shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Safest
              </button>
              <button
                type="button"
                onClick={() => setPriorityMode('eco')}
                className={`py-1.5 font-semibold rounded-lg transition-colors ${
                  priorityMode === 'eco'
                    ? 'bg-white text-[#EA580C] shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Eco / River
              </button>
            </div>
          </div>

          {/* Constraint Checkboxes */}
          <div className="pt-2 border-t border-slate-100 space-y-2.5 text-xs text-slate-700">
            <span className="text-[11px] font-bold text-[#EA580C] uppercase tracking-wider block">
              Multi-Modal Solver Constraints
            </span>

            <label htmlFor="avoid-landslides-cb" className="flex items-center gap-2 cursor-pointer">
              <input
                id="avoid-landslides-cb"
                type="checkbox"
                checked={avoidLandslides}
                onChange={(e) => setAvoidLandslides(e.target.checked)}
                className="rounded text-[#F97316] focus:ring-2 focus:ring-[#F97316]"
              />
              <span>Avoid sectors with &gt;50% Landslide Risk</span>
            </label>

            <label htmlFor="enable-waterway-cb" className="flex items-center gap-2 cursor-pointer">
              <input
                id="enable-waterway-cb"
                type="checkbox"
                checked={enableWaterway}
                onChange={(e) => setEnableWaterway(e.target.checked)}
                className="rounded text-[#F97316] focus:ring-2 focus:ring-[#F97316]"
              />
              <span>Enable Brahmaputra NW-2 Barge Transit</span>
            </label>

            <label htmlFor="enable-drones-cb" className="flex items-center gap-2 cursor-pointer">
              <input
                id="enable-drones-cb"
                type="checkbox"
                checked={enableDrones}
                onChange={(e) => setEnableDrones(e.target.checked)}
                className="rounded text-[#F97316] focus:ring-2 focus:ring-[#F97316]"
              />
              <span>Permit VTOL Drone corridor for cold-chain</span>
            </label>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSolveRoute}
            disabled={isSolving}
            className="w-full py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4" />
            Recalculate Corridor
          </motion.button>
        </div>

        {/* Right Column (2 spans): AI Recommendations & Sequential Reveal */}
        <div className="lg:col-span-2 space-y-5">
          <AnimatePresence mode="wait">
            {isSolving ? (
              /* Professional 4-step AI processing sequence */
              <motion.div
                key="solving-state"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="bg-white border border-[#E2E8F0] rounded-2xl p-8 sm:p-12 shadow-xs flex flex-col items-center justify-center text-center min-h-[440px]"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-200 text-[#F97316] flex items-center justify-center shadow-xs">
                    <Cpu className="w-8 h-8 animate-pulse text-[#F97316]" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#EA580C] animate-ping" />
                </div>

                <h3 className="text-base font-extrabold text-slate-900 tracking-tight mb-2">
                  AI LOGISTICS INTELLIGENCE SOLVER
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mb-8">
                  Processing multi-modal transit networks, terrain slope penalties, and real-time IMD hazard radar feeds.
                </p>

                {/* 4 Sequential Steps Display */}
                <div className="w-full max-w-md space-y-2.5 text-left">
                  {PROCESSING_STEPS.map((step, idx) => {
                    const isDone = idx < currentStepIndex;
                    const isCurrent = idx === currentStepIndex;
                    const isPending = idx > currentStepIndex;

                    return (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
                          isDone
                            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900 font-semibold'
                            : isCurrent
                            ? 'bg-orange-50 border-orange-300 text-orange-900 font-bold ring-2 ring-orange-100 shadow-xs'
                            : 'bg-slate-50/60 border-slate-200 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                              isDone
                                ? 'bg-emerald-600 text-white'
                                : isCurrent
                                ? 'bg-[#F97316] text-white animate-pulse'
                                : 'bg-slate-200 text-slate-500'
                            }`}
                          >
                            {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : step.id}
                          </span>
                          <span>
                            Step {step.id}: {step.text}
                          </span>
                        </div>

                        {isCurrent && (
                          <span className="text-[10px] uppercase font-bold text-[#EA580C] animate-pulse">
                            Processing...
                          </span>
                        )}
                        {isDone && (
                          <span className="text-[10px] font-bold text-emerald-700">
                            Completed
                          </span>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ) : solution ? (
              /* Sequential Reveal of Result Cards */
              <motion.div
                key="solution-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {/* 1. Primary Recommended Pathway Card */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="bg-white border-2 border-[#F97316] rounded-2xl p-5 sm:p-6 shadow-card relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 bg-[#F97316] text-white font-extrabold text-[10px] px-3 py-1 rounded-bl-xl tracking-wider uppercase flex items-center gap-1 shadow-xs">
                    <Zap className="w-3 h-3 fill-white" />
                    AI RECOMMENDED ROUTE
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-1 flex-wrap min-w-0">
                    <span className="truncate max-w-[220px]" title={solution.originName}>Corridor: {solution.originName}</span>
                    <ArrowRight className="w-3 h-3 text-[#F97316] flex-shrink-0" />
                    <span className="truncate max-w-[220px]" title={solution.destinationName}>{solution.destinationName}</span>
                  </div>

                  <h3 className="text-lg font-extrabold text-[#111827] mt-1 break-words line-clamp-2" title={solution.recommended.title}>
                    {solution.recommended.title}
                  </h3>

                  {/* Metrics Row with Animated Counters */}
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-orange-50/50 p-3 rounded-xl border border-orange-200/70 text-center">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Est. Time</span>
                      <span className="text-base font-extrabold text-slate-900 font-mono">
                        {solution.recommended.transitTime}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Distance</span>
                      <span className="text-base font-extrabold text-slate-900 font-mono">
                        {solution.recommended.distanceKm} km
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Risk Score</span>
                      <span className="text-base font-extrabold text-emerald-700 font-mono flex items-center justify-center gap-0.5">
                        {solution.recommended.riskScore}/100
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Fuel Savings</span>
                      <span className="text-base font-extrabold text-blue-700 font-mono">
                        +{solution.recommended.fuelSavedPct}%
                      </span>
                    </div>
                  </div>

                  {/* Modality & Elevation Specs */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-700">Modal Switch:</span>
                      <span className="bg-orange-100 text-[#EA580C] px-2.5 py-0.5 rounded-full font-bold text-[11px]">
                        {solution.recommended.modalityBadge}
                      </span>
                    </div>
                    <div className="text-slate-500 flex items-center gap-1">
                      <MountainSnow className="w-3.5 h-3.5 text-slate-400" />
                      <span>{solution.recommended.elevationProfile}</span>
                    </div>
                  </div>

                  {/* Animated Route Corridor Map Preview */}
                  {solution.corridor && (
                    <div className="mt-5 rounded-xl overflow-hidden border border-orange-200/80 shadow-xs relative">
                      <div className="absolute top-2.5 left-2.5 z-[400] bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs flex items-center gap-2 text-[11px]">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] animate-pulse" />
                        <span className="font-bold text-slate-800">Dynamic AI Route Trace</span>
                        <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">Origin → Destination</span>
                      </div>

                      <MapView
                        center={[
                          (solution.corridor.origin.lat + solution.corridor.destination.lat) / 2,
                          (solution.corridor.origin.lng + solution.corridor.destination.lng) / 2
                        ]}
                        zoom={7}
                        height="240px"
                      >
                        {/* Recommended Route: Animated Polyline in Orange */}
                        <AnimatedPolyline
                          positions={solution.corridor.waypoints.map((wp) => [wp.lat, wp.lng])}
                          duration={1400}
                          pathOptions={{
                            color: '#F97316',
                            weight: 5,
                            opacity: 0.95
                          }}
                        />

                        {/* Alternative Route: Softer visual treatment */}
                        <Polyline
                          positions={[
                            [solution.corridor.origin.lat, solution.corridor.origin.lng],
                            [
                              (solution.corridor.origin.lat + solution.corridor.destination.lat) / 2 - 0.25,
                              (solution.corridor.origin.lng + solution.corridor.destination.lng) / 2 + 0.35
                            ],
                            [solution.corridor.destination.lat, solution.corridor.destination.lng]
                          ]}
                          pathOptions={{
                            color: '#94A3B8',
                            weight: 3,
                            opacity: 0.55,
                            dashArray: '6, 6'
                          }}
                        />

                        {/* Origin Marker */}
                        <Marker
                          position={[solution.corridor.origin.lat, solution.corridor.origin.lng]}
                          icon={createStrategicHubMarker(solution.corridor.origin.name, 'Hub')}
                        />

                        {/* Destination Marker */}
                        <Marker
                          position={[solution.corridor.destination.lat, solution.corridor.destination.lng]}
                          icon={createStrategicHubMarker(solution.corridor.destination.name, 'Hub')}
                        />
                      </MapView>
                    </div>
                  )}

                  {/* Step-by-Step Waypoint Timeline */}
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                      Multi-Modal Dispatch Waypoints
                    </h4>

                    <div className="space-y-3">
                      {solution.recommended.itinerary.map((leg, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + idx * 0.08 }}
                          className="flex items-start gap-3 text-xs"
                        >
                          <div className="w-6 h-6 rounded-full bg-orange-100 text-[#EA580C] font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </div>
                          <div className="flex-1 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-800">{leg.segment}</span>
                              <span className="font-mono text-slate-500 font-semibold">{leg.duration}</span>
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                              <span>{leg.mode}</span>
                              <span className="font-semibold text-emerald-700">{leg.status}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Dispatch Trigger Bar */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-xs text-slate-500 min-w-0 flex-1 break-words">
                      Calculated for: <strong className="text-slate-800">{solution.cargo.label}</strong>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setDispatchSuccess(false);
                        setIsDispatchModalOpen(true);
                      }}
                      className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 flex-shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Deploy Mission Convoy
                    </motion.button>
                  </div>
                </motion.div>

                {/* 2. Alternative Highway Corridor Card (Comparison) */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.35, ease: 'easeOut' }}
                  className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider min-w-0">
                      Alternative Pathway: Direct Road Highway
                    </span>
                    <span className="text-xs font-mono text-slate-600 font-bold flex-shrink-0">
                      {solution.alternative.distanceKm} km • {solution.alternative.transitTime}
                    </span>
                  </div>

                  <div className="mt-3 flex items-start gap-2.5 bg-red-50 border border-red-200 p-3 rounded-xl text-xs text-red-900">
                    <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-red-950">Terrain Friction Alert: </span>
                      <span>{solution.alternative.warning}</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      {/* Convoy Deployment Modal */}
      <Modal
        isOpen={isDispatchModalOpen}
        onClose={() => setIsDispatchModalOpen(false)}
        title="Deploy Mission Convoy Order"
        subtitle="Authorize logistics route dispatch & sync with Central NER Command"
        icon={Send}
      >
        {dispatchSuccess ? (
          <div className="p-4 text-center space-y-3 text-xs">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Convoy Dispatched Successfully!</h4>
            <p className="text-slate-600">
              Mission Order <strong>NER-ORD-2026-771</strong> has been locked into GPS telematics and broadcasted to convoy drivers and river pilot vessels.
            </p>
            <div className="pt-3">
              <button
                onClick={() => setIsDispatchModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#F97316] text-white font-bold"
              >
                Close Order
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Origin Hub:</span>
                <span className="font-bold text-slate-800">{solution?.originName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Destination Hub:</span>
                <span className="font-bold text-slate-800">{solution?.destinationName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Cargo Consignment:</span>
                <span className="font-bold text-[#EA580C]">{solution?.cargo?.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Duration:</span>
                <span className="font-mono font-bold text-slate-900">{solution?.recommended?.transitTime}</span>
              </div>
            </div>

            <div>
              <label htmlFor="assigned-commander-input" className="block font-semibold text-slate-700 mb-1">
                Assigned Lead Convoy Commander
              </label>
              <input
                id="assigned-commander-input"
                type="text"
                defaultValue="Bhaskar Jyoti Gogoi (NER-TRK-101 / AS-01-EA-4921)"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 outline-hidden focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]"
              />
            </div>

            <div>
              <label htmlFor="dispatcher-auth-code" className="block font-semibold text-slate-700 mb-1">
                Dispatcher Authorization Code
              </label>
              <input
                id="dispatcher-auth-code"
                type="text"
                defaultValue="MODONER-CMD-9941-SC"
                readOnly
                className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl font-mono text-slate-600 focus:outline-hidden"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setIsDispatchModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setDispatchSuccess(true)}
                className="px-4 py-2 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold shadow-xs"
              >
                Confirm & Transmit Order
              </motion.button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
