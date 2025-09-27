import instance from "../lib/instance";
const API_BASE = import.meta.env.VITE_API_URL;
const bookApi = {
  fetchBooks: async ({ pagination, filters, sort }) => {
    const body = {
      pagination: { limit: pagination.limit, page: pagination.page },
      filters,
      sort: { fieldName: sort.field, order: sort.order },
    };
    return instance.post(`${API_BASE}/books/list`, body);
  },

  deleteBook: async ({ id }) => {
    return instance.delete(`${API_BASE}/book/${id}`);
  },

  updateBook: async ({ data }) => {
    return instance.put(`${API_BASE}/book/${data._id}`, data);
  },

  uploadCsvFile: ({ file }) => {
    const formData = new FormData();
    formData.append("file", file);
    return instance.post(`${API_BASE}/upload`, formData);
  },

  downloadCsvFile: ({ filters }) => {
    return instance.post(
      `${API_BASE}/books/download`,
      { filters },
      { responseType: "arraybuffer" }
    );
  },
};

export default bookApi;
