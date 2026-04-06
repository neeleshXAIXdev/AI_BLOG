import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <Link to={`/blog/${blog._id}`}>
      <div className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer">
        {/* Background Image */}
        {blog.image && (
          <img
            src={blog.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />
        )}

        {/* Dark Blur Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-4">
          <h2 className="font-bold text-lg text-white">{blog.title}</h2>

          <div className="flex justify-between mt-3 text-sm text-gray-300">
            <span>❤️ {blog.likes?.length || 0}</span>
            <span>💬 {blog.comments?.length || 0}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
