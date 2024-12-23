// src/utils/localStorageSync.ts
import { addLeave } from "./leaveSlice";
import { updateUserDetails } from "./userSlice";

export const syncWithLocalStorage = (dispatch:any) => {
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === "user" && event.newValue !== null) {
      const newValue = JSON.parse(event.newValue);
      dispatch(updateUserDetails(newValue));
    }
    if (event.key === "leave" && event.newValue !== null) {
      const newValue = JSON.parse(event.newValue);
      dispatch(addLeave(newValue));
    }
  };

  window.addEventListener("storage", handleStorageChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
  };
};
