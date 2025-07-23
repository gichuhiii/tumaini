import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const stats = [
  { label: "Total Assessments", value: 247, change: "+12% from last month" },
  { label: "High Risk Patients", value: 23, sub: "9.3% of total assessments", warning: true },
  { label: "Moderate Risk", value: 89, sub: "36.0% of total assessments" },
  { label: "Low Risk", value: 135, sub: "54.7% of total assessments", success: true },
];

const recentAssessments = [
  { name: "Maria Santos", age: 34, risk: "Low Risk", time: "2 hours ago", color: "green" },
  { name: "Grace Mwangi", age: 28, risk: "Moderate Risk", time: "4 hours ago", color: "yellow" },
  { name: "Fatima Hassan", age: 45, risk: "High Risk", time: "6 hours ago", color: "red" },
  { name: "Joyce Wanjiku", age: 31, risk: "Low Risk", time: "1 day ago", color: "green" },
];

const Dashboard = () => {
  return (
    <div>
      <h3 className="text-3xl font-bold mb-2">Welcome back, Dr. Johnson</h3>
      <p className="text-gray-500 mb-6">Here's an overview of your recent activity and patient assessments.</p>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white/80 backdrop-blur rounded-lg border p-6 flex flex-col justify-between min-h-[110px]">
            <div className="text-sm text-gray-500 flex items-center justify-between">
              {stat.label}
              {stat.warning && <span className="text-red-500 ml-2">&#9888;</span>}
              {stat.success && <span className="text-green-500 ml-2">+</span>}
            </div>
            <div className="text-2xl font-bold mt-2">{stat.value}</div>
            {stat.sub && <div className="text-xs text-gray-400 mt-1">{stat.sub}</div>}
            {stat.change && <div className="text-xs text-gray-400 mt-1">{stat.change}</div>}
          </div>
        ))}
      </div>
      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white/80 backdrop-blur rounded-lg border p-6 flex flex-col">
          <div className="font-semibold text-pink-600 text-lg mb-1 flex items-center">&#9888; Risk Assessment</div>
          <div className="text-gray-500 text-sm mb-4">Assess a new patient's cervical cancer risk</div>
          <Button asChild className="bg-pink-500 hover:bg-pink-600 text-white w-full">
            <Link to="/risk-assessment">Start Assessment</Link>
          </Button>
        </div>
        <div className="bg-white/80 backdrop-blur rounded-lg border p-6 flex flex-col">
          <div className="font-semibold text-blue-600 text-lg mb-1 flex items-center">&#128197; Screening Planner</div>
          <div className="text-gray-500 text-sm mb-4">Generate personalized screening schedules</div>
          <Button variant="outline" className="w-full">Plan Screening</Button>
        </div>
        <div className="bg-white/80 backdrop-blur rounded-lg border p-6 flex flex-col">
          <div className="font-semibold text-green-700 text-lg mb-1 flex items-center">&#9989; Inventory Check</div>
          <div className="text-gray-500 text-sm mb-4">View current screening tool availability</div>
          <Button variant="outline" className="w-full">Check Inventory</Button>
        </div>
      </div>
      {/* Recent Assessments */}
      <div className="bg-white/80 backdrop-blur rounded-lg border p-6">
        <div className="font-semibold text-lg mb-2">Recent Assessments</div>
        <div className="text-gray-500 text-sm mb-4">Latest patient risk assessments and their outcomes</div>
        <div className="divide-y">
          {recentAssessments.map((a, i) => (
            <div key={i} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-gray-500 text-xl">&#128100;</span>
                <div>
                  <div className="font-medium">{a.name}</div>
                  <div className="text-xs text-gray-400">Age: {a.age}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold px-2 py-1 rounded ${
                  a.color === "green"
                    ? "bg-green-100 text-green-700"
                    : a.color === "yellow"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}>
                  {a.risk}
                </span>
                <span className="text-xs text-gray-400">{a.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 