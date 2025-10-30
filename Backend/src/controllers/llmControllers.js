
const { GoogleGenerativeAI } = require("@google/generative-ai");

const getLLMSummary = async (req, res) => {
  const { place, magnitude, depth, timeIso } = req.body;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
           You are an AI seismology reporter. Write a concise, factual summary (max 6 short sentences)
            about an earthquake using the given data.

            Data:
            - Location: ${place}
            - Magnitude: ${magnitude}
            - Depth: ${depth} km
            - Time (UTC): ${timeIso}

            Guidelines:
            - Focus only on factual impact and characteristics.
            - Avoid speculation, emojis, or markdown.
            - Tone: professional, neutral, report-style.
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
