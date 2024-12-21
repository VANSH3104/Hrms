// utils/localStorage.ts
import { RootState } from "../store/store";

// Sync state to localStorage
export const syncWithLocalStorage = (state: RootState) => {
  try {
    localStorage.setItem("auth", JSON.stringify(state.auth));
    localStorage.setItem("leave", JSON.stringify(state.leave));
    localStorage.setItem("notification", JSON.stringify(state.notification));
    localStorage.setItem("task", JSON.stringify(state.task));
    localStorage.setItem("user", JSON.stringify(state.user));
  } catch (error) {
    console.error("Error syncing state to localStorage:", error);
  }
};

// Load state from localStorage
export const loadFromLocalStorage = () => {
  try {
    const auth = localStorage.getItem("auth");
    const leave = localStorage.getItem("leave");
    const notification = localStorage.getItem("notification");
    const task = localStorage.getItem("task");
    const user = localStorage.getItem("user");

    return {
      auth: auth ? JSON.parse(auth) : undefined,
      leave: leave ? JSON.parse(leave) : undefined,
      notification: notification ? JSON.parse(notification) : undefined,
      task: task ? JSON.parse(task) : undefined,
      user: user ? JSON.parse(user) : undefined,
    };
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
    return {}; // Return an empty object if loading fails
  }
};
