// src/controllers/llmControllers.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

const getLLMSummary = async (req, res) => {
  const { place, magnitude, depth, timeIso } = req.body;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      Generate a brief, factual summary for an earthquake event:
      Location: ${place}
      Magnitude: ${magnitude}
      Depth: ${depth} km
      Time: ${timeIso}

      Write 5-6 short sentences suitable for a public earthquake report.
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.candidates?.[0]?.content?.parts?.[0]?.text || "No summary available.";

    res.json({ summary: text });
  } catch (err) {
    console.error("getLLMSummary error:", err.message);
    res.status(500).json({ error: "Failed to fetch Gemini summary." });
  }
};

module.exports = { getLLMSummary };
