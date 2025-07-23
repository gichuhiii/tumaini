import CostEstimator from "./CostEstimator";
import { useState } from 'react';

const PatientPortal = () => {
  const [age, setAge] = useState("");
  const [smoker, setSmoker] = useState(false);
  const [hpv, setHpv] = useState(false);
  const [risk, setRisk] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const calculateRisk = (e: React.FormEvent) => {
    e.preventDefault();
    let score = 0;
    if (Number(age) >= 40) score++;
    if (smoker) score++;
    if (hpv) score++;
    if (score === 0) {
      setRisk("Low");
      setRecommendation("Routine screening every 3 years.");
    } else if (score === 1) {
      setRisk("Moderate");
      setRecommendation("Consider annual screening and discuss risk factors with your provider.");
    } else {
      setRisk("High");
      setRecommendation("Consult a healthcare provider for enhanced screening and follow-up.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Patient Portal</h1>
      <div className="bg-white rounded-lg border p-6 mb-8">
        <h2 className="font-semibold text-lg mb-2">Risk Calculator</h2>
        <form onSubmit={calculateRisk} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Age</label>
            <input type="number" className="w-full border rounded px-3 py-2" value={age} onChange={e => setAge(e.target.value)} required />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="smoker" checked={smoker} onChange={e => setSmoker(e.target.checked)} />
            <label htmlFor="smoker" className="text-sm">Do you smoke?</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="hpv" checked={hpv} onChange={e => setHpv(e.target.checked)} />
            <label htmlFor="hpv" className="text-sm">Have you tested positive for HPV?</label>
          </div>
          <button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded">Calculate Risk</button>
        </form>
        {risk && (
          <div className="mt-4">
            <div className="font-semibold">Risk Level: <span className={risk === "High" ? "text-red-600" : risk === "Moderate" ? "text-yellow-600" : "text-green-600"}>{risk}</span></div>
            <div className="text-sm mt-2">Recommendation: {recommendation}</div>
          </div>
        )}
      </div>
      <CostEstimator />
    </div>
  );
};

export default PatientPortal; 