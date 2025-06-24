import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import employeeReducer from "@/features/employee/employeeSlice";
import leaveReducer from "@/features/leave/leaveSlice";
import profileReducer from "@/features/profile/profileSlice";
import reportReducer from "@/features/report/reportSlice";
import adminReducer from "@/features/admin/adminslice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    employee: employeeReducer,
    leave: leaveReducer,
    profile: profileReducer,
    report: reportReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
