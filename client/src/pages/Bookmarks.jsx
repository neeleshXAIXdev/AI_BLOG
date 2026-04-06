import { useEffect, useState } from "react";
import API from "../api/axios";
import MainLayout from "../layout/MainLayout";
import BlogCard from "../components/BlogCard";

const Bookmarks = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const res = await API.get("/blogs/bookmark/me");
      setBlogs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🔖 Saved Blogs</h1>

        {blogs.length === 0 ? (
          <p className="text-gray-400">No bookmarks yet</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Bookmarks;
