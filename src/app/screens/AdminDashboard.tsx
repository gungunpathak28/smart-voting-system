import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Users, TrendingUp, Shield, AlertTriangle, Activity, ChevronRight } from "lucide-react";
import ChatbotAssistant from "../components/ChatbotAssistant";

interface VoteData {
  name: string;
  votes: number;
  percentage: number;
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [totalVotes, setTotalVotes] = useState(8492);
  const [voteData, setVoteData] = useState<VoteData[]>([
    { name: "Sarah Johnson", votes: 3247, percentage: 38.2 },
    { name: "Michael Chen", votes: 2891, percentage: 34.0 },
    { name: "Emily Rodriguez", votes: 1654, percentage: 19.5 },
    { name: "David Park", votes: 700, percentage: 8.3 },
  ]);

  useEffect(() => {
    // Simulate real-time vote updates
    const interval = setInterval(() => {
      setTotalVotes((prev) => prev + Math.floor(Math.random() * 3));
      setVoteData((prev) =>
        prev.map((candidate) => ({
          ...candidate,
          votes: candidate.votes + Math.floor(Math.random() * 2),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      label: "Total Votes",
      value: totalVotes.toLocaleString(),
      icon: Users,
      color: "from-blue-500 to-blue-600",
      change: "+12.5%",
    },
    {
      label: "Turnout Rate",
      value: "76.3%",
      icon: TrendingUp,
      color: "from-green-500 to-green-600",
      change: "+3.2%",
    },
    {
      label: "Blockchain Verified",
      value: "100%",
      icon: Shield,
      color: "from-purple-500 to-purple-600",
      change: "Secure",
    },
    {
      label: "Active Polling Stations",
      value: "247",
      icon: Activity,
      color: "from-orange-500 to-orange-600",
      change: "Live",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-green-600 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Real-time voting analytics</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/anomalies")}
              className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-red-100 transition-colors flex items-center gap-2"
            >
              <AlertTriangle className="w-4 h-4" />
              View Anomalies
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/vote")}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Back to Voting
            </button>
          </div>
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
              <div className="flex items-start justify-between mb-4">
                <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-xl`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Vote Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={voteData}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="votes" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Candidate Share</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={voteData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ percentage }) => `${percentage.toFixed(1)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="votes"
                >
                  {voteData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-sm p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">Detailed Results</h3>
          <div className="space-y-4">
            {voteData.map((candidate, index) => (
              <div key={candidate.name} className="flex items-center gap-4">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">{candidate.name}</span>
                    <span className="text-sm text-gray-600">
                      {candidate.votes.toLocaleString()} votes ({candidate.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${candidate.percentage}%` }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: COLORS[index] }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-1">Live Updates Active</h3>
              <p className="text-blue-100">Dashboard refreshes every 3 seconds with blockchain-verified data</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
          </div>
        </motion.div>
      </main>

      <ChatbotAssistant />
    </div>
  );
}
