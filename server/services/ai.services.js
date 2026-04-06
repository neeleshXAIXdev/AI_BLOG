const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

exports.generateBlog = async (topic) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
Write a professional blog on: ${topic}

Requirements:
- Engaging intro
- Clear headings
- Bullet points where needed
- SEO-friendly
- Conclusion at end
`;

  const result = await model.generateContent(prompt);

  const response = await result.response;
  const text = response.text();

  return text;
};
