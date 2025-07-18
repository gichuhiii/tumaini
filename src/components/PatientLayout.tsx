import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Calculator, User, ActivitySquare, Menu } from "lucide-react";

const patientNavItems = [
  { name: "Risk Calculator", path: "/patient/risk", icon: ActivitySquare },
  { name: "Cost Estimator", path: "/patient/cost", icon: Calculator },
  { name: "My Profile", path: "/patient/profile", icon: User },
];

function getPageName(pathname: string) {
  if (pathname === "/patient/risk") return "Risk Calculator";
  if (pathname === "/patient/cost") return "Cost Estimator";
  if (pathname === "/patient/profile") return "My Profile";
  return "Patient Portal";
}

const PatientLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, role, logout } = useContext(AuthContext);
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setSidebarOpen(false);
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
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden"
          onClick={handleOverlayClick}
        />
      )}
      <aside
        className={`sidebar-animate fixed z-50 inset-y-0 left-0 ${sidebarWidth} bg-white flex flex-col transition-all duration-200 border-r
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="h-20 flex items-center justify-center">
          <img src="/tumAIni%20logo-no%20bg.png" alt="Tumaini Logo" className={`h-32 transition-all duration-200 ${collapsed ? "hidden" : "block"}`} />
        </div>
        <div className="border-b w-full" />
        <nav className="flex-1 py-6 space-y-1 flex flex-col">
          {patientNavItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
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
        </nav>
        <div className={`p-4 border-t flex items-center gap-2 ${collapsed ? "justify-center" : ""}`}>
          <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center font-bold text-pink-600">
            {user ? user[0]?.toUpperCase() : "?"}
          </div>
          {!collapsed && (
            <div>
              <div className="font-semibold text-sm">{user || "Guest"}</div>
              <div className="text-xs text-gray-400">{role || "Role"}</div>
            </div>
          )}
        </div>
      </aside>
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-200 ${mainMargin}`}>
        <header className="flex items-center h-20 px-4 bg-white border-b shadow-sm" style={{ borderBottomWidth: 1 }}>
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
              <User className="h-6 w-6 text-pink-600" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-12 bg-white border rounded shadow-lg py-2 w-56 z-50">
                <div className="px-4 py-2 text-gray-700 text-sm border-b max-w-[200px] truncate overflow-hidden whitespace-nowrap">{user}</div>
                <button
                  className="w-full text-left px-4 py-2 text-pink-600 hover:bg-pink-50 text-sm"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>
        <main key={location.pathname} className="flex-1 p-2 md:p-6 lg:p-8 max-w-full animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PatientLayout; 