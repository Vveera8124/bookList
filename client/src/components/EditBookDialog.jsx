const EditBookDialog = ({
  isModalOpen,
  editingBook,
  handleInputChange,
  closeEditModal,
  handleSave,
}) => {
  return (
    <>
      {isModalOpen && editingBook && (
        <div className="fixed inset-0 bg-black/80 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <h2 className="text-lg font-semibold mb-4">Edit Book</h2>
            <div className="space-y-4">
              {" "}
              {/* Increased spacing for better visual separation */}
              {/* 1. Title Input */}
              <div className="flex flex-col">
                <label
                  htmlFor="title"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title" // Added for htmlFor connection
                  name="title"
                  type="text" // Explicit type for clarity
                  value={editingBook.title}
                  onChange={handleInputChange}
                  placeholder="e.g., The Hitchhiker's Guide to the Galaxy"
                  required // Best practice for required fields
                  aria-label="Book Title" // Added for better screen reader context
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-150"
                />
              </div>
              {/* 2. Author Input */}
              <div className="flex flex-col">
                <label
                  htmlFor="author"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Author <span className="text-red-500">*</span>
                </label>
                <input
                  id="author"
                  name="author"
                  type="text"
                  value={editingBook.author}
                  onChange={handleInputChange}
                  placeholder="e.g., Douglas Adams"
                  required
                  aria-label="Author Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-150"
                />
              </div>
              {/* 3. Genre Input */}
              <div className="flex flex-col">
                <label
                  htmlFor="genre"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Genre <span className="text-red-500">*</span>
                </label>
                <input
                  id="genre"
                  name="genre"
                  type="text"
                  value={editingBook.genre}
                  onChange={handleInputChange}
                  placeholder="e.g., Science Fiction"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-150"
                />
              </div>
              {/* 4. Published Year Input (Use type="number" or type="text" with validation) */}
              <div className="flex flex-col">
                <label
                  htmlFor="publishedYear"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Published Year <span className="text-red-500">*</span>
                </label>
                <input
                  id="publishedYear"
                  name="publishedYear"
                  type="number"
                  value={editingBook.publishedYear}
                  onChange={handleInputChange}
                  placeholder="e.g., 1979"
                  required
                  min="1000"
                  max={new Date().getFullYear()}
                  maxLength={4}
                  minLength={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-150"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="isbn"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  ISBN <span className="text-red-500">*</span>
                </label>
                <input
                  id="isbn"
                  name="isbn"
                  type="text"
                  value={editingBook.isbn}
                  onChange={handleInputChange}
                  placeholder="e.g., isbn number"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-150"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={closeEditModal}
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
              >
                Save
              </button>
            </div>
            <button
              onClick={closeEditModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditBookDialog;
