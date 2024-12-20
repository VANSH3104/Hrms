import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LeaveRequest } from "../Interfaces/interface";
import { DUMMY_USERS } from "../dummyData/data";

interface LeaveState {
  leaveRequests: LeaveRequest[];
  selectedLeave: LeaveRequest | null;
  notifications: Notification[];
}

const initialState: LeaveState = {
  leaveRequests: DUMMY_USERS.flatMap((user) => user.leaveRequests || []),
  selectedLeave: null,
};

const leaveSlice = createSlice({
  name: "leave",
  initialState,
  reducers: {
    setLeaveDetails: (state, action: PayloadAction<string>) => {
      state.selectedLeave =
        state.leaveRequests.find((leave) => leave.employeeId === action.payload) || null;
    },

    updateLeaveDetails: (state, action: PayloadAction<LeaveRequest>) => {
      const updatedLeave = action.payload;
      const leaveIndex = state.leaveRequests.findIndex(
        (leave) => leave.id === updatedLeave.id
      );

      if (leaveIndex !== -1) {
        state.leaveRequests[leaveIndex] = updatedLeave;
        if (state.selectedLeave?.id === updatedLeave.id) {
          state.selectedLeave = updatedLeave;
        }
      }
    },

    addLeave: (state, action: PayloadAction<LeaveRequest>) => {
      const newLeave = action.payload;
      state.leaveRequests.push(newLeave);
      
    },

    deleteLeave: (state, action: PayloadAction<string>) => {
      const leaveId = action.payload;
      state.leaveRequests = state.leaveRequests.filter(
        (leave) => leave.id !== leaveId
      );
      if (state.selectedLeave?.id === leaveId) {
        state.selectedLeave = null;
      }
    },

    updateLeaveStatus: (state, action: PayloadAction<{ leaveId: string; status: "Approved" | "Rejected" | "Pending"}>) => {
      const { leaveId, status } = action.payload;
      const leaveIndex = state.leaveRequests.findIndex((leave) => leave.id === leaveId);

      if (leaveIndex !== -1) {
        const leave = state.leaveRequests[leaveIndex];
        leave.status = status;
        
        if (status === "Approved") {
          const user = DUMMY_USERS.find((user) => user.id === leave.employeeId);
          if (user) {
            const employeeLeave = user.employeeLeave;
            if (leave.leaveType === "Sick" || leave.leaveType === "Vacation") {
              employeeLeave.remainingLeaves -= 1;
            }
          }
        }

        const notificationIndex = state.notifications.findIndex(
          (notification) => notification.id === `notification-${leaveId}`
        );
        
        if (notificationIndex !== -1) {
          state.notifications[notificationIndex].status = "Read";
        }
      }
    },
  },
});

export const { setLeaveDetails, updateLeaveDetails, addLeave, deleteLeave, updateLeaveStatus } = leaveSlice.actions;
export default leaveSlice.reducer;
