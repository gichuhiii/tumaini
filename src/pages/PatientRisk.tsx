import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface RiskAssessmentData {
  age: string;
  partners: string; // optional
  firstSex: string; // optional
  hpv: string;
  pap: string;
  smoking: string;
  stds: string;
  region: string;
  insurance: string;
  screening: string;
}

interface RiskResult {
  risk_level: string;
  risk_score: number;
  factors: string[];
  recommendations: string[];
  next_screening_date: string;
}

const initialForm: RiskAssessmentData = {
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

// Allowed values
const REGION_OPTIONS = [
  'embu', 'garissa', 'kakamega', 'kericho', 'kitale', 'loitoktok', 'machakos', 'moi', 'mombasa', 'nakuru', 'pumwani'
];
const YES_NO_OPTIONS = [
  { label: 'Yes', value: 'y' },
  { label: 'No', value: 'n' }
];
const SCREENING_TYPE_OPTIONS = [
  'hpv dna', 'pap smear', 'via'
];

const PatientRisk = () => {
  const [form, setForm] = useState<RiskAssessmentData>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RiskResult | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    
    if (!form.age) errs.age = "Age is required";
    if (!form.hpv) errs.hpv = "HPV test result is required";
    if (!form.pap) errs.pap = "Pap smear result is required";
    if (!form.smoking) errs.smoking = "Smoking status is required";
    if (!form.stds) errs.stds = "STD history is required";
    if (!form.region) errs.region = "Region is required";
    if (!form.insurance) errs.insurance = "Insurance status is required";
    if (!form.screening) errs.screening = "Last screening type is required";
    // Optional: partners, firstSex
    const age = parseInt(form.age);
    if (age && (age < 18 || age > 100)) {
      errs.age = "Age must be between 18 and 100";
    }
    if (form.partners) {
      const partners = parseInt(form.partners);
      if (partners < 0) {
        errs.partners = "Number of partners cannot be negative";
      }
    }
    if (form.firstSex) {
      const firstSex = parseInt(form.firstSex);
      if (firstSex < 0) {
        errs.firstSex = "First sexual activity age cannot be negative";
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    if (!validate()) return;
    setLoading(true);
    // Backend/API logic removed for frontend-only version
    setTimeout(() => {
      setResult({
        risk_level: "High",
        risk_score: 95,
        factors: [
          "Age over 35 years",
          "Multiple sexual partners",
          "HPV positive",
          "Smoking history",
          "History of STDs",
          "No insurance coverage - may affect access to care",
        ],
        recommendations: [
          "Immediate colposcopy recommended",
          "Follow-up in 3-6 months",
          "Consider specialist referral",
          "Lifestyle counseling and smoking cessation if applicable",
          "Partner notification and testing",
        ],
        next_screening_date: "3-6 months",
      });
      setLoading(false);
    }, 1200);
  };

  const getRiskLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Form */}
        <form className="bg-white rounded-lg border p-6 space-y-4 card-animate" onSubmit={handleSubmit}>
          <h2 className="font-semibold text-pink-600 text-lg mb-1 flex items-center">&#9888; Your Information</h2>
          <p className="text-gray-500 text-sm mb-4">Enter your details for a personalized risk assessment</p>
          
          {apiError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {apiError}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              <input 
                name="age" 
                value={form.age} 
                onChange={handleChange} 
                type="number" 
                className={`w-full border rounded px-3 py-2 input-animate ${errors.age ? 'border-red-500' : ''}`}
                min="18"
                max="100"
              />
              {errors.age && <div className="text-xs text-red-500 mt-1">{errors.age}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Number of Sexual Partners <span className="text-gray-400">(optional)</span></label>
              <input 
                name="partners" 
                value={form.partners} 
                onChange={handleChange} 
                type="number" 
                className={`w-full border rounded px-3 py-2 input-animate ${errors.partners ? 'border-red-500' : ''}`}
                min="0"
                placeholder="Leave blank if N/A"
              />
              {errors.partners && <div className="text-xs text-red-500 mt-1">{errors.partners}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">First Sexual Activity Age <span className="text-gray-400">(optional)</span></label>
              <input 
                name="firstSex" 
                value={form.firstSex} 
                onChange={handleChange} 
                type="number" 
                className={`w-full border rounded px-3 py-2 input-animate ${errors.firstSex ? 'border-red-500' : ''}`}
                min="0"
                placeholder="Leave blank if N/A"
              />
              {errors.firstSex && <div className="text-xs text-red-500 mt-1">{errors.firstSex}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">HPV Test Result</label>
              <select 
                name="hpv" 
                value={form.hpv} 
                onChange={handleChange} 
                className={`w-full border rounded px-3 py-2 ${errors.hpv ? 'border-red-500' : ''}`}
              >
                <option value="">Select</option>
                <option value="Positive">Positive</option>
                <option value="Negative">Negative</option>
                <option value="Unknown">Unknown</option>
              </select>
              {errors.hpv && <div className="text-xs text-red-500 mt-1">{errors.hpv}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Pap Smear Result</label>
              <select
                name="pap"
                value={form.pap}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 ${errors.pap ? 'border-red-500' : ''}`}
              >
                <option value="">Select</option>
                {YES_NO_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.pap && <div className="text-xs text-red-500 mt-1">{errors.pap}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Smoking Status</label>
              <select
                name="smoking"
                value={form.smoking}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 ${errors.smoking ? 'border-red-500' : ''}`}
              >
                <option value="">Select</option>
                {YES_NO_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.smoking && <div className="text-xs text-red-500 mt-1">{errors.smoking}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">STDs History</label>
              <select
                name="stds"
                value={form.stds}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 ${errors.stds ? 'border-red-500' : ''}`}
              >
                <option value="">Select</option>
                {YES_NO_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.stds && <div className="text-xs text-red-500 mt-1">{errors.stds}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Region</label>
              <select
                name="region"
                value={form.region}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 ${errors.region ? 'border-red-500' : ''}`}
              >
                <option value="">Select</option>
                {REGION_OPTIONS.map(region => (
                  <option key={region} value={region}>{region.charAt(0).toUpperCase() + region.slice(1)}</option>
                ))}
              </select>
              {errors.region && <div className="text-xs text-red-500 mt-1">{errors.region}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Screening Type</label>
              <select
                name="screening"
                value={form.screening}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 ${errors.screening ? 'border-red-500' : ''}`}
              >
                <option value="">Select</option>
                {SCREENING_TYPE_OPTIONS.map(type => (
                  <option key={type} value={type}>{type.toUpperCase()}</option>
                ))}
              </select>
              {errors.screening && <div className="text-xs text-red-500 mt-1">{errors.screening}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Insurance Covered</label>
              <select
                name="insurance"
                value={form.insurance}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 ${errors.insurance ? 'border-red-500' : ''}`}
              >
                <option value="">Select</option>
                {YES_NO_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.insurance && <div className="text-xs text-red-500 mt-1">{errors.insurance}</div>}
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-pink-500 hover:bg-pink-600 text-white mt-4 btn-animate"
            disabled={loading}
          >
            {loading ? "Assessing..." : "Assess My Risk"}
          </Button>
        </form>
        
        {/* Results Panel */}
        {result && !loading && (
          <div className="bg-white rounded-lg border p-6 flex flex-col card-animate">
            <h2 className="font-semibold text-pink-600 text-lg mb-2 flex items-center">&#9888; Your Risk Assessment</h2>
            <div className={`mb-2 p-2 rounded font-semibold ${getRiskLevelColor(result.risk_level)}`}>
              Risk Level: {result.risk_level}
            </div>
            <div className="mb-2">
              <div className="font-semibold mb-1">Contributing Risk Factors:</div>
              <ul className="list-disc ml-6 text-sm text-gray-700">
                {result.factors.map((factor: string, i: number) => (
                  <li key={i}>{factor}</li>
                ))}
              </ul>
            </div>
            <div className="mb-2">
              <div className="font-semibold mb-1">Recommended Actions:</div>
              <ul className="list-disc ml-6 text-sm text-gray-700">
                {result.recommendations.map((rec: string, i: number) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4 p-2 rounded bg-blue-50 text-blue-700 font-medium">
              Next Screening: {result.next_screening_date}
            </div>
          </div>
        )}
        
        {loading && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <svg className="animate-spin h-8 w-8 text-pink-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              <p className="text-gray-600">Analyzing your risk factors...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientRisk; 