import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, deleteBook, updateBook } from "../slice/bookSlice";
import EditBookDialog from "./EditBookDialog";
import SortArrow from "./SortArrow";

const BooksTable = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.books);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleDelete = async (id) => {
    const result = await dispatch(deleteBook(id));
    if (deleteBook.fulfilled.match(result)) {
      dispatch(fetchBooks());
    }
  };

  const openEditModal = (book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setEditingBook(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingBook((prev) => ({ ...prev, [name]: value?.trim()?.toString() }));
  };

  const handleSave = async () => {
    const result = await dispatch(updateBook(editingBook));
    if (updateBook.fulfilled.match(result)) {
      dispatch(fetchBooks());
      closeEditModal();
    }
  };

  return (
    <div className="mt-6 max-w-screen-2xl mx-auto border border-gray-200 rounded-lg shadow-sm shadow-[#F3E3D3] bg-[#F3E3D3]">
      <div className="max-h-[70vh] lg:max-h-[80vh] overflow-y-auto">
        <table className="w-full text-sm text-gray-900 table-auto">
          <thead className="bg-gray-300 text-gray-600 uppercase text-xs tracking-wide sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left w-[30%]">
                <SortArrow field={"title"} />
              </th>
              <th className="px-4 py-3 text-left w-[25%]">
                <SortArrow field={"author"} />
              </th>
              <th className="px-4 py-3 text-left w-[20%]">
                <SortArrow field={"genre"} />
              </th>
              <th className="px-4 py-3 text-left w-[15%]">
                <SortArrow field={"publishedYear"} />
              </th>
              <th className="px-4 py-3 text-left w-[10%]">
                <SortArrow field={"isbn"} />
              </th>
              <th className="px-4 py-3 text-left w-[5%]">Edit </th>
              <th className="px-4 py-3 text-left w-[5%]">Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  Loading records...
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-red-500">
                  {error}
                </td>
              </tr>
            )}
            {!loading && !error && items.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No data available...
                </td>
              </tr>
            )}
            {!loading &&
              !error &&
              items.length > 0 &&
              items.map((book) => (
                <tr
                  key={book._id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-4 py-2">{book.title}</td>
                  <td className="px-4 py-2">{book.author}</td>
                  <td className="px-4 py-2">{book.genre}</td>
                  <td className="px-4 py-2">{book.publishedYear}</td>
                  <td className="px-4 py-2">{book.isbn}</td>
                  <td className="px-2 py-2">
                    <button
                      onClick={() => openEditModal(book)}
                      className="text-blue-500 hover:underline"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                      </svg>
                    </button>
                  </td>
                  <td className="px-2 py-2">
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="text-red-500 hover:underline"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                        <path d="M10 11v6"></path>
                        <path d="M14 11v6"></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <EditBookDialog
        isModalOpen={isModalOpen}
        editingBook={editingBook}
        closeEditModal={closeEditModal}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
      />
    </div>
  );
};

export default BooksTable;
