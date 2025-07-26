import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Patient");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("https://tumaini.astralyngroup.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          role: role.toLowerCase(), // backend expects lowercase (user, admin, patient, etc.)
        }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        toast.error(data.detail || data.message || "Registration failed. Please try again.");
        setLoading(false);
        return;
      }
      // Registration successful
      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (err) {
      toast.error("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-100">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl flex flex-col md:flex-row overflow-hidden animate-fade-in-up">
        {/* Animation/Branding Side */}
        <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200 p-8 w-1/2 relative">
          <img src="/tumAIni%20logo-no%20bg.png" alt="Tumaini Logo" className="h-56 mb-6 animate-bounce-slow" />
          <div className="text-pink-700 font-bold text-lg text-center">Cervical Cancer Awareness</div>
        </div>
        {/* Form Side */}
        <div className="flex-1 flex flex-col justify-center p-8">
          <h1 className="text-3xl font-bold mb-2 text-pink-600">Register</h1>
          <p className="text-gray-500 mb-6">Create your account to access Tumaini.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input 
                type="text" 
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-pink-300 transition" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                required 
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input 
                type="email" 
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-pink-300 transition" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  className="w-full border rounded px-3 py-2 pr-10 focus:ring-2 focus:ring-pink-300 transition" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  required 
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <select 
                className="w-full border rounded px-3 py-2" 
                value={role} 
                onChange={e => setRole(e.target.value)}
                disabled={loading}
              >
                <option value="Patient">Patient</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <button 
              type="submit" 
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded shadow transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>
          <div className="mt-4 text-sm text-center">
            Already have an account? <a href="/login" className="text-pink-600 underline">Login</a>
          </div>
        </div>
      </div>
      <style>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.7s cubic-bezier(0.39, 0.575, 0.565, 1) both;
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-bounce-slow {
          animation: bounce 2.5s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
};

export default Register; 