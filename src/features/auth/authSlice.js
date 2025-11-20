import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API URLs
const API_BASE = "https://apis.allsoft.co/api/documentManagement";

// Thunks
export const generateOTP = createAsyncThunk(
  "auth/generateOTP",
  async (mobile_number) => {
    const response = await axios.post(`${API_BASE}/generateOTP`, {
      mobile_number,
    });
    return response.data;
  }
);

export const validateOTP = createAsyncThunk(
  "auth/validateOTP",
  async ({ mobile_number, otp }) => {
    const response = await axios.post(`${API_BASE}/validateOTP`, {
      mobile_number,
      otp,
    });
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateOTP.pending, (state) => {
        state.loading = true;
      })
      .addCase(validateOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(validateOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
