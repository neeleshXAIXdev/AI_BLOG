import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <div className="fixed top-0 w-full z-50 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border-b border-white/10 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4 text-white">
          {/* Logo */}
          <NavLink
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            AI Blogs
          </NavLink>

          {/* Hamburger */}
          <button
            className="md:hidden text-3xl p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition"
            onClick={() => setIsOpen(true)}
          >
            ☰
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center text-sm font-medium">
            {user ? (
              <>
                <CustomNavLink to="/create">Create</CustomNavLink>
                <CustomNavLink to="/bookmarks">Bookmarks</CustomNavLink>
                <CustomNavLink to="/profile">👤 Profile</CustomNavLink>

                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 
                  hover:from-red-600 hover:to-pink-600 
                  shadow-lg shadow-red-500/20 
                  hover:scale-105 transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <CustomNavLink to="/login">Login</CustomNavLink>
                <CustomNavLink to="/signup">Signup</CustomNavLink>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: isOpen ? 0 : "-100%" }}
        transition={{ duration: 0.35 }}
        className="fixed top-0 left-0 w-full h-screen bg-black/40 backdrop-blur-2xl z-50 flex flex-col items-center justify-center gap-6 text-white"
      >
        {/* Close */}
        <button
          className="absolute top-6 right-6 text-3xl p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>

        {user ? (
          <>
            <MobileLink to="/create" setIsOpen={setIsOpen}>
              Create
            </MobileLink>
            <MobileLink to="/bookmarks" setIsOpen={setIsOpen}>
              Bookmarks
            </MobileLink>
            <MobileLink to="/profile" setIsOpen={setIsOpen}>
              👤 Profile
            </MobileLink>

            <button
              onClick={() => {
                logout();
                setIsOpen(false);
                navigate("/");
              }}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 hover:scale-105 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <MobileLink to="/login" setIsOpen={setIsOpen}>
              Login
            </MobileLink>
            <MobileLink to="/signup" setIsOpen={setIsOpen}>
              Signup
            </MobileLink>
          </>
        )}
      </motion.div>
    </>
  );
};

export default Navbar;

////////////////////////////////////////////////////////

// 🔥 Desktop Active Link
const CustomNavLink = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `relative px-2 py-1 transition-all duration-300 ${
        isActive ? "text-blue-400" : "text-white"
      }`
    }
  >
    {({ isActive }) => (
      <>
        {children}
        <span
          className={`absolute left-0 -bottom-1 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 ${
            isActive ? "w-full" : "w-0"
          }`}
        />
      </>
    )}
  </NavLink>
);

////////////////////////////////////////////////////////

// Mobile Active Link
const MobileLink = ({ to, children, setIsOpen }) => (
  <NavLink
    to={to}
    onClick={() => setIsOpen(false)}
    className={({ isActive }) =>
      `text-2xl font-semibold px-6 py-3 rounded-xl transition-all duration-300 ${
        isActive
          ? "bg-blue-500/20 text-blue-400"
          : "bg-white/5 hover:bg-white/10"
      }`
    }
  >
    {children}
  </NavLink>
);
