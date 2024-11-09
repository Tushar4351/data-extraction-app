import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import FileUpload from "../components/FileUpload";
import { Link } from "react-router-dom";

function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="pt-36 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="space-y-16"
        >
          {/* Hero Section */}
          <div className="text-center space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 animate-gradient"
            >
              Extract Data Instantly
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto"
            >
              Upload any document and let our AI extract the important
              information for you. Fast, accurate, and secure.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center gap-4"
            >
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all duration-300"
                >
                  Try Now
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border border-gray-600 hover:border-blue-500 rounded-lg font-medium transition-all duration-300 group"
              >
                Learn More
                <ArrowRight className="inline ml-2 transform group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </div>

          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ delay: 0.5 }}
          >
            <FileUpload />
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}

export default Home;
