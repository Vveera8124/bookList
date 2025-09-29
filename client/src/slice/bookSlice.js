import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookApi from "../api/bookApi";

// Async thunk to fetch books
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (_, { getState, rejectWithValue }) => {
    const { pagination, filters, sort } = getState().books;
    try {
      const response = await bookApi.fetchBooks({ pagination, filters, sort });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (id, { rejectWithValue }) => {
    try {
      const response = await bookApi.deleteBook({ id });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateBook = createAsyncThunk(
  "books/updateBook",
  async (data, { rejectWithValue }) => {
    try {
      const response = await bookApi.updateBook({ data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const uploadCsv = createAsyncThunk(
  "books/uploadCsv",
  async (file, { rejectWithValue }) => {
    try {
      const response = await bookApi.uploadCsvFile(file);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState: {
    items: [],
    loading: false,
    error: null,
    pagination: {
      page: 0,
      limit: 0,
      count: 0,
      pages: 0,
    },
    filters: {},
    sort: { field: "title", order: "asc" },
    toast: null,
    uploadStatus: false,
    uploadProgress: 0,
  },
  reducers: {
    setPagination(state, action) {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    setFilters(state, action) {
      state.filters = { ...action.payload };
    },
    setSort(state, action) {
      state.sort = { ...action.payload };
    },
    clearToast(state) {
      state.toast = null;
    },
    setUploadProgress: (state, { payload: { status, progress } }) => {
      if (state.uploadProgress !== status) state.uploadStatus = status;
      state.uploadProgress = progress;
    },
    setToast(state) {
      state.toast = {
        type: "success",
        message: "Upload completed",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.result;
        state.total = action.payload.total;
        state.pagination = action.payload.paginationDetail;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch books";
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.toast = { type: "success", message: action.payload.message };
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.toast = { type: "error", message: action.payload };
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.toast = { type: "success", message: action.payload.message };
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.toast = { type: "error", message: action.payload };
      });
    // .addCase(uploadCsv.pending, (state) => {
    //   state.uploadStatus = true;
    // })
    // .addCase(uploadCsv.fulfilled, (state, action) => {
    //   state.toast = {
    //     type: "success",
    //     message: action.payload.message || "Upload completed",
    //   };
    //   state.uploadStatus = false;
    // })
    // .addCase(uploadCsv.rejected, (state) => {
    //   state.toast = { type: "error", message: "Upload failed" };
    // });
  },
});

export const {
  setPagination,
  setFilters,
  setSort,
  clearToast,
  setUploadProgress,
  setToast,
} = booksSlice.actions;
export default booksSlice.reducer;
