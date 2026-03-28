import { useLocation } from "react-router";
import { Construction } from "lucide-react";

export function PlaceholderPage() {
  const location = useLocation();
  const pageName = location.pathname.slice(1);
  
  const pageNames: Record<string, string> = {
    residents: "Rezidentlar",
    buildings: "Binolar",
    terminals: "Terminallar",
    logs: "Kirish Loglari",
    reports: "Hisobotlar",
    guests: "Mehmonlar",
    users: "Foydalanuvchilar",
    settings: "Sozlamalar",
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-6">
          <Construction className="w-10 h-10 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {pageNames[pageName] || "Sahifa"}
        </h2>
        <p className="text-gray-600">
          Bu sahifa hozircha ishlab chiqilmoqda
        </p>
      </div>
    </div>
  );
}
