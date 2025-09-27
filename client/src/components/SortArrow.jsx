import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSort, fetchBooks } from "../slice/bookSlice";

const SortArrow = ({ field }) => {
  const dispatch = useDispatch();
  const { sort } = useSelector((state) => state.books);

  const handleClick = () => {
    let newOrder = "asc";
    if (sort.field === field) {
      newOrder = sort.order === "asc" ? "desc" : "asc";
    }
    dispatch(setSort({ field, order: newOrder }));
    dispatch(fetchBooks());
  };

  const isActive = sort.field === field;

  return (
    <span
      onClick={handleClick}
      className="inline-flex items-center cursor-pointer select-none"
    >
      {field}
      <span className="ml-1 text-xs">
        {isActive ? (sort.order === "asc" ? "▲" : "▼") : "↕"}
      </span>
    </span>
  );
};

export default SortArrow;
