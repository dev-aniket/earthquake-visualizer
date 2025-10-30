import { useEffect, useState } from "react";
import MapView from "./components/MapView";
import Sidebar from "./components/SideBar";
import SearchBar from "./components/SearchBar";
import Controls from "./components/Controls";
import { USGS_API } from "./config";

const App = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState(null);
  const [noResults, setNoResults] = useState(false);

  // Fetch USGS data
  const fetchEarthquakes = async () => {
    try {
      const res = await fetch(USGS_API);
      const data = await res.json();
      setEarthquakes(data.features);
      setFiltered(data.features);
    } catch (err) {
      console.error("Error fetching earthquakes:", err);
    }
  };

  useEffect(() => {
    fetchEarthquakes();
  }, []);

  // Search handler
  const handleSearch = (query) => {
    if (!query.trim()) {
      setFiltered(earthquakes);
      setNoResults(false);
      return;
    }

    const filteredData = earthquakes.filter((eq) =>
      eq.properties.place?.toLowerCase().includes(query.toLowerCase())
    );

    setFiltered(filteredData);
    setNoResults(filteredData.length === 0);
  };

  // Filter handler
  const handleFilter = ({ minMag }) => {
    const filteredData = earthquakes.filter(
      (eq) => eq.properties.mag >= minMag
    );
    setFiltered(filteredData);
    setNoResults(filteredData.length === 0);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-100">
      {/* NAV */}
      <nav className="w-full bg-white shadow-md py-4 mb-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Earthquake Visualizer
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            AI summaries of the earthquakes
          </p>
        </div>
      </nav>

      {/* SEARCHBAR + CONTROLS */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 w-full max-w-4xl mb-4 px-4">
        <div className="flex-1 flex flex-col items-center">
          <SearchBar onSearch={handleSearch} />
          {noResults && (
            <p className="text-sm text-red-500 mt-2 text-center">
              No recent earthquakes found for this location.
            </p>
          )}
        </div>
        <Controls onFilter={handleFilter} />
      </div>

      {/* SIDEBAR + MAP */}
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl px-4 pb-6">
        <div className="flex-1 bg-white shadow-lg rounded-2xl overflow-hidden">
          <MapView data={filtered} onSelect={setSelected} />
        </div>
        <div className="w-full md:w-[350px] bg-white shadow-lg rounded-2xl">
          <Sidebar selected={selected} />
        </div>
      </div>
    </div>
  );
};

export default App;
