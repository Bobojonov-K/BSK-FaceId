import { useState } from "react";
import { Search, Calendar, Download, Eye, CheckCircle, XCircle, AlertTriangle, Key } from "lucide-react";

// Mock data
const logsData = [
  {
    id: 1,
    time: "21.03.2025 14:32:15",
    terminal: "Chilonzor-14 / T-1",
    person: "Abdullayev J.",
    phone: "+998 90 *** ** 34",
    eventType: "DOOR_OPEN_SUCCESS",
    reason: "Tanishdi",
    hasPhoto: true,
  },
  {
    id: 2,
    time: "21.03.2025 14:31:42",
    terminal: "Chilonzor-14 / T-3",
    person: "Tanilmagan",
    phone: "—",
    eventType: "DOOR_OPEN_DENIED",
    reason: "Tanilmadi",
    hasPhoto: true,
  },
  {
    id: 3,
    time: "21.03.2025 14:30:18",
    terminal: "Chilonzor-15 / T-1",
    person: "Yusupov O.",
    phone: "+998 93 *** ** 78",
    eventType: "DOOR_OPEN_SUCCESS",
    reason: "Tanishdi",
    hasPhoto: true,
  },
  {
    id: 4,
    time: "21.03.2025 14:28:55",
    terminal: "Chilonzor-16 / T-5",
    person: "Tanilmagan",
    phone: "—",
    eventType: "SUSPICIOUS_ATTEMPT",
    reason: "5 marta urinish",
    hasPhoto: true,
  },
  {
    id: 5,
    time: "21.03.2025 14:27:33",
    terminal: "Chilonzor-14 / T-1",
    person: "Karimova M.",
    phone: "+998 91 *** ** 56",
    eventType: "DOOR_OPEN_SUCCESS",
    reason: "Tanishdi",
    hasPhoto: true,
  },
  {
    id: 6,
    time: "21.03.2025 14:25:12",
    terminal: "Chilonzor-14 / T-2",
    person: "Administrator",
    phone: "—",
    eventType: "DOOR_OPEN_MANUAL",
    reason: "Qo'lda ochildi",
    hasPhoto: false,
  },
  {
    id: 7,
    time: "21.03.2025 14:23:45",
    terminal: "Yunusobod-5 / T-6",
    person: "Tanilmagan",
    phone: "—",
    eventType: "LIVENESS_FAIL",
    reason: "Liveness tekshiruvi muvaffaqiyatsiz",
    hasPhoto: true,
  },
];

export function Logs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEventType, setSelectedEventType] = useState("all");

  const getEventBadge = (eventType: string) => {
    switch (eventType) {
      case "DOOR_OPEN_SUCCESS":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-full">
            <CheckCircle className="w-3 h-3" />
            Kirdi
          </span>
        );
      case "DOOR_OPEN_DENIED":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-red-700 bg-red-50 rounded-full">
            <XCircle className="w-3 h-3" />
            Rad etildi
          </span>
        );
      case "DOOR_OPEN_MANUAL":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full">
            <Key className="w-3 h-3" />
            Qo'lda
          </span>
        );
      case "LIVENESS_FAIL":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-yellow-700 bg-yellow-50 rounded-full">
            <AlertTriangle className="w-3 h-3" />
            Liveness
          </span>
        );
      case "SUSPICIOUS_ATTEMPT":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold text-red-700 bg-red-100 rounded-full">
            <AlertTriangle className="w-3 h-3" />
            Shubhali
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kirish Loglari</h1>
          <p className="text-gray-600 mt-1">Barcha kirish voqealarini ko'rish va filtrlash</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
          <Download className="w-5 h-5" />
          Export
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Date Range */}
          <div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                className="w-full h-11 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
          </div>

          {/* Building Filter */}
          <div>
            <select className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent">
              <option value="all">Barcha binolar</option>
              <option value="chilonzor-14">Chilonzor-14</option>
              <option value="chilonzor-15">Chilonzor-15</option>
              <option value="chilonzor-16">Chilonzor-16</option>
            </select>
          </div>

          {/* Terminal Filter */}
          <div>
            <select className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent">
              <option value="all">Barcha terminallar</option>
              <option value="t1">Terminal-1</option>
              <option value="t2">Terminal-2</option>
              <option value="t3">Terminal-3</option>
            </select>
          </div>

          {/* Event Type Filter */}
          <div>
            <select
              value={selectedEventType}
              onChange={(e) => setSelectedEventType(e.target.value)}
              className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            >
              <option value="all">Barcha voqealar</option>
              <option value="success">Muvaffaqiyatli</option>
              <option value="denied">Rad etilgan</option>
              <option value="suspicious">Shubhali</option>
            </select>
          </div>

          {/* Search */}
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Shaxs/telefon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-11 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Vaqt
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Terminal
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Shaxs
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Voqea turi
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Qaror sababi
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Foto
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {logsData.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium whitespace-nowrap">
                    {log.time}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {log.terminal}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{log.person}</p>
                      <p className="text-xs text-gray-500">{log.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getEventBadge(log.eventType)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {log.reason}
                  </td>
                  <td className="px-6 py-4">
                    {log.hasPhoto && (
                      <button className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                        Ko'rish
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            Jami <span className="font-medium text-gray-900">{logsData.length}</span> ta yozuv
          </p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              Oldingi
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg">
              1
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              2
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              Keyingi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
