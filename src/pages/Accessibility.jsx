import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedCounter from '../components/AnimatedCounter';
import {
  MountainSnow,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  Info,
  SlidersHorizontal,
  CloudRain,
  Package,
  Layers,
  ArrowUpRight,
  ShieldAlert,
  Zap,
  Clock,
  Compass,
  Building2
} from 'lucide-react';

import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import { DISTRICTS } from '../data/districts';

export default function Accessibility() {
  const [districts, setDistricts] = useState(DISTRICTS);
  const [isFloodSimActive, setIsFloodSimActive] = useState(false);
  const [selectedState, setSelectedState] = useState('All');
  const [selectedTier, setSelectedTier] = useState('All');
  const [inspectDistrict, setInspectDistrict] = useState(null);

  // Compute live scores based on flood simulation toggle
  const computedDistricts = districts.map((d) => {
    if (!isFloodSimActive) return d;

    // During monsoon flood simulation, score drops by 12-18 points for hill/river districts
    const dropAmount = d.factors.weatherVulnerability > 80 ? 16 : 9;
    const newScore = Math.max(15, d.accessibilityScore - dropAmount);
    let newTier = d.accessibilityTier;

    if (newScore < 45) newTier = 'Critical Isolation';
    else if (newScore < 60) newTier = 'Severe Constraint';
    else if (newScore < 75) newTier = 'Moderate Friction';

    return {
      ...d,
      accessibilityScore: newScore,
      accessibilityTier: newTier,
      isSimulated: true,
      simulatedHazardNote: 'Monsoon flash-flood alert: river crossing flow rate high.'
    };
  });

  // Filter logic
  const filteredDistricts = computedDistricts.filter((d) => {
    const matchesState = selectedState === 'All' || d.state === selectedState;
    const matchesTier = selectedTier === 'All' || d.accessibilityTier === selectedTier;
    return matchesState && matchesTier;
  });

  // Average score
  const avgScore = (
    computedDistricts.reduce((acc, d) => acc + d.accessibilityScore, 0) /
    computedDistricts.length
  ).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#111827]">
              Remote District Accessibility Index (RDAI)
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 text-[#EA580C]">
              Spatial Vulnerability Model
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Quantifying physical supply-chain isolation, weather friction, and lifeline redundancy across North Eastern border districts.
          </p>
        </div>

        {/* Average Score KPI */}
        <div className="flex items-center gap-4 bg-orange-50/60 border border-orange-200/80 px-4 py-2.5 rounded-2xl self-stretch md:self-auto justify-between md:justify-start">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">
              Regional Composite RDAI
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-[#111827] font-mono">
                <AnimatedCounter value={parseFloat(avgScore)} duration={900} />
              </span>
              <span className="text-xs text-slate-500 font-semibold">/ 100</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-orange-100 text-[#F97316] flex items-center justify-center font-bold">
            <MountainSnow className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Simulation Banner & Filter Controls */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Monsoon Simulation Toggle */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
          <div className={`p-2 rounded-lg ${isFloodSimActive ? 'bg-blue-600 text-white animate-pulse' : 'bg-slate-200 text-slate-600'}`}>
            <CloudRain className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">Seasonal Monsoon & Flood Stress Simulation</span>
              {isFloodSimActive && (
                <span className="text-[9px] font-bold bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded uppercase">
                  Simulating
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500">
              Apply realistic rainfall soil saturation & river swell friction to all scores.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsFloodSimActive(!isFloodSimActive)}
            className={`ml-auto px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              isFloodSimActive
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {isFloodSimActive ? 'Reset Baseline' : 'Simulate Monsoon'}
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {/* State Filter */}
          <select
            id="filter-rdai-state"
            aria-label="Filter Districts by State"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-[#E2E8F0] rounded-xl text-slate-700 outline-hidden focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]"
          >
            <option value="All">All 8 NER States</option>
            <option value="Assam">Assam</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Manipur">Manipur</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Tripura">Tripura</option>
          </select>

          {/* Tier Filter */}
          <select
            id="filter-rdai-tier"
            aria-label="Filter Districts by Vulnerability Tier"
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-[#E2E8F0] rounded-xl text-slate-700 outline-hidden focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]"
          >
            <option value="All">All Vulnerability Tiers</option>
            <option value="Critical Isolation">Critical Isolation (&lt;50)</option>
            <option value="Severe Constraint">Severe Constraint (50-65)</option>
            <option value="Moderate Friction">Moderate Friction (65-80)</option>
            <option value="Accessible">Accessible (&gt;80)</option>
          </select>
        </div>
      </div>

      {/* District Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredDistricts.map((d, idx) => {
            const isCritical = d.accessibilityTier === 'Critical Isolation';
            const isWarning = d.accessibilityTier === 'Severe Constraint';

            return (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.22, delay: idx * 0.025 }}
                whileHover={{ y: -3, scale: 1.012 }}
                layout
                className={`bg-white border rounded-2xl p-5 shadow-xs hover:shadow-card transition-all duration-200 flex flex-col justify-between will-change-transform ${
                  isCritical
                    ? 'border-red-200 hover:border-red-400'
                    : isWarning
                    ? 'border-amber-200 hover:border-amber-400'
                    : 'border-[#E2E8F0] hover:border-orange-300'
                }`}
              >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {d.state}
                    </span>
                    <h3 className="text-base font-extrabold text-[#111827] mt-0.5">{d.name}</h3>
                  </div>

                  <span
                    className={`text-xs font-mono font-extrabold px-2 py-0.5 rounded-lg ${
                      isCritical
                        ? 'bg-rose-100 text-rose-800'
                        : isWarning
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {d.accessibilityScore}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="mt-2.5">
                  <StatusBadge status={d.accessibilityTier} size="xs" />
                </div>

                {/* Score Progress Bar */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                    <span>Accessibility Health</span>
                    <span className="font-mono font-bold">{d.accessibilityScore}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCritical ? 'bg-rose-500' : isWarning ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${d.accessibilityScore}%` }}
                    />
                  </div>
                </div>

                {/* Lifeline info */}
                <div className="mt-3 space-y-1.5 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                  <div className="text-[11px] truncate">
                    <span className="text-slate-400 font-semibold">Lifeline: </span>
                    <span className="font-medium text-slate-800">{d.criticalLifeline}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-semibold">Supplies Buffer:</span>
                    <span
                      className={`font-bold ${
                        d.keySuppliesStockDays < 15 ? 'text-rose-600' : 'text-slate-700'
                      }`}
                    >
                      {d.keySuppliesStockDays} Days
                    </span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-mono">
                  Pop: {(d.population / 1000).toFixed(0)}k
                </span>
                <button
                  onClick={() => setInspectDistrict(d)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#EA580C] hover:text-[#C2410C] transition-colors"
                >
                  Inspect Factors <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
        </AnimatePresence>
      </div>

      {/* District Vulnerability Inspector Modal */}
      <Modal
        isOpen={!!inspectDistrict}
        onClose={() => setInspectDistrict(null)}
        title={inspectDistrict?.name ? `${inspectDistrict.name} District Vulnerability Profile` : 'District Profile'}
        subtitle={`State: ${inspectDistrict?.state} • Capital: ${inspectDistrict?.capital} • Population: ${inspectDistrict?.population.toLocaleString()}`}
        icon={MountainSnow}
        maxWidth="max-w-2xl"
      >
        {inspectDistrict && (
          <div className="space-y-4 text-xs">
            {/* Score Summary Box */}
            <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-orange-800">
                  RDAI Composite Metric
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl font-extrabold text-slate-900 font-mono">
                    {inspectDistrict.accessibilityScore} / 100
                  </span>
                  <StatusBadge status={inspectDistrict.accessibilityTier} size="xs" />
                </div>
              </div>
              <div className="text-right text-[11px] text-slate-600">
                <p>Primary Corridor:</p>
                <p className="font-bold text-slate-900">{inspectDistrict.primaryCorridor}</p>
              </div>
            </div>

            {/* Factor Breakdown Grid */}
            <div>
              <h4 className="font-bold text-slate-800 mb-2 uppercase text-[11px] tracking-wider">
                Multi-Factor Vulnerability Decomposition
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-400 font-semibold block text-[10px]">Terrain Slope Complexity</span>
                  <span className="text-base font-bold text-slate-900 font-mono mt-1 block">
                    {inspectDistrict.factors.terrainComplexity}/100
                  </span>
                  <span className="text-[10px] text-slate-500">Steep hill contours</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-400 font-semibold block text-[10px]">Monsoon Vulnerability</span>
                  <span className="text-base font-bold text-slate-900 font-mono mt-1 block">
                    {inspectDistrict.factors.weatherVulnerability}/100
                  </span>
                  <span className="text-[10px] text-slate-500">Rainfall & mudwash risk</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-400 font-semibold block text-[10px]">Bridge Redundancy</span>
                  <span className="text-base font-bold text-slate-900 font-mono mt-1 block">
                    {inspectDistrict.factors.bridgeRedundancy}%
                  </span>
                  <span className="text-[10px] text-slate-500">Alternative river spans</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-400 font-semibold block text-[10px]">Road Paving Ratio</span>
                  <span className="text-base font-bold text-slate-900 font-mono mt-1 block">
                    {inspectDistrict.factors.roadBitumenRatio}% Paved
                  </span>
                  <span className="text-[10px] text-slate-500">All-weather bitumen</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-400 font-semibold block text-[10px]">Drone Hub Proximity</span>
                  <span className="text-base font-bold text-slate-900 font-mono mt-1 block">
                    {inspectDistrict.factors.nearestAirDroneHubKm} km
                  </span>
                  <span className="text-[10px] text-slate-500">Autonomous flight radius</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-400 font-semibold block text-[10px]">Transit to State Capital</span>
                  <span className="text-base font-bold text-slate-900 font-mono mt-1 block">
                    {inspectDistrict.factors.averageTransitDaysToStateHub} Days
                  </span>
                  <span className="text-[10px] text-slate-500">Standard truck convoy</span>
                </div>
              </div>
            </div>

            {/* AI Supply Replenishment Advisory */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-800 text-[11px] flex items-center gap-1.5 uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 text-[#F97316]" />
                AI Logistics Replenishment Directives
              </span>
              <ul className="list-disc pl-4 space-y-1 text-slate-600 text-[11px]">
                <li>
                  Maintain minimum <strong>{inspectDistrict.keySuppliesStockDays} days</strong> of critical medical supplies in forward civil depot.
                </li>
                <li>
                  {inspectDistrict.droneCorridorActive
                    ? 'Autonomous VTOL Drone SkyWay certified for emergency cold-chain serum drops.'
                    : 'Establish secondary drone drop coordinates prior to monsoon peak.'}
                </li>
                <li>
                  Critical lifeline dependency on: <strong>{inspectDistrict.criticalLifeline}</strong>. Pre-position emergency Bailey bridge inventory at nearest BRO detachment.
                </li>
              </ul>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setInspectDistrict(null)}
                className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Prioritizing emergency ration convoys for ${inspectDistrict.name}.`);
                  setInspectDistrict(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#F97316] text-white font-semibold hover:bg-[#EA580C]"
              >
                Schedule Priority Resupply
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
