import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Smartphone, 
  ClipboardList, 
  PieChart, 
  Ticket, 
  UserCircle, 
  Settings 
} from "lucide-react";
import React from "react";
import { useLocation, Link } from "react-router-dom";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Users, label: "Rezidentlar", href: "/residents" },
  { icon: Building2, label: "Binolar", href: "/buildings" },
  { icon: Smartphone, label: "Terminallar", href: "/terminals", badge: true },
  { icon: ClipboardList, label: "Kirish Loglari", href: "/logs" },
  { icon: PieChart, label: "Hisobotlar", href: "/reports" },
  { icon: Ticket, label: "Mehmonlar", href: "/guests" },
  { icon: UserCircle, label: "Foydalanuvchilar", href: "/users" },
  { icon: Settings, label: "Sozlamalar", href: "/settings" },
];

export function Sidebar() {
  const location = useLocation();
  
  return (
    <aside className="fixed left-0 top-16 bottom-0 w-[260px] bg-white border-r border-gray-100 overflow-y-auto">
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="flex-1 font-medium">{item.label}</span>
              {item.badge && !isActive && (
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}