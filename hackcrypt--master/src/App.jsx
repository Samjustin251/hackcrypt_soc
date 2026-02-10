import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Alerts from './pages/Alerts';
import AlertDetails from './pages/AlertDetails';
import System from './pages/System';
import Settings from './pages/Settings';
import Login from './pages/Login';
import ThreatMap from './components/ThreatMap'; // Reusing component as page for demo

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="alerts/:id" element={<AlertDetails />} />
          <Route path="system" element={<System />} />
          <Route path="settings" element={<Settings />} />
          <Route path="threat-map" element={
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold mb-6">Global Threat Visualization</h2>
              <div style={{ height: '80vh' }}>
                <ThreatMap />
              </div>
            </div>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
