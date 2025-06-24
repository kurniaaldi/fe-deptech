import api from "@/libs/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Pagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
}
export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
}

interface EmployeeState {
  data: Employee[];
  loading: boolean;
  error: string | null;
  pagination: Pagination;
}

const initialState: EmployeeState = {
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

// GET
export const fetchEmployees = createAsyncThunk(
  "employee/fetch",
  async ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => {
    const res = await api.get(`/employee?page=${page}&limit=${limit}`);
    return res.data;
  },
);

// POST
export const addEmployee = createAsyncThunk(
  "employee/add",
  async (employee: Omit<Employee, "id">) => {
    const res = await api.post("/employee", employee);
    return res.data;
  },
);

// PUT
export const updateEmployee = createAsyncThunk(
  "employee/update",
  async ({ id, ...payload }: Employee) => {
    const res = await api.put(`/employee/${id}`, payload);
    return res.data;
  },
);

// DELETE
export const deleteEmployee = createAsyncThunk(
  "employee/delete",
  async (id: number) => {
    await api.delete(`/employee/${id}`);
    return id;
  },
);

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
        state.loading = false;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const idx = state.data.findIndex((e) => e.id === action.payload.id);
        if (idx !== -1) state.data[idx] = action.payload;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.data = state.data.filter((e) => e.id !== action.payload);
      });
  },
});

export default employeeSlice.reducer;
