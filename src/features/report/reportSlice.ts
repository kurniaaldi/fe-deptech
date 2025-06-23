import api from "@/libs/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
}

const initialState: ReportState = {
  data: [],
  loading: false,
};

export const fetchReport = createAsyncThunk("report/fetch", async () => {
  const res = await api.get("/report/employees-leave");
  return res.data;
});

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
        state.data = action.payload;
        state.loading = false;
      });
  },
});

export default reportSlice.reducer;
