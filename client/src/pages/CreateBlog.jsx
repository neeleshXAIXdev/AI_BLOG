import { useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CreateBlog = () => {
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      const res = await API.post("/ai/generate", { topic });
      setContent(res.data.content);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    const tagsArray = tags.split(",").map((tag) => tag.trim());
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", topic);
      formData.append("content", content);
      formData.append("tags", JSON.stringify(tagsArray));

      const fileInput = document.getElementById("image");
      if (fileInput.files[0]) {
        formData.append("image", fileInput.files[0]);
      }

      const res = await API.post("/blogs", formData);
      navigate(`/blog/${res.data._id}`);
    } catch (error) {
      console.error("Blog creation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0f172a] min-h-screen text-white">
      {loading && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-lg font-semibold">Publishing your blog...</p>
          </div>
        </div>
      )}

      <Navbar />

      <div className="max-w-3xl mx-auto pt-28 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6"
        >
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            ✍️ Create AI Blog
          </h1>

          {/* Topic */}
          <input
            className="w-full bg-white/10 border border-white/20 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />

          {/* Content */}
          <div className="relative">
            <textarea
              rows={10}
              className="w-full bg-white/10 border border-white/20 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Your AI-generated content..."
            />

            <button
              onClick={handleGenerate}
              disabled={!topic}
              className={`absolute bottom-3 right-3 px-4 py-1.5 text-sm rounded-lg transition 
    ${
      !topic
        ? "bg-gray-600 cursor-not-allowed opacity-50"
        : "bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105"
    }`}
            >
              ⚡ Generate
            </button>
          </div>

          {/* Tags */}
          <input
            className="w-full bg-white/10 border border-white/20 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Tags (comma separated)..."
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          {/* Image Upload */}
          <input
            type="file"
            id="image"
            className="w-full text-sm text-gray-300 file:bg-white/10 file:border-0 file:px-4 file:py-2 file:rounded-lg file:text-white hover:file:bg-white/20"
          />

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading || !content || !topic}
            className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition-transform disabled:opacity-50"
          >
            🚀 Publish Blog
          </button>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateBlog;
