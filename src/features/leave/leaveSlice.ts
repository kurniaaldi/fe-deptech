import api from "@/libs/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Pagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
}
export interface Leave {
  id: number;
  reason: string;
  startDate: string;
  endDate: string;
  employeeId: number | string;
  Employee?: {
    firstName: string;
    lastName: string;
  };
}

const initialState = {
  data: [] as Leave[],
  loading: false,
  error: null as string | null,
  pagination: {} as Pagination,
};

export const fetchLeaves = createAsyncThunk(
  "leave/fetch",
  async ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => {
    const res = await api.get(`/leave?page=${page}&limit=${limit}`);
    return res.data;
  },
);

export const addLeave = createAsyncThunk(
  "leave/add",
  async (leave: Omit<Leave, "id">, { rejectWithValue }) => {
    try {
      const res = await api.post("/leave", leave);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal tambah cuti",
      );
    }
  },
);

export const deleteLeave = createAsyncThunk(
  "leave/delete",
  async (id: number) => {
    await api.delete(`/leave/${id}`);
    return id;
  },
);

export const updateLeave = createAsyncThunk(
  "leave/update",
  async ({ id, ...payload }: Leave) => {
    const res = await api.put(`/leave/${id}`, payload);
    return res.data;
  },
);

const leaveSlice = createSlice({
  name: "leave",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaves.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(addLeave.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(deleteLeave.fulfilled, (state, action) => {
        state.data = state.data.filter((l) => l.id !== action.payload);
      });
  },
});

export default leaveSlice.reducer;
