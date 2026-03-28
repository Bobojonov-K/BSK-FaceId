import { useState } from "react";
import { Search, Building2, Users, Smartphone, MapPin, Edit2, MoreVertical } from "lucide-react";

// Mock data
const buildingsData = [
  {
    id: 1,
    name: "Chilonzor-14",
    address: "Chilonzor tumani, 14-mavze, 23-uy",
    organization: "BSK Chilonzor",
    region: "Toshkent sh., Chilonzor tumani",
    terminals: 3,
    residents: 145,
    floors: 9,
    isActive: true,
  },
  {
    id: 2,
    name: "Chilonzor-15",
    address: "Chilonzor tumani, 15-mavze, 45-uy",
    organization: "BSK Chilonzor",
    region: "Toshkent sh., Chilonzor tumani",
    terminals: 2,
    residents: 98,
    floors: 12,
    isActive: true,
  },
  {
    id: 3,
    name: "Chilonzor-16",
    address: "Chilonzor tumani, 16-mavze, 12-uy",
    organization: "BSK Chilonzor",
    region: "Toshkent sh., Chilonzor tumani",
    terminals: 4,
    residents: 203,
    floors: 16,
    isActive: true,
  },
  {
    id: 4,
    name: "Yunusobod-5",
    address: "Yunusobod tumani, 5-mavze, 78-uy",
    organization: "BSK Yunusobod",
    region: "Toshkent sh., Yunusobod tumani",
    terminals: 2,
    residents: 87,
    floors: 9,
    isActive: true,
  },
  {
    id: 5,
    name: "Mirzo Ulug'bek-3",
    address: "Mirzo Ulug'bek tumani, 3-mavze, 34-uy",
    organization: "BSK Mirzo Ulug'bek",
    region: "Toshkent sh., Mirzo Ulug'bek tumani",
    terminals: 3,
    residents: 167,
    floors: 14,
    isActive: false,
  },
];

export function Buildings() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Binolar</h1>
          <p className="text-gray-600 mt-1">Barcha binolarni boshqarish</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Bino nomi, manzil yoki kadastr bo'yicha qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Bino nomi
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Manzil
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tashkilot
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Hudud
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Terminallar
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Rezidentlar
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Holat
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {buildingsData.map((building) => (
                <tr key={building.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Building2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{building.name}</p>
                        <p className="text-xs text-gray-500">{building.floors} qavat</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <p className="text-sm text-gray-600">{building.address}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{building.organization}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{building.region}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">{building.terminals}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">{building.residents}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {building.isActive ? (
                      <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-full">
                        Aktiv
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-gray-700 bg-gray-50 rounded-full">
                        Nofaol
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            Jami <span className="font-medium text-gray-900">{buildingsData.length}</span> ta bino
          </p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              Oldingi
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg">
              1
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
