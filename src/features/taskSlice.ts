import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../Interfaces/interface";
import { DUMMY_USERS } from "../dummyData/data";

interface TaskState {
  tasks: Task[];
  selectedTask: Task | null;
}

const initialState: TaskState = {
  tasks: DUMMY_USERS.flatMap((user) => user.tasks || []),
  selectedTask: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTaskDetails: (state, action: PayloadAction<string>) => {
      state.selectedTask =
        state.tasks.find((task) => task.employeeId === action.payload) || null;
    },
    updateTaskDetails: (state, action: PayloadAction<Task>) => {
      const updatedTask = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.employeeId === updatedTask.id);

      if (taskIndex !== -1) {
        state.tasks[taskIndex] = updatedTask;
        if (state.selectedTask?.employeeId === updatedTask.id) {
          state.selectedTask = updatedTask;
        }
      }
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.employeeId !== action.payload);
      if (state.selectedTask?.employeeId === action.payload) {
        state.selectedTask = null;
      }
    },
  },
});
export const { setTaskDetails, updateTaskDetails, addTask, deleteTask } =
  taskSlice.actions;
export default taskSlice.reducer;
