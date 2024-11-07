import React from "react";
import { motion } from "framer-motion";
import { FileText, Clock, Download } from "lucide-react";

const Dashboard = () => {
  // Mock data for extracted documents
  const documents = [
    {
      id: 1,
      name: "Invoice-2024-001.pdf",
      date: "2024-03-10",
      type: "Invoice",
      extractedData: {
        name: "John Doe",
        amount: "$1,500",
        date: "2024-03-10",
      },
    },
    // Add more mock documents as needed
  ];

  return (
    <div className="pt-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 rounded-xl p-6"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Your Documents
            </h1>
            <p className="text-gray-400">Manage your extracted document data</p>
          </div>

          <div className="grid gap-6">
            {documents.map((doc) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.01 }}
                className="bg-gray-700/30 rounded-lg p-4 border border-gray-600"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-blue-500" />
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {doc.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{doc.date}</span>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <Download className="w-5 h-5 text-gray-400" />
                  </motion.button>
                </div>

                <div className="mt-4 pl-11">
                  <div className="text-sm text-gray-400">
                    <p>Type: {doc.type}</p>
                    <p>Extracted Data:</p>
                    <ul className="mt-2 space-y-1 text-gray-300">
                      {Object.entries(doc.extractedData).map(([key, value]) => (
                        <li key={key}>
                          {key}: {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
