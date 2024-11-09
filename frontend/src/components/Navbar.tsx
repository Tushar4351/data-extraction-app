import { useNavigate, Link } from "react-router-dom";
import { FileText, LogIn, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useUser } from "../UserContext";
import api from "../utils/data";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const LogoutHandler = async () => {
    try {
      const response = await api.post("/user/logout");

      if (response.status === 200) {
        toast.success("Sign Out Successfully");
        setUser(null);
        navigate("/");
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      // Log the error for debugging purposes
      console.error("Logout error:", error);

      // Display a user-friendly error message
      toast.error("Sign Out Failed. Please try again later.");
    }
  };

  return (
    <nav className="fixed w-full z-50 backdrop-blur-md pt-4 px-4">
      <div className="max-w-7xl mx-auto px-4 bg-gray-700/30 rounded-lg border border-gray-600 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <FileText className="h-8 w-8 text-blue-500" />
            </motion.div>
            <span className="ml-2 text-xl font-bold text-white">DocXtract</span>
          </Link>

          {user ? (
            <>
              <button onClick={LogoutHandler}>
                <div className="text-sm font-semibold flex gap-2 items-center">
                  <LogOut className="w-4 h-4" /> Welcome! {`${user.name}`}
                </div>
              </button>
            </>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/signin")}
                className="inline-flex h-12 gap-2 animate-shimmer items-center justify-center rounded-xl border border-gray-600 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-5 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </motion.button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
