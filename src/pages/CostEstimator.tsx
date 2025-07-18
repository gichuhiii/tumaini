import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const screeningTypes = ["Pap Smear", "HPV Test", "Colposcopy"];
const facilityTypes = ["Public Hospital", "Private Clinic", "Private Hospital"];
const insuranceTypes = ["NHIF", "Private Insurance", "None"];

const costComparison = [
  { label: "Public Hospital", range: "KSh 1,500 - 4,000", desc: "Basic screening package", color: "text-green-700" },
  { label: "Private Clinic", range: "KSh 3,500 - 8,000", desc: "Standard screening package", color: "text-blue-700" },
  { label: "Private Hospital", range: "KSh 5,000 - 12,000", desc: "Comprehensive screening package", color: "text-purple-700" },
];

const CostEstimator = () => {
  const [form, setForm] = useState({
    screening: "",
    facility: "",
    insurance: "",
    followup: "",
  });
  const [cost, setCost] = useState({
    procedure: 0,
    lab: 800,
    followup: 0,
    total: 800,
    insurance: 0,
    patient: 800,
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock calculation
    setCost({
      procedure: 0,
      lab: 800,
      followup: 0,
      total: 800,
      insurance: 0,
      patient: 800,
    });
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Treatment & Screening Cost Estimator</h1>
      <p className="text-gray-500 mb-6">Calculate estimated costs for cervical cancer screening and treatment procedures.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 w-full">
        {/* Cost Calculator */}
        <form className="bg-white rounded-lg border p-6 space-y-4 w-full card-animate" onSubmit={handleCalculate}>
          <h2 className="font-semibold text-lg mb-2 flex items-center">&#36; Cost Calculator</h2>
          <p className="text-gray-500 text-sm mb-4">Enter procedure details to estimate costs</p>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Screening Type</label>
              <select name="screening" value={form.screening} onChange={handleChange} className="w-full border rounded px-3 py-2 input-animate">
                <option value="">Select screening type</option>
                {screeningTypes.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Facility Type</label>
              <select name="facility" value={form.facility} onChange={handleChange} className="w-full border rounded px-3 py-2 input-animate">
                <option value="">Select facility type</option>
                {facilityTypes.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Insurance Coverage</label>
              <select name="insurance" value={form.insurance} onChange={handleChange} className="w-full border rounded px-3 py-2 input-animate">
                <option value="">Select insurance type</option>
                {insuranceTypes.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Follow-up Required</label>
              <input name="followup" value={form.followup} onChange={handleChange} className="w-full border rounded px-3 py-2 input-animate" placeholder="Follow-up needed?" />
            </div>
          </div>
          <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white mt-4 btn-animate">Calculate Cost</Button>
        </form>
        {/* Cost Breakdown */}
        <div className="bg-white rounded-lg border p-6 flex flex-col w-full card-animate">
          <h2 className="font-semibold text-lg mb-2 flex items-center">&#36; Cost Breakdown</h2>
          <div className="text-sm mb-2">Estimated costs in Kenyan Shillings (KSh)</div>
          <div className="space-y-1 mb-2">
            <div className="flex justify-between"><span>Screening Procedure:</span> <span>KSh {cost.procedure}</span></div>
            <div className="flex justify-between"><span>Laboratory Tests:</span> <span>KSh {cost.lab}</span></div>
            <div className="flex justify-between"><span>Follow-up Care:</span> <span>KSh {cost.followup}</span></div>
            <div className="flex justify-between font-semibold border-t pt-2"><span>Total Cost:</span> <span>KSh {cost.total}</span></div>
            <div className="flex justify-between"><span>Insurance Coverage:</span> <span className="text-green-600">-KSh {cost.insurance}</span></div>
            <div className="flex justify-between font-bold"><span>Patient Cost:</span> <span className="text-blue-700">KSh {cost.patient}</span></div>
          </div>
          <div className="flex gap-2 mt-2">
            <input className="border rounded px-2 py-1 flex-1 input-animate" placeholder="Patient Cost" readOnly value={`KSh ${cost.patient}`} />
            <Button variant="outline" className="btn-animate">Save Estimate</Button>
            <Button variant="outline" className="btn-animate">Export PDF</Button>
          </div>
        </div>
      </div>
      {/* Cost Comparison */}
      <div className="bg-white rounded-lg border p-6 w-full card-animate">
        <h3 className="font-semibold text-md mb-2">Cost Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {costComparison.map((c) => (
            <div key={c.label} className="flex flex-col items-center border rounded p-4">
              <div className={`font-semibold mb-1 ${c.color}`}>{c.label}</div>
              <div className="text-xl font-bold mb-1">{c.range}</div>
              <div className="text-xs text-gray-500">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CostEstimator; 