import React, { useState, useEffect } from 'react';
import { WifiOff, CheckCircle2, RefreshCw, X } from 'lucide-react';

export default function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [justReconnected, setJustReconnected] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setJustReconnected(true);
      const timer = setTimeout(() => setJustReconnected(false), 4000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setDismissed(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (justReconnected) {
    return (
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2.5 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-elevated text-xs font-semibold animate-in fade-in slide-in-from-bottom-4 duration-200">
        <CheckCircle2 className="w-4 h-4" />
        <span>Telemetry Connection Re-established. Syncing logs...</span>
      </div>
    );
  }

  if (!isOffline || dismissed) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm bg-white border-2 border-amber-400 rounded-2xl p-4 shadow-elevated text-xs text-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 text-amber-700 font-bold">
          <WifiOff className="w-4 h-4 text-amber-600" />
          <span>Offline Resilience Mode</span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-slate-400 hover:text-slate-600 p-0.5 rounded"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <p className="mt-1.5 text-slate-600 text-[11px] leading-relaxed">
        Network connection unavailable. Route caches and field incident submissions are being safely persisted to offline IndexedDB storage.
      </p>

      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-medium">
        <span>Offline Cache: Active (14 items)</span>
        <span className="text-[#EA580C] font-semibold flex items-center gap-1">
          <RefreshCw className="w-3 h-3 animate-spin" /> Auto-sync on reconnect
        </span>
      </div>
    </div>
  );
}
