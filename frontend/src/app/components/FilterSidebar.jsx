"use client";
import { useState } from "react";

export default function FilterSidebar({ onFilter, horizontal }) {
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleApply = () => {
    onFilter({ category, minPrice, maxPrice });
  };

  const handleReset = () => {
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    onFilter({});
  };

  return (
    <div
      className={`${
        horizontal
          ? "flex gap-2 overflow-x-auto p-2 bg-gray-100 rounded-md"
          : "flex flex-col gap-4 p-4 bg-white shadow rounded-lg h-fit"
      }`}
    >
      {/* Category */}
      <div className={`${horizontal ? "flex gap-2 items-center" : "flex flex-col gap-1"}`}>
        {!horizontal && <span className="text-sm font-medium">Category</span>}
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`border p-2 rounded ${horizontal ? "min-w-[120px] flex-shrink" : ""}`}
        />
      </div>

      {/* Min Price */}
      <div className={`${horizontal ? "flex gap-2 items-center" : "flex flex-col gap-1"}`}>
        {!horizontal && <span className="text-sm font-medium">Min Price</span>}
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className={`border p-2 rounded ${horizontal ? "min-w-[80px] flex-shrink" : ""}`}
        />
      </div>

      {/* Max Price */}
      <div className={`${horizontal ? "flex gap-2 items-center" : "flex flex-col gap-1"}`}>
        {!horizontal && <span className="text-sm font-medium">Max Price</span>}
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className={`border p-2 rounded ${horizontal ? "min-w-[80px] flex-shrink" : ""}`}
        />
      </div>

      {/* Buttons */}
      <div className={`flex gap-2 ${horizontal ? "" : "mt-2"}`}>
        <button
          onClick={handleApply}
          className="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Apply
        </button>
        <button
          onClick={handleReset}
          className="flex-1 bg-gray-200 py-2 rounded hover:bg-gray-300"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
