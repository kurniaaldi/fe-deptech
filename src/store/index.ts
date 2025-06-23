import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import employeeReducer from "@/features/employee/employeeSlice";
import leaveReducer from "@/features/leave/leaveSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
    leave: leaveReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
