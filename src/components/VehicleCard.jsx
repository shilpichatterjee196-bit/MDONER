import React from 'react';
import { motion } from 'framer-motion';
import {
  Truck,
  BatteryCharging,
  Fuel,
  Gauge,
  MapPin,
  Clock,
  Radio,
  User,
  Package,
  ThermometerSnowflake,
  ShieldCheck
} from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function VehicleCard({ vehicle, onTrackOnMap, onInspect, className = '' }) {
  const isDrone = vehicle.category === 'Drone';
  const isBarge = vehicle.category === 'Barge';

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.012 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs hover:shadow-card hover:border-orange-300 flex flex-col justify-between group will-change-transform min-w-0 overflow-hidden h-full ${className}`}
    >
      <div className="min-w-0 flex-1">
        {/* Card Header: Vehicle ID, Category Badge, Name & Status */}
        <div className="flex items-start justify-between gap-2.5 pb-3 border-b border-slate-100 min-w-0">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 text-[#F97316] flex items-center justify-center font-bold flex-shrink-0 group-hover:scale-105 transition-transform mt-0.5">
              <Truck className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap min-w-0 mb-0.5">
                <span className="font-mono text-xs font-bold text-[#EA580C] whitespace-nowrap">{vehicle.id}</span>
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded flex-shrink-0 whitespace-nowrap">
                  {vehicle.category}
                </span>
              </div>
              <h3
                className="text-sm font-bold text-[#111827] leading-snug line-clamp-2 break-words"
                title={vehicle.name}
              >
                {vehicle.name}
              </h3>
            </div>
          </div>
          <div className="flex-shrink-0 pt-0.5">
            <StatusBadge status={vehicle.status} size="xs" />
          </div>
        </div>

        {/* Location & Current Highway */}
        <div className="mt-3 space-y-1.5 text-xs text-slate-600 min-w-0">
          <div className="flex items-center gap-1.5 font-medium text-slate-800 min-w-0">
            <MapPin className="w-3.5 h-3.5 text-[#F97316] flex-shrink-0" />
            <span
              className="truncate min-w-0 flex-1"
              title={vehicle.location.currentRoad || vehicle.location.hub}
            >
              {vehicle.location.currentRoad || vehicle.location.hub}
            </span>
          </div>
          <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500 pl-5 min-w-0">
            <span className="truncate min-w-0" title={`State: ${vehicle.location.state}`}>
              State: {vehicle.location.state}
            </span>
            <span className="flex-shrink-0 whitespace-nowrap">
              Ping: {vehicle.lastPing}
            </span>
          </div>
        </div>

        {/* Telemetry Metrics Bar */}
        <div className="mt-3.5 grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 text-center min-w-0">
          <div className="min-w-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">Speed</span>
            <span
              className="text-xs font-bold text-slate-800 font-mono truncate block"
              title={`${vehicle.telemetry.speed} ${vehicle.telemetry.speedUnit}`}
            >
              {vehicle.telemetry.speed} {vehicle.telemetry.speedUnit}
            </span>
          </div>
          <div className="min-w-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">Energy</span>
            <span
              className="text-xs font-bold text-slate-800 font-mono flex items-center justify-center gap-1 truncate"
              title={`${vehicle.telemetry.fuelLevel}%`}
            >
              <Fuel className="w-3 h-3 text-orange-500 flex-shrink-0" />
              <span>{vehicle.telemetry.fuelLevel}%</span>
            </span>
          </div>
          <div className="min-w-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">Altitude</span>
            <span
              className="text-xs font-bold text-slate-800 font-mono truncate block"
              title={`${vehicle.telemetry.altitude}m`}
            >
              {vehicle.telemetry.altitude}m
            </span>
          </div>
        </div>

        {/* Cargo Detail */}
        {vehicle.cargo && (
          <div className="mt-3 p-2.5 rounded-xl bg-orange-50/40 border border-orange-100 text-xs min-w-0">
            <div className="flex items-center justify-between gap-2 text-[11px] min-w-0">
              <span
                className="font-semibold text-orange-950 flex items-center gap-1 min-w-0 truncate"
                title={vehicle.cargo.consignmentId}
              >
                <Package className="w-3.5 h-3.5 text-[#EA580C] flex-shrink-0" />
                <span className="truncate">{vehicle.cargo.consignmentId}</span>
              </span>
              {vehicle.cargo.temperatureControl && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 flex-shrink-0 whitespace-nowrap">
                  <ThermometerSnowflake className="w-3 h-3" />
                  {vehicle.cargo.currentTemp}
                </span>
              )}
            </div>
            <p
              className="text-[11px] text-slate-700 mt-1 line-clamp-2 break-words leading-relaxed"
              title={vehicle.cargo.description}
            >
              {vehicle.cargo.description}
            </p>
          </div>
        )}
      </div>

      {/* Card Actions Footer - Anchored at Bottom */}
      <div className="mt-auto pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2 text-xs min-w-0">
        <div className="flex items-center gap-1 text-[11px] text-slate-500 min-w-0 flex-1">
          <User className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span className="truncate min-w-0" title={vehicle.driver?.name}>
            {vehicle.driver?.name}
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          {onTrackOnMap && (
            <button
              onClick={() => onTrackOnMap(vehicle)}
              className="px-2.5 py-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 active:scale-95 text-[#EA580C] font-semibold text-xs transition-all whitespace-nowrap"
            >
              Track GIS
            </button>
          )}
          {onInspect && (
            <button
              onClick={() => onInspect(vehicle)}
              className="px-2.5 py-1.5 rounded-lg bg-white border border-[#E2E8F0] hover:bg-slate-50 active:scale-95 text-slate-700 font-semibold text-xs transition-all whitespace-nowrap shadow-2xs"
            >
              Telematics
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
