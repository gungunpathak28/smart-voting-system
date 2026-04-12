import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Shield, Fingerprint, Mail, Lock } from "lucide-react";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [voterId, setVoterId] = useState("");
  const [otp, setOtp] = useState("");
  const [authMethod, setAuthMethod] = useState<"voter-id" | "biometric">("voter-id");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication
    navigate("/vote");
  };

  const handleBiometricAuth = () => {
    // Simulate biometric authentication
    setTimeout(() => {
      navigate("/vote");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full"
      >
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-green-600 p-4 rounded-2xl">
            <Shield className="w-12 h-12 text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Secure Voting
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Blockchain-powered democratic voting
        </p>

        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setAuthMethod("voter-id")}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
              authMethod === "voter-id"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Mail className="w-5 h-5 inline mr-2" />
            Voter ID
          </button>
          <button
            onClick={() => setAuthMethod("biometric")}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
              authMethod === "biometric"
                ? "bg-green-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Fingerprint className="w-5 h-5 inline mr-2" />
            Biometric
          </button>
        </div>

        {authMethod === "voter-id" ? (
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Voter ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={voterId}
                  onChange={(e) => setVoterId(e.target.value)}
                  placeholder="Enter your voter ID"
                  className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                  required
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OTP
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                  maxLength={6}
                  required
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Sign In Securely
            </motion.button>
          </form>
        ) : (
          <div className="text-center py-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBiometricAuth}
              className="bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-full mx-auto block mb-6 shadow-xl"
            >
              <Fingerprint className="w-16 h-16 text-white" />
            </motion.button>
            <p className="text-gray-600 mb-4">Touch to authenticate</p>
            <p className="text-sm text-gray-500">
              Place your finger on the sensor
            </p>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Shield className="w-4 h-4" />
            <span>Protected by blockchain encryption</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
