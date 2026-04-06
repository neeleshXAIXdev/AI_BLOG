import { useEffect, useState } from "react";
import API from "../api/axios";
import MainLayout from "../layout/MainLayout";
import BlogCard from "../components/BlogCard";

const Profile = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchMyData();
  }, []);

  const fetchMyData = async () => {
    try {
      const res = await API.get("/blogs/my");
      setBlogs(res.data.blogs);
      setUser(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* USER INFO */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
          <h1 className="text-2xl font-bold mb-2">👤 Profile</h1>

          <p className="text-gray-300">Name: {user?.name}</p>
          <p className="text-gray-300">Email: {user?.email}</p>
        </div>

        {/* BLOGS */}
        <div>
          <h2 className="text-2xl font-bold mb-6">📝 My Blogs</h2>

          {blogs.length === 0 ? (
            <p className="text-gray-400">You haven’t created any blogs yet</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
