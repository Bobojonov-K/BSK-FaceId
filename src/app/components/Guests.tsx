import { useState } from "react";
import { Plus, QrCode, Key, Calendar, CheckCircle, XCircle, Clock } from "lucide-react";

// Mock data
const guestsData = [
  {
    id: 1,
    guestName: "Karimov Ali Valijon o'g'li",
    hostName: "Abdullayev Jasur",
    terminal: "Chilonzor-14 / T-1",
    type: "QR",
    status: "active",
    created: "21.03.2025 10:00",
    expires: "21.03.2025 20:00",
    usageCount: 0,
    usageLimit: 1,
  },
  {
    id: 2,
    guestName: "Rahimova Nodira",
    hostName: "Karimova Malika",
    terminal: "Chilonzor-14 / T-1",
    type: "PIN",
    status: "used",
    created: "20.03.2025 14:00",
    expires: "20.03.2025 22:00",
    usageCount: 1,
    usageLimit: 1,
  },
  {
    id: 3,
    guestName: "Turgunov Sardor",
    hostName: "Yusupov Otabek",
    terminal: "Chilonzor-15 / T-1",
    type: "QR",
    status: "active",
    created: "21.03.2025 08:00",
    expires: "21.03.2025 18:00",
    usageCount: 2,
    usageLimit: 5,
  },
  {
    id: 4,
    guestName: "Akramov Jasur",
    hostName: "Toshmatova Nilufar",
    terminal: "Chilonzor-14 / T-2",
    type: "PIN",
    status: "expired",
    created: "19.03.2025 12:00",
    expires: "19.03.2025 18:00",
    usageCount: 0,
    usageLimit: 1,
  },
];

export function Guests() {
  const [showModal, setShowModal] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-full">
            <CheckCircle className="w-3 h-3" />
            Aktiv
          </span>
        );
      case "used":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full">
            <CheckCircle className="w-3 h-3" />
            Ishlatilgan
          </span>
        );
      case "expired":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-gray-700 bg-gray-50 rounded-full">
            <Clock className="w-3 h-3" />
            Muddati tugagan
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-red-700 bg-red-50 rounded-full">
            <XCircle className="w-3 h-3" />
            Bekor qilingan
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
          <h1 className="text-3xl font-bold text-gray-900">Mehmonlar</h1>
          <p className="text-gray-600 mt-1">Vaqtinchalik kirish kodlarini boshqarish</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Mehmon qo'shish
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">2</p>
              <p className="text-sm text-gray-600">Aktiv</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <QrCode className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">2</p>
              <p className="text-sm text-gray-600">QR-kod</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Key className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">2</p>
              <p className="text-sm text-gray-600">PIN-kod</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <Clock className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">1</p>
              <p className="text-sm text-gray-600">Tugagan</p>
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
                  Mehmon ismi
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Host
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Terminal
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Turi
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Holat
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Yaratilgan
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tugash
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Foydalanish
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {guestsData.map((guest) => (
                <tr key={guest.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{guest.guestName}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{guest.hostName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{guest.terminal}</td>
                  <td className="px-6 py-4">
                    {guest.type === "QR" ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full">
                        <QrCode className="w-3 h-3" />
                        QR
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-yellow-700 bg-yellow-50 rounded-full">
                        <Key className="w-3 h-3" />
                        PIN
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(guest.status)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{guest.created}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{guest.expires}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">
                      {guest.usageCount} / {guest.usageLimit === 999 ? "∞" : guest.usageLimit}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            Jami <span className="font-medium text-gray-900">{guestsData.length}</span> ta mehmon
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

      {/* Create Guest Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Mehmon qo'shish</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mehmon ismi *
                </label>
                <input
                  type="text"
                  className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Host rezident *
                </label>
                <select className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
                  <option>Tanlang...</option>
                  <option>Abdullayev Jasur</option>
                  <option>Karimova Malika</option>
                  <option>Yusupov Otabek</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kirish turi *
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 flex-1">
                    <input type="radio" name="type" value="qr" defaultChecked className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">QR-kod</span>
                  </label>
                  <label className="flex items-center gap-2 flex-1">
                    <input type="radio" name="type" value="pin" className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">PIN-kod</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Boshlanish *
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tugash *
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                >
                  Bekor qilish
                </button>
                <button className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                  Yaratish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
