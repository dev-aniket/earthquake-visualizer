// FRONTEND/src/hooks/useEarthquakes.js
import { useState, useEffect } from "react";
import axios from "axios";
import { USGS_API } from "../config";

export const useEarthquakes = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(USGS_API, { timeout: 10000 });
        if (res.data && res.data.features) setData(res.data.features);
        else throw new Error("Invalid USGS response");
      } catch (err) {
        console.error("Earthquake fetch error:", err.message || err);
        setError("Failed to fetch earthquake data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};
