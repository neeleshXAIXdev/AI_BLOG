import { useEffect, useState, useRef } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Ref for Explore section
  const exploreRef = useRef(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ✅ Scroll function
  const scrollToExplore = () => {
    exploreRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const res = await API.get("/blogs");

      const blogsWithComments = await Promise.all(
        res.data.map(async (blog) => {
          try {
            const commentsRes = await API.get(`/comments/${blog._id}`);
            return {
              ...blog,
              comments: commentsRes.data,
            };
          } catch (err) {
            console.error("Error fetching comments:", err);
            return { ...blog, comments: [] };
          }
        })
      );
      setBlogs(blogsWithComments);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0f172a] min-h-screen text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4">
        {/* ✅ Pass scroll function to Hero */}
        <Hero scrollToExplore={scrollToExplore} />

        {/* ✅ Attach ref here */}
        <h1 ref={exploreRef} className="text-3xl font-bold pt-20 mb-6">
          Explore Blogs
        </h1>

        {loading ? (
          <p className="text-center text-gray-400">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-400">No blogs found</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
