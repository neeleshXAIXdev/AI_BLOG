const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth.routes");
const blogRouter = require("./routes/blog.routes");
const commentRouter = require("./routes/comment.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRouter);
app.use("/api/comments", commentRouter);

app.use("/api/ai", require("./routes/ai.routes"));

app.get("/", (req, res) => {
  res.send("Server is running");
});

module.exports = app;
