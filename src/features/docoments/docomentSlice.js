import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = "https://apis.allsoft.co/api/documentManagement";

// Async thunks
export const fetchTags = createAsyncThunk(
  "documents/fetchTags",
  async (token) => {
    const response = await axios.post(
      `${API_BASE}/documentTags`,
      { term: "" },
      { headers: { token } }
    );
    return response.data;
  }
);

export const uploadFile = createAsyncThunk(
  "documents/uploadFile",
  async ({ formData, token }) => {
    const response = await axios.post(
      `${API_BASE}/saveDocumentEntry`,
      formData,
      {
        headers: { token, "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  }
);

const documentSlice = createSlice({
  name: "documents",
  initialState: {
    tags: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags = action.payload;
      })
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadFile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default documentSlice.reducer;
