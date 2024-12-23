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
    addUser: (state , action: PayloadAction<string>)=>{
      state.users.push(action.payload)
    },
    updateUserDetails: (state, action: PayloadAction<User>) => {
      const updatedUser = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === updatedUser.id);

      if (userIndex !== -1) {
        console.log("updating user:", updatedUser);
        state.users[userIndex] = updatedUser;
        if (state.selectedUser?.id === updatedUser.id) {
          state.selectedUser = updatedUser;
        }
      } else {
        console.error("User not found in state");
      }
    },
    deleteUser: (state, action: PayloadAction<User>)=>{
      const id = action.payload
      state.users = state.users.filter((user)=>user.id !== id);
      if (state.selectedUser?.id === id) {
        state.selectedUser = null;
      }
    }
  },
});
export const { setUserDetails, updateUserDetails , deleteUser , addUser } = userSlice.actions;
export default userSlice.reducer;
