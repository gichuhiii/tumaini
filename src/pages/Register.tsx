import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Patient");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  // REMOVE ALL REDUX HOOKS, THUNKS, AND AUTH LOGIC
  // Remove all references to registerUser, registerResult, loginUser, loginResult, error, and loading
  // Use local state for form fields and navigation only

  // Remove the now-unused useEffect and handleSubmit logic that referenced removed auth state, and ensure the form is a simple local-state form with navigation only

  // Add a simple local handleSubmit for the form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('mockUser', JSON.stringify({ username, email, role }));
      if (role === 'Admin') {
        window.location.replace('/dashboard');
      } else {
        window.location.replace('/patient/risk');
      }
    }, 1000);
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
          
          {/* error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          ) */}
          
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