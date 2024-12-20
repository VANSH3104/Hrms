import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Notification } from "../Interfaces/interface";
import { DUMMY_USERS } from "../dummyData/data";

interface NotificationState {
  notifications: Notification[];
  selectedNotification: Notification | null;
}

const initialState: NotificationState = {
  notifications: DUMMY_USERS.flatMap((user) => user.notification || []),
  selectedNotification: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotificationDetails: (state, action: PayloadAction<string>) => {
      state.selectedNotification =
        state.notifications.find((notification) => notification.id === action.payload) || null;
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload);
    },
    deleteNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter((notification) => notification.id !== action.payload);
      if (state.selectedNotification?.id === action.payload) {
        state.selectedNotification = null;
      }
    },
  },
});

export const { setNotificationDetails, addNotification, deleteNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
