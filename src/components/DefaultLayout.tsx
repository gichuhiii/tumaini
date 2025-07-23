import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  ActivitySquare,
  Calendar,
  Boxes,
  Calculator,
  BarChart2,
  Users,
  Menu,
  User as UserIcon,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Risk Assessment", path: "/risk-assessment", icon: ActivitySquare },
  { name: "Screening Planner", path: "/screening-planner", icon: Calendar },
  { name: "Inventory Status", path: "/inventory", icon: Boxes },
  { name: "Cost Estimator", path: "/cost-estimator", icon: Calculator },
  { name: "Reports & Trends", path: "/reports", icon: BarChart2 },
  { name: "Patient Records", path: "/patients", icon: Users },
];

function getPageName(pathname: string) {
  if (pathname === "/" || pathname === "/dashboard") return "Dashboard";
  const item = navItems.find((item) => pathname.startsWith(item.path));
  if (pathname === "/patient-portal") return "Patient Portal";
  return item ? item.name : "";
}

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Close sidebar on overlay click (mobile)
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setSidebarOpen(false);
  };

  // Add a logout button that clears 'mockUser' from localStorage and reloads the page
  const handleLogout = () => {
    localStorage.removeItem('mockUser');
    window.location.replace('/');
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
          className="fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden"
          onClick={handleOverlayClick}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`sidebar-animate fixed z-50 inset-y-0 left-0 ${sidebarWidth} bg-white flex flex-col transition-all duration-200 border-r
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="h-20 flex items-center justify-center">
          <img src="/tumAIni%20logo-no%20bg.png" alt="Tumaini Logo" className={`h-32 transition-all duration-200 ${collapsed ? "hidden" : "block"}`} />
        </div>
        <div className="border-b w-full" />
        <nav className="flex-1 py-6 space-y-1 flex flex-col">
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
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
          <Link
            to="/patient-portal"
            className={navItemClass(location.pathname === "/patient-portal")}
            onClick={() => setSidebarOpen(false)}
          >
            <Calculator className={iconClass} />
            {!collapsed && <span>Patient Portal</span>}
          </Link>
        </nav>
        <div className={`p-4 border-t flex items-center gap-2 ${collapsed ? "justify-center" : ""}`}>
          <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center font-bold text-pink-600">
            {/* REMOVE USER INFO DISPLAY */}
          </div>
          {!collapsed && (
            <div>
              {/* REMOVE USER INFO DISPLAY */}
            </div>
          )}
        </div>
      </aside>
      {/* Main content: add md:ml-16 or md:ml-64 for desktop */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-200 ${mainMargin}`} style={{ marginLeft: collapsed ? '4rem' : '16rem' }}>
        {/* Top bar always visible */}
        <header className="fixed top-0 left-0 right-0 flex items-center h-20 px-4 bg-white border-b shadow-sm z-40" style={{ marginLeft: collapsed ? '4rem' : '16rem', height: '5rem' }}>
          {/* Hamburger always visible */}
          <Button variant="ghost" size="icon" onClick={() => setCollapsed((c) => !c)}>
            <span className="sr-only">Toggle sidebar</span>
            <Menu className="h-6 w-6" />
          </Button>
          <span className="ml-4 font-bold text-2xl text-pink-600 tracking-wide">{getPageName(location.pathname)}</span>
          <div className="ml-auto flex items-center gap-4 relative">
            <button
              className="rounded-full bg-pink-100 p-2 hover:bg-pink-200 focus:outline-none"
              onClick={() => setDropdownOpen((open) => !open)}
              aria-label="Profile"
            >
              <UserIcon className="h-6 w-6 text-pink-600" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-12 bg-white border rounded shadow-lg py-2 w-56 z-50">
                {/* REMOVE USER INFO DISPLAY */}
              </div>
            )}
          </div>
        </header>
        {/* Main content area with reduced whitespace */}
        <main key={location.pathname} className="flex-1 p-2 md:p-6 lg:p-8 max-w-full animate-fade-in" style={{ marginTop: '5rem' }}>{children}</main>
      </div>
    </div>
  );
};

export default DefaultLayout; 