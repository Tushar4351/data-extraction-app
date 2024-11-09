import { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUser } from "./UserContext";
import api from "./utils/data";
import ProtectedRoute from "./components/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  const { setUser, user } = useUser();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("user/check-auth");

        if (response.data.success) {
          setUser(response.data.user);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      }
    };
    checkAuth();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
        <Navbar />
        <Suspense>
          <Routes>
            {/* Public route - accessible to all */}
            <Route path="/" element={<Home />} />

            {/* Auth routes - only for non-authenticated users */}
            <Route
              path="/signin"
              element={user ? <Navigate to="/dashboard" /> : <SignIn />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate to="/dashboard" /> : <SignUp />}
            />

            {/* Protected route - only for authenticated users */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute isAuthenticated={!!user} redirect="/signin">
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </div>
      <Toaster position="top-center" />
    </Router>
  );
}

export default App;
