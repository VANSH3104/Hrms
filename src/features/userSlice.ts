import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../Interfaces/interface';
import { DUMMY_USERS } from '../dummyData/data';

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: DUMMY_USERS,

};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setUserDetails, setLoading, setError } = userSlice.actions;

export default userSlice.reducer;
