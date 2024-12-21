import { RootState } from '@/store/store';
import { createSelector } from 'reselect';
 // Assuming RootState is the type of your store

// Selector to get all users
const getUsers = (state: RootState) => state.user.users;

// Memoized selector to filter the user by ID
const getUserById = (id: string) => createSelector(
  [getUsers],
  (users) => users.find(user => user.id === id) || null
);

export { getUserById };
