import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Truck,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Navigation,
  SlidersHorizontal,
  Compass,
  Radio,
  Gauge,
  Fuel,
  BatteryCharging,
  Thermometer,
  ShieldCheck,
  Phone,
  Package,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Layers
} from 'lucide-react';
import VehicleCard from '../components/VehicleCard';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import { VEHICLES } from '../data/vehicles';
import { vehicleService } from '../services/vehicleService';

export default function Vehicles() {
  const [vehicles, setVehicles] = useState(VEHICLES);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryTab, setActiveCategoryTab] = useState('All');
  const [filterState, setFilterState] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [diagnosticVehicle, setDiagnosticVehicle] = useState(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isPinging, setIsPinging] = useState(false);
  const [pingNotification, setPingNotification] = useState('');

  // Category Tabs
  const categoryTabs = [
    { id: 'All', label: 'All Fleet Units', count: vehicles.length },
    { id: 'Truck', label: 'All-Terrain 6x6 & 4x4', count: vehicles.filter((v) => v.category === 'Truck').length },
    { id: 'Barge', label: 'River Barges (NW-2)', count: vehicles.filter((v) => v.category === 'Barge').length },
    { id: 'Drone', label: 'VTOL Cargo Drones', count: vehicles.filter((v) => v.category === 'Drone').length },
    { id: 'Medical', label: 'Cold-Chain Medical', count: vehicles.filter((v) => v.category === 'Medical').length },
  ];

  // Ping Telemetry Simulation
  const handlePingTelemetry = () => {
    setIsPinging(true);
    setTimeout(() => {
      setVehicles((prev) =>
        prev.map((v) => ({
          ...v,
          telemetry: {
            ...v.telemetry,
            speed: v.status === 'Available' ? 0 : Math.max(15, v.telemetry.speed + (Math.floor(Math.random() * 7) - 3)),
            engineTemp: Math.min(95, Math.max(70, v.telemetry.engineTemp + (Math.floor(Math.random() * 3) - 1)))
          },
          lastPing: 'Just now'
        }))
      );
      setIsPinging(false);
      setPingNotification('Live GPS Telemetry pinged across all 142 fleet transponders.');
      setTimeout(() => setPingNotification(''), 4000);
    }, 600);
  };

  // Filter vehicles
  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch =
      v.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.location.currentRoad.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.location.state.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategoryTab === 'All' || v.category === activeCategoryTab;

    const matchesState =
      filterState === 'All' || v.location.state === filterState;

    const matchesStatus =
      filterStatus === 'All' || v.status === filterStatus;

    return matchesSearch && matchesCategory && matchesState && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#111827]">Fleet Telematics & Vehicle Registry</h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              Live SatCom Active
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Real-time GPS telematics, cargo cold-chain monitoring, and driver communications across the North East.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePingTelemetry}
            disabled={isPinging}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#E2E8F0] hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#F97316] ${isPinging ? 'animate-spin' : ''}`} />
            {isPinging ? 'Pinging Satellites...' : 'Ping Telemetry'}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsRegisterOpen(true)}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F97316] text-white text-xs font-semibold hover:bg-[#EA580C] shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            Register Vehicle Unit
          </motion.button>
        </div>
      </div>

      {/* Ping Notification Banner */}
      <AnimatePresence>
        {pingNotification && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between shadow-2xs"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{pingNotification}</span>
            </div>
            <button onClick={() => setPingNotification('')} className="text-emerald-700 hover:text-emerald-900 text-xs">
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Pills Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categoryTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategoryTab(tab.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 border ${
              activeCategoryTab === tab.id
                ? 'bg-[#FFF7ED] text-[#EA580C] border-orange-300 shadow-xs'
                : 'bg-white border-[#E2E8F0] text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeCategoryTab === tab.id
                  ? 'bg-[#EA580C] text-white'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="search-vehicles-input"
            aria-label="Search vehicles by ID, driver, corridor, state"
            type="text"
            placeholder="Search by vehicle ID, driver, highway corridor, state..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-[#E2E8F0] rounded-xl outline-hidden focus:bg-white focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316] text-slate-900 placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {/* Status Filter */}
          <select
            id="filter-vehicle-status"
            aria-label="Filter vehicles by status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-[#E2E8F0] rounded-xl text-slate-700 outline-hidden focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]"
          >
            <option value="All">All Statuses</option>
            <option value="In Transit">In Transit</option>
            <option value="Available">Available</option>
            <option value="Alert">Alert / Warning</option>
          </select>

          {/* State Filter */}
          <select
            value={filterState}
            onChange={(e) => setFilterState(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-[#E2E8F0] rounded-xl text-slate-700 outline-hidden focus:border-[#F97316]"
          >
            <option value="All">All NER States</option>
            <option value="Assam">Assam</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Manipur">Manipur</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Tripura">Tripura</option>
          </select>
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredVehicles.map((vehicle, idx) => (
            <motion.div
              key={vehicle.id}
              className="min-w-0 flex flex-col"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.22, delay: idx * 0.025 }}
              layout
            >
              <VehicleCard
                vehicle={vehicle}
                onInspect={(v) => setSelectedVehicle(v)}
                onTrackOnMap={() => setDiagnosticVehicle(vehicle)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Full Vehicle Telematics Modal */}
      <Modal
        isOpen={!!selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
        title={selectedVehicle?.name || 'Vehicle Telematics'}
        subtitle={`Registry ID: ${selectedVehicle?.id} • License: ${selectedVehicle?.plateNumber}`}
        icon={Truck}
        maxWidth="max-w-xl"
      >
        {selectedVehicle && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-orange-50/50 border border-orange-200">
              <div>
                <span className="text-[10px] uppercase font-bold text-orange-800">Operational Status</span>
                <p className="text-sm font-bold text-slate-900 mt-0.5">{selectedVehicle.status}</p>
              </div>
              <StatusBadge status={selectedVehicle.status} size="md" />
            </div>

            {/* Live Telemetry Gauges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Speed</span>
                <span className="text-base font-bold text-slate-900 font-mono">
                  {selectedVehicle.telemetry.speed} {selectedVehicle.telemetry.speedUnit}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Fuel / Battery</span>
                <span className="text-base font-bold text-[#EA580C] font-mono">
                  {selectedVehicle.telemetry.fuelLevel}%
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Engine Temp</span>
                <span className="text-base font-bold text-slate-900 font-mono">
                  {selectedVehicle.telemetry.engineTemp}°C
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Altitude</span>
                <span className="text-base font-bold text-slate-900 font-mono">
                  {selectedVehicle.telemetry.altitude}m
                </span>
              </div>
            </div>

            {/* Driver & Assignment */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between gap-2 min-w-0">
                <span className="text-slate-500 flex-shrink-0">Convoy Driver:</span>
                <span className="font-semibold text-slate-900 truncate" title={selectedVehicle.driver.name}>{selectedVehicle.driver.name}</span>
              </div>
              <div className="flex items-center justify-between gap-2 min-w-0">
                <span className="text-slate-500 flex-shrink-0">Direct Comms:</span>
                <span className="font-mono font-bold text-slate-900 truncate">{selectedVehicle.driver.phone}</span>
              </div>
              <div className="flex items-start justify-between gap-2 min-w-0">
                <span className="text-slate-500 flex-shrink-0">Route Corridor:</span>
                <span className="font-semibold text-slate-900 text-right break-words line-clamp-2" title={selectedVehicle.location.currentRoad}>{selectedVehicle.location.currentRoad}</span>
              </div>
              <div className="flex items-start justify-between gap-2 min-w-0">
                <span className="text-slate-500 flex-shrink-0">Operating Base:</span>
                <span className="text-slate-800 text-right break-words line-clamp-2" title={selectedVehicle.location.hub}>{selectedVehicle.location.hub}</span>
              </div>
            </div>

            {/* Cargo Cold-Chain */}
            {selectedVehicle.cargo && (
              <div className="p-3 rounded-xl bg-orange-50/40 border border-orange-100">
                <div className="flex items-center justify-between gap-2 text-[11px] pb-1 border-b border-orange-100 flex-wrap">
                  <span className="font-bold text-orange-950 flex items-center gap-1 min-w-0 truncate" title={selectedVehicle.cargo.consignmentId}>
                    <Package className="w-3.5 h-3.5 text-[#EA580C] flex-shrink-0" />
                    <span className="truncate">Consignment: {selectedVehicle.cargo.consignmentId}</span>
                  </span>
                  {selectedVehicle.cargo.temperatureControl && (
                    <span className="font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded flex-shrink-0">
                      Temp: {selectedVehicle.cargo.currentTemp}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-700 mt-2 break-words leading-relaxed">{selectedVehicle.cargo.description}</p>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                  <span className="truncate">Weight: {selectedVehicle.cargo.weightKg.toLocaleString()} kg</span>
                  <span className="truncate max-w-[200px]" title={selectedVehicle.cargo.destination}>Destination: {selectedVehicle.cargo.destination}</span>
                </div>
              </div>
            )}

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setSelectedVehicle(null)}
                className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Voice radio call dispatched to ${selectedVehicle.driver.name} (${selectedVehicle.driver.phone})`);
                }}
                className="px-4 py-2 rounded-xl bg-[#F97316] text-white font-semibold hover:bg-[#EA580C]"
              >
                Radio Contact Driver
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Diagnostic & Telemetry Check Modal */}
      <Modal
        isOpen={!!diagnosticVehicle}
        onClose={() => setDiagnosticVehicle(null)}
        title={diagnosticVehicle?.name ? `${diagnosticVehicle.name} Sensor Diagnostics` : 'Diagnostic Check'}
        subtitle={`Hardware Health Scan • GPS Lock: ${diagnosticVehicle?.telemetry?.satelliteLocked} Satellites`}
        icon={Wrench}
      >
        {diagnosticVehicle && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Battery Health</span>
                <p className="text-lg font-bold text-emerald-600 font-mono mt-0.5">
                  {diagnosticVehicle.telemetry.batteryHealth}% Optimal
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Tire Pressure Avg</span>
                <p className="text-lg font-bold text-slate-800 font-mono mt-0.5">
                  {diagnosticVehicle.telemetry.tirePressureAvg ? `${diagnosticVehicle.telemetry.tirePressureAvg} PSI` : 'N/A (River Craft)'}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                All Sensors Operational
              </div>
              <p className="text-[11px] text-emerald-800">
                Satellite telemetry transceiver, emergency SOS transponder, and digital tachograph reporting within normal operating parameters.
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setDiagnosticVehicle(null)}
                className="px-4 py-2 rounded-xl bg-[#F97316] text-white font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Register Vehicle Modal */}
      <Modal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        title="Register New NER Fleet Unit"
        subtitle="Add all-terrain truck, river barge, or VTOL medical drone"
        icon={Plus}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const name = formData.get('name');
            const category = formData.get('category');
            const state = formData.get('state');
            const driverName = formData.get('driverName');

            const newUnit = {
              id: `NER-TRK-${Math.floor(200 + Math.random() * 800)}`,
              name,
              category,
              type: `${category} Off-Road Spec`,
              plateNumber: `AS-01-XX-${Math.floor(1000 + Math.random() * 9000)}`,
              driver: { name: driverName, phone: '+91 94350-00000', experience: '5 yrs', rating: 5.0 },
              location: { state, hub: `${state} Main Hub`, lat: 26.14, lng: 91.73, currentRoad: 'NH Corridor' },
              telemetry: { speed: 0, speedUnit: 'km/h', fuelLevel: 100, batteryHealth: 100, engineTemp: 40, altitude: 200, satelliteLocked: 12 },
              status: 'Available',
              lastPing: 'Just now'
            };

            setVehicles([newUnit, ...vehicles]);
            setIsRegisterOpen(false);
          }}
          className="space-y-4 text-xs"
        >
          <div>
            <label htmlFor="reg-vehicle-name" className="block font-semibold text-slate-700 mb-1">
              Vehicle Unit Name
            </label>
            <input
              required
              id="reg-vehicle-name"
              name="name"
              placeholder="e.g. Barak Valley Heavy Rover"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="reg-vehicle-category" className="block font-semibold text-slate-700 mb-1">
                Category
              </label>
              <select
                id="reg-vehicle-category"
                name="category"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]"
              >
                <option value="Truck">All-Terrain Truck</option>
                <option value="Barge">River Freight Barge</option>
                <option value="Drone">Cargo Drone</option>
                <option value="Medical">Medical Rover</option>
              </select>
            </div>
            <div>
              <label htmlFor="reg-vehicle-state" className="block font-semibold text-slate-700 mb-1">
                State Base
              </label>
              <select
                id="reg-vehicle-state"
                name="state"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]"
              >
                <option value="Assam">Assam</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Manipur">Manipur</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tripura">Tripura</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="reg-driver-name" className="block font-semibold text-slate-700 mb-1">
              Designated Commander / Driver
            </label>
            <input
              required
              id="reg-driver-name"
              name="driverName"
              placeholder="e.g. Robin Roy"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsRegisterOpen(false)}
              className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#F97316] text-white font-semibold hover:bg-[#EA580C]"
            >
              Register Unit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
