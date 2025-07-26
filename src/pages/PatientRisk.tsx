import React, { useState } from "react";
import { Button } from "@/components/ui/button";

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
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        {/* Patient Form */}
        <form className="bg-white rounded-lg border p-4 lg:p-6 space-y-4 card-animate" onSubmit={handleSubmit}>
          <h2 className="font-semibold text-pink-600 text-lg mb-1 flex items-center">&#9888; Your Information</h2>
          <p className="text-gray-500 text-sm mb-4">Enter your details for a personalized risk assessment</p>
          
          {apiError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              {apiError}
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Age *</label>
              <input 
                name="age" 
                value={form.age} 
                onChange={handleChange} 
                type="number" 
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 input-animate text-sm ${errors.age ? 'border-red-500 focus:ring-red-300' : 'focus:ring-pink-300 focus:border-pink-300'}`}
                min="18"
                max="100"
                placeholder="Enter your age"
              />
              {errors.age && <div className="text-xs text-red-500 mt-1">{errors.age}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Number of Sexual Partners <span className="text-gray-400">(optional)</span></label>
              <input 
                name="partners" 
                value={form.partners} 
                onChange={handleChange} 
                type="number" 
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 input-animate text-sm ${errors.partners ? 'border-red-500 focus:ring-red-300' : 'focus:ring-pink-300 focus:border-pink-300'}`}
                min="0"
                placeholder="Leave blank if N/A"
              />
              {errors.partners && <div className="text-xs text-red-500 mt-1">{errors.partners}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">First Sexual Activity Age <span className="text-gray-400">(optional)</span></label>
              <input 
                name="firstSex" 
                value={form.firstSex} 
                onChange={handleChange} 
                type="number" 
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 input-animate text-sm ${errors.firstSex ? 'border-red-500 focus:ring-red-300' : 'focus:ring-pink-300 focus:border-pink-300'}`}
                min="0"
                placeholder="Leave blank if N/A"
              />
              {errors.firstSex && <div className="text-xs text-red-500 mt-1">{errors.firstSex}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">HPV Test Result *</label>
              <select 
                name="hpv" 
                value={form.hpv} 
                onChange={handleChange} 
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white ${errors.hpv ? 'border-red-500 focus:ring-red-300' : 'focus:ring-pink-300 focus:border-pink-300'}`}
              >
                <option value="">Select HPV Test Result</option>
                <option value="Positive">Positive</option>
                <option value="Negative">Negative</option>
                <option value="Unknown">Unknown</option>
              </select>
              {errors.hpv && <div className="text-xs text-red-500 mt-1">{errors.hpv}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Pap Smear Result *</label>
              <select
                name="pap"
                value={form.pap}
                onChange={handleChange}
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white ${errors.pap ? 'border-red-500 focus:ring-red-300' : 'focus:ring-pink-300 focus:border-pink-300'}`}
              >
                <option value="">Select Pap Smear Result</option>
                {YES_NO_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.pap && <div className="text-xs text-red-500 mt-1">{errors.pap}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Smoking Status *</label>
              <select
                name="smoking"
                value={form.smoking}
                onChange={handleChange}
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white ${errors.smoking ? 'border-red-500 focus:ring-red-300' : 'focus:ring-pink-300 focus:border-pink-300'}`}
              >
                <option value="">Select Smoking Status</option>
                {YES_NO_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.smoking && <div className="text-xs text-red-500 mt-1">{errors.smoking}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">STD History *</label>
              <select
                name="stds"
                value={form.stds}
                onChange={handleChange}
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white ${errors.stds ? 'border-red-500 focus:ring-red-300' : 'focus:ring-pink-300 focus:border-pink-300'}`}
              >
                <option value="">Select STD History</option>
                {YES_NO_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.stds && <div className="text-xs text-red-500 mt-1">{errors.stds}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Region *</label>
              <select
                name="region"
                value={form.region}
                onChange={handleChange}
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white ${errors.region ? 'border-red-500 focus:ring-red-300' : 'focus:ring-pink-300 focus:border-pink-300'}`}
              >
                <option value="">Select Region</option>
                <option value="Nairobi">Nairobi</option>
                <option value="Mombasa">Mombasa</option>
                <option value="Kisumu">Kisumu</option>
                <option value="Nakuru">Nakuru</option>
                <option value="Eldoret">Eldoret</option>
                <option value="Other">Other</option>
              </select>
              {errors.region && <div className="text-xs text-red-500 mt-1">{errors.region}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Insurance Coverage *</label>
              <select
                name="insurance"
                value={form.insurance}
                onChange={handleChange}
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white ${errors.insurance ? 'border-red-500 focus:ring-red-300' : 'focus:ring-pink-300 focus:border-pink-300'}`}
              >
                <option value="">Select Insurance Status</option>
                {YES_NO_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.insurance && <div className="text-xs text-red-500 mt-1">{errors.insurance}</div>}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-2 text-gray-700">Previous Screening *</label>
              <select
                name="screening"
                value={form.screening}
                onChange={handleChange}
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white ${errors.screening ? 'border-red-500 focus:ring-red-300' : 'focus:ring-pink-300 focus:border-pink-300'}`}
              >
                <option value="">Select Previous Screening</option>
                {YES_NO_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.screening && <div className="text-xs text-red-500 mt-1">{errors.screening}</div>}
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Assessing Risk...
              </div>
            ) : (
              "Assess My Risk"
            )}
          </button>
        </form>

        {/* Results Section */}
        <div className="bg-white rounded-lg border p-4 lg:p-6 card-animate">
          <h2 className="font-semibold text-pink-600 text-lg mb-4 flex items-center">📊 Risk Assessment Results</h2>
          
          {!result && !loading && (
            <div className="text-center py-8">
              <div className="text-gray-400 text-6xl mb-4">📋</div>
              <p className="text-gray-500 text-sm">Fill out the form to get your personalized risk assessment</p>
            </div>
          )}
          
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
              <p className="text-gray-500 text-sm">Analyzing your risk factors...</p>
            </div>
          )}
          
          {result && (
            <div className="space-y-4">
              <div className="text-center p-4 rounded-lg bg-gray-50">
                <div className="text-2xl font-bold mb-2">Risk Level: <span className={getRiskLevelColor(result.risk_level)}>{result.risk_level}</span></div>
                <div className="text-sm text-gray-600">Risk Score: {result.risk_score}/100</div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Key Risk Factors:</h3>
                <ul className="space-y-1">
                  {result.factors.map((factor, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Recommendations:</h3>
                <ul className="space-y-1">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-sm font-medium text-blue-900 mb-1">Next Screening Date:</div>
                <div className="text-sm text-blue-700">{result.next_screening_date}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientRisk; 