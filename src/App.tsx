import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DefaultLayout from "@/components/DefaultLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import RiskAssessment from "./pages/RiskAssessment";
import ScreeningPlanner from "./pages/ScreeningPlanner";
import InventoryStatus from "./pages/InventoryStatus";
import CostEstimator from "./pages/CostEstimator";
import ReportsTrends from "./pages/ReportsTrends";
import PatientRecord from "./pages/PatientRecord";
import PatientLayout from "./components/PatientLayout";
import PatientRisk from "./pages/PatientRisk";
import PatientCost from "./pages/PatientCost";
import PatientProfile from "./pages/PatientProfile";

function App() {
  // Local state to track mock authentication
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('mockUser');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    // Listen for login/register events from Login/Register pages
    const onStorage = () => {
      const stored = localStorage.getItem('mockUser');
      setUser(stored ? JSON.parse(stored) : null);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  if (!user) {
    // Not authenticated: show login/register
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
        <Route path="/*" element={<Login />} />
              </Routes>
    );
  }

  // Authenticated: route based on role
  if (user.role === 'Admin') {
    return (
            <DefaultLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/risk-assessment" element={<RiskAssessment />} />
                <Route path="/screening-planner" element={<ScreeningPlanner />} />
                <Route path="/inventory" element={<InventoryStatus />} />
                <Route path="/cost-estimator" element={<CostEstimator />} />
                <Route path="/reports" element={<ReportsTrends />} />
                <Route path="/patients" element={<PatientRecord />} />
              </Routes>
            </DefaultLayout>
    );
  } else {
    return (
      <PatientLayout>
        <Routes>
          <Route path="/patient/risk" element={<PatientRisk />} />
          <Route path="/patient/cost" element={<PatientCost />} />
          <Route path="/patient/profile" element={<PatientProfile />} />
          <Route path="*" element={<Navigate to="/patient/risk" replace />} />
    </Routes>
      </PatientLayout>
  );
  }
}

export default App; 