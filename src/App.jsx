import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';

import Dashboard from './pages/Dashboard';
import LiveMap from './pages/LiveMap';
import RouteOptimization from './pages/RouteOptimization';
import Vehicles from './pages/Vehicles';
import Accessibility from './pages/Accessibility';
import Alerts from './pages/Alerts';
import FieldReports from './pages/FieldReports';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="live-map" element={<LiveMap />} />
        <Route path="route-optimization" element={<RouteOptimization />} />
        <Route path="vehicles" element={<Vehicles />} />
        <Route path="accessibility" element={<Accessibility />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="field-reports" element={<FieldReports />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
