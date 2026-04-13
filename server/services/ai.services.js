const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.generateBlog = async (topic) => {
  try {
    const prompt = `
Write a professional blog on: ${topic}

Requirements:
- Engaging intro
- Clear headings
- Bullet points where needed
- SEO-friendly
- Conclusion at end
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.log("🔥 Groq Error:", error);
    throw new Error("AI generation failed");
  }
};
