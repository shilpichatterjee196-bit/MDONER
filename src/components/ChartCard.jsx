import React from 'react';
import { Download, MoreVertical, Maximize2 } from 'lucide-react';

export default function ChartCard({
  title,
  subtitle,
  children,
  actionText,
  onAction,
  filters,
  activeFilter,
  onFilterChange,
  className = ''
}) {
  return (
    <div className={`bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-xs min-w-0 flex flex-col justify-between ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 min-w-0">
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold text-[#111827] tracking-tight break-words line-clamp-2" title={title}>
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-[#64748B] mt-0.5 break-words line-clamp-2" title={subtitle}>
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-shrink-0 flex-wrap">
          {filters && filters.length > 0 && (
            <div className="flex items-center p-0.5 bg-slate-100 rounded-lg text-xs flex-wrap">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => onFilterChange && onFilterChange(f)}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-colors whitespace-nowrap ${
                    activeFilter === f
                      ? 'bg-white text-[#EA580C] shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}

          {actionText && (
            <button
              onClick={onAction}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-slate-700 bg-white border border-[#E2E8F0] hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-[#F97316] flex-shrink-0" />
              <span>{actionText}</span>
            </button>
          )}
        </div>
      </div>

      {/* Body / Chart Viewport */}
      <div className="mt-4 w-full min-w-0 flex-1">{children}</div>
    </div>
  );
}
