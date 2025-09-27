import { useDispatch, useSelector } from "react-redux";
import { setPagination, fetchBooks } from "../slice/bookSlice";

const PaginationControls = () => {
  const dispatch = useDispatch();
  const { pagination, items } = useSelector((state) => state.books);

  const handlePageChange = (newPage) => {
    dispatch(setPagination({ page: newPage, limit: pagination.limit }));
    dispatch(fetchBooks());
  };

  const handlePageSizeChange = (newPageSize) => {
    dispatch(setPagination({ page: 1, limit: newPageSize }));
    dispatch(fetchBooks());
  };

  return (
    <div className="flex items-center justify-center font-bold tracking-wider gap-3 mt-4 text-sm text-gray-700 flex-col md:flex-row">
      {/* Results info */}
      <span className=" text-gray-500">
        Page {pagination.page} - {items.length} of {pagination.pages}. Total
        records:
        {pagination.count}
      </span>
      <div className="flex space-x-1">
        {/* Previous */}
        <button
          onClick={() => handlePageChange(pagination.page - 1)}
          disabled={pagination.page === 1}
          className={`px-2 py-1 rounded-md border transition-colors ${
            pagination.page === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
        >
          Prev
        </button>

        {/* Next */}
        <button
          onClick={() => handlePageChange(pagination.page + 1)}
          disabled={pagination.page === pagination.pages || items.length === 0}
          className={`px-2 py-1 rounded-md border transition-colors ${
            pagination.page === pagination.pages || items.length == 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
        >
          Next
        </button>

        {/* Page size selector */}
        <div className="flex items-center gap-1">
          <label htmlFor="pageSize" className=" text-gray-500">
            / page
          </label>
          <select
            id="pageSize"
            value={pagination.limit}
            disabled={items.length === 0}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="px-2 py-1 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PaginationControls;
