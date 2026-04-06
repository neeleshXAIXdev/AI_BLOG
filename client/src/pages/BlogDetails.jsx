import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginPopup from "../components/LoginPopup";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    fetchBlog();
    fetchComments();
  }, [id]);

  // Fetch single blog
  const fetchBlog = async () => {
    try {
      const res = await API.get(`/blogs/${id}`);
      setBlog(res.data);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  // Fetch comments separately
  const fetchComments = async () => {
    try {
      const res = await API.get(`/comments/${id}`);
      setComments(res.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Like a blog
  const handleLike = async () => {
    if (!user) return setShowLoginPopup(true);

    try {
      await API.put(`/blogs/${id}/like`);
      fetchBlog(); // Refresh likes
    } catch (error) {
      console.error("Like failed:", error);
    }
  };

  // Bookmark toggle
  const handleBookmark = async () => {
    if (!user) {
      setShowLoginPopup(true);
      return;
    }

    try {
      const res = await API.put(`/blogs/${id}/bookmark`);

      // Ensure bookmarks is always an array
      setUser((prev) => ({
        ...prev,
        bookmarks: Array.isArray(prev.bookmarks) ? prev.bookmarks : [],
      }));

      // Now safely update
      setUser((prev) => ({
        ...prev,
        bookmarks: res.data.isBookmarked
          ? [...prev.bookmarks, blog._id]
          : prev.bookmarks.filter((b) => b !== blog._id),
      }));
    } catch (error) {
      console.error("Bookmark failed:", error);
    }
  };

  // Post comment
  const handleComment = async () => {
    if (!user) return setShowLoginPopup(true);
    if (!comment.trim()) return;

    try {
      await API.post(`/comments/${id}`, { text: comment });
      setComment("");
      fetchComments();
      fetchBlog(); // Optional: if likes/bookmarks affect comment UI
    } catch (error) {
      console.error("Comment failed:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirmDelete = window.confirm("Delete this comment?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/comments/${commentId}`);

      // ✅ Update UI instantly
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (error) {
      console.error("Comment delete failed:", error);
    }
  };

  // Delete blog
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete this blog?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/blogs/${id}`);
      alert("Blog deleted");
      navigate("/");
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (!blog) return <p className="text-white mt-20 text-center">Loading...</p>;

  // Check if current user is the author
  const isAuthor = user && blog.author?._id === user._id;

  // Bookmark state
  const isBookmarked = user?.bookmarks?.includes(blog._id);

  return (
    <div className="bg-[#0f172a] min-h-screen text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto pt-24 px-4">
        {blog.image && (
          <img src={blog.image} alt="" className="rounded-2xl mb-4" />
        )}

        <h1 className="text-3xl font-bold">{blog.title}</h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {blog.tags?.length > 0 ? (
            blog.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-white/10 border border-white/10 px-3 py-1 rounded-full text-sm text-gray-300"
              >
                #{tag}
              </span>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No tags</p>
          )}
        </div>

        {/* Content */}
        <p className="mt-6 text-gray-300 whitespace-pre-line">{blog.content}</p>

        {/* Actions */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleLike}
            className="bg-red-500 px-4 py-1 rounded-full"
          >
            ❤️ {blog.likes?.length || 0}
          </button>

          <button
            onClick={handleBookmark}
            className={`px-4 py-1 rounded-full ${
              isBookmarked ? "bg-green-500" : "bg-yellow-500"
            }`}
          >
            {isBookmarked ? "✅ Saved" : "🔖 Save"}
          </button>

          {isAuthor && (
            <button
              onClick={handleDelete}
              className="bg-red-600 px-4 py-1 rounded-full"
            >
              🗑 Delete
            </button>
          )}
        </div>

        {/* Comments */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">Comments</h2>

          {comments.map((comment) => (
            <div key={comment._id} className="p-3 border-b border-gray-700">
              <span className="text-sm text-gray-400">
                {" "}
                - {comment.user.name}
              </span>

              <div className="flex justify-between">
                {/* ✅ Show delete only if current user is author */}
                <p>{comment.text}</p>
                {user?._id === comment.user._id && (
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="text-red-500 text-sm ml-3 cursor-pointer"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Add Comment */}
          <div className="flex gap-2 mt-4">
            <input
              className="flex-1 p-2 rounded bg-white/10 border border-white/10 text-white"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              disabled={!comment.trim()}
              onClick={handleComment}
              className={`px-4 py-1.5 rounded transition 
    ${
      !comment.trim()
        ? "bg-gray-500 cursor-not-allowed opacity-50"
        : "bg-blue-500 hover:bg-blue-600"
    }`}
            >
              Post
            </button>
          </div>
        </div>
      </div>

      {/* Login Popup */}
      <LoginPopup
        isOpen={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
      />

      <Footer />
    </div>
  );
};

export default BlogDetails;
