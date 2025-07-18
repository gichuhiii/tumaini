import React from "react";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Total Assessments", value: 318, sub: "+12.5% vs last period" },
  { label: "Screening Rate", value: "94.3%", sub: "+2.1% completion rate" },
  { label: "High Risk Cases", value: 70, sub: "22.0% of total assessments" },
  { label: "Follow-up Rate", value: "87.1%", sub: "-3.2% needs improvement" },
];

const monthlyTrends = [
  { month: "Jan", count: 45, high: 12 },
  { month: "Feb", count: 52, high: 15 },
  { month: "Mar", count: 38, high: 8 },
  { month: "Apr", count: 61, high: 15 },
  { month: "May", count: 55, high: 11 },
  { month: "Jun", count: 67, high: 10 },
];

const riskLevels = [
  { label: "Low Risk", value: 156, percent: 65, color: "bg-green-500" },
  { label: "Moderate Risk", value: 67, percent: 25, color: "bg-yellow-400" },
  { label: "High Risk", value: 25, percent: 10, color: "bg-red-500" },
];

const ageGroups = [
  { group: "20-29 years", total: 27, high: 3 },
  { group: "30-39 years", total: 37, high: 7 },
  { group: "40-49 years", total: 54, high: 13 },
  { group: "50+ years", total: 44, high: 2 },
];

const screeningMethods = [
  { label: "Pap Smear", value: 156, percent: 65 },
  { label: "HPV Test", value: 67, percent: 28 },
  { label: "Colposcopy", value: 17, percent: 7 },
];

const quickActions = [
  "Monthly Summary Report",
  "Patient Demographics Report",
  "Screening Schedule Report",
  "Export All Data (CSV)",
];

const ReportsTrends = () => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Analytics Dashboard</h1>
      <p className="text-gray-500 mb-6">Visualize usage patterns, trends, and insights from cervical cancer screening data.</p>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg border p-6 flex flex-col items-center">
            <div className="text-2xl font-bold text-pink-600 mb-1">{stat.value}</div>
            <div className="font-medium text-gray-700">{stat.label}</div>
            <div className="text-xs text-gray-400 mt-1">{stat.sub}</div>
          </div>
        ))}
      </div>
      {/* Main Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Monthly Assessment Trends */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="font-semibold text-md mb-2">Monthly Assessment Trends</h2>
          <div className="space-y-2">
            {monthlyTrends.map((t) => (
              <div key={t.month} className="flex items-center gap-2 text-sm">
                <span className="w-10 inline-block">{t.month}</span>
                <div className="flex-1 bg-gray-100 rounded h-4 relative">
                  <div className="bg-blue-500 h-4 rounded" style={{ width: `${t.count * 2}px` }}></div>
                  <span className="absolute right-2 top-0 text-xs text-gray-700">Assessments: {t.count}</span>
                </div>
                <span className="ml-2 text-xs text-red-500">High Risk: {t.high}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Risk Level Distribution */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="font-semibold text-md mb-2">Risk Level Distribution</h2>
          <div className="space-y-2">
            {riskLevels.map((r) => (
              <div key={r.label} className="flex items-center gap-2 text-sm">
                <span className="w-28 inline-block">{r.label}</span>
                <div className="flex-1 bg-gray-100 rounded h-4 relative">
                  <div className={`${r.color} h-4 rounded`} style={{ width: `${r.percent}%` }}></div>
                  <span className="absolute right-2 top-0 text-xs text-gray-700">{r.value} ({r.percent}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Lower Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Age Group Analysis */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="font-semibold text-md mb-2">Age Group Analysis</h3>
          <div className="space-y-2">
            {ageGroups.map((g) => (
              <div key={g.group} className="flex items-center gap-2 text-sm">
                <span className="w-24 inline-block">{g.group}</span>
                <span className="bg-gray-100 rounded px-2 py-0.5 text-xs">{g.total} total</span>
                <span className="bg-red-100 text-red-700 rounded px-2 py-0.5 text-xs">{g.high} high risk</span>
              </div>
            ))}
          </div>
        </div>
        {/* Screening Methods */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="font-semibold text-md mb-2">Screening Methods</h3>
          <div className="space-y-2">
            {screeningMethods.map((m) => (
              <div key={m.label} className="flex items-center gap-2 text-sm">
                <span className="w-24 inline-block">{m.label}</span>
                <div className="flex-1 bg-gray-100 rounded h-4 relative">
                  <div className="bg-blue-500 h-4 rounded" style={{ width: `${m.percent}%` }}></div>
                  <span className="absolute right-2 top-0 text-xs text-gray-700">{m.value} ({m.percent}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Quick Actions */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="font-semibold text-md mb-2">Quick Actions</h3>
          <div className="space-y-2">
            {quickActions.map((a) => (
              <Button key={a} variant="outline" className="w-full text-left">{a}</Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsTrends; 