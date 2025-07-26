import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("Submitting login:", { email, password });
    try {
      const response = await fetch("https://tumaini.astralyngroup.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      console.log("Login response status:", response.status);
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        console.log("Login error response:", data);
        toast.error(data.detail || data.message || "Login failed. Please try again.");
        setLoading(false);
        return;
      }
      // Login successful
      const data = await response.json().catch(() => ({}));
      console.log("Login success response:", data);
      
      // Extract role from response and store user info
      const userRole = data.user?.role;
      console.log("User role from response:", userRole);
      
      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.access_token);
      
      // Show success toast
      toast.success("Login successful! Redirecting...");
      
      // Navigate based on role from response
      if (userRole === 'admin') {
        console.log("Navigating to /dashboard");
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
      } else {
        console.log("Navigating to /patient/risk");
        setTimeout(() => {
          window.location.href = '/patient/risk';
        }, 1000);
      }
    } catch (err) {
      console.error("Network error:", err);
      toast.error("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-100 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white rounded-xl shadow-2xl flex flex-col lg:flex-row overflow-hidden animate-fade-in-up">
        {/* Animation/Branding Side - Hidden on mobile, visible on larger screens */}
        <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200 p-6 lg:p-8 w-full lg:w-1/2 relative">
          <img src="/tumAIni%20logo-no%20bg.png" alt="Tumaini Logo" className="h-32 sm:h-40 lg:h-48 xl:h-56 mb-4 lg:mb-6 animate-bounce-slow" />
          <div className="text-pink-700 font-bold text-base lg:text-lg text-center">Cervical Cancer Awareness</div>
        </div>
        
        {/* Form Side */}
        <div className="flex-1 flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          {/* Mobile Logo - Only visible on mobile */}
          <div className="lg:hidden flex justify-center mb-6">
            <img src="/tumAIni%20logo-no%20bg.png" alt="Tumaini Logo" className="h-16 animate-pulse" />
          </div>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-pink-600 text-center lg:text-left">Login</h1>
          <p className="text-gray-500 mb-6 text-center lg:text-left text-sm sm:text-base">Welcome back to Tumaini.</p>
          
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
              <input 
                type="email" 
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all duration-200 text-sm sm:text-base" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
                disabled={loading}
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all duration-200 text-sm sm:text-base" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  required 
                  disabled={loading}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="/register" className="text-pink-600 hover:text-pink-700 font-medium transition-colors">
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 