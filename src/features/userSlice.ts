import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../Interfaces/interface';
import { DUMMY_USERS } from '../dummyData/data';

interface UserState {
  users: User[];
  selectedUser: User | null;
}

const initialState: UserState = {
  users: DUMMY_USERS,
  selectedUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<string>) => {
      state.selectedUser = state.users.find((user) => user.id === action.payload) || null;
    },
    updateUserDetails: (state, action: PayloadAction<User>) => {
      const updatedUser = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === updatedUser.id);

      if (userIndex !== -1) {
        state.users[userIndex] = updatedUser;
        if (state.selectedUser?.id === updatedUser.id) {
          state.selectedUser = updatedUser;
        }
      }
    },
  },
});

// Export actions and reducer
export const { setUserDetails, updateUserDetails } = userSlice.actions;
export default userSlice.reducer;
