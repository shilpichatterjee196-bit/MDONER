import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Layers,
  Leaf,
  Clock,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  FileText,
  CheckCircle2,
  Share2
} from 'lucide-react';

import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import Modal from '../components/Modal';
import { ANALYTICS } from '../data/analytics';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('Monsoon Q2');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportedSuccess, setExportedSuccess] = useState(false);

  const colors = ['#F97316', '#2563EB', '#16A34A', '#F59E0B'];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#111827]">SLA Performance & Spatial Logistics Analytics</h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 text-[#EA580C]">
              NEC & MoDONER Executive Reporting
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Data-driven performance evaluation of multi-modal freight shift, monsoonal resilience, and remote district accessibility.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            {['Last 30 Days', 'Monsoon Q2', 'Annual 2026'].map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  timeRange === r
                    ? 'bg-white text-[#EA580C] shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setExportedSuccess(false);
              setIsExportModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold shadow-xs transition-colors whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            Export Government Dossier
          </button>
        </div>
      </div>

      {/* Top KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Avg Transit Time Reduction"
          value="23.4%"
          change="+4.2% MoM"
          trend="up"
          caption="Via AI route heuristic bypasses"
          icon={TrendingUp}
          badgeText="SLA Exceeded"
          badgeType="success"
        />

        <StatCard
          title="Fuel & Carbon Offset"
          value="182.4 T"
          change="-14.8% emissions"
          trend="up"
          caption="Brahmaputra NW-2 barge shift"
          icon={Leaf}
          badgeText="Green Transit"
          badgeType="orange"
        />

        <StatCard
          title="Medicine Cold-Chain SLA"
          value="99.1%"
          change="Target: 98%"
          trend="up"
          caption="Zero temperature excursions"
          icon={Zap}
          badgeText="Optimal"
          badgeType="success"
        />

        <StatCard
          title="Hazard Resolution Speed"
          value="3.2 hrs"
          change="-45 mins"
          trend="up"
          caption="BRO rapid machinery triage"
          icon={Clock}
          badgeText="Fast Response"
          badgeType="default"
        />
      </div>

      {/* Visualizations Row 1: Throughput Comparison & Modal Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Multi-Modal Throughput Chart */}
        <div className="lg:col-span-2">
          <ChartCard
            title="Multi-Modal Freight Throughput Dynamics (Tons)"
            subtitle="Demonstrating how NW-2 riverway freight absorbs volume during monsoon road slumps"
          >
            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ANALYTICS.monthlyThroughput} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="roadGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F97316" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#F97316" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="riverGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      fontSize: '12px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Area
                    type="monotone"
                    dataKey="roadFreightTons"
                    name="All-Terrain Road Freight (Tons)"
                    stroke="#F97316"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#roadGradient)"
                    isAnimationActive={true}
                    animationDuration={1100}
                    animationEasing="ease-out"
                  />
                  <Area
                    type="monotone"
                    dataKey="riverWaterwayTons"
                    name="Brahmaputra NW-2 Barge Freight (Tons)"
                    stroke="#2563EB"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#riverGradient)"
                    isAnimationActive={true}
                    animationDuration={1200}
                    animationEasing="ease-out"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Modal Distribution Donut */}
        <div>
          <ChartCard
            title="Logistics Modal Share"
            subtitle="Percentage of total regional freight volume by transport mode"
          >
            <div className="h-56 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ANALYTICS.modalDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                    isAnimationActive={true}
                    animationDuration={1000}
                    animationEasing="ease-out"
                  >
                    {ANALYTICS.modalDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color || colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid #E2E8F0',
                      fontSize: '12px'
                    }}
                    formatter={(val) => [`${val}%`, 'Share']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1.5 mt-2 text-xs">
              {ANALYTICS.modalDistribution.map((m, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color }} />
                    <span className="text-slate-600 truncate">{m.name}</span>
                  </div>
                  <span className="font-bold text-slate-900 font-mono">{m.value}%</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>

      {/* Visualizations Row 2: Hazard Incidents & State Rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hazard Types & Delay Hours */}
        <ChartCard
          title="Monsoon Disruption Frequency & Clearance Delays"
          subtitle="Frequency of natural hazard events vs average transit delay (Hours)"
        >
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ANALYTICS.hazardIncidentsByType} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis
                  dataKey="type"
                  stroke="#94A3B8"
                  fontSize={10}
                  tickLine={false}
                  tickFormatter={(t) => t.split(' ')[0]}
                />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar
                  dataKey="count"
                  name="Incidents Reported (Q2)"
                  fill="#F97316"
                  radius={[6, 6, 0, 0]}
                  isAnimationActive={true}
                  animationDuration={950}
                  animationEasing="ease-out"
                />
                <Bar
                  dataKey="avgDelayHours"
                  name="Avg Clearance Delay (Hours)"
                  fill="#64748B"
                  radius={[6, 6, 0, 0]}
                  isAnimationActive={true}
                  animationDuration={1100}
                  animationEasing="ease-out"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* State-by-State Logistics Performance Table */}
        <ChartCard
          title="8-State Accessibility & Convoys Performance"
          subtitle="Regional readiness scores compiled for North Eastern Council (NEC)"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-[#E2E8F0] text-[10px] font-bold uppercase text-slate-500">
                <tr>
                  <th className="py-2.5 px-3">State</th>
                  <th className="py-2.5 px-3">Composite RDAI</th>
                  <th className="py-2.5 px-3">Lifeline Coverage</th>
                  <th className="py-2.5 px-3 text-right">Active Convoys</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ANALYTICS.stateAccessibilityRanking.map((s, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-2 px-3 font-semibold text-slate-900">{s.state}</td>
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold">{s.avgRDAI}</span>
                        <div className="w-12 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              s.avgRDAI > 75 ? 'bg-emerald-500' : s.avgRDAI > 60 ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${s.avgRDAI}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-3 font-semibold text-slate-700">{s.coverage}</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-[#EA580C]">
                      {s.convoysActive}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>
      </div>

      {/* Export Government Dossier Modal */}
      <Modal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        title="Official Government Logistics Performance Dossier"
        subtitle="Ministry of Development of North Eastern Region (MoDONER) • SIH26002"
        icon={FileText}
        maxWidth="max-w-xl"
      >
        {exportedSuccess ? (
          <div className="p-6 text-center space-y-3 text-xs">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Government PDF Dossier Generated</h4>
            <p className="text-slate-600">
              Document <strong>NER-SLA-REPORT-2026-Q2.pdf</strong> with full cryptographic verification hash has been downloaded and filed with the NEC Secretariat.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setIsExportModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#F97316] text-white font-bold"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-xs">
            {/* Government Brief Preview Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">
                  Executive Report Contents
                </span>
                <span className="font-mono text-slate-500 text-[10px]">Confidential - Gov Internal</span>
              </div>
              <ul className="space-y-1.5 text-slate-600 text-[11px]">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>8-State RDAI isolation indices and seasonal flood stress scores.</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>NW-2 Inland Waterway freight adoption and diesel offset metrics.</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>BRO road clearance response times across NH-29, NH-13, and NH-06.</span>
                </li>
              </ul>
            </div>

            <div>
              <label htmlFor="analytics-recipient-dept" className="block font-semibold text-slate-700 mb-1">
                Recipient Department
              </label>
              <input
                id="analytics-recipient-dept"
                type="text"
                defaultValue="North Eastern Council (NEC) Secretariat & Planning Commission"
                className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl font-medium text-slate-800"
                readOnly
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setIsExportModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setExportedSuccess(true)}
                className="px-4 py-2 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold shadow-xs flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Generate Official PDF
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
