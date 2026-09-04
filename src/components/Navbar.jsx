import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  Search,
  Bell,
  Wifi,
  WifiOff,
  User,
  ExternalLink,
  Sparkles,
  ChevronDown,
  AlertTriangle,
  Clock,
  Check
} from 'lucide-react';

export default function Navbar({ onMobileMenuToggle }) {
  const location = useLocation();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef(null);

  // Keep live track of online / offline network state
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Close notifications on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Map route pathname to title & breadcrumb
  const getPageMeta = (pathname) => {
    switch (pathname) {
      case '/':
        return { title: 'Executive Operations Dashboard', section: 'Overview' };
      case '/live-map':
        return { title: 'NER Live GIS Telemetry & Terrain Map', section: 'Spatial Intelligence' };
      case '/route-optimization':
        return { title: 'AI Multi-Modal Route Optimization', section: 'Logistics Engine' };
      case '/vehicles':
        return { title: 'Fleet Telematics & Vehicle Registry', section: 'Assets' };
      case '/accessibility':
        return { title: 'Remote District Accessibility Index', section: 'Vulnerability Analysis' };
      case '/alerts':
        return { title: 'Emergency Alerts & Terrain Incidents', section: 'Disaster Monitoring' };
      case '/field-reports':
        return { title: 'Crowdsourced Field Hazard Reports', section: 'Ground Intelligence' };
      case '/analytics':
        return { title: 'SLA Performance & Logistics Analytics', section: 'Reporting' };
      case '/settings':
        return { title: 'System Configuration & GIS Settings', section: 'Administration' };
      default:
        return { title: 'NER Logistics Platform', section: 'Operations' };
    }
  };

  const pageMeta = getPageMeta(location.pathname);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-[#E2E8F0] px-3 sm:px-4 lg:px-6 flex items-center justify-between shadow-2xs min-w-0">
      {/* Left: Mobile Toggle & Page Info */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 sm:flex-initial mr-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden flex-shrink-0"
          aria-label="Toggle mobile menu"
        >
          <Menu className="w-5 h-5" />
        </motion.button>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-xs text-[#64748B] font-medium truncate">
            <span className="flex-shrink-0">NER Portal</span>
            <span>/</span>
            <span className="text-[#EA580C] font-semibold truncate">{pageMeta.section}</span>
          </div>
          <h1
            className="text-sm sm:text-base font-bold text-[#111827] tracking-tight truncate max-w-[170px] xs:max-w-[210px] sm:max-w-xs md:max-w-md lg:max-w-none"
            title={pageMeta.title}
          >
            {pageMeta.title}
          </h1>
        </div>
      </div>

      {/* Center / Search bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-3 lg:mx-6 min-w-0">
        <div className="relative w-full min-w-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            id="navbar-global-search"
            aria-label="Search corridors, convoys, districts, hazard warnings"
            type="text"
            placeholder="Search NH-102 corridors, convoys, districts, hazard warnings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-12 py-1.5 text-xs bg-slate-50 border border-[#E2E8F0] rounded-xl focus:bg-white focus:border-[#F97316] focus:ring-2 focus:ring-orange-100 outline-hidden transition-all text-[#111827] placeholder:text-slate-400"
          />
          <kbd className="hidden sm:inline-flex absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white border border-slate-200 rounded pointer-events-none">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        {/* ONLINE / OFFLINE Status Pill */}
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all flex-shrink-0 whitespace-nowrap
            ${
              isOnline
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse'
            }
          `}
          title={isOnline ? "Connected to Central NER Telemetry Server" : "Offline mode enabled. Caching updates locally."}
        >
          {isOnline ? (
            <>
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 pointer-events-none" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <Wifi className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span className="hidden sm:inline">ONLINE</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
              <span className="hidden sm:inline">OFFLINE (CACHE)</span>
            </>
          )}
        </div>

        {/* Notifications Icon Button */}
        <div className="relative flex-shrink-0" ref={notifRef}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-slate-500 hover:text-[#EA580C] hover:bg-orange-50 border border-transparent hover:border-orange-200 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F97316] rounded-full ring-2 ring-white" />
          </motion.button>

          {/* Quick Notification Dropdown with AnimatePresence */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="absolute right-0 mt-2 w-72 sm:w-80 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-elevated border border-[#E2E8F0] p-4 z-50 will-change-transform min-w-0"
              >
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 gap-2 min-w-0">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#F97316] flex-shrink-0" />
                    <span className="text-xs font-bold text-slate-800 truncate">Priority Hazard Notifications</span>
                  </div>
                  <span className="text-[10px] bg-orange-100 text-[#EA580C] font-bold px-2 py-0.5 rounded-full flex-shrink-0 whitespace-nowrap">3 New</span>
                </div>
                <div className="divide-y divide-slate-100 text-xs mt-1">
                  <motion.div
                    whileHover={{ x: 2 }}
                    className="py-2.5 hover:bg-slate-50 rounded-lg px-1 cursor-pointer transition-colors min-w-0"
                  >
                    <p className="font-semibold text-rose-600 break-words line-clamp-2">Landslide Warning: NH-29 Kohima</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 break-words line-clamp-2">Convoy NER-402 rerouted to bypass corridor.</p>
                    <span className="text-[10px] text-slate-400 font-mono mt-1 block">18m ago</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 2 }}
                    className="py-2.5 hover:bg-slate-50 rounded-lg px-1 cursor-pointer transition-colors min-w-0"
                  >
                    <p className="font-semibold text-amber-600 break-words line-clamp-2">Monsoon Flood Surge: Majuli Island</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 break-words line-clamp-2">Ro-Pax ferry logistics suspended until 16:00 IST.</p>
                    <span className="text-[10px] text-slate-400 font-mono mt-1 block">42m ago</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 2 }}
                    className="py-2.5 hover:bg-slate-50 rounded-lg px-1 cursor-pointer transition-colors min-w-0"
                  >
                    <p className="font-semibold text-blue-600 break-words line-clamp-2">Drone Airspace Cleared: Seppa Corridor</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 break-words line-clamp-2">Autonomous anti-venom flight landed safely.</p>
                    <span className="text-[10px] text-slate-400 font-mono mt-1 block">1h ago</span>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#E2E8F0] flex-shrink-0">
          <div className="w-8 h-8 rounded-xl bg-orange-100 border border-orange-200 text-[#EA580C] font-bold text-xs flex items-center justify-center shadow-xs flex-shrink-0">
            SC
          </div>
          <div className="hidden xl:flex flex-col text-left leading-none min-w-0">
            <span className="text-xs font-bold text-[#111827] truncate max-w-[120px]">Shilpi Chatterjee</span>
            <span className="text-[10px] text-[#64748B] font-medium mt-0.5 truncate max-w-[120px]">Ops Commander • MoDONER</span>
          </div>
          <ChevronDown className="hidden xl:block w-3 h-3 text-slate-400 flex-shrink-0" />
        </div>
      </div>
    </header>
  );
}
