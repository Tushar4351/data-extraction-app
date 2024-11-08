import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "./UserContext";
import axios, { AxiosError } from "axios";
import { server } from "./utils/data";

const Home = lazy(() => import("./pages/Home"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  const { setUser } = useUser();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${server}/api/v1/user/check-auth`, {
          withCredentials: true, 
        });

        if (response.data.success) {
          setUser(response.data.user);
        }
      } catch (err) {
        console.log(err);
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
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Suspense>
      </div>
      <Toaster position="top-center" />
    </Router>
  );
}

export default App;
