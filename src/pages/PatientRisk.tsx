import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const initialForm = {
  age: "",
  partners: "",
  firstSex: "",
  hpv: "",
  pap: "",
  smoking: "",
  stds: "",
  region: "",
  insurance: "",
  screening: "",
};

const PatientRisk = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const validate = () => {
    const errs: any = {};
    if (!form.age) errs.age = "Required";
    if (!form.partners) errs.partners = "Required";
    if (!form.firstSex) errs.firstSex = "Required";
    if (!form.hpv) errs.hpv = "Required";
    if (!form.pap) errs.pap = "Required";
    if (!form.smoking) errs.smoking = "Required";
    if (!form.stds) errs.stds = "Required";
    if (!form.region) errs.region = "Required";
    if (!form.insurance) errs.insurance = "Required";
    if (!form.screening) errs.screening = "Required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setResult({
        risk: "High",
        factors: [
          "Age over 35 years",
          "Multiple sexual partners",
          "HPV positive",
          "Smoking history",
          "History of STDs",
          "No insurance coverage - may affect access to care",
        ],
        actions: [
          "Immediate colposcopy recommended",
          "Follow-up in 3-6 months",
          "Consult your healthcare provider",
          "Lifestyle counseling and smoking cessation if applicable",
          "Partner notification and testing",
        ],
        next: "3-6 months",
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Patient Form */}
        <form className="bg-white rounded-lg border p-6 space-y-4 card-animate" onSubmit={handleSubmit}>
          <h2 className="font-semibold text-pink-600 text-lg mb-1 flex items-center">&#9888; Your Information</h2>
          <p className="text-gray-500 text-sm mb-4">Enter your details for a personalized risk assessment</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              <input name="age" value={form.age} onChange={handleChange} type="number" className="w-full border rounded px-3 py-2 input-animate" />
              {errors.age && <div className="text-xs text-red-500">{errors.age}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Number of Sexual Partners</label>
              <input name="partners" value={form.partners} onChange={handleChange} type="number" className="w-full border rounded px-3 py-2" />
              {errors.partners && <div className="text-xs text-red-500">{errors.partners}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Age at First Sexual Activity</label>
              <input name="firstSex" value={form.firstSex} onChange={handleChange} type="number" className="w-full border rounded px-3 py-2" />
              {errors.firstSex && <div className="text-xs text-red-500">{errors.firstSex}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">HPV Test Result</label>
              <select name="hpv" value={form.hpv} onChange={handleChange} className="w-full border rounded px-3 py-2">
                <option value="">Select</option>
                <option value="Positive">Positive</option>
                <option value="Negative">Negative</option>
              </select>
              {errors.hpv && <div className="text-xs text-red-500">{errors.hpv}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Pap Smear Result</label>
              <select name="pap" value={form.pap} onChange={handleChange} className="w-full border rounded px-3 py-2">
                <option value="">Select</option>
                <option value="Normal">Normal</option>
                <option value="Abnormal">Abnormal</option>
              </select>
              {errors.pap && <div className="text-xs text-red-500">{errors.pap}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Smoking Status</label>
              <select name="smoking" value={form.smoking} onChange={handleChange} className="w-full border rounded px-3 py-2">
                <option value="">Select</option>
                <option value="Current/Former smoker">Current/Former smoker</option>
                <option value="Never smoked">Never smoked</option>
              </select>
              {errors.smoking && <div className="text-xs text-red-500">{errors.smoking}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">History of STDs</label>
              <select name="stds" value={form.stds} onChange={handleChange} className="w-full border rounded px-3 py-2">
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.stds && <div className="text-xs text-red-500">{errors.stds}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Region</label>
              <input name="region" value={form.region} onChange={handleChange} className="w-full border rounded px-3 py-2" />
              {errors.region && <div className="text-xs text-red-500">{errors.region}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Insurance Coverage</label>
              <select name="insurance" value={form.insurance} onChange={handleChange} className="w-full border rounded px-3 py-2">
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.insurance && <div className="text-xs text-red-500">{errors.insurance}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Screening Type</label>
              <input name="screening" value={form.screening} onChange={handleChange} className="w-full border rounded px-3 py-2" />
              {errors.screening && <div className="text-xs text-red-500">{errors.screening}</div>}
            </div>
          </div>
          <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white mt-4 btn-animate">{loading ? "Assessing..." : "Assess My Risk"}</Button>
        </form>
        {/* Results Panel */}
        {result && !loading && (
          <div className="bg-white rounded-lg border p-6 flex flex-col card-animate">
            <h2 className="font-semibold text-pink-600 text-lg mb-2 flex items-center">&#9888; Your Risk Assessment</h2>
            <div className="mb-2 p-2 rounded bg-red-100 text-red-700 font-semibold">Risk Level: High</div>
            <div className="mb-2">
              <div className="font-semibold mb-1">Contributing Risk Factors:</div>
              <ul className="list-disc ml-6 text-sm text-gray-700">
                {result.factors.map((f: string, i: number) => <li key={i}>{f}</li>)}
              </ul>
            </div>
            <div className="mb-2">
              <div className="font-semibold mb-1">Recommended Actions:</div>
              <ul className="list-disc ml-6 text-sm text-gray-700">
                {result.actions.map((a: string, i: number) => <li key={i}>{a}</li>)}
              </ul>
            </div>
            <div className="mb-4 p-2 rounded bg-blue-50 text-blue-700 font-medium">Next Screening: {result.next}</div>
          </div>
        )}
        {loading && (
          <div className="flex items-center justify-center h-full">
            <svg className="animate-spin h-8 w-8 text-pink-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientRisk; 