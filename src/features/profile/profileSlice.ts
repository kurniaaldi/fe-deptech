import api from "@/libs/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface AdminProfile {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  gender: string;
}

interface ProfileState {
  data: AdminProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk("profile/fetch", async () => {
  const res = await api.get("/auth/me");
  return res.data;
});

export const updateProfile = createAsyncThunk(
  "profile/update",
  async (profile: AdminProfile) => {
    const res = await api.put("/auth/me", profile);
    return res.data;
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export default profileSlice.reducer;
