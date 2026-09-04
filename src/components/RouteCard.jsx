import React from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  ArrowRight,
  Clock,
  Navigation,
  MountainSnow,
  AlertTriangle,
  Zap,
  CheckCircle2
} from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function RouteCard({ route, isSelected, onSelect, onOptimize, className = '' }) {
  return (
    <motion.div
      onClick={onSelect ? () => onSelect(route) : undefined}
      whileHover={{ y: -3, scale: 1.012 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`bg-white border rounded-2xl p-5 shadow-xs hover:shadow-card relative overflow-hidden will-change-transform flex flex-col justify-between min-w-0 ${
        isSelected
          ? 'border-[#F97316] ring-2 ring-orange-100'
          : 'border-[#E2E8F0] hover:border-orange-200'
      } ${onSelect ? 'cursor-pointer' : ''} ${className}`}
    >
      <div className="min-w-0 flex-1">
        {/* Header: Route ID, Title, Status & Distance */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-3 border-b border-slate-100 min-w-0">
          <div className="min-w-0 flex-1">
            <span className="font-mono text-xs font-bold text-[#EA580C] whitespace-nowrap">{route.id}</span>
            <h3
              className="text-sm font-bold text-[#111827] mt-0.5 line-clamp-2 break-words leading-snug"
              title={route.name}
            >
              {route.name}
            </h3>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 self-start">
            <StatusBadge status={route.riskLevel} size="xs" />
            <span className="text-xs font-extrabold text-slate-800 font-mono whitespace-nowrap">
              {route.distanceKm} km • {route.estimatedDuration}
            </span>
          </div>
        </div>

        {/* Origin -> Destination Flow */}
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 min-w-0">
          <span className="font-semibold truncate min-w-0 flex-1" title={route.origin.name}>
            {route.origin.name}
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-[#F97316] flex-shrink-0" />
          <span className="font-semibold truncate min-w-0 flex-1 text-right" title={route.destination.name}>
            {route.destination.name}
          </span>
        </div>

        {/* Modality Chips */}
        <div className="mt-3 flex flex-wrap gap-1.5 min-w-0">
          {route.modality.map((m, i) => (
            <span
              key={i}
              className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-orange-50 text-[#EA580C] border border-orange-200/60 break-words"
              title={m}
            >
              {m}
            </span>
          ))}
          {route.maxElevationMeters && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 flex items-center gap-1 flex-shrink-0 whitespace-nowrap">
              <MountainSnow className="w-3 h-3 text-slate-500" />
              Max {route.maxElevationMeters}m
            </span>
          )}
        </div>

        {/* AI Recommendation */}
        {route.aiRecommendation && (
          <div className="mt-3 text-xs bg-orange-50/50 border border-orange-100 p-2.5 rounded-xl text-slate-700 min-w-0">
            <div className="flex items-center gap-1 text-[11px] font-bold text-[#EA580C] mb-0.5">
              <Zap className="w-3 h-3 flex-shrink-0" />
              AI Corridor Intelligence
            </div>
            <p
              className="text-[11px] text-slate-600 leading-snug line-clamp-3 break-words"
              title={route.aiRecommendation}
            >
              {route.aiRecommendation}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Action Footer */}
      <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-xs gap-2 min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-slate-500 text-[11px] whitespace-nowrap">Risk Index:</span>
          <div className="w-16 bg-slate-200 rounded-full h-1.5 overflow-hidden flex-shrink-0">
            <div
              className={`h-full ${
                route.riskIndex > 65
                  ? 'bg-rose-500'
                  : route.riskIndex > 40
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${route.riskIndex}%` }}
            />
          </div>
          <span className="text-[11px] font-bold font-mono whitespace-nowrap">{route.riskIndex}/100</span>
        </div>

        {onOptimize && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOptimize(route);
            }}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#F97316] hover:bg-[#EA580C] active:scale-95 text-white text-xs font-semibold shadow-2xs transition-all flex-shrink-0 whitespace-nowrap"
          >
            <Zap className="w-3 h-3" />
            Optimize
          </button>
        )}
      </div>
    </motion.div>
  );
}
