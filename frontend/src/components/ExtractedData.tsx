import React from "react";
import { FileText, User, CalendarDays, Hash, X, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface ExtractedDataProps {
  data: {
    fileName: string;
    name?: string;
    documentNumber?: string;
    expirationDate?: string;
  };
  onReset: () => void;
}

const ExtractedData = ({ data, onReset }: ExtractedDataProps) => {
  const navigate = useNavigate();
  const isLoggedIn = false; // Replace with actual auth state

  const handleSave = () => {
    if (!isLoggedIn) {
      navigate("/signup");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto bg-gray-800/50 rounded-xl p-6 border border-gray-700"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <FileText className="w-8 h-8 text-blue-500" />
          <div>
            <h3 className="text-lg font-semibold text-white">
              Extracted Information
            </h3>
            <p className="text-sm text-gray-400">{data.fileName}</p>
          </div>
        </div>
        <button
          onClick={onReset}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Reset"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div className="space-y-4">
        {data.name && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg"
          >
            <User className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-sm text-gray-400">Name</p>
              <p className="text-white">{data.name}</p>
            </div>
          </motion.div>
        )}

        {data.documentNumber && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg"
          >
            <Hash className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-sm text-gray-400">Document Number</p>
              <p className="text-white">{data.documentNumber}</p>
            </div>
          </motion.div>
        )}

        {data.expirationDate && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg"
          >
            <CalendarDays className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-sm text-gray-400">Expiration Date</p>
              <p className="text-white">{data.expirationDate}</p>
            </div>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          <Save className="w-5 h-5" />
          Save to Dashboard
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ExtractedData;
