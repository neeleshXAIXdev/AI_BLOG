import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../layout/MainLayout";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(formData);
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
      alert("Invalid credentials");
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-center items-center min-h-[80vh] px-4">
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleLogin}
          className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-3xl w-full max-w-md space-y-5 shadow-2xl"
        >
          <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Welcome Back 👋
          </h2>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="w-full p-3 rounded-xl bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={formData.email}
            onChange={handleChange}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="w-full p-3 rounded-xl bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={formData.password}
            onChange={handleChange}
          />

          {/* Button */}
          <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 py-2.5 rounded-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-lg">
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <div className="flex-1 h-px bg-white/20"></div>
            OR
            <div className="flex-1 h-px bg-white/20"></div>
          </div>

          {/* Register Link */}
          <p className="text-center text-gray-300 text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Register
            </Link>
          </p>
        </motion.form>
      </div>
    </MainLayout>
  );
};

export default Login;
