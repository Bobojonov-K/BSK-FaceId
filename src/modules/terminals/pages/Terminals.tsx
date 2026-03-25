import { useState } from "react";
import { Search, Smartphone, Settings, RefreshCw, MoreVertical, Wifi, WifiOff, AlertTriangle, Wrench } from "lucide-react";

// Mock data
const terminalsData = [
  {
    id: 1,
    name: "Terminal-1",
    building: "Chilonzor-14",
    entrance: "Asosiy kirish",
    serial: "FID-2025-001",
    ip: "192.168.1.101",
    status: "online",
    lastHeartbeat: "2 daqiqa oldin",
    residents: 145,
    maxResidents: 200,
  },
  {
    id: 2,
    name: "Terminal-2",
    building: "Chilonzor-14",
    entrance: "Orqa kirish",
    serial: "FID-2025-002",
    ip: "192.168.1.102",
    status: "online",
    lastHeartbeat: "1 daqiqa oldin",
    residents: 145,
    maxResidents: 200,
  },
  {
    id: 3,
    name: "Terminal-3",
    building: "Chilonzor-15",
    entrance: "Asosiy kirish",
    serial: "FID-2025-003",
    ip: "192.168.1.103",
    status: "offline",
    lastHeartbeat: "3 soat oldin",
    residents: 98,
    maxResidents: 200,
  },
  {
    id: 4,
    name: "Terminal-4",
    building: "Chilonzor-16",
    entrance: "1-podjezd",
    serial: "FID-2025-004",
    ip: "192.168.1.104",
    status: "online",
    lastHeartbeat: "30 soniya oldin",
    residents: 203,
    maxResidents: 250,
  },
  {
    id: 5,
    name: "Terminal-5",
    building: "Chilonzor-16",
    entrance: "2-podjezd",
    serial: "FID-2025-005",
    ip: "192.168.1.105",
    status: "maintenance",
    lastHeartbeat: "10 daqiqa oldin",
    residents: 203,
    maxResidents: 250,
  },
  {
    id: 6,
    name: "Terminal-6",
    building: "Yunusobod-5",
    entrance: "Asosiy kirish",
    serial: "FID-2025-006",
    ip: "192.168.1.106",
    status: "error",
    lastHeartbeat: "15 daqiqa oldin",
    residents: 87,
    maxResidents: 150,
  },
];

export function Terminals() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-green-700">Online</span>
          </div>
        );
      case "offline":
        return (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-sm font-medium text-red-700">Offline</span>
          </div>
        );
      case "maintenance":
        return (
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-700">Texnik xizmat</span>
          </div>
        );
      case "error":
        return (
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span className="text-sm font-medium text-red-700">Xatolik</span>
          </div>
        );
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "border-green-200 bg-green-50";
      case "offline":
        return "border-red-200 bg-red-50";
      case "maintenance":
        return "border-yellow-200 bg-yellow-50";
      case "error":
        return "border-red-200 bg-red-50";
      default:
        return "border-gray-200 bg-white";
    }
  };

  const onlineCount = terminalsData.filter(t => t.status === "online").length;
  const offlineCount = terminalsData.filter(t => t.status === "offline").length;
  const errorCount = terminalsData.filter(t => t.status === "error").length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Terminallar</h1>
          <p className="text-gray-600 mt-1">FaceID qurilmalarini monitoring va boshqarish</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-900">{onlineCount} Online</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-900">{offlineCount} Offline</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-medium text-gray-900">{errorCount} Xato</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Terminal nomi, serial yoki IP manzil bo'yicha qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {terminalsData.map((terminal) => (
          <div
            key={terminal.id}
            className={`rounded-xl border-2 p-6 shadow-sm hover:shadow-md transition-shadow ${getStatusColor(terminal.status)}`}
          >
            {/* Status Badge */}
            <div className="flex items-center justify-between mb-4">
              {getStatusBadge(terminal.status)}
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
                  <Settings className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
                  <RefreshCw className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
                  <MoreVertical className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Terminal Info */}
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{terminal.name}</h3>
                <p className="text-sm text-gray-600">{terminal.building}, {terminal.entrance}</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="font-medium">SN:</span>
                  <span>{terminal.serial}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="font-medium">IP:</span>
                  <span>{terminal.ip}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="font-medium">Sinxron:</span>
                  <span>{terminal.lastHeartbeat}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="font-medium">Rezidentlar:</span>
                  <span>{terminal.residents} / {terminal.maxResidents}</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${(terminal.residents / terminal.maxResidents) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
