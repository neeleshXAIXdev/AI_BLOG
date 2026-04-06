const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth.middleware");
const {
  addComment,
  getComments,
  deleteComment,
} = require("../controllers/comment.controller");

// ADD COMMENT
router.post("/:blogId", protect, addComment);

// GET COMMENTS OF A BLOG
router.get("/:blogId", getComments);

// DELETE COMMENT
router.delete("/:id", protect, deleteComment);

module.exports = router;
