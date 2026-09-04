import React from 'react';
import { Compass } from 'lucide-react';

export default function LoadingSpinner({
  message = 'Calculating telemetry...',
  size = 'md',
  fullHeight = false
}) {
  const spinnerSize =
    size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-10 h-10' : 'w-7 h-7';

  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative">
        {/* Rotating outer ring */}
        <div
          className={`${spinnerSize} border-3 border-orange-100 border-t-[#F97316] rounded-full animate-spin`}
        />
        {/* Center compass dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
        </div>
      </div>
      {message && (
        <span className="text-xs font-semibold text-[#64748B] tracking-tight animate-pulse">
          {message}
        </span>
      )}
    </div>
  );

  if (fullHeight) {
    return (
      <div className="w-full min-h-[350px] flex items-center justify-center bg-transparent">
        {content}
      </div>
    );
  }

  return content;
}
