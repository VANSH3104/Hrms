// store/selectors.ts
import { RootState } from '@/store/store';
import { createSelector } from 'reselect';

// Basic selector to get leave requests from the state
const selectLeaveRequests = (state: RootState) => state.leave.leaveRequests;

// Memoized selector to get all leave requests
export const selectAllLeaveRequests = createSelector(
    [selectLeaveRequests],
    (leaveRequests) => leaveRequests
);

// Memoized selector to get notifications for a specific user
export const selectUserNotifications = (state: RootState, userId: string) => {
    const leaveRequests = selectLeaveRequests(state);
    return leaveRequests.filter(leave => leave.employeeId === userId);
};
