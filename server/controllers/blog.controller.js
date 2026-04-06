const Blog = require("../models/Blog");
const User = require("../models/User");
// CREATE BLOG
exports.createBlog = async (req, res) => {
  try {
    let { title, content, tags } = req.body;
    if (!title || !content || !tags) {
      return res.status(401).json({ message: "All fields are require" });
    }
    if (tags) {
      tags = JSON.parse(tags);
    }
    const blog = await Blog.create({
      title,
      content,
      tags,
      author: req.user._id,
      image: req.file?.path || "",
    });

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong",
    });
  }
};

// GET ALL BLOGS
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "name",
        },
      });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE BLOG
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "name email")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "name email",
        },
      });

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Check if user bookmarked this blog
    let isBookmarked = false;
    if (req.user) {
      const user = await User.findById(req.user._id);
      isBookmarked = user.bookmarks.includes(blog._id);
    }

    res.status(200).json({
      ...blog._doc,
      isBookmarked,
    });
  } catch (error) {
    console.error("getBlogById error:", error);
    res.status(500).json({ message: error.message });
  }
};
// GET MY BLOGS + USER INFO
exports.getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user._id }).populate(
      "author",
      "name email"
    );

    res.status(200).json({
      user: {
        name: req.user.name,
        email: req.user.email,
      },
      blogs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// UPDATE BLOG(OWNER ONLY)
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Ownership check
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    blog.tags = req.body.tags || blog.tags;

    const updateBlog = await blog.save();

    res.status(200).json(updateBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELET BLOG(OWNER ONLY)
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Ownership check
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await blog.deleteOne();

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// TOGGLE LIKE
exports.toggleLike = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const userId = req.user._id.toString();

    // Check if already liked
    const isLiked = blog.likes.includes(userId);

    if (isLiked) {
      // UNLIKE
      blog.likes = blog.likes.filter((id) => id.toString() !== userId);
    } else {
      // LIKE
      blog.likes.push(userId);
    }

    await blog.save();
    res.status(200).json({
      message: isLiked ? "Blog unliked" : "Blog liked",
      likesCount: blog.likes.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// TOGGLE BOOKMARK
exports.toggleBookmark = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const blogId = req.params.id;

    const isBookmarked = user.bookmarks.includes(blogId);

    if (isBookmarked) {
      // REMOVE BOOKMARK
      user.bookmarks = user.bookmarks.filter(
        (id) => id.toString() !== blogId.toString()
      );
    } else {
      // ADD BOOKMARK
      user.bookmarks.push(blogId);
    }

    await user.save();

    res.json({
      message: isBookmarked ? "Bookmark removed" : "Blog bookmarked",
      bookmarksCount: user.bookmarks.length,
      isBookmarked: !isBookmarked, // <-- send updated status
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET USER BOOKMARKS
exports.getBookmarkedBlogs = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "bookmarks",
      populate: {
        path: "author",
        select: "name email",
      },
    });

    res.status(200).json(user.bookmarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
