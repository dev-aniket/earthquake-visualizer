import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

// call backend /api/summary 
export const useLLM = () => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // accept an object 
  const getSummary = async ({ place, magnitude, depth, timeIso }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${BACKEND_URL}/api/summary`, {
        place,
        magnitude,
        depth,
        timeIso,
      });
      setSummary(res.data.summary || "No summary available.");
      return res.data.summary;
    } catch (err) {
      console.error("fetchLLMSummary error:", err?.response?.data || err.message);
      setError("Unable to fetch AI summary.");
      setSummary("Error: Unable to fetch AI summary.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { summary, loading, error, getSummary };
};
