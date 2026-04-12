import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { AlertTriangle, Shield, AlertCircle, CheckCircle2, Activity, TrendingUp, ChevronLeft } from "lucide-react";
import ChatbotAssistant from "../components/ChatbotAssistant";

interface Anomaly {
  id: number;
  type: string;
  severity: "low" | "medium" | "high";
  message: string;
  timestamp: string;
  ip?: string;
  location?: string;
}

const anomalies: Anomaly[] = [
  {
    id: 1,
    type: "Multiple Votes Detected",
    severity: "high",
    message: "Multiple votes detected from same IP address",
    timestamp: "2 minutes ago",
    ip: "192.168.1.45",
    location: "District 7, Station 23",
  },
  {
    id: 2,
    type: "Unusual Voting Spike",
    severity: "medium",
    message: "Unusual voting spike detected in Station 15",
    timestamp: "8 minutes ago",
    location: "District 3, Station 15",
  },
  {
    id: 3,
    type: "Suspicious Pattern",
    severity: "medium",
    message: "Sequential voting pattern detected",
    timestamp: "15 minutes ago",
    location: "District 5, Station 31",
  },
  {
    id: 4,
    type: "Access Attempt",
    severity: "low",
    message: "Unauthorized access attempt blocked",
    timestamp: "23 minutes ago",
    ip: "203.45.67.89",
  },
];

export default function AnomalyDetection() {
  const navigate = useNavigate();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "from-red-500 to-red-600";
      case "medium":
        return "from-yellow-500 to-yellow-600";
      case "low":
        return "from-blue-500 to-blue-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-50 border-red-200";
      case "medium":
        return "bg-yellow-50 border-yellow-200";
      case "low":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-700";
      case "medium":
        return "text-yellow-700";
      case "low":
        return "text-blue-700";
      default:
        return "text-gray-700";
    }
  };

  const stats = [
    {
      label: "Total Alerts",
      value: "24",
      icon: AlertTriangle,
      color: "from-red-500 to-red-600",
    },
    {
      label: "High Priority",
      value: "3",
      icon: AlertCircle,
      color: "from-orange-500 to-orange-600",
    },
    {
      label: "Resolved",
      value: "18",
      icon: CheckCircle2,
      color: "from-green-500 to-green-600",
    },
    {
      label: "Detection Rate",
      value: "99.8%",
      icon: TrendingUp,
      color: "from-blue-500 to-blue-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-red-600 to-orange-600 p-2 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">AI Anomaly Detection</h1>
              <p className="text-sm text-gray-600">Real-time threat monitoring</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/admin")}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm p-6"
            >
              <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-xl mb-4 w-fit`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl shadow-lg p-6 text-white mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <Activity className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">AI Monitoring Active</h3>
              <p className="text-red-100">Advanced machine learning algorithms detecting suspicious patterns in real-time</p>
            </div>
          </div>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Active Threats</h2>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium text-sm hover:bg-red-100 transition-colors">
                High Priority
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors">
                All Alerts
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {anomalies.map((anomaly, index) => (
              <motion.div
                key={anomaly.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`border-2 rounded-xl p-5 ${getSeverityBg(anomaly.severity)}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className={`bg-gradient-to-br ${getSeverityColor(anomaly.severity)} p-2 rounded-lg`}>
                      <AlertTriangle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className={`font-bold mb-1 ${getSeverityText(anomaly.severity)}`}>
                        {anomaly.type}
                      </h3>
                      <p className="text-gray-700 mb-2">{anomaly.message}</p>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                        <span>⏱️ {anomaly.timestamp}</span>
                        {anomaly.ip && <span>🌐 IP: {anomaly.ip}</span>}
                        {anomaly.location && <span>📍 {anomaly.location}</span>}
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getSeverityText(anomaly.severity)} bg-white/50`}>
                    {anomaly.severity} Risk
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="px-4 py-2 bg-white text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    Investigate
                  </button>
                  <button className="px-4 py-2 bg-white text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    Mark Resolved
                  </button>
                  <button className="px-4 py-2 bg-white text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">
                    Block IP
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl mb-4 w-fit">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">AI Model Accuracy</h3>
            <p className="text-3xl font-bold text-gray-900 mb-1">99.8%</p>
            <p className="text-sm text-gray-600">Based on 10,000+ verified cases</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl mb-4 w-fit">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Response Time</h3>
            <p className="text-3xl font-bold text-gray-900 mb-1">&lt;0.5s</p>
            <p className="text-sm text-gray-600">Average threat detection speed</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl mb-4 w-fit">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Threats Blocked</h3>
            <p className="text-3xl font-bold text-gray-900 mb-1">1,247</p>
            <p className="text-sm text-gray-600">Since election started</p>
          </div>
        </motion.div>
      </main>

      <ChatbotAssistant />
    </div>
  );
}
