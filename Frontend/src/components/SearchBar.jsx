import { useState } from "react";

const SearchBar = ({ onSearch, noResults }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="w-full md:w-1/2 flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full flex items-center bg-white shadow-md rounded-xl px-4 py-2"
      >
        <input
          type="text"
          placeholder="Search by location..."
          value={query}
          onChange={handleChange}
          className="flex-1 outline-none bg-transparent text-gray-700 text-sm md:text-base"
        />
        <button type="submit" className="ml-2 text-white bg-blue-600 hover:bg-blue-700 px-2 py-3 rounded-lg text-sm">Search</button>
      </form>
      {noResults && (
        <p className="text-sm text-red-500 mt-2">
          No recent earthquakes found for “{query}”.
        </p>
      )}
    </div>
  );
};

export default SearchBar;
