import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface PatientLayoutProps {
  children: React.ReactNode;
}

const PatientLayout: React.FC<PatientLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Risk Assessment", href: "/patient/risk", icon: "🔍" },
    { name: "Cost Calculator", href: "/patient/cost", icon: "💰" },
    { name: "Profile", href: "/patient/profile", icon: "👤" },
  ];

  // Add a logout button that clears 'mockUser' from localStorage and reloads the page
  const handleLogout = () => {
    localStorage.removeItem('mockUser');
    window.location.replace('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-lg hidden lg:block`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center">
            <img src="/tumAIni%20logo-no%20bg.png" alt="Logo" className="h-8 w-8 mr-3" />
            <span className="text-xl font-bold text-pink-600">Tumaini</span>
          </div>
        </div>
        <nav className="mt-8 px-6">
          <div className="space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-pink-100 text-pink-700 border-r-2 border-pink-500'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
        {/* User section */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-pink-600">
                  {/* Assuming user state is managed elsewhere or removed */}
                  U
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {/* Assuming user state is managed elsewhere or removed */}
                  User Name
                </p>
                <p className="text-xs text-gray-500">
                  {/* Assuming user state is managed elsewhere or removed */}
                  Role
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg"
              title="Logout"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center">
            <img src="/tumAIni%20logo-no%20bg.png" alt="Logo" className="h-8 w-8 mr-3" />
            <span className="text-xl font-bold text-pink-600">Tumaini</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="mt-8 px-6">
          <div className="space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-pink-100 text-pink-700 border-r-2 border-pink-500'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
        {/* User section */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-pink-600">
                  {/* Assuming user state is managed elsewhere or removed */}
                  U
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {/* Assuming user state is managed elsewhere or removed */}
                  User Name
                </p>
                <p className="text-xs text-gray-500">
                  {/* Assuming user state is managed elsewhere or removed */}
                  Role
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg"
              title="Logout"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm border-b h-16 flex items-center justify-between px-6" style={{ marginLeft: '16rem' }}>
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">
              {navigation.find(item => item.href === location.pathname)?.name || 'Patient Portal'}
            </h1>
          </div>
        </div>
        {/* Page content */}
        <main className="p-6 bg-gray-50" style={{ marginTop: '4rem' }}>
          {children}
        </main>
      </div>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default PatientLayout; 