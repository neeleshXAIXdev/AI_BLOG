const { generateBlog } = require("../services/ai.services");

exports.generateAIContent = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({ message: "Topic is required" });
    }

    const content = await generateBlog(topic);

    res.status(200).json({ content });
  } catch (error) {
    console.log("🔥 FULL ERROR:", error); // 👈 IMPORTANT
    res.status(500).json({
      message: error.message,
    });
  }
};
