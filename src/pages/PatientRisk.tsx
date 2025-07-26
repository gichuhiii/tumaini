import React, { useState, useEffect } from "react";
import treatmentCosts from "../data/treatment_costs.json";
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
const YES_NO_OPTIONS = [
  { label: 'Yes', value: 'y' },
  { label: 'No', value: 'n' }
];

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

const SCREENING_TYPE_OPTIONS = [
  { label: 'HPV DNA', value: 'hpv dna' },
  { label: 'Pap Smear', value: 'pap smear' },
  { label: 'VIA', value: 'via' }
];

// Modal component for detailed service information
const ServiceModal = ({ service, isOpen, onClose }: { service: any; isOpen: boolean; onClose: () => void }) => {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Service Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>
          <div className="space-y-4">
            {/* Service Header */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.Service}</h3>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Facility:</span> {service.Facility}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Category:</span> {service.Category}
              </div>
            </div>
            {/* Cost Breakdown */}
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-3 text-gray-800">Cost Breakdown</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Base Cost:</span>
                  <span className="font-medium">KSh {service["Base Cost (KES)"].toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Insurance Copay:</span>
                  <span className="font-medium">KSh {service["Insurance Copay (KES)"].toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Out-of-Pocket:</span>
                  <span className="font-medium">KSh {service["Out-of-Pocket (KES)"].toLocaleString()}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">NHIF Coverage:</span>
                    <span className={`font-medium ${service["NHIF Covered"] === "Yes" ? "text-green-600" : "text-red-600"}`}>{service["NHIF Covered"]}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Additional Information */}
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-3 text-gray-800">Additional Information</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Service Type:</span> {service.Category}
                </div>
                <div>
                  <span className="font-medium">Facility Region:</span> {service.Region || "N/A"}
                </div>
                <div>
                  <span className="font-medium">Insurance Status:</span>
                  <span className={`ml-1 ${service["NHIF Covered"] === "Yes" ? "text-green-600" : "text-orange-600"}`}>{service["NHIF Covered"] === "Yes" ? "Covered by NHIF" : "Not covered by NHIF"}</span>
                </div>
              </div>
            </div>
            {/* Recommendations */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-blue-800">Recommendations</h4>
              <div className="text-sm text-blue-700 space-y-1">
                {service["NHIF Covered"] === "Yes" ? (
                  <div>✓ This service is covered by NHIF - you may be eligible for reduced costs</div>
                ) : (
                  <div>⚠ This service is not covered by NHIF - consider private insurance options</div>
                )}
                <div>✓ Contact the facility directly for appointment scheduling</div>
                <div>✓ Bring your ID and insurance card (if applicable) to your appointment</div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <Button onClick={onClose} className="flex-1 bg-gray-500 hover:bg-gray-600 text-white">Close</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PatientRisk = () => {
  const [form, setForm] = useState<RiskAssessmentData>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RiskResult | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [modalService, setModalService] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Reset form to ensure clean state
  const resetForm = () => {
    setForm(initialForm);
    setErrors({});
    setResult(null);
    setApiError(null);
  };

  // Reset form when component mounts
  useEffect(() => {
    resetForm();
  }, []);

  // Helper function to get cost estimates based on region and service
  const getCostEstimates = (region: string, service: string) => {
    const regionServices = treatmentCosts.filter(item => 
      item.Region.toLowerCase().includes(region.toLowerCase()) && 
      item.Service.toLowerCase().includes(service.toLowerCase())
    );
    
    if (regionServices.length === 0) return null;
    
    const avgCost = regionServices.reduce((sum, item) => sum + item["Base Cost (KES)"], 0) / regionServices.length;
    const minCost = Math.min(...regionServices.map(item => item["Base Cost (KES)"]));
    const maxCost = Math.max(...regionServices.map(item => item["Base Cost (KES)"]));
    
    return {
      average: avgCost,
      range: `${minCost.toLocaleString()} - ${maxCost.toLocaleString()}`,
      facilities: regionServices.map(item => item.Facility)
    };
  };

  // Helper function to get risk level information
  const getRiskLevelInfo = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high':
        return {
          description: "Your results suggest that you may benefit from additional screening. This is important for your health, and we're here to help you take the next steps.",
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
    if (!form.partners) errs.partners = "Number of sexual partners is required";
    if (!form.firstSex) errs.firstSex = "First sexual activity age is required";
    // Logical check: first sexual activity age cannot be greater than age
    const age = parseInt(form.age);
    const firstSex = parseInt(form.firstSex);
    if (form.firstSex && form.age && firstSex > age) {
      errs.firstSex = "First sexual activity age cannot be greater than your current age";
    }
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

    try {
      // Prepare the request payload according to API specification
      const payload = {
        age: parseInt(form.age),
        first_sexual_activity_age: form.firstSex || null,
        hpv_test_result: form.hpv,
        insurance_covered: form.insurance,
        pap_smear_result: form.pap,
        region: form.region,
        screening_type_last: form.screening,
        sexual_partners: form.partners || null,
        smoking_status: form.smoking,
        stds_history: form.stds
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
      console.log("🔍 Form HPV value:", form.hpv);
      console.log("🔍 Payload HPV value:", payload.hpv_test_result);

      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        setApiError('You must be logged in to assess risk.');
        setLoading(false);
        return;
      }

      console.log("🔑 Using token:", token.substring(0, 20) + "...");

      // Make API call to the backend
      const response = await fetch("https://tumaini.astralyngroup.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      console.log("📡 Response status:", response.status);
      console.log("📡 Response headers:", Object.fromEntries(response.headers.entries()));

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
              <label className="block text-sm font-medium mb-2 text-gray-700">Number of Sexual Partners *</label>
              <input 
                name="partners" 
                value={form.partners} 
                onChange={handleChange} 
                type="number" 
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 input-animate text-sm ${errors.partners ? 'border-red-500 focus:ring-red-300' : 'focus:ring-pink-300 focus:border-pink-300'}`}
                min="0"
                placeholder="Enter number of partners"
              />
              {errors.partners && <div className="text-xs text-red-500 mt-1">{errors.partners}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">First Sexual Activity Age *</label>
              <input 
                name="firstSex" 
                value={form.firstSex} 
                onChange={handleChange} 
                type="number" 
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 input-animate text-sm ${errors.firstSex ? 'border-red-500 focus:ring-red-300' : 'focus:ring-pink-300 focus:border-pink-300'}`}
                min="0"
                placeholder="Enter age at first sexual activity"
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
                <option value="positive">Positive</option>
                <option value="negative">Negative</option>
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
                {REGION_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
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
              <label className="block text-sm font-medium mb-2 text-gray-700">Last Screening Type *</label>
              <select
                name="screening"
                value={form.screening}
                onChange={handleChange}
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white ${errors.screening ? 'border-red-500 focus:ring-red-300' : 'focus:ring-pink-300 focus:border-pink-300'}`}
              >
                <option value="">Select Last Screening Type</option>
                {SCREENING_TYPE_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.screening && <div className="text-xs text-red-500 mt-1">{errors.screening}</div>}
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
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
            <button
              type="button"
              onClick={resetForm}
              disabled={loading}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              Reset Form
            </button>
          </div>
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
                            {result.recommendations.map((rec, index) => (
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
              
              {/* Cost Estimation and Location-based Services */}
              {form.region && (() => {
                const costEstimates = getCostEstimates(form.region, "colposcopy");
                const papSmearCosts = getCostEstimates(form.region, "pap smear");
                const hpvCosts = getCostEstimates(form.region, "hpv");
                // Helper to get a sample service for modal info
                const getSampleService = (region: string, service: string) => {
                  return treatmentCosts.find(item =>
                    item.Region.toLowerCase().includes(region.toLowerCase()) &&
                    item.Service.toLowerCase().includes(service.toLowerCase())
                  );
                };
                return (
                  <div className="bg-white border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="text-purple-500 mr-2">💰</span>
                      Cost Estimates & Available Services in {form.region.charAt(0).toUpperCase() + form.region.slice(1)}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Colposcopy Costs */}
                      {costEstimates && (
                        <div className="bg-purple-50 rounded-lg p-3 relative">
                          <div className="font-medium text-purple-800 text-sm mb-1">Colposcopy</div>
                          <div className="text-lg font-bold text-purple-900">KSh {costEstimates.range}</div>
                          <div className="text-xs text-purple-600 mt-1">
                            Available at {costEstimates.facilities.length} facility(ies)
                          </div>
                          <button
                            className="absolute top-2 right-2 text-xs bg-gray-200 hover:bg-gray-300 rounded px-2 py-1"
                            onClick={() => {
                              setModalService(getSampleService(form.region, "colposcopy"));
                              setIsModalOpen(true);
                            }}
                          >
                            Info
                          </button>
                        </div>
                      )}
                      {/* Pap Smear Costs */}
                      {papSmearCosts && (
                        <div className="bg-blue-50 rounded-lg p-3 relative">
                          <div className="font-medium text-blue-800 text-sm mb-1">Pap Smear</div>
                          <div className="text-lg font-bold text-blue-900">KSh {papSmearCosts.range}</div>
                          <div className="text-xs text-blue-600 mt-1">
                            Available at {papSmearCosts.facilities.length} facility(ies)
                          </div>
                          <button
                            className="absolute top-2 right-2 text-xs bg-gray-200 hover:bg-gray-300 rounded px-2 py-1"
                            onClick={() => {
                              setModalService(getSampleService(form.region, "pap smear"));
                              setIsModalOpen(true);
                            }}
                          >
                            Info
                          </button>
                        </div>
                      )}
                      {/* HPV Test Costs */}
                      {hpvCosts && (
                        <div className="bg-green-50 rounded-lg p-3 relative">
                          <div className="font-medium text-green-800 text-sm mb-1">HPV Test</div>
                          <div className="text-lg font-bold text-green-900">KSh {hpvCosts.range}</div>
                          <div className="text-xs text-green-600 mt-1">
                            Available at {hpvCosts.facilities.length} facility(ies)
                          </div>
                          <button
                            className="absolute top-2 right-2 text-xs bg-gray-200 hover:bg-gray-300 rounded px-2 py-1"
                            onClick={() => {
                              setModalService(getSampleService(form.region, "hpv"));
                              setIsModalOpen(true);
                            }}
                          >
                            Info
                          </button>
                        </div>
                      )}
                    </div>
                    {/* Insurance Information */}
                    <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                      <div className="text-sm">
                        <span className="font-medium text-yellow-800">Insurance Status:</span>
                        <span className={`ml-2 ${form.insurance === 'y' ? 'text-green-600' : 'text-red-600'}`}>
                          {form.insurance === 'y' ? 'Covered' : 'Not Covered'}
                        </span>
                      </div>
                      {form.insurance === 'n' && (
                        <div className="text-xs text-yellow-700 mt-1">
                          Consider NHIF coverage for reduced costs
                        </div>
                      )}
                    </div>
                    {/* Modal for service info */}
                    <ServiceModal service={modalService} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                  </div>
                );
              })()}

              {/* Risk Factors - Only show if there are factors and they're not too alarming */}
              {result.factors.length > 0 && (
                <div className="bg-white border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="text-blue-500 mr-2">ℹ️</span>
                    Additional Information
                  </h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-700 mb-2">The following factors were considered in your assessment:</p>
                    <ul className="space-y-1">
                      {result.factors.map((factor, index) => (
                        <li key={index} className="text-sm text-blue-700 flex items-start">
                          <span className="text-blue-500 mr-2 mt-1">•</span>
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientRisk; 