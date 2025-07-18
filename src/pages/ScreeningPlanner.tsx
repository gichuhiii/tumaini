import React from "react";
import { Button } from "@/components/ui/button";

const screeningPlans = [
  {
    name: "Maria Santos",
    risk: "Low Risk",
    riskLevel: "low",
    tests: ["Pap Smear"],
    date: "2027-01-15",
    status: "Scheduled",
  },
  {
    name: "Grace Mwangi",
    risk: "Moderate Risk",
    riskLevel: "moderate",
    tests: ["HPV Test", "Pap Smear"],
    date: "2025-06-20",
    status: "Pending",
  },
  {
    name: "Fatima Hassan",
    risk: "High Risk",
    riskLevel: "high",
    tests: ["Colposcopy"],
    date: "2024-08-10",
    status: "Urgent",
  },
];

const stats = [
  { label: "Total Scheduled", value: 156, description: "Active screening plans" },
  { label: "Due This Month", value: 23, description: "Require attention" },
  { label: "Overdue", value: 7, description: "Need immediate follow-up" },
];

const guidelines = [
  { label: "Low Risk", color: "green", description: "Pap smear every 3 years" },
  { label: "Moderate Risk", color: "yellow", description: "Enhanced screening every 1-2 years" },
  { label: "High Risk", color: "red", description: "Immediate colposcopy, 6-month follow-up" },
];

const quickActions = [
  { label: "Send Screening Reminders" },
  { label: "Bulk Schedule Update" },
  { label: "Generate Reports" },
];

const riskBadge = (risk: string, riskLevel: string) => {
  const color =
    riskLevel === "low"
      ? "bg-green-100 text-green-700 border-green-300"
      : riskLevel === "moderate"
      ? "bg-yellow-100 text-yellow-700 border-yellow-300"
      : "bg-red-100 text-red-700 border-red-300";
  return (
    <span className={`inline-block px-2 py-0.5 rounded border text-xs font-semibold mr-2 ${color}`}>{risk}</span>
  );
};

const statusBadge = (status: string) => {
  if (status === "Scheduled")
    return <span className="inline-block px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-xs">Scheduled</span>;
  if (status === "Pending")
    return <span className="inline-block px-2 py-0.5 rounded bg-black text-white text-xs">Pending</span>;
  if (status === "Urgent")
    return <span className="inline-block px-2 py-0.5 rounded bg-red-600 text-white text-xs">Urgent</span>;
  return null;
};

const ScreeningPlanner = () => {
  return (
    <div>
      <p className="text-gray-500 mb-6">Generate and manage personalized screening schedules based on risk assessments.</p>
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg border p-6 flex flex-col items-center">
            <div className="text-2xl font-bold text-pink-600 mb-1">{stat.value}</div>
            <div className="font-medium text-gray-700">{stat.label}</div>
            <div className="text-xs text-gray-400 mt-1">{stat.description}</div>
          </div>
        ))}
      </div>
      {/* Screening Plans */}
      <div className="bg-white rounded-lg border p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-lg mb-1">Screening Plans</h2>
            <p className="text-gray-500 text-sm">Manage patient screening schedules and recommendations</p>
          </div>
          <div className="flex gap-2">
            <Button className="bg-pink-500 hover:bg-pink-600 text-white">Schedule New Screening</Button>
            <Button variant="outline">Export Schedule</Button>
          </div>
        </div>
        <div className="divide-y">
          {screeningPlans.map((plan) => (
            <div key={plan.name} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xl">
                  <span className="material-icons">person</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900 flex items-center">
                    {plan.name} {riskBadge(plan.risk, plan.riskLevel)}
                  </div>
                  <div className="text-xs text-gray-500">{plan.tests.join(" + ")}</div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-sm text-gray-700 flex items-center gap-2">
                  <span className="mr-2">{plan.date}</span>
                  {statusBadge(plan.status)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Screening Guidelines */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="font-semibold text-md mb-2">Screening Guidelines</h3>
          <div className="space-y-2">
            {guidelines.map((g) => (
              <div key={g.label} className="flex items-center gap-2 text-sm">
                <span className={`inline-block w-3 h-3 rounded-full bg-${g.color}-500`}></span>
                <span className="font-medium">{g.label}</span>
                <span className="text-gray-500">{g.description}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Quick Actions */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="font-semibold text-md mb-2">Quick Actions</h3>
          <div className="space-y-2">
            {quickActions.map((a) => (
              <Button key={a.label} variant="outline" className="w-full text-left">{a.label}</Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreeningPlanner; 