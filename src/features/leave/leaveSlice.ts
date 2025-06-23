import api from "@/libs/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Leave {
  id: number;
  reason: string;
  startDate: string;
  endDate: string;
  employeeId: number;
  Employee?: {
    firstName: string;
    lastName: string;
  };
}

const initialState = {
  data: [] as Leave[],
  loading: false,
  error: null as string | null,
};

export const fetchLeaves = createAsyncThunk("leave/fetch", async () => {
  const res = await api.get("/leave");
  return res.data;
});

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

const leaveSlice = createSlice({
  name: "leave",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaves.fulfilled, (state, action) => {
        state.data = action.payload;
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
