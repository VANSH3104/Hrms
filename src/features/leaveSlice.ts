import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LeaveRequest } from "../Interfaces/interface";
import { DUMMY_USERS } from "../dummyData/data";

interface LeaveState {
  leaveRequests: LeaveRequest[]; // Renamed from `leave` for better clarity
  selectedLeave: LeaveRequest | null; // Renamed from `selectedleave` for consistency
}

const initialState: LeaveState = {
  leaveRequests: DUMMY_USERS.flatMap((user) => user.leaveRequests || []),
  selectedLeave: null,
};

const leaveSlice = createSlice({
  name: "leave",
  initialState,
  reducers: {
    // Sets selected leave request based on employeeId
    setLeaveDetails: (state, action: PayloadAction<string>) => {
      state.selectedLeave =
        state.leaveRequests.find((leave) => leave.employeeId === action.payload) || null;
    },

    // Updates leave details and ensures selectedLeave is updated if needed
    updateLeaveDetails: (state, action: PayloadAction<LeaveRequest>) => {
      const updatedLeave = action.payload;
      const leaveIndex = state.leaveRequests.findIndex(
        (leave) => leave.employeeId === updatedLeave.employeeId
      );

      if (leaveIndex !== -1) {
        state.leaveRequests[leaveIndex] = updatedLeave;
        if (state.selectedLeave?.employeeId === updatedLeave.employeeId) {
          state.selectedLeave = updatedLeave;
        }
      }
    },

    // Adds a new leave request to the list
    addLeave: (state, action: PayloadAction<LeaveRequest>) => {
      state.leaveRequests.push(action.payload);
    },

    // Deletes a leave request based on employeeId
    deleteLeave: (state, action: PayloadAction<string>) => {
      state.leaveRequests = state.leaveRequests.filter(
        (leave) => leave.employeeId !== action.payload
      );
      if (state.selectedLeave?.employeeId === action.payload) {
        state.selectedLeave = null;
      }
    },
  },
});

export const { setLeaveDetails, updateLeaveDetails, addLeave, deleteLeave } = leaveSlice.actions;
export default leaveSlice.reducer;
