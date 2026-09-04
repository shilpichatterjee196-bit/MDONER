import L from 'leaflet';

/**
 * Custom SVG DivIcon generator for Leaflet map markers
 * Ensures 100% vector sharpness, orange branding, and zero asset loading bugs.
 */

export function createVehicleMarker(vehicle, isSelected = false) {
  const isAlert = vehicle.status === 'Alert';
  const isDrone = vehicle.category === 'Drone';
  const isBarge = vehicle.category === 'Barge';
  const isInTransit = vehicle.status === 'In Transit';

  // Distinct icon SVG
  let iconSvg = '';
  if (isDrone) {
    // Drone / Flight Icon
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14"/></svg>`;
  } else if (isBarge) {
    // Ship / Barge Icon
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.02"/><path d="M12 10V4"/><path d="M8 8l4-4 4 4"/></svg>`;
  } else {
    // Truck Icon
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-5l-3-4h-5v10"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>`;
  }

  const badgeColor = isAlert
    ? 'bg-rose-500 ring-rose-300'
    : isDrone
    ? 'bg-emerald-600 ring-emerald-300'
    : isBarge
    ? 'bg-blue-600 ring-blue-300'
    : 'bg-[#F97316] ring-orange-300';

  const html = `
    <div class="relative flex items-center justify-center cursor-pointer group">
      ${isSelected ? `
        <span class="absolute -inset-2 rounded-2xl bg-orange-400/30 animate-ping pointer-events-none"></span>
        <span class="absolute -inset-1 rounded-2xl border-2 border-orange-500 animate-pulse pointer-events-none"></span>
      ` : ''}
      <div class="w-9 h-9 rounded-2xl ${badgeColor} text-white flex items-center justify-center shadow-lg ring-4 ${isSelected ? 'ring-orange-400 scale-110 shadow-orange-500/40' : 'ring-white'} transition-all duration-200 transform hover:scale-115">
        ${iconSvg}
      </div>
      ${isInTransit && !isSelected ? `
        <span class="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-white"></span>
        </span>
      ` : ''}
      <div class="absolute -bottom-5 bg-slate-900/90 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap pointer-events-none">
        ${vehicle.id.split('-')[2] || vehicle.id}
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-vehicle-marker',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18]
  });
}

export function createHazardMarker(alert) {
  const isCritical = alert.severity === 'Critical';
  const pulseColor = isCritical ? 'bg-red-500' : 'bg-amber-500';

  const html = `
    <div class="relative flex items-center justify-center cursor-pointer group">
      <span class="absolute inline-flex h-8 w-8 rounded-full ${pulseColor} opacity-75 animate-ping"></span>
      <div class="relative w-8 h-8 rounded-xl ${
        isCritical ? 'bg-rose-600' : 'bg-amber-500'
      } text-white flex items-center justify-center shadow-lg ring-3 ring-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-hazard-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
}

export function createStrategicHubMarker(name, type = 'Hub') {
  const isPass = type === 'Pass';
  const isPort = type === 'Port';

  const bgColor = isPass
    ? 'bg-purple-600 ring-purple-200'
    : isPort
    ? 'bg-sky-600 ring-sky-200'
    : 'bg-slate-800 ring-slate-200';

  const iconSvg = isPass
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>`
    : isPort
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4"/></svg>`;

  const html = `
    <div class="relative flex items-center justify-center cursor-pointer group">
      <div class="w-7 h-7 rounded-xl ${bgColor} text-white flex items-center justify-center shadow-md ring-2 ring-white">
        ${iconSvg}
      </div>
      <div class="absolute -top-6 bg-white/95 text-slate-800 font-bold text-[9px] px-1.5 py-0.5 rounded shadow-sm border border-slate-200 whitespace-nowrap pointer-events-none">
        ${name}
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-hub-marker',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14]
  });
}
