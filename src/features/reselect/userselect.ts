// store/selectors.ts
import { createSelector } from 'reselect'; // Adjust the path as necessary
// import { User } from '../Interfaces/interface';
import { RootState } from '@/store/store';

// Basic selector to get users from the state
const selectUsers = (state: RootState) => state.user.users;

// Basic selector to get the selected user from the state
const selectSelectedUserId = (state: RootState) => state.user.selectedUser?.id;

// Memoized selector to get the selected user object
export const selectSelectedUser = createSelector(
    [selectUsers, selectSelectedUserId],
    (users, selectedUserId) => {
        return users.find(user => user.id === selectedUserId) || null;
    }
);

// Memoized selector to get all users
export const selectAllUsers = createSelector(
    [selectUsers],
    (users) => users
);
export const selectUserNotifications = createSelector(
    [selectUsers, (state: RootState, userId: string) => userId],
    (users, userId) => {
        const user = users.find(user => user.id === userId);
        return user ? user.notification : [];
    }
);