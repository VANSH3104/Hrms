import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../Interfaces/interface";
import { DUMMY_USERS } from "../dummyData/data";

interface NotificationState {
  users: User[];
}

const initialState: NotificationState = {
  users: DUMMY_USERS,
};
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    updateUserDetails: (state, action: PayloadAction<User>) => {
        const newNotification = action.payload;
        console.log(newNotification , "getting notification")
        const userIndex = state.users.find((user) => user.role === "HR" ||  user.role === "Manager");
        console.log(userIndex , "index")

        
      },
  },
});

export const { updateUserDetails } = notificationSlice.actions;
export default notificationSlice.reducer;
