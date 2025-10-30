// FRONTEND/src/components/Sidebar.jsx
import { useEffect } from "react";
import { useLLM } from "../hooks/useLLM";

const Sidebar = ({ selected }) => {
  const { summary, loading, error, getSummary } = useLLM();

  useEffect(() => {
    if (!selected) return;
    const { properties } = selected;
    const payload = {
      place: selected.properties.place || selected.place || "Unknown",
      magnitude: properties?.mag ?? properties?.magnitude ?? null,
      depth: properties?.depth ?? (selected.geometry?.coordinates?.[2] ?? null),
      timeIso: properties?.time ? new Date(properties.time).toISOString() : new Date().toISOString(),
    };
    // call backend for summary
    getSummary(payload);
  }, [selected]);

  if (!selected)
    return (
      <div className="p-4 text-gray-500 text-center">
        Click a marker to view earthquake details and AI summary.
      </div>
    );

  const { properties } = selected;
  const place = properties?.place || selected.place;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-lg font-semibold mb-2">{place}</h2>
      <div className="text-sm text-gray-700 space-y-1">
        <div><strong>Magnitude:</strong> {properties?.mag}</div>
        <div><strong>Depth:</strong> {properties?.depth ?? selected.geometry?.coordinates?.[2]} km</div>
        <div><strong>Time:</strong> {new Date(properties?.time).toLocaleString()}</div>
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-medium">AI Summary</h3>
        <div className="mt-2 p-3 bg-gray-50 rounded">
          {loading ? <div className="text-gray-400 animate-pulse">Generating summary…</div> : <div className="text-sm text-gray-700">{summary}</div>}
          {error && <div className="text-xs text-red-600 mt-2">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
