import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, X, User, Shield, ChevronRight } from "lucide-react";
import ChatbotAssistant from "../components/ChatbotAssistant";
import BlockchainStatus from "../components/BlockchainStatus";

interface Candidate {
  id: number;
  name: string;
  party: string;
  symbol: string;
  photo: string;
}

const candidates: Candidate[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    party: "Progressive Alliance",
    symbol: "🌟",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Michael Chen",
    party: "Innovation Party",
    symbol: "🚀",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    party: "Unity Coalition",
    symbol: "🤝",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "David Park",
    party: "Green Future",
    symbol: "🌱",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  },
];

export default function VotingScreen() {
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const [blockchainVerified, setBlockchainVerified] = useState(false);

  const handleVoteClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowConfirmation(true);
  };

  // 🔥 ONLY CHANGE (backend connect)
  const handleConfirmVote = async () => {
    try {
      console.log("Sending vote:", selectedCandidate?.name);

      await fetch("http://localhost:5000/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          candidate: selectedCandidate?.name
        })
      });

      console.log("Vote sent to backend ✅");

      setVoteSubmitted(true);
      setShowConfirmation(false);

      setTimeout(() => {
        setBlockchainVerified(true);
      }, 2000);

    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleViewResults = () => {
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-green-600 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Secure Voting Portal</h1>
              <p className="text-sm text-gray-600">Voter ID: #VTR-2024-8492</p>
            </div>
          </div>
          <button
            onClick={handleViewResults}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
          >
            Admin Panel
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {!voteSubmitted ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Cast Your Vote</h2>
              <p className="text-gray-600">Select a candidate to proceed with secure voting</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {candidates.map((candidate, index) => (
                <motion.div
                  key={candidate.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all p-6 border-2 border-transparent hover:border-blue-200"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={candidate.photo}
                      alt={candidate.name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {candidate.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">{candidate.party}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{candidate.symbol}</span>
                        <span className="text-sm text-gray-500">Party Symbol</span>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleVoteClick(candidate)}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
                  >
                    Vote for {candidate.name.split(" ")[0]}
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="w-16 h-16 text-green-600" />
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Vote Successfully Recorded!
              </h2>
              <p className="text-gray-600 mb-8">
                Your vote for <span className="font-semibold text-blue-600">{selectedCandidate?.name}</span> has been securely recorded on the blockchain
              </p>

              <BlockchainStatus verified={blockchainVerified} />

              <div className="mt-8 space-y-3">
                <button
                  onClick={handleViewResults}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  View Results Dashboard
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                >
                  Exit
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      <AnimatePresence>
        {showConfirmation && selectedCandidate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50"
            onClick={() => setShowConfirmation(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full"
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Confirm Your Vote</h3>
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="bg-blue-50 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={selectedCandidate.photo}
                    alt={selectedCandidate.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{selectedCandidate.name}</h4>
                    <p className="text-gray-600 text-sm">{selectedCandidate.party}</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 text-4xl">
                  {selectedCandidate.symbol}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  ⚠️ This action is final and cannot be reversed.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmVote}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold"
                >
                  Confirm Vote
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ChatbotAssistant />
    </div>
  );
}