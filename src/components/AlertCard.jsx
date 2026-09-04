import React from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  Clock,
  MapPin,
  Route,
  Navigation,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function AlertCard({ alert, onSelect, onReroute, className = '' }) {
  const isCritical = alert.severity === 'Critical';
  const isWarning = alert.severity === 'Warning';

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.012 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`bg-white border rounded-2xl p-5 shadow-xs hover:shadow-card relative overflow-hidden will-change-transform flex flex-col justify-between min-w-0 ${
        isCritical
          ? 'border-l-4 border-l-red-500 border-slate-200'
          : isWarning
          ? 'border-l-4 border-l-amber-500 border-slate-200'
          : 'border-l-4 border-l-blue-500 border-slate-200'
      } ${className}`}
    >
      <div className="min-w-0 flex-1">
        {/* Header: Badges & Timestamp */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-100 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap min-w-0">
            <span className="font-mono text-xs font-bold text-[#EA580C] whitespace-nowrap">{alert.id}</span>
            <div className="flex-shrink-0">
              <StatusBadge status={alert.severity} size="xs" />
            </div>
            <span className="text-[10px] font-semibold text-slate-500 px-2 py-0.5 rounded bg-slate-100 flex-shrink-0 whitespace-nowrap">
              {alert.category}
            </span>
          </div>
          <span className="text-xs text-slate-400 flex items-center gap-1 flex-shrink-0 whitespace-nowrap">
            <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            {alert.reportedAt}
          </span>
        </div>

        {/* Title: 2 lines max with break-words */}
        <h3
          className="text-sm font-bold text-[#111827] mt-2.5 leading-snug line-clamp-2 break-words"
          title={alert.title}
        >
          {alert.title}
        </h3>

        {/* Location & Corridor */}
        <div className="flex flex-wrap items-center gap-y-1.5 gap-x-3 text-xs text-slate-500 mt-2 min-w-0">
          <span
            className="flex items-center gap-1 text-slate-700 font-medium min-w-0 max-w-full"
            title={alert.location}
          >
            <MapPin className="w-3.5 h-3.5 text-[#F97316] flex-shrink-0" />
            <span className="truncate">{alert.location}</span>
          </span>
          {alert.corridorName && (
            <span
              className="flex items-center gap-1 text-slate-500 min-w-0 max-w-full"
              title={alert.corridorName}
            >
              <Route className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span className="truncate">{alert.corridorName}</span>
            </span>
          )}
        </div>

        {/* Impact Description */}
        {alert.impact && (
          <p
            className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200/70 mt-3 leading-relaxed break-words line-clamp-3"
            title={alert.impact}
          >
            <strong className="text-slate-800 font-semibold">Impact: </strong>
            {alert.impact}
          </p>
        )}

        {/* AI Detour Advisory */}
        {alert.recommendedDetour && (
          <div className="mt-2.5 flex items-start gap-2 text-xs text-amber-900 bg-amber-50/70 border border-amber-200/80 p-2.5 rounded-xl min-w-0">
            <Navigation className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <span className="font-semibold text-amber-950">AI Detour Advisory: </span>
              <span className="break-words line-clamp-3" title={alert.recommendedDetour}>
                {alert.recommendedDetour}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs min-w-0">
        <span
          className="text-[11px] text-slate-400 truncate min-w-0 flex-1"
          title={`Source: ${alert.source || 'IMD / BRO Sensor Network'}`}
        >
          Source: {alert.source || 'IMD / BRO Sensor Network'}
        </span>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {onReroute && (
            <button
              onClick={() => onReroute(alert)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-orange-50 text-[#EA580C] hover:bg-orange-100 active:scale-95 font-semibold text-xs transition-all whitespace-nowrap"
            >
              <Navigation className="w-3.5 h-3.5" />
              Apply Detour
            </button>
          )}
          {onSelect && (
            <button
              onClick={() => onSelect(alert)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-[#E2E8F0] text-slate-700 hover:bg-slate-50 active:scale-95 font-semibold text-xs transition-all whitespace-nowrap shadow-2xs"
            >
              Details
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
