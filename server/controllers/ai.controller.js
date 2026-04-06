const { generateBlog } = require("../services/ai.services");

exports.generateAIContent = async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({ message: "Topic is required" });
    }

    const content = await generateBlog(topic);

    res.status(200).json({ content });
  } catch (error) {
    console.error("🔥 FULL AI ERROR:", error);
    console.error("🔥 MESSAGE:", error.message);

    res.status(500).json({
      message: error.message, // 👈 show actual error
    });
  }
};
