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
}

export interface ReportEmployee {
  id: number;
  firstName: string;
  lastName: string;
  Leaves: Leave[];
}

interface ReportState {
  data: ReportEmployee[];
  loading: boolean;
  pagination: Pagination;
}

const initialState: ReportState = {
  data: [],
  loading: false,
  pagination: {} as Pagination,
};

export const fetchReport = createAsyncThunk(
  "report/fetch",
  async ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => {
    const res = await api.get(
      `/report/employees-leave?page=${page}&limit=${limit}`,
    );
    return res.data;
  },
);

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReport.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
        state.loading = false;
      });
  },
});

export default reportSlice.reducer;
