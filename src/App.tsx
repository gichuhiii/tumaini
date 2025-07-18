import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/patient/*"
            element={
              <PrivateRoute requiredRole="Patient">
                <PatientLayout>
                  <Routes>
                    <Route path="risk" element={<PatientRisk />} />
                    <Route path="cost" element={<PatientCost />} />
                    <Route path="profile" element={<PatientProfile />} />
                    <Route path="*" element={<Navigate to="risk" replace />} />
                  </Routes>
                </PatientLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/*"
            element={
              <PrivateRoute requiredRole="Admin">
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
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App; 