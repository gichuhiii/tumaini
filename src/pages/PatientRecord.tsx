import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const patients = [
  {
    id: "00001",
    name: "Maria Santos",
    age: 34,
    risk: "Low",
    lastAssessment: "2024-01-15",
    phone: "+254 700 123 456",
    schedule: { next: "2027-01-15", status: "Scheduled", risk: "Low" },
    history: [
      { date: "2024-01-15", risk: "Low", factors: ["Age: 34"], recommendations: ["Pap smear every 3 years"] },
    ],
  },
  {
    id: "00002",
    name: "Grace Mwangi",
    age: 28,
    risk: "Moderate",
    lastAssessment: "2024-01-12",
    phone: "+254 711 234 567",
    schedule: { next: "2025-06-20", status: "Pending", risk: "Moderate" },
    history: [
      { date: "2024-01-12", risk: "Moderate", factors: ["Age: 28"], recommendations: ["Enhanced screening"] },
    ],
  },
  {
    id: "00003",
    name: "Fatima Hassan",
    age: 45,
    risk: "High",
    lastAssessment: "2024-01-10",
    phone: "+254 734 567 890",
    schedule: { next: "2024-07-10", status: "Overdue", risk: "High" },
    history: [
      { date: "2024-01-10", risk: "High", factors: ["Age: 45", "Smoking history", "HPV positive"], recommendations: ["Immediate colposcopy", "6-month follow-up"] },
      { date: "2023-07-15", risk: "Moderate", factors: ["Age: 44", "Smoking history"], recommendations: ["Enhanced screening"] },
    ],
  },
  {
    id: "00004",
    name: "Joyce Wanjiku",
    age: 31,
    risk: "Low",
    lastAssessment: "2024-01-08",
    phone: "+254 722 345 678",
    schedule: { next: "2027-01-08", status: "Scheduled", risk: "Low" },
    history: [
      { date: "2024-01-08", risk: "Low", factors: ["Age: 31"], recommendations: ["Pap smear every 3 years"] },
    ],
  },
];

const riskBadge = (risk: string) => {
  if (risk === "Low") return <span className="ml-2 px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-xs font-semibold">Low</span>;
  if (risk === "Moderate") return <span className="ml-2 px-2 py-0.5 rounded bg-black text-white text-xs font-semibold">Moderate</span>;
  if (risk === "High") return <span className="ml-2 px-2 py-0.5 rounded bg-red-600 text-white text-xs font-semibold">High</span>;
  return null;
};

const PatientRecord = () => {
  const [selected, setSelected] = useState(patients[0]);
  const [search, setSearch] = useState("");
  const filtered = patients.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Patient Management</h1>
      <p className="text-gray-500 mb-6">View and manage patient screening journeys and assessment history.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Patient List */}
        <div className="bg-white rounded-lg border p-6 col-span-1">
          <div className="mb-4">
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Search patients by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            {filtered.map((p) => (
              <div
                key={p.id}
                className={`flex items-center justify-between p-3 rounded cursor-pointer border ${selected.id === p.id ? "bg-blue-50 border-blue-400" : "bg-gray-50 border-transparent"}`}
                onClick={() => setSelected(p)}
              >
                <div>
                  <div className="font-medium text-gray-900 flex items-center">{p.name} {riskBadge(p.risk)}</div>
                  <div className="text-xs text-gray-500">Age: {p.age}</div>
                  <div className="text-xs text-gray-400">Last assessment: {p.lastAssessment}</div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && <div className="text-xs text-gray-400">No patients found.</div>}
          </div>
        </div>
        {/* Patient Details */}
        <div className="col-span-2 bg-white rounded-lg border p-6 min-h-[400px]">
          {selected ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Demographics & Schedule */}
              <div>
                <h2 className="font-semibold text-lg mb-2">{selected.name}</h2>
                <div className="text-sm text-gray-700 mb-1">Patient ID: {selected.id}</div>
                <div className="text-sm text-gray-700 mb-1">Age: {selected.age} years</div>
                <div className="text-sm text-gray-700 mb-1">Phone: {selected.phone}</div>
                <div className="mt-4">
                  <h3 className="font-semibold text-md mb-1">Screening Schedule</h3>
                  <div className="text-sm text-gray-700 mb-1">Next Screening: {selected.schedule.next}</div>
                  <div className="text-sm text-gray-700 mb-1">Status: {selected.schedule.status}</div>
                  <div className="text-sm text-gray-700 mb-1">Risk: {selected.schedule.risk}</div>
                </div>
              </div>
              {/* Assessment History */}
              <div>
                <h3 className="font-semibold text-md mb-2">Assessment History</h3>
                <div className="space-y-3">
                  {selected.history.map((h, i) => (
                    <div key={i} className="border rounded p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">{h.date}</span>
                        {riskBadge(h.risk)}
                      </div>
                      <div className="text-xs text-gray-700 mb-1">Risk Factors: {h.factors.join(", ")}</div>
                      <div className="text-xs text-gray-700">Recommendations:
                        <ul className="list-disc ml-5">
                          {h.recommendations.map((r, j) => <li key={j}>{r}</li>)}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button className="bg-pink-500 hover:bg-pink-600 text-white">New Assessment</Button>
                  <Button variant="outline">Schedule Screening</Button>
                  <Button variant="outline">View Full History</Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <span className="material-icons text-6xl mb-2">person</span>
              <div>Select a patient to view their details</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientRecord; 