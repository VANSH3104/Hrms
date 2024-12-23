import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import authReducer from "../features/authSlice";
import userReducer from "../features/userSlice";
import taskReducer from "../features/taskSlice";
import leaveReducer from "../features/leaveSlice";
import notificationReducer from "../features/notificationSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  task: taskReducer,
  leave: leaveReducer,
  notification: notificationReducer,
});
const persistConfig = {
  key: "root",
  storage, 
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
