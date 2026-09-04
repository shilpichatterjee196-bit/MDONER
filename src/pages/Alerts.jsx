import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  Clock,
  MapPin,
  ShieldAlert,
  CheckCircle2,
  Filter,
  Flame,
  Wrench,
  Truck,
  Plus,
  Radio,
  Send,
  ArrowRight,
  ExternalLink,
  RefreshCw,
  Navigation
} from 'lucide-react';
import { Link } from 'react-router-dom';

import AlertCard from '../components/AlertCard';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import { ALERTS } from '../data/alerts';
import { INCIDENTS } from '../data/incidents';
import { alertService } from '../services/alertService';

export default function Alerts() {
  const [alerts, setAlerts] = useState(ALERTS);
  const [incidents, setIncidents] = useState(INCIDENTS);
  const [activeSeverity, setActiveSeverity] = useState('All');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isSosOpen, setIsSosOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [sosSentMessage, setSosSentMessage] = useState('');

  // Filter alerts
  const filteredAlerts = alerts.filter((a) => {
    const matchesSev = activeSeverity === 'All' || a.severity === activeSeverity;
    const matchesCat = activeCategory === 'All' || a.category === activeCategory;
    return matchesSev && matchesCat;
  });

  // Advance Incident Clearance Progress
  const handleAdvanceProgress = (incidentId) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id === incidentId) {
          const nextVal = Math.min(100, inc.progressPercentage + 20);
          return {
            ...inc,
            progressPercentage: nextVal,
            status: nextVal === 100 ? 'Resolved' : 'In Progress',
            updates: [
              { time: 'Just now', note: `BRO engineering team advanced sector clearance to ${nextVal}%.` },
              ...inc.updates
            ]
          };
        }
        return inc;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#111827]">Emergency Alerts & Incident Triage Command</h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-700">
              Disaster Protocol Active
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Real-time hazard monitoring powered by Border Roads Organisation (BRO), IMD weather radar, and SDRF river patrols.
          </p>
        </div>

        <button
          onClick={() => setIsSosOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-colors"
        >
          <Flame className="w-4 h-4" />
          Broadcast Emergency SOS
        </button>
      </div>

      {/* SOS Success Banner */}
      {sosSentMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span>{sosSentMessage}</span>
          </div>
          <button onClick={() => setSosSentMessage('')} className="text-red-700 hover:text-red-900">
            Dismiss
          </button>
        </div>
      )}

      {/* Filters Bar */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Severity Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Critical', 'Warning', 'Info'].map((sev) => (
            <button
              key={sev}
              onClick={() => setActiveSeverity(sev)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                activeSeverity === sev
                  ? sev === 'Critical'
                    ? 'bg-red-600 text-white shadow-xs'
                    : sev === 'Warning'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-[#EA580C] text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {sev} {sev === 'All' ? `(${alerts.length})` : ''}
            </button>
          ))}
        </div>

        {/* Category Dropdown */}
        <select
          id="filter-hazard-category"
          aria-label="Filter by Hazard Type"
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
          className="px-3 py-1.5 text-xs bg-slate-50 border border-[#E2E8F0] rounded-xl text-slate-700 outline-hidden focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]"
        >
          <option value="All">All Hazard Types</option>
          <option value="Landslide">Landslides & Rockfall</option>
          <option value="Flood">River Swells & Floods</option>
          <option value="Weather">Black Ice & Blizzards</option>
          <option value="Infrastructure">Bridge Restrictions</option>
        </select>
      </div>

      {/* Two Column Layout: Active Incidents Triage (Left) & Alert Feed (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Incident Triage & Heavy Machinery Deployed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Active Ground Incident Triage</h3>
                <p className="text-xs text-slate-500">Field operations under BRO and State Disaster Authorities</p>
              </div>
              <span className="text-xs font-bold text-slate-600 font-mono">
                {incidents.filter((i) => i.status !== 'Resolved').length} Active Sectors
              </span>
            </div>

            <div className="mt-4 space-y-4">
              {incidents.map((incident) => (
                <div
                  key={incident.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-orange-300 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <span className="font-mono text-xs font-bold text-[#EA580C] flex-shrink-0">{incident.id}</span>
                      <div className="flex-shrink-0">
                        <StatusBadge status={incident.priority} size="xs" />
                      </div>
                      <span className="text-xs font-bold text-slate-900 break-words line-clamp-2 min-w-0" title={incident.title}>
                        {incident.title}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 flex-shrink-0 self-start sm:self-auto whitespace-nowrap">{incident.time}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-600 mt-2 flex-wrap min-w-0">
                    <MapPin className="w-3.5 h-3.5 text-[#F97316] flex-shrink-0" />
                    <span className="break-words">{incident.district}, {incident.state}</span>
                    <span className="text-slate-300">•</span>
                    <span className="font-semibold text-slate-800 break-words">{incident.assignedTeam}</span>
                  </div>

                  {/* Deployed Heavy Equipment */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {incident.resourcesDeployed.map((res, i) => (
                      <span key={i} className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded-md text-slate-700 font-medium">
                        {res.qty}x {res.item}
                      </span>
                    ))}
                  </div>

                  {/* Clearance Progress Bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-500 font-medium">Clearance Progress</span>
                      <span className="font-bold font-mono text-slate-800">{incident.progressPercentage}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          incident.progressPercentage === 100
                            ? 'bg-emerald-500'
                            : incident.progressPercentage > 60
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${incident.progressPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Incident Action Buttons */}
                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <button
                      onClick={() => setSelectedIncident(incident)}
                      className="font-semibold text-[#EA580C] hover:underline flex-shrink-0"
                    >
                      View Operational Logs ({incident.updates.length})
                    </button>

                    {incident.progressPercentage < 100 ? (
                      <button
                        onClick={() => handleAdvanceProgress(incident.id)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-slate-300 hover:bg-orange-50 hover:border-orange-300 rounded-lg font-bold text-slate-700 transition-colors flex-shrink-0"
                      >
                        <Wrench className="w-3.5 h-3.5 text-[#F97316]" />
                        Advance Clearance (+20%)
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4" /> Sector Cleared
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Alerts Feed */}
        <div className="space-y-4">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-3">Live Hazard Stream</h3>
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {filteredAlerts.map((alert, idx) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.22, delay: idx * 0.03 }}
                    layout
                  >
                    <AlertCard
                      alert={alert}
                      onReroute={() => alert(`Reroute calculated for corridor ${alert.corridorName}.`)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Incident Operational Logs Modal */}
      <Modal
        isOpen={!!selectedIncident}
        onClose={() => setSelectedIncident(null)}
        title={selectedIncident?.title || 'Incident Logs'}
        subtitle={`Incident Code: ${selectedIncident?.id} • Assigned: ${selectedIncident?.assignedTeam}`}
        icon={Wrench}
      >
        {selectedIncident && (
          <div className="space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 font-semibold">Incident Location:</span>
              <p className="text-sm font-bold text-slate-900 mt-0.5">{selectedIncident.district}, {selectedIncident.state}</p>
              <p className="text-slate-500 mt-1">Stranded Convoys: {selectedIncident.strandedVehiclesCount} units</p>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-2">Chronological Field Updates</h4>
              <div className="space-y-2 border-l-2 border-orange-200 pl-3">
                {selectedIncident.updates.map((up, i) => (
                  <div key={i} className="text-slate-700">
                    <span className="font-bold text-[#EA580C] font-mono">{up.time}</span>
                    <p className="text-slate-600 mt-0.5">{up.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedIncident(null)}
                className="px-4 py-2 rounded-xl bg-[#F97316] text-white font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Emergency SOS Modal */}
      <Modal
        isOpen={isSosOpen}
        onClose={() => setIsSosOpen(false)}
        title="Broadcast Emergency SOS Protocol"
        subtitle="Transmit high-priority alert across all 142 convoys and VHF disaster radio channels"
        icon={Flame}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const title = formData.get('title');
            const location = formData.get('location');
            const severity = formData.get('severity');

            alertService.broadcastSosAlert({ title, location, severity });
            setSosSentMessage(`Emergency SOS broadcasted: "${title}" transmitted to all units.`);
            setIsSosOpen(false);
          }}
          className="space-y-4 text-xs"
        >
          <div>
            <label htmlFor="sos-emergency-title" className="block font-semibold text-slate-700 mb-1">
              Emergency Title / Subject
            </label>
            <input
              required
              id="sos-emergency-title"
              name="title"
              defaultValue="Critical Flash Flood Road Breach – All Heavy Convoys Halt"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="sos-severity-level" className="block font-semibold text-slate-700 mb-1">
                Severity Level
              </label>
              <select
                id="sos-severity-level"
                name="severity"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="Critical">Critical Emergency (Immediate Action)</option>
                <option value="Warning">Warning (Caution / Slow Passage)</option>
                <option value="Info">Advisory (Monitoring)</option>
              </select>
            </div>
            <div>
              <label htmlFor="sos-sector-location" className="block font-semibold text-slate-700 mb-1">
                Sector / Road Marker
              </label>
              <input
                required
                id="sos-sector-location"
                name="location"
                defaultValue="NH-29 Chumukedima Ghati, Nagaland"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>

          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-900 text-[11px]">
            <span className="font-bold">Broadcast Transmission Channels:</span>
            <ul className="list-disc pl-4 mt-1 space-y-0.5">
              <li>142 SatCom Telematics Units</li>
              <li>National Waterways NW-2 River Port Radio</li>
              <li>State Disaster Response Force (SDRF) Gateway</li>
            </ul>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsSosOpen(false)}
              className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 shadow-xs"
            >
              Confirm Broadcast
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
