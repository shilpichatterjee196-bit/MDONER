import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  MapPin,
  Compass,
  Truck,
  MountainSnow,
  AlertTriangle,
  FileSpreadsheet,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Radio
} from 'lucide-react';

export default function Sidebar({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Live Map', path: '/live-map', icon: MapPin },
    { name: 'Route Optimization', path: '/route-optimization', icon: Compass },
    { name: 'Vehicles', path: '/vehicles', icon: Truck },
    { name: 'Accessibility', path: '/accessibility', icon: MountainSnow },
    { name: 'Alerts & Incidents', path: '/alerts', icon: AlertTriangle, badge: '4' },
    { name: 'Field Reports', path: '/field-reports', icon: FileSpreadsheet },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-white border-r border-[#E2E8F0] transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-3 overflow-hidden">
            {/* Orange Logo Icon */}
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#F97316] text-white flex items-center justify-center shadow-sm shadow-orange-300">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>

            {!isCollapsed && (
              <div className="flex flex-col leading-tight whitespace-nowrap">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm tracking-wider text-[#111827]">NER</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-orange-100 text-[#EA580C]">
                    AI Platform
                  </span>
                </div>
                <span className="text-xs font-semibold text-[#64748B] tracking-tight">LOGISTICS AI</span>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <div className="px-3 pb-2">
            {!isCollapsed && (
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                Operations & Spatial AI
              </p>
            )}
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group
                  ${
                    isActive
                      ? 'bg-[#FFF7ED] text-[#EA580C] shadow-xs'
                      : 'text-[#111827] hover:bg-slate-50 hover:text-slate-900'
                  }
                  ${isCollapsed ? 'justify-center px-2' : ''}
                `}
                title={isCollapsed ? item.name : undefined}
              >
                {/* Active Orange Indicator Line */}
                {isActive && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-[#F97316]" />
                )}

                {/* Icon */}
                <Icon
                  className={`flex-shrink-0 w-5 h-5 transition-transform group-hover:scale-110
                    ${isActive ? 'text-[#F97316]' : 'text-slate-500 group-hover:text-slate-800'}
                  `}
                />

                {/* Label */}
                {!isCollapsed && (
                  <span className="flex-1 truncate tracking-tight">
                    {item.name}
                  </span>
                )}

                {/* Badge if any */}
                {!isCollapsed && item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full
                      ${
                        isActive
                          ? 'bg-[#EA580C] text-white'
                          : 'bg-red-100 text-red-700'
                      }
                    `}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Collapsed Badge Dot */}
                {isCollapsed && item.badge && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-600" />
                )}
              </NavLink>
            );
          })}
        </div>

        {/* System & Telemetry Footer */}
        <div className="p-3 border-t border-[#E2E8F0] bg-slate-50/70">
          {!isCollapsed ? (
            <div className="p-2.5 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                  <span className="text-[11px] font-semibold text-slate-700">NER Corridor Grid</span>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                  ACTIVE
                </span>
              </div>
              <p className="text-[11px] text-[#64748B] leading-tight">
                8 States • 14 GIS Nodes Synced
              </p>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-center text-emerald-600" title="Corridor Grid Active">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
