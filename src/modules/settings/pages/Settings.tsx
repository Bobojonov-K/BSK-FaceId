import { useState } from "react";
import { Save, Shield, Bell, Database, FileText } from "lucide-react";
import React from "react";
export function Settings() {
  const [activeTab, setActiveTab] = useState("system");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Sozlamalar</h1>
        <p className="text-gray-600 mt-1">Tizim va xavfsizlik sozlamalari</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="border-b border-gray-100">
          <div className="flex">
            <button
              onClick={() => setActiveTab("system")}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === "system"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <FileText className="w-5 h-5" />
              Tizim
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === "security"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Shield className="w-5 h-5" />
              Xavfsizlik
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === "notifications"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Bell className="w-5 h-5" />
              Bildirishnomalar
            </button>
            <button
              onClick={() => setActiveTab("backup")}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === "backup"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Database className="w-5 h-5" />
              Backup
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "system" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platforma nomi
                </label>
                <input
                  type="text"
                  defaultValue="BSK FaceID Kirish Nazorati"
                  className="w-full max-w-md h-11 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Support contact
                </label>
                <input
                  type="email"
                  defaultValue="support@bsk-faceid.uz"
                  className="w-full max-w-md h-11 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select className="w-full max-w-md h-11 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
                  <option value="UTC+5">UTC+5 (Tashkent)</option>
                  <option value="UTC+0">UTC+0 (London)</option>
                </select>
              </div>

              <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                <Save className="w-5 h-5" />
                Saqlash
              </button>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session muddati (daqiqalar)
                </label>
                <input
                  type="number"
                  defaultValue="60"
                  className="w-full max-w-xs h-11 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <p className="text-xs text-gray-500 mt-1">Foydalanuvchi avtomatik chiqariladi</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maksimal noto'g'ri kirish urinishlari
                </label>
                <input
                  type="number"
                  defaultValue="5"
                  className="w-full max-w-xs h-11 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bloklash muddati (daqiqalar)
                </label>
                <input
                  type="number"
                  defaultValue="15"
                  className="w-full max-w-xs h-11 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimal parol uzunligi
                </label>
                <input
                  type="number"
                  defaultValue="8"
                  className="w-full max-w-xs h-11 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Parol amal qilish muddati (kunlar)
                </label>
                <input
                  type="number"
                  defaultValue="90"
                  className="w-full max-w-xs h-11 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="require-2fa"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="require-2fa" className="text-sm font-medium text-gray-700">
                  2FA majburiy qilish
                </label>
              </div>

              <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                <Save className="w-5 h-5" />
                Saqlash
              </button>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SMS Provider
                </label>
                <select className="w-full max-w-md h-11 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
                  <option value="playmobile">PlayMobile</option>
                  <option value="eskiz">Eskiz</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telegram Bot Token
                </label>
                <input
                  type="text"
                  placeholder="Bot token kiriting..."
                  className="w-full max-w-md h-11 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email SMTP Server
                </label>
                <input
                  type="text"
                  placeholder="smtp.gmail.com"
                  className="w-full max-w-md h-11 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700">Bildirishnomalar</p>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="notify-suspicious"
                    defaultChecked
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="notify-suspicious" className="text-sm text-gray-700">
                    Shubhali voqealar
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="notify-offline"
                    defaultChecked
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="notify-offline" className="text-sm text-gray-700">
                    Terminal offline
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="notify-daily-report"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="notify-daily-report" className="text-sm text-gray-700">
                    Kunlik hisobot
                  </label>
                </div>
              </div>

              <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                <Save className="w-5 h-5" />
                Saqlash
              </button>
            </div>
          )}

          {activeTab === "backup" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Backup schedule
                </label>
                <select className="w-full max-w-md h-11 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
                  <option value="daily">Har kuni</option>
                  <option value="weekly">Haftada bir marta</option>
                  <option value="monthly">Oyda bir marta</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Saqlash muddati (kunlar)
                </label>
                <input
                  type="number"
                  defaultValue="30"
                  className="w-full max-w-xs h-11 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <p className="text-xs text-gray-500 mt-1">Eski backuplar avtomatik o'chiriladi</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Storage location
                </label>
                <input
                  type="text"
                  defaultValue="/var/backups/bsk-faceid"
                  className="w-full max-w-md h-11 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                  <Save className="w-5 h-5" />
                  Saqlash
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors">
                  <Database className="w-5 h-5" />
                  Hozir backup qilish
                </button>
              </div>

              {/* Recent Backups */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Oxirgi backuplar</h3>
                <div className="space-y-2">
                  {[
                    { date: "21.03.2025 00:00", size: "2.4 GB", status: "success" },
                    { date: "20.03.2025 00:00", size: "2.3 GB", status: "success" },
                    { date: "19.03.2025 00:00", size: "2.3 GB", status: "success" },
                  ].map((backup, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{backup.date}</p>
                        <p className="text-sm text-gray-600">{backup.size}</p>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-full">
                        Muvaffaqiyatli
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
