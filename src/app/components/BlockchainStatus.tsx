import { motion } from "motion/react";
import { CheckCircle2, Loader2, Shield, Link2 } from "lucide-react";

interface BlockchainStatusProps {
  verified: boolean;
}

export default function BlockchainStatus({ verified }: BlockchainStatusProps) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 border-2 border-blue-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-br from-blue-600 to-green-600 p-2 rounded-lg">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <h3 className="font-bold text-gray-900">Blockchain Verification</h3>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          {verified ? (
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          ) : (
            <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
          )}
          <span className="text-sm text-gray-700">
            {verified ? "Transaction Verified" : "Verifying transaction..."}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {verified ? (
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          ) : (
            <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
          )}
          <span className="text-sm text-gray-700">
            {verified ? "Block Confirmed" : "Mining block..."}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {verified ? (
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          ) : (
            <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
          )}
          <span className="text-sm text-gray-700">
            {verified ? "Distributed to Network" : "Broadcasting..."}
          </span>
        </div>
      </div>

      {verified && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 pt-4 border-t border-blue-200"
        >
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <Link2 className="w-4 h-4" />
            <span className="font-medium">Transaction Hash:</span>
          </div>
          <code className="text-xs bg-white px-3 py-2 rounded-lg block text-gray-700 font-mono">
            0x7f8a3c2b9e4d1a6f5c8b2e9d4a7c1b8f3e6d2a9c5b8e1d4a7c3b6f9e2d5a8c1b
          </code>
        </motion.div>
      )}
    </div>
  );
}
