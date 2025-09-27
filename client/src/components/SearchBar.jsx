import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilters, fetchBooks } from "../slice/bookSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [selectedField, setSelectedField] = useState("title");
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() === "") return;
    dispatch(setFilters({ [selectedField]: query.trim() }));
    dispatch(fetchBooks());
  };

  const handleReset = () => {
    if (query.trim() === "") return;
    setQuery("");
    dispatch(setFilters({}));
    dispatch(fetchBooks());
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-4">
      <div className="flex flex-col sm:flex-row gap-2 flex-1">
        <select
          value={selectedField}
          onChange={(e) => setSelectedField(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="genre">Genre</option>
          <option value="publishedYear">Published Year</option>
          <option value="isbn">ISBN</option>
        </select>
        <input
          type="text"
          placeholder={`Search by ${selectedField}`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex-1 sm:flex-none"
        >
          Search
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition flex-1 sm:flex-none"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
