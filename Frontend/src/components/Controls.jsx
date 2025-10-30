import { useState } from "react";

const Controls = ({ onFilter }) => {
  const [minMag, setMinMag] = useState(0);

  const apply = () => onFilter && onFilter({ minMag });

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-sm">
        <label>Min Mag</label>
        <input
          type="range"
          min="0"
          max="8"
          step="0.1"
          value={minMag}
          onChange={(e) => setMinMag(Number(e.target.value))}
        />
        <span className="w-8 text-right">{minMag}</span>
      </div>
      <button
        onClick={apply}
        className="px-3 py-1 bg-green-500 text-white rounded-md cursor-pointer hover:bg-green-600 transition"
      >
        Apply
      </button>
    </div>
  );
};

export default Controls;
