import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/libs/api";

interface Pagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
}

export interface Admin {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  birthDate: string;
  password?: string | undefined;
}

interface AdminState {
  data: Admin[];
  loading: boolean;
  error: string | null;
  pagination: Pagination;
}

const initialState: AdminState = {
  data: [],
  loading: false,
  error: null,
  pagination: {
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    perPage: 10,
  },
};

export const fetchAdmins = createAsyncThunk(
  "admin/fetch",
  async ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => {
    const res = await api.get(`/auth?page=${page}&limit=${limit}`);
    return res.data;
  },
);

export const deleteAdmin = createAsyncThunk(
  "admin/delete",
  async (id: number) => {
    await api.delete(`/auth/${id}`);
    return id;
  },
);

export const addAdmin = createAsyncThunk(
  "admin/add",
  async (admin: Omit<Admin, "id">) => {
    const res = await api.post("/auth/register", admin);
    return res.data;
  },
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAdmins.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
        state.loading = false;
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.data = state.data.filter((admin) => admin.id !== action.payload);
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed load admin";
      });
  },
});

export default adminSlice.reducer;
