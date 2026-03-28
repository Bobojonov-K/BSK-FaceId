import { useState } from "react";
import { Search, Plus, Shield, Edit2, MoreVertical, CheckCircle, XCircle, Clock } from "lucide-react";

// Mock data
const usersData = [
  {
    id: 1,
    name: "Rahmonov Sardor Akmalovich",
    phone: "+998 90 *** ** 12",
    organization: "BSK Chilonzor",
    role: "BSK Admin",
    lastLogin: "21.03.2025 14:25",
    status: "active",
  },
  {
    id: 2,
    name: "Karimova Sevara Rustamovna",
    phone: "+998 91 *** ** 34",
    organization: "BSK Chilonzor",
    role: "Operator",
    lastLogin: "21.03.2025 10:15",
    status: "active",
  },
  {
    id: 3,
    name: "Yusupov Davron Shavkatovich",
    phone: "+998 93 *** ** 56",
    organization: "BSK Yunusobod",
    role: "BSK Admin",
    lastLogin: "20.03.2025 16:40",
    status: "active",
  },
  {
    id: 4,
    name: "Toshmatov Aziz Nomonovich",
    phone: "+998 99 *** ** 78",
    organization: "GASN",
    role: "GASN Inspector",
    lastLogin: "19.03.2025 09:30",
    status: "active",
  },
  {
    id: 5,
    name: "Abdullayeva Malika Javlonovna",
    phone: "+998 90 *** ** 90",
    organization: "BSK Mirzo Ulug'bek",
    role: "Operator",
    lastLogin: "15.03.2025 11:20",
    status: "blocked",
  },
];

export function Users() {
  const [searchTerm, setSearchTerm] = useState("");

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Super Admin":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-purple-700 bg-purple-50 rounded-full">
            <Shield className="w-3 h-3" />
            Super Admin
          </span>
        );
      case "BSK Admin":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full">
            <Shield className="w-3 h-3" />
            BSK Admin
          </span>
        );
      case "Operator":
        return (
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-full">
            Operator
          </span>
        );
      case "GASN Inspector":
        return (
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-yellow-700 bg-yellow-50 rounded-full">
            GASN
          </span>
        );
      default:
        return null;
    }
  };

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
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-yellow-700 bg-yellow-50 rounded-full">
            <Clock className="w-3 h-3" />
            Kutilmoqda
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
          <h1 className="text-3xl font-bold text-gray-900">Foydalanuvchilar</h1>
          <p className="text-gray-600 mt-1">Tizim foydalanuvchilarini boshqarish (Super Admin)</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
          <Plus className="w-5 h-5" />
          Foydalanuvchi qo'shish
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Ism, telefon yoki email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-11 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <select className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent">
              <option value="all">Barcha tashkilotlar</option>
              <option value="bsk-chilonzor">BSK Chilonzor</option>
              <option value="bsk-yunusobod">BSK Yunusobod</option>
              <option value="gasn">GASN</option>
            </select>
          </div>

          <div>
            <select className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent">
              <option value="all">Barcha rollar</option>
              <option value="super-admin">Super Admin</option>
              <option value="bsk-admin">BSK Admin</option>
              <option value="operator">Operator</option>
              <option value="gasn">GASN</option>
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ism + Avatar
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Telefon
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tashkilot
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Oxirgi kirish
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
              {usersData.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-purple-600">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.organization}</td>
                  <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.lastLogin}</td>
                  <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
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
            Jami <span className="font-medium text-gray-900">{usersData.length}</span> ta foydalanuvchi
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
