// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/authSlice";
import userReducer from '../features/userSlice';
import taskReducer from '../features/taskSlice';
import leaveReducer from "../features/leaveSlice";
import notificationReducer from '../features/notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    task: taskReducer,
    leave: leaveReducer,
    notification: notificationReducer,
  },
});

// Infer RootState, AppDispatch for type safety
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
