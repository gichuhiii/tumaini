import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Total Patients", value: "1,247", sub: "This month", change: "+12% from last month", success: true },
  { label: "Risk Assessments", value: "89", sub: "This week", change: "+8% from last week", success: true },
  { label: "Screening Due", value: "23", sub: "Next 7 days", warning: true },
  { label: "Inventory Status", value: "85%", sub: "Available", change: "5 items low", warning: true },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-gray-900">Welcome back, Dr. Johnson</h3>
        <p className="text-gray-500 mb-6 text-sm sm:text-base">Here's an overview of your recent activity and patient assessments.</p>
      </div>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white/80 backdrop-blur rounded-lg border p-4 lg:p-6 flex flex-col justify-between min-h-[110px] hover:shadow-lg transition-shadow duration-200">
            <div className="text-sm text-gray-500 flex items-center justify-between">
              {stat.label}
              {stat.warning && <span className="text-red-500 ml-2">&#9888;</span>}
              {stat.success && <span className="text-green-500 ml-2">+</span>}
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold mt-2 text-gray-900">{stat.value}</div>
            {stat.sub && <div className="text-xs lg:text-sm text-gray-400 mt-1">{stat.sub}</div>}
            {stat.change && <div className="text-xs lg:text-sm text-gray-400 mt-1">{stat.change}</div>}
          </div>
        ))}
      </div>
      
      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
        <div className="bg-white/80 backdrop-blur rounded-lg border p-4 lg:p-6 flex flex-col hover:shadow-lg transition-shadow duration-200">
          <div className="font-semibold text-pink-600 text-lg mb-1 flex items-center">&#9888; Risk Assessment</div>
          <div className="text-gray-500 text-sm mb-4">Assess a new patient's cervical cancer risk</div>
          <Button asChild className="bg-pink-500 hover:bg-pink-600 text-white w-full">
            <Link to="/risk-assessment">Start Assessment</Link>
          </Button>
        </div>
        <div className="bg-white/80 backdrop-blur rounded-lg border p-4 lg:p-6 flex flex-col hover:shadow-lg transition-shadow duration-200">
          <div className="font-semibold text-blue-600 text-lg mb-1 flex items-center">&#128197; Screening Planner</div>
          <div className="text-gray-500 text-sm mb-4">Generate personalized screening schedules</div>
          <Button variant="outline" className="w-full">Plan Screening</Button>
        </div>
        <div className="bg-white/80 backdrop-blur rounded-lg border p-4 lg:p-6 flex flex-col hover:shadow-lg transition-shadow duration-200">
          <div className="font-semibold text-green-700 text-lg mb-1 flex items-center">&#9989; Inventory Check</div>
          <div className="text-gray-500 text-sm mb-4">View current screening tool availability</div>
          <Button variant="outline" className="w-full">Check Inventory</Button>
        </div>
      </div>
      
      {/* Recent Assessments */}
      <div className="bg-white/80 backdrop-blur rounded-lg border p-4 lg:p-6">
        <h4 className="text-lg lg:text-xl font-semibold mb-4 text-gray-900">Recent Assessments</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm lg:text-base">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-2 lg:px-4 font-medium text-gray-700">Patient</th>
                <th className="text-left py-2 px-2 lg:px-4 font-medium text-gray-700">Risk Level</th>
                <th className="text-left py-2 px-2 lg:px-4 font-medium text-gray-700">Date</th>
                <th className="text-left py-2 px-2 lg:px-4 font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-2 lg:px-4">Sarah Johnson</td>
                <td className="py-3 px-2 lg:px-4">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">High</span>
                </td>
                <td className="py-3 px-2 lg:px-4 text-gray-600">2024-01-15</td>
                <td className="py-3 px-2 lg:px-4">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Pending</span>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-2 lg:px-4">Maria Garcia</td>
                <td className="py-3 px-2 lg:px-4">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Low</span>
                </td>
                <td className="py-3 px-2 lg:px-4 text-gray-600">2024-01-14</td>
                <td className="py-3 px-2 lg:px-4">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Completed</span>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-2 lg:px-4">Lisa Chen</td>
                <td className="py-3 px-2 lg:px-4">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Medium</span>
                </td>
                <td className="py-3 px-2 lg:px-4 text-gray-600">2024-01-13</td>
                <td className="py-3 px-2 lg:px-4">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">In Progress</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 