const express = require("express");
const router = express.Router();
const {
  createBlog,
  deleteBlog,
  getMyBlogs,
  getBlogById,
  getBlogs,
  updateBlog,
  toggleLike,
  getBookmarkedBlogs,
  toggleBookmark,
} = require("../controllers/blog.controller");

const protect = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

// Public
router.get("/", getBlogs);
router.get("/bookmark/me", protect, getBookmarkedBlogs);
router.get("/my", protect, getMyBlogs);
router.get("/:id", getBlogById);

// Protected
router.post("/", protect, upload.single("image"), createBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

// Like route
router.put("/:id/like", protect, toggleLike);

// Bookmark routes
router.put("/:id/bookmark", protect, toggleBookmark);

module.exports = router;
