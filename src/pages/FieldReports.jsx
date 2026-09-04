import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileSpreadsheet,
  PlusCircle,
  CheckCircle2,
  Camera,
  MapPin,
  Upload,
  ThumbsUp,
  User,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Flame,
  Search,
  Check
} from 'lucide-react';

import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import { reportService } from '../services/reportService';

const INITIAL_REPORTS = [
  {
    id: 'RPT-301',
    reporter: 'Bhaskar Gogoi (Convoy Driver)',
    role: 'Commercial Driver',
    location: 'Haflong Ghati, Dima Hasao, Assam',
    hazardType: 'Fallen Rock Debris & Sludge',
    severity: 'Warning',
    description: 'Boulders on right carriageway after heavy morning rain. 6x6 trucks can pass single file slowly.',
    votes: 14,
    hasVoted: false,
    verified: true,
    timestamp: '25 mins ago',
    imageProof: true
  },
  {
    id: 'RPT-302',
    reporter: 'Tenzing Lepcha (Hill Specialist)',
    role: 'Local Volunteer',
    location: 'Singtam - Rangpo Link Road, Sikkim',
    hazardType: 'Waterlogging & Deep Mud Ruts',
    severity: 'Warning',
    description: 'Stream overflow across road bed at km 18. Sedans stuck, 4x4 trucks can cross slowly.',
    votes: 9,
    hasVoted: false,
    verified: false,
    timestamp: '1 hour ago',
    imageProof: false
  },
  {
    id: 'RPT-303',
    reporter: 'Capt. Ranjit Saikia',
    role: 'River Pilot',
    location: 'Dhubri River Ghat Channel, Assam',
    hazardType: 'Submerged Sandbank Siltation',
    severity: 'Info',
    description: 'Sandbar shifting ~30m eastward. Navigational draft only 2.1m at low water marker.',
    votes: 19,
    hasVoted: false,
    verified: true,
    timestamp: '3 hours ago',
    imageProof: true
  },
  {
    id: 'RPT-304',
    reporter: 'Keviletuo Angami',
    role: 'Border Roads Worker',
    location: 'Medziphema Hill Cutting, Nagaland',
    hazardType: 'Soil Cracking & Rockfall Risk',
    severity: 'Critical',
    description: 'Active fissures visible on upper hill slope. Recommending preventive convoy halt.',
    votes: 26,
    hasVoted: false,
    verified: true,
    timestamp: '4 hours ago',
    imageProof: true
  }
];

export default function FieldReports() {
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('All');
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState('');

  // Handle confirmation vote
  const handleVote = (id) => {
    setReports((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const newVotes = r.hasVoted ? r.votes - 1 : r.votes + 1;
          return {
            ...r,
            votes: newVotes,
            hasVoted: !r.hasVoted,
            verified: newVotes >= 10
          };
        }
        return r;
      })
    );
  };

  // Filter reports
  const filteredReports = reports.filter((r) => {
    const matchesSearch =
      r.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.hazardType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.reporter.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSev = filterSeverity === 'All' || r.severity === filterSeverity;
    return matchesSearch && matchesSev;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#111827]">Crowdsourced Field Hazard Reports</h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 text-[#EA580C]">
              Ground Intelligence
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Offline-first ground reports submitted by truck drivers, local border volunteers, and mountain rescue teams.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsSubmitOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold shadow-xs transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          Submit Ground Report
        </motion.button>
      </div>

      {/* Submission Success Banner */}
      <AnimatePresence>
        {submittedMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between shadow-2xs"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{submittedMessage}</span>
            </div>
            <button onClick={() => setSubmittedMessage('')} className="text-emerald-700 hover:text-emerald-900">
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search and Filter */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="search-hazard-reports"
            aria-label="Search hazard reports by location, driver, road"
            type="text"
            placeholder="Search hazard report by location, driver name, road..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-[#E2E8F0] rounded-xl outline-hidden focus:bg-white focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316] text-slate-900 placeholder:text-slate-400"
          />
        </div>

        <select
          id="filter-report-severity"
          aria-label="Filter reports by severity"
          value={filterSeverity}
          onChange={(e) => setFilterSeverity(e.target.value)}
          className="px-3 py-2 text-xs bg-slate-50 border border-[#E2E8F0] rounded-xl text-slate-700 outline-hidden focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]"
        >
          <option value="All">All Severities</option>
          <option value="Critical">Critical Only</option>
          <option value="Warning">Warning Only</option>
          <option value="Info">Advisory Only</option>
        </select>
      </div>

      {/* Reports Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredReports.map((report, idx) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.22, delay: idx * 0.03 }}
              whileHover={{ y: -3, scale: 1.012 }}
              layout
              className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs hover:shadow-card hover:border-orange-300 transition-all duration-200 flex flex-col justify-between will-change-transform"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#EA580C]">{report.id}</span>
                      <StatusBadge status={report.severity} size="xs" />
                      {report.verified && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          <Check className="w-3 h-3 text-emerald-600" />
                          Community Verified
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mt-1">{report.hazardType}</h3>
                  </div>

                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {report.timestamp}
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-xs text-slate-700 mt-2.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>{report.location}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 leading-relaxed">
                  {report.description}
                </p>

                {/* Reporter Info */}
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Submitted by: <strong className="text-slate-800">{report.reporter}</strong> ({report.role})</span>
                </div>
              </div>

              {/* Bottom Upvote Bar */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {report.votes} drivers verified this hazard
                </span>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => handleVote(report.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    report.hasVoted
                      ? 'bg-orange-500 text-white shadow-2xs'
                      : 'bg-slate-50 hover:bg-orange-50 text-slate-700 hover:text-[#EA580C] border border-slate-200'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  {report.hasVoted ? 'Confirmed' : 'Confirm Hazard'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Submit Report Modal */}
      <Modal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        title="Submit Ground Hazard Report"
        subtitle="Contribute real-time intelligence for all rolling convoys across the NER"
        icon={PlusCircle}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const reporter = formData.get('reporter');
            const role = formData.get('role');
            const location = formData.get('location');
            const hazardType = formData.get('hazardType');
            const severity = formData.get('severity');
            const description = formData.get('description');

            const newReport = {
              id: `RPT-${Math.floor(400 + Math.random() * 600)}`,
              reporter,
              role,
              location,
              hazardType,
              severity,
              description,
              votes: 1,
              hasVoted: true,
              verified: false,
              timestamp: 'Just now',
              imageProof: true
            };

            setReports([newReport, ...reports]);
            setSubmittedMessage(`Ground Report for "${hazardType}" successfully submitted and broadcasted.`);
            setIsSubmitOpen(false);
          }}
          className="space-y-4 text-xs"
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="report-author-name" className="block font-semibold text-slate-700 mb-1">
                Your Name
              </label>
              <input
                required
                id="report-author-name"
                name="reporter"
                placeholder="e.g. Robin Roy"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]"
              />
            </div>
            <div>
              <label htmlFor="report-author-role" className="block font-semibold text-slate-700 mb-1">
                Your Operational Role
              </label>
              <select
                id="report-author-role"
                name="role"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]"
              >
                <option value="Commercial Driver">Commercial Convoy Driver</option>
                <option value="Local Volunteer">Local Volunteer / Resident</option>
                <option value="River Pilot">River Pilot (NW-2)</option>
                <option value="Border Roads Worker">Border Roads / PWD Worker</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="report-hazard-location" className="block font-semibold text-slate-700 mb-1">
              Hazard Location (Highway / Landmark)
            </label>
            <input
              required
              id="report-hazard-location"
              name="location"
              placeholder="e.g. NH-29 Medziphema, Nagaland"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="report-hazard-classification" className="block font-semibold text-slate-700 mb-1">
                Hazard Classification
              </label>
              <select
                id="report-hazard-classification"
                name="hazardType"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]"
              >
                <option value="Fallen Rock Debris & Sludge">Fallen Rock Debris & Sludge</option>
                <option value="Waterlogging & River Swell">Waterlogging & River Swell</option>
                <option value="Submerged Sandbank Siltation">Submerged Sandbank Siltation</option>
                <option value="Sub-Zero Heavy Black Ice">Sub-Zero Heavy Black Ice</option>
                <option value="Bridge Span Structural Shift">Bridge Span Structural Shift</option>
              </select>
            </div>
            <div>
              <label htmlFor="report-hazard-severity" className="block font-semibold text-slate-700 mb-1">
                Severity Tier
              </label>
              <select
                id="report-hazard-severity"
                name="severity"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]"
              >
                <option value="Critical">Critical (Road Impassable)</option>
                <option value="Warning">Warning (Caution / Single Lane)</option>
                <option value="Info">Advisory (Slow Speed)</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="report-hazard-desc" className="block font-semibold text-slate-700 mb-1">
              Description & Road Advice
            </label>
            <textarea
              required
              id="report-hazard-desc"
              name="description"
              rows={3}
              placeholder="Provide exact details of debris volume, passability for heavy trucks, and weather..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]"
            />
          </div>

          {/* Photo upload mock */}
          <div className="p-3 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center gap-2 text-slate-500 bg-slate-50/50 cursor-pointer hover:border-orange-300 transition-colors">
            <Camera className="w-4 h-4 text-[#F97316]" />
            <span>Attach Evidence Photo (Geo-tagged metadata attached automatically)</span>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsSubmitOpen(false)}
              className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#F97316] text-white font-bold hover:bg-[#EA580C] transition-all shadow-xs"
            >
              SUBMIT REPORT
            </motion.button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
