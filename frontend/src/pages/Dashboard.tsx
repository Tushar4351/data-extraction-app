import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Clock, Trash } from "lucide-react";
import { useUser } from "../UserContext";

import { toast } from "react-hot-toast";
import api from "../utils/data";

interface ExtractedDataType {
  _id: string;
  fileName: string;
  name: string;
  documentNumber: string;
  expirationDate: string;
}

const Dashboard = () => {
  const { user } = useUser();
  const [documents, setDocuments] = useState<ExtractedDataType[]>([]);

  // Fetch documents when component mounts
  useEffect(() => {
    if (user?._id) {
      fetchDocuments();
    }
  }, [user?._id]);

  const fetchDocuments = async () => {
    try {
      const response = await api.get(`/data/${user?._id}`);

      setDocuments(response.data.data || []);
    } catch (error: unknown) {

      if (error.response?.status !== 404) {
        toast.error("Something went wrong while fetching your documents");
        console.error("Error fetching documents:", error);
      }
      setDocuments([]);
    }
  };

  const DeleteHandler = async (id: string) => {
    try {
      await api.delete(`/data/${id}`);
      setDocuments((prevDocs) => prevDocs.filter((doc) => doc._id !== id));
      toast.success("Document deleted successfully");
    } catch (error) {
      toast.error("Failed to delete document");
      console.error("Error deleting document:", error);
    }
  };

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

          {documents.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              No documents found
            </div>
          ) : (
            <div className="grid gap-6">
              {documents.map((doc) => (
                <motion.div
                  key={doc._id}
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
                          {doc.fileName}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>
                            {new Date(doc.expirationDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => DeleteHandler(doc._id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <Trash className="w-5 h-5 text-gray-400" />
                    </motion.button>
                  </div>

                  <div className="mt-4 pl-11">
                    <div className="text-sm text-gray-400">
                      <ul className="mt-2 space-y-1 text-gray-300">
                        <li>Name: {doc.name}</li>
                        <li>Document Number: {doc.documentNumber}</li>
                        <li>
                          Expiration Date:{" "}
                          {new Date(doc.expirationDate).toLocaleDateString()}
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
