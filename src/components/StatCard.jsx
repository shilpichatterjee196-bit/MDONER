import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

export default function StatCard({
  title,
  value,
  change,
  trend = 'neutral', // 'up' | 'down' | 'neutral'
  caption,
  icon: Icon,
  badgeText,
  badgeType = 'default', // 'orange' | 'success' | 'warning' | 'critical'
  onClick,
  className = '',
  animateNumber = true
}) {
  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />;
    if (trend === 'down') return <TrendingDown className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />;
    return <Minus className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />;
  };

  const getBadgeStyle = () => {
    switch (badgeType) {
      case 'orange':
        return 'bg-[#FFF7ED] text-[#EA580C] border-orange-200';
      case 'success':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'warning':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'critical':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -3, scale: 1.015 }}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs hover:shadow-card hover:border-orange-300 relative overflow-hidden group will-change-transform flex flex-col justify-between min-w-0 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {/* Subtle top indicator bar on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-[#F97316] opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2 min-w-0">
          <span
            className="text-xs font-semibold text-[#64748B] tracking-tight line-clamp-2 break-words leading-snug min-w-0 flex-1"
            title={title}
          >
            {title}
          </span>
          {Icon && (
            <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 text-[#F97316] flex items-center justify-center transition-transform group-hover:scale-110 flex-shrink-0">
              <Icon className="w-4 h-4" />
            </div>
          )}
        </div>

        <div className="mt-2.5 flex items-baseline gap-2 flex-wrap min-w-0">
          <span
            className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight font-mono truncate"
            title={String(value)}
          >
            {animateNumber ? <AnimatedCounter value={value} /> : value}
          </span>
          {change && (
            <div className="inline-flex items-center gap-1 text-xs font-semibold flex-shrink-0">
              {getTrendIcon()}
              <span
                className={
                  trend === 'up'
                    ? 'text-emerald-600'
                    : trend === 'down'
                    ? 'text-rose-600'
                    : 'text-slate-500'
                }
              >
                {change}
              </span>
            </div>
          )}
        </div>
      </div>

      {(caption || badgeText) && (
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-1.5 text-xs min-w-0">
          {caption && (
            <span className="text-[#64748B] truncate min-w-0 flex-1" title={caption}>
              {caption}
            </span>
          )}
          {badgeText && (
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0 whitespace-nowrap ${getBadgeStyle()}`}
            >
              {badgeText}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
}
