import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  Radio,
  ShieldAlert,
  Flame,
  Activity,
  Info
} from 'lucide-react';

export default function StatusBadge({ status, type, size = 'sm', showDot = true, className = '' }) {
  const normStatus = (status || '').toString().toLowerCase();

  let bgClass = 'bg-slate-50 text-slate-700 border-slate-200';
  let dotClass = 'bg-slate-400';
  let IconComponent = null;

  // Severity / Emergency
  if (normStatus.includes('critical') || normStatus.includes('danger') || normStatus === 'alert') {
    bgClass = 'bg-red-50 text-red-700 border-red-200';
    dotClass = 'bg-red-500 animate-pulse';
    IconComponent = Flame;
  } else if (normStatus.includes('warning') || normStatus.includes('severe') || normStatus === 'delayed') {
    bgClass = 'bg-amber-50 text-amber-800 border-amber-200';
    dotClass = 'bg-amber-500';
    IconComponent = AlertTriangle;
  } else if (
    normStatus.includes('optimal') ||
    normStatus.includes('delivered') ||
    normStatus.includes('available') ||
    normStatus.includes('accessible') ||
    normStatus.includes('active') ||
    normStatus.includes('verified')
  ) {
    bgClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    dotClass = 'bg-emerald-500';
    IconComponent = CheckCircle2;
  } else if (normStatus.includes('in transit') || normStatus.includes('navigating') || normStatus.includes('airborne')) {
    bgClass = 'bg-orange-50 text-[#EA580C] border-orange-200';
    dotClass = 'bg-[#F97316] animate-ping';
    IconComponent = Activity;
  } else if (normStatus.includes('info') || normStatus.includes('monitoring')) {
    bgClass = 'bg-blue-50 text-blue-700 border-blue-200';
    dotClass = 'bg-blue-500';
    IconComponent = Info;
  }

  const sizeClasses =
    size === 'xs'
      ? 'text-[10px] px-1.5 py-0.5'
      : size === 'md'
      ? 'text-xs px-3 py-1.5'
      : 'text-[11px] px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full border shadow-2xs leading-none whitespace-nowrap ${bgClass} ${sizeClasses} ${className}`}
    >
      {showDot && (
        <span className="relative flex h-2 w-2 items-center justify-center flex-shrink-0">
          {normStatus.includes('critical') && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 pointer-events-none" />
          )}
          <span className={`inline-flex rounded-full h-1.5 w-1.5 ${dotClass}`} />
        </span>
      )}
      {status}
    </span>
  );
}
