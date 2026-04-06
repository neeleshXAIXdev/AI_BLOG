import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import LoginPopup from "./LoginPopup";

const Hero = ({ scrollToExplore }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleCreateClick = () => {
    if (!user) {
      setShowLoginPopup(true);
      return;
    }
    navigate("/create"); //
  };

  return (
    <section className="relative pt-[15rem] pb-16 px-4 text-white overflow-hidden">
      {/* Glow */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/20 blur-[120px] rounded-full" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-8xl font-bold leading-tight">
          Create, Share & Explore <br />
          <span className="text-blue-400">AI Powered Blogs</span>
        </h1>

        <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-lg">
          Generate high-quality blogs using AI, save your favorites, and explore
          ideas from creators around the world.
        </p>

        {/* 🔥 Buttons */}
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <button
            onClick={handleCreateClick}
            className="text-blue-500 hover:text-blue-600 px-6 py-3 rounded-xl font-semibold transition bg-blue-50 hover:bg-blue-200"
          >
            ✍️ Create Blog
          </button>

          <button
            onClick={scrollToExplore}
            className="bg-blue-500 px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Explore Blogs
          </button>
        </div>
      </div>

      {/* 🔥 LOGIN POPUP */}
      <LoginPopup
        isOpen={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
      />
    </section>
  );
};

export default Hero;
