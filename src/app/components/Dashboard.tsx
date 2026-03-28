import { 
  DoorOpen, 
  XCircle, 
  Signal, 
  Users,
  TrendingUp,
  TrendingDown,
  Wifi,
  WifiOff,
  CheckCircle,
  AlertTriangle,
  Clock
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Mock data
const statsData = [
  {
    title: "Bugungi kirishlar",
    value: "1,234",
    change: "+12%",
    trend: "up",
    icon: DoorOpen,
    color: "blue",
  },
  {
    title: "Rad etilganlar",
    value: "45",
    change: "-8%",
    trend: "down",
    icon: XCircle,
    color: "red",
  },
  {
    title: "Aktiv terminallar",
    value: "12 / 15",
    change: "",
    trend: null,
    icon: Signal,
    color: "green",
  },
  {
    title: "Aktiv rezidentlar",
    value: "2,450",
    change: "+5%",
    trend: "up",
    icon: Users,
    color: "blue",
  },
];

const chartData = [
  { date: "15.03", success: 980, denied: 45 },
  { date: "16.03", success: 1120, denied: 38 },
  { date: "17.03", success: 1050, denied: 52 },
  { date: "18.03", success: 1200, denied: 41 },
  { date: "19.03", success: 1180, denied: 35 },
  { date: "20.03", success: 1250, denied: 48 },
  { date: "21.03", success: 1234, denied: 45 },
];

const recentEvents = [
  {
    time: "14:32",
    type: "success",
    text: "Abdullayev Jasur kirdi",
    terminal: "Terminal-1",
  },
  {
    time: "14:31",
    type: "denied",
    text: "Tanilmagan shaxs",
    terminal: "Terminal-3",
  },
  {
    time: "14:30",
    type: "online",
    text: "Terminal-7 online",
    terminal: "Terminal-7",
  },
  {
    time: "14:29",
    type: "success",
    text: "Yusupov Otabek kirdi",
    terminal: "Terminal-1",
  },
  {
    time: "14:28",
    type: "suspicious",
    text: "Shubhali urinish",
    terminal: "Terminal-5",
  },
];

const suspiciousEvents = [
  {
    terminal: "Terminal-3",
    count: 5,
    text: "5 marta tanilmagan urinish",
    time: "14:31",
  },
  {
    terminal: "Terminal-7",
    count: 1,
    text: "3 soat oflayn",
    time: "11:30",
  },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Real-time statistika va tizim holati</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  stat.color === "blue" ? "bg-blue-50" :
                  stat.color === "red" ? "bg-red-50" :
                  "bg-green-50"
                }`}>
                  <Icon className={`w-6 h-6 ${
                    stat.color === "blue" ? "text-blue-600" :
                    stat.color === "red" ? "text-red-600" :
                    "text-green-600"
                  }`} />
                </div>
                {stat.trend && (
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}>
                    {stat.trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {stat.change}
                  </div>
                )}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.title}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Kirish Trendi (7 kun)</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
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

        {/* Terminal Map Placeholder */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Terminal Xaritasi</h2>
          <div className="h-[280px] bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-sm mb-3">
                <Signal className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600">Xarita yuklanmoqda...</p>
              <div className="mt-4 flex items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">12 Online</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">3 Offline</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Events Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Events */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">So'nggi Voqealar</h2>
            <span className="text-xs text-gray-500">Real-time</span>
          </div>
          <div className="space-y-3">
            {recentEvents.map((event, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`p-2 rounded-lg ${
                  event.type === "success" ? "bg-green-50" :
                  event.type === "denied" ? "bg-red-50" :
                  event.type === "suspicious" ? "bg-yellow-50" :
                  "bg-blue-50"
                }`}>
                  {event.type === "success" && <CheckCircle className="w-4 h-4 text-green-600" />}
                  {event.type === "denied" && <XCircle className="w-4 h-4 text-red-600" />}
                  {event.type === "suspicious" && <AlertTriangle className="w-4 h-4 text-yellow-600" />}
                  {event.type === "online" && <Wifi className="w-4 h-4 text-blue-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{event.text}</p>
                  <p className="text-xs text-gray-500">{event.terminal}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  {event.time}
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            Barchasini ko'rish
          </button>
        </div>

        {/* Suspicious Events */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Shubhali Voqealar</h2>
            <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-yellow-700 bg-yellow-50 rounded-full">
              {suspiciousEvents.length} ta
            </span>
          </div>
          <div className="space-y-3">
            {suspiciousEvents.map((event, index) => (
              <div key={index} className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{event.terminal}</p>
                    <p className="text-sm text-gray-700 mt-1">{event.text}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                      <Clock className="w-3 h-3" />
                      {event.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm font-medium text-yellow-700 hover:bg-yellow-50 rounded-lg transition-colors">
            Barchasini ko'rish
          </button>
        </div>
      </div>
    </div>
  );
}