import { useState } from "react";
import { Search, Filter, Plus, Edit2, Lock, MoreVertical, CheckCircle, XCircle } from "lucide-react";

// Mock data
const residentsData = [
  {
    id: 1,
    name: "Abdullayev Jasur Akmalovich",
    phone: "+998 90 *** ** 34",
    building: "Chilonzor-14",
    apartment: "35",
    floor: 4,
    status: "active",
    createdAt: "21.03.2025",
    avatar: null,
  },
  {
    id: 2,
    name: "Karimova Malika Sharofovna",
    phone: "+998 91 *** ** 56",
    building: "Chilonzor-14",
    apartment: "42",
    floor: 5,
    status: "active",
    createdAt: "20.03.2025",
    avatar: null,
  },
  {
    id: 3,
    name: "Yusupov Otabek Davronovich",
    phone: "+998 93 *** ** 78",
    building: "Chilonzor-15",
    apartment: "15",
    floor: 2,
    status: "blocked",
    createdAt: "18.03.2025",
    avatar: null,
  },
  {
    id: 4,
    name: "Toshmatova Nilufar Rustamovna",
    phone: "+998 99 *** ** 12",
    building: "Chilonzor-14",
    apartment: "28",
    floor: 3,
    status: "active",
    createdAt: "15.03.2025",
    avatar: null,
  },
  {
    id: 5,
    name: "Rahimov Sardor Murodovich",
    phone: "+998 90 *** ** 90",
    building: "Chilonzor-16",
    apartment: "51",
    floor: 6,
    status: "archived",
    createdAt: "10.03.2025",
    avatar: null,
  },
];

export function Residents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedBuilding, setSelectedBuilding] = useState("all");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-full">
            <CheckCircle className="w-3 h-3" />
            Aktiv
          </span>
        );
      case "blocked":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-red-700 bg-red-50 rounded-full">
            <XCircle className="w-3 h-3" />
            Bloklangan
          </span>
        );
      case "archived":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-gray-700 bg-gray-50 rounded-full">
            Arxivlangan
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
          <h1 className="text-3xl font-bold text-gray-900">Rezidentlar</h1>
          <p className="text-gray-600 mt-1">Barcha rezidentlarni boshqarish</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
          <Plus className="w-5 h-5" />
          Rezident qo'shish
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Ism, telefon yoki xonadon bo'yicha qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-11 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
          </div>

          {/* Building Filter */}
          <div>
            <select
              value={selectedBuilding}
              onChange={(e) => setSelectedBuilding(e.target.value)}
              className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            >
              <option value="all">Barcha binolar</option>
              <option value="chilonzor-14">Chilonzor-14</option>
              <option value="chilonzor-15">Chilonzor-15</option>
              <option value="chilonzor-16">Chilonzor-16</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            >
              <option value="all">Barcha holatlar</option>
              <option value="active">Aktiv</option>
              <option value="blocked">Bloklangan</option>
              <option value="archived">Arxivlangan</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-left">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ism-sharif
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Telefon
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Bino / Xonadon
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Qavat
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Holat
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Qo'shilgan sana
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {residentsData.map((resident) => (
                <tr key={resident.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-600">
                          {resident.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{resident.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{resident.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {resident.building} / {resident.apartment}-x
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{resident.floor}</td>
                  <td className="px-6 py-4">{getStatusBadge(resident.status)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{resident.createdAt}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Lock className="w-4 h-4 text-gray-600" />
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
            Jami <span className="font-medium text-gray-900">{residentsData.length}</span> ta rezident
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
