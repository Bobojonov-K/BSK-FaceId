import { useState } from "react";
import { Calendar, Download, FileText, TrendingUp, Users, Activity } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";

// Mock data
const dailyData = [
  { hour: "00:00", entries: 12 },
  { hour: "06:00", entries: 45 },
  { hour: "08:00", entries: 234 },
  { hour: "10:00", entries: 156 },
  { hour: "12:00", entries: 189 },
  { hour: "14:00", entries: 298 },
  { hour: "16:00", entries: 187 },
  { hour: "18:00", entries: 245 },
  { hour: "20:00", entries: 134 },
  { hour: "22:00", entries: 67 },
];

const weeklyData = [
  { day: "Dush", success: 980, denied: 45 },
  { day: "Sesh", success: 1120, denied: 38 },
  { day: "Chor", success: 1050, denied: 52 },
  { day: "Pay", success: 1200, denied: 41 },
  { day: "Juma", success: 1180, denied: 35 },
  { day: "Shan", success: 850, denied: 28 },
  { day: "Yak", success: 920, denied: 31 },
];

const buildingData = [
  { name: "Chilonzor-14", value: 1450, color: "#3b82f6" },
  { name: "Chilonzor-15", value: 980, color: "#10b981" },
  { name: "Chilonzor-16", value: 2030, color: "#f59e0b" },
  { name: "Yunusobod-5", value: 870, color: "#ef4444" },
];

export function Reports() {
  const [selectedTab, setSelectedTab] = useState("daily");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hisobotlar</h1>
          <p className="text-gray-600 mt-1">Statistika va tahliliy ma'lumotlar</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors">
            <FileText className="w-5 h-5" />
            PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors">
            <Download className="w-5 h-5" />
            Excel
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-100 p-2 shadow-sm">
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedTab("daily")}
            className={`flex-1 px-4 py-2 font-medium rounded-lg transition-colors ${
              selectedTab === "daily"
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            Kunlik
          </button>
          <button
            onClick={() => setSelectedTab("weekly")}
            className={`flex-1 px-4 py-2 font-medium rounded-lg transition-colors ${
              selectedTab === "weekly"
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            Haftalik
          </button>
          <button
            onClick={() => setSelectedTab("monthly")}
            className={`flex-1 px-4 py-2 font-medium rounded-lg transition-colors ${
              selectedTab === "monthly"
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            Oylik
          </button>
          <button
            onClick={() => setSelectedTab("terminals")}
            className={`flex-1 px-4 py-2 font-medium rounded-lg transition-colors ${
              selectedTab === "terminals"
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            Terminal faollik
          </button>
        </div>
      </div>

      {/* Date Range Selector */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Calendar className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Davr:</span>
          <input
            type="date"
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <span className="text-gray-500">—</span>
          <input
            type="date"
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
            Qo'llash
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">12,450</p>
              <p className="text-sm text-gray-600">Jami kirishlar</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">98%</p>
              <p className="text-sm text-gray-600">Muvaffaqiyat %</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <Users className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">240</p>
              <p className="text-sm text-gray-600">Rad etildi</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <FileText className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-600">Shubhali</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Trend */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Kunlik trend (soatlar bo'yicha)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              {/*<XAxis dataKey="hour" stroke="#9ca3af" style={{ fontSize: '12px' }} />*/}
              {/*<YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />*/}
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="entries" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Kirishlar" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Comparison */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Haftalik taqqoslama</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              {/*<XAxis dataKey="day" stroke="#9ca3af" style={{ fontSize: '12px' }} />*/}
              {/*<YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />*/}
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line
                type="monotone"
                dataKey="success"
                stroke="#10b981"
                strokeWidth={2}
                name="Muvaffaqiyatli"
                dot={{ fill: '#10b981', r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="denied"
                stroke="#ef4444"
                strokeWidth={2}
                name="Rad etilgan"
                dot={{ fill: '#ef4444', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Building Statistics */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Binolar bo'yicha taqsimot</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={buildingData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {buildingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="space-y-4">
            {buildingData.map((building, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: building.color }}
                  ></div>
                  <span className="font-medium text-gray-900">{building.name}</span>
                </div>
                <span className="text-lg font-bold text-gray-900">{building.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
