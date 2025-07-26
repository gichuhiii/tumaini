import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  ActivitySquare,
  Calendar,
  Boxes,
  Calculator,
  BarChart2,
  Menu,
  User as UserIcon,
  X,
} from "lucide-react";
import { useState, useEffect, useRef } from 'react';
import { toast } from "sonner";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Risk Assessment", path: "/risk-assessment", icon: ActivitySquare },
  { name: "Screening Planner", path: "/screening-planner", icon: Calendar },
  { name: "Inventory Status", path: "/inventory", icon: Boxes },
  { name: "Cost Estimator", path: "/cost-estimator", icon: Calculator },
  { name: "Reports & Trends", path: "/reports", icon: BarChart2 },
];

function getPageName(pathname: string) {
  if (pathname === "/" || pathname === "/dashboard") return "Dashboard";
  const item = navItems.find((item) => pathname.startsWith(item.path));
  return item ? item.name : "";
}

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Close sidebar on overlay click (mobile)
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setSidebarOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Logout functionality
  const handleLogout = () => {
    // Clear all localStorage data
    localStorage.clear();
    // Also remove specific keys to be extra sure
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('mockUser');
    
    toast.success("Logged out successfully");
    // Force a complete page reload to reset the app state
    window.location.href = '/login';
  };

  // Sidebar width
  const sidebarWidth = collapsed ? "w-16" : "w-64";
  const mainMargin = collapsed ? "md:ml-16" : "md:ml-64";
  const navItemPadding = collapsed ? "px-2" : "px-4";
  const iconClass = collapsed ? "h-5 w-5 mx-auto" : "h-5 w-5";
  const navItemClass = (active: boolean) =>
    `flex items-center gap-3 ${navItemPadding} py-2 rounded font-medium transition-colors ${
      active
        ? "bg-pink-100 text-pink-700"
        : "text-gray-700 hover:bg-pink-50"
    }`;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden"
          onClick={handleOverlayClick}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`sidebar-animate fixed z-50 inset-y-0 left-0 ${sidebarWidth} bg-white flex flex-col transition-all duration-200 border-r shadow-lg
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="h-16 lg:h-20 flex items-center justify-between px-4 lg:px-6 border-b">
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img src="/tumAIni%20logo-no%20bg.png" alt="Tumaini Logo" className={`h-10 lg:h-10 transition-all duration-200 ${collapsed ? "hidden" : "block"}`} />
            {!collapsed && (
              <span className="ml-3 text-lg lg:text-xl font-bold text-pink-600">Tumaini</span>
            )}
          </Link>
          {/* Close button for mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 py-4 lg:py-6 space-y-1 flex flex-col overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={navItemClass(active) + " navitem-animate"}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className={iconClass} />
                {!collapsed && <span className="text-sm lg:text-base">{item.name}</span>}
              </Link>
            );
          })}

        </nav>
        
        {/* User Section */}
        <div className={`p-4 lg:p-6 border-t`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-pink-100 rounded-full flex items-center justify-center">
                <span className="text-sm lg:text-base font-medium text-pink-600">
                  {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              {!collapsed && (
                <div className="ml-3">
                  <p className="text-sm lg:text-base font-medium text-gray-900 truncate max-w-32">
                    {user?.username || 'User Name'}
                  </p>
                  <p className="text-xs lg:text-sm text-gray-500 capitalize">
                    {user?.role || 'Role'}
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
              title="Logout"
            >
              <svg className="h-4 w-4 lg:h-5 lg:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-200 ${mainMargin}`}>
        {/* Top bar */}
        <header className={`fixed top-0 left-0 right-0 flex items-center h-16 lg:h-20 px-3 sm:px-4 lg:px-6 bg-white border-b shadow-sm z-30 transition-all duration-200 ${collapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
          {/* Hamburger for mobile, toggle for desktop */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => window.innerWidth < 1024 ? setSidebarOpen(true) : setCollapsed((c) => !c)}
            className="lg:hidden flex-shrink-0"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed((c) => !c)}
            className="hidden lg:flex flex-shrink-0"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <span className="ml-2 sm:ml-4 font-bold text-base sm:text-lg lg:text-2xl text-pink-600 tracking-wide truncate flex-1 min-w-0">
            {getPageName(location.pathname)}
          </span>
          
          <div className="ml-auto flex items-center gap-2 lg:gap-4 relative flex-shrink-0" ref={dropdownRef}>
            <button
              className="rounded-full bg-pink-100 p-2 hover:bg-pink-200 focus:outline-none transition-colors"
              onClick={() => setDropdownOpen((open) => !open)}
              aria-label="Profile"
            >
              <UserIcon className="h-4 w-4 lg:h-5 lg:w-5 text-pink-600" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-12 bg-white border rounded-lg shadow-lg py-2 w-48 sm:w-56 z-50">
                <div className="px-4 py-2 border-b">
                  <p className="text-sm font-medium text-gray-900 truncate">{user?.username || 'User'}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>
        
        {/* Main content area */}
        <main 
          key={location.pathname} 
          className="flex-1 p-3 sm:p-4 lg:p-6 xl:p-8 max-w-full animate-fade-in overflow-x-hidden" 
          style={{ marginTop: '4rem' }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout; 