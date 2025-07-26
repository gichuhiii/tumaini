import { useState } from "react";
import { Button } from "@/components/ui/button";

// Allowed values
const REGION_OPTIONS = [
  { label: 'Embu', value: 'embu' },
  { label: 'Garissa', value: 'garissa' },
  { label: 'Kakamega', value: 'kakamega' },
  { label: 'Kericho', value: 'kericho' },
  { label: 'Kitale', value: 'kitale' },
  { label: 'Loitoktok', value: 'loitoktok' },
  { label: 'Machakos', value: 'machakos' },
  { label: 'Moi', value: 'moi' },
  { label: 'Mombasa', value: 'mombasa' },
  { label: 'Nakuru', value: 'nakuru' },
  { label: 'Pumwani', value: 'pumwani' }
];
const YES_NO_OPTIONS = [
  { label: 'Yes', value: 'y' },
  { label: 'No', value: 'n' }
];
const SCREENING_TYPE_OPTIONS = [
  { label: 'HPV DNA', value: 'hpv dna' },
  { label: 'Pap Smear', value: 'pap smear' },
  { label: 'VIA', value: 'via' }
];

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

// Helper function to get risk level information
const getRiskLevelInfo = (level: string) => {
  switch (level.toLowerCase()) {
    case 'high':
      return {
        description: "Your results suggest you may benefit from additional screening. This is important for your health, and we're here to help you take the next steps.",
        urgency: "Recommended follow-up",
        followUp: "3-6 months",
        services: ["Colposcopy", "Biopsy", "Specialist consultation"],
        icon: "🔍",
        color: "bg-orange-50 text-orange-700 border-orange-200",
        supportMessage: "It's natural to have questions. We recommend speaking with a healthcare provider who can explain your results and next steps in detail."
      };
    case 'medium':
      return {
        description: "Your results suggest that you may benefit from a follow-up screening. This is common and often just a precaution to ensure everything is okay.",
        urgency: "Regular monitoring recommended",
        followUp: "6-12 months",
        services: ["Pap Smear", "HPV Test", "Follow-up consultation"],
        icon: "📋",
        color: "bg-blue-50 text-blue-700 border-blue-200",
        supportMessage: "This is a routine follow-up. Many people have similar results and go on to have normal screenings."
      };
    case 'low':
      return {
        description: "Your results look good! Continue with regular screening as recommended by your healthcare provider.",
        urgency: "Continue regular screening",
        followUp: "1-3 years",
        services: ["Regular Pap Smear", "HPV Test"],
        icon: "✅",
        color: "bg-green-50 text-green-700 border-green-200",
        supportMessage: "Great news! Keep up with your regular screenings and healthy lifestyle choices."
      };
    default:
      return {
        description: "Your risk assessment is complete. Please follow the recommendations provided by your healthcare provider.",
        urgency: "Follow recommendations",
        followUp: "As recommended",
        services: ["Consult healthcare provider"],
        icon: "ℹ️",
        color: "bg-gray-50 text-gray-700 border-gray-200",
        supportMessage: "If you have any questions about your results, please consult with your healthcare provider."
      };
  }
};

const RiskAssessment = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [apiError, setApiError] = useState<any>(null);

  const validate = () => {
    const errs: any = {};
    // patientId is optional unless required by backend
    if (!form.age) errs.age = "Required";
    if (!form.hpv) errs.hpv = "Required";
    if (!form.pap) errs.pap = "Required";
    if (!form.smoking) errs.smoking = "Required";
    if (!form.stds) errs.stds = "Required";
    if (!form.region) errs.region = "Required";
    if (!form.insurance) errs.insurance = "Required";
    if (!form.screening) errs.screening = "Required";
    // Optional: partners, firstSex
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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    if (!validate()) return;
    setLoading(true);

    try {
      // Prepare the request payload according to API specification
      const payload = {
        age: parseInt(form.age),
        first_sexual_activity_age: form.firstSex ? parseInt(form.firstSex) : null,
        hpv_test_result: form.hpv.toLowerCase(),
        insurance_covered: form.insurance.toLowerCase(),
        pap_smear_result: form.pap.toLowerCase(),
        region: form.region.toLowerCase(),
        screening_type_last: form.screening.toLowerCase(),
        sexual_partners: form.partners ? parseInt(form.partners) : null,
        smoking_status: form.smoking.toLowerCase(),
        stds_history: form.stds.toLowerCase(),
      };

      // Validate required fields
      if (!payload.age || payload.age < 18 || payload.age > 100) {
        throw new Error("Age must be between 18 and 100");
      }
      
      if (!payload.hpv_test_result) {
        throw new Error("HPV test result is required");
      }
      
      if (!payload.region) {
        throw new Error("Region is required");
      }
      
      if (!payload.screening_type_last) {
        throw new Error("Last screening type is required");
      }

      // Log the payload being sent to backend
      console.log("🚀 Sending payload to backend:", payload);

      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        setApiError('You must be logged in to assess risk.');
        setLoading(false);
        return;
      }

      // Make API call to the backend
      const response = await fetch("https://tumaini.astralyngroup.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.log("❌ Error response:", errorData);
        
        // Handle different error response formats
        let errorMessage = `HTTP error! status: ${response.status}`;
        
        if (errorData.detail) {
          if (Array.isArray(errorData.detail)) {
            // Handle validation errors array
            errorMessage = errorData.detail.map((err: any) => 
              `${err.loc?.join('.') || 'Field'}: ${err.msg || err.message || 'Invalid value'}`
            ).join(', ');
          } else {
            errorMessage = errorData.detail;
          }
        } else if (errorData.message) {
          errorMessage = errorData.message;
        } else if (typeof errorData === 'string') {
          errorMessage = errorData;
        }
        
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      console.log("✅ Success response from backend:", responseData);
      
      // Extract data from the nested structure
      const data = responseData.data;
      
      // Transform API response to match our UI expectations
      setResult({
        risk_level: data.risk_level || "Unknown",
        risk_score: data.risk_score || 0,
        factors: data.notes || [],
        recommendations: data.recommended_action ? [data.recommended_action] : [],
        next_screening_date: data.recommended_action ? "Immediate follow-up recommended" : "To be determined",
      });
      
    } catch (error) {
      console.error("Risk assessment error:", error);
      setApiError(error instanceof Error ? error.message : "Failed to assess risk. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Form */}
        <form className="bg-white rounded-lg border p-6 space-y-4 card-animate" onSubmit={handleSubmit}>
          <h2 className="font-semibold text-pink-600 text-lg mb-1 flex items-center">&#9888; Patient Information</h2>
          <p className="text-gray-500 text-sm mb-4">Enter comprehensive patient details for accurate risk assessment</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Remove Patient ID field since backend does not expect it */}
            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              <input name="age" value={form.age} onChange={handleChange} type="number" className="w-full border rounded px-3 py-2 input-animate" />
              {errors.age && <div className="text-xs text-red-500 mt-1">{errors.age}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Number of Sexual Partners <span className="text-gray-400">(optional)</span></label>
              <input name="partners" value={form.partners} onChange={handleChange} type="number" className="w-full border rounded px-3 py-2 input-animate" placeholder="Leave blank if N/A" />
              {errors.partners && <div className="text-xs text-red-500 mt-1">{errors.partners}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">First Sexual Activity Age <span className="text-gray-400">(optional)</span></label>
              <input name="firstSex" value={form.firstSex} onChange={handleChange} type="number" className="w-full border rounded px-3 py-2 input-animate" placeholder="Leave blank if N/A" />
              {errors.firstSex && <div className="text-xs text-red-500 mt-1">{errors.firstSex}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">HPV Test Result</label>
              <select
                name="hpv"
                value={form.hpv}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 text-sm bg-white ${errors.hpv ? 'border-red-500 focus:ring-red-300' : 'focus:ring-pink-300 focus:border-pink-300'}`}
              >
                <option value="">Select HPV Test Result</option>
                <option value="positive">Positive</option>
                <option value="negative">Negative</option>
              </select>
              {errors.hpv && <div className="text-xs text-red-500 mt-1">{errors.hpv}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Pap Smear Result</label>
              <select name="pap" value={form.pap} onChange={handleChange} className="w-full border rounded px-3 py-2">
                <option value="">Select</option>
                {YES_NO_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.pap && <div className="text-xs text-red-500 mt-1">{errors.pap}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Smoking Status</label>
              <select name="smoking" value={form.smoking} onChange={handleChange} className="w-full border rounded px-3 py-2">
                <option value="">Select</option>
                {YES_NO_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.smoking && <div className="text-xs text-red-500 mt-1">{errors.smoking}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">STDs History</label>
              <select name="stds" value={form.stds} onChange={handleChange} className="w-full border rounded px-3 py-2">
                <option value="">Select</option>
                {YES_NO_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.stds && <div className="text-xs text-red-500 mt-1">{errors.stds}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Region</label>
              <select name="region" value={form.region} onChange={handleChange} className="w-full border rounded px-3 py-2">
                <option value="">Select</option>
                {REGION_OPTIONS.map(region => (
                  <option key={region.value} value={region.value}>{region.label}</option>
                ))}
              </select>
              {errors.region && <div className="text-xs text-red-500 mt-1">{errors.region}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Insurance Covered</label>
              <select name="insurance" value={form.insurance} onChange={handleChange} className="w-full border rounded px-3 py-2">
                <option value="">Select</option>
                {YES_NO_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.insurance && <div className="text-xs text-red-500 mt-1">{errors.insurance}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Screening Type</label>
              <select name="screening" value={form.screening} onChange={handleChange} className="w-full border rounded px-3 py-2">
                <option value="">Select</option>
                {SCREENING_TYPE_OPTIONS.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
              {errors.screening && <div className="text-xs text-red-500 mt-1">{errors.screening}</div>}
            </div>
          </div>
          <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white mt-4 btn-animate" disabled={loading}>
            {loading ? "Assessing..." : "Assess Risk"}
          </Button>
        </form>
        {/* Results Panel */}
        {result && (
          <div className="space-y-6">
            {/* Supportive Results Header */}
            {(() => {
              const riskInfo = getRiskLevelInfo(result.risk_level);
              return (
                <div className="bg-white rounded-lg border p-6">
                  <div className="flex items-center mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${riskInfo.color}`}>
                      <span className="mr-2">{riskInfo.icon}</span>
                      Risk Level: {result.risk_level.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-2 text-lg">What This Means</h3>
                    <p className="text-gray-600 leading-relaxed">{riskInfo.description}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-2 text-lg">Recommended Next Steps</h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <span className="text-blue-600 mr-2">📅</span>
                        <span className="font-medium text-blue-800">Next Follow-up: {riskInfo.followUp}</span>
                      </div>
                      <div className="text-sm text-blue-700">
                        <span className="font-medium">Recommended Services:</span>
                        <ul className="mt-1 space-y-1">
                          {riskInfo.services.map((service, index) => (
                            <li key={index} className="ml-4">• {service}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {result.recommendations.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-800 mb-2 text-lg">Additional Recommendations</h3>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <ul className="space-y-2">
                          {result.recommendations.map((rec: string, index: number) => (
                            <li key={index} className="text-sm text-green-700 flex items-start">
                              <span className="text-green-500 mr-2 mt-1">✓</span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-2 text-lg">Support & Resources</h3>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <p className="text-sm text-purple-700 mb-3">{riskInfo.supportMessage}</p>
                      <div className="text-xs text-purple-600">
                        <p>• You can discuss these results with your healthcare provider</p>
                        <p>• Keep this information for your records</p>
                        <p>• Remember, early detection is key to good health outcomes</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">Save Assessment</Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">Generate Screening Plan</Button>
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
              <p className="text-gray-600">Analyzing risk factors...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiskAssessment; 