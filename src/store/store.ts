import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/authSlice"
import useReducer  from '../features/userSlice'
import taskReducer  from '../features/taskSlice'
import leaveReducer from "../features/leaveSlice"
import notificationReducer from '../features/notificationSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: useReducer,
    task: taskReducer,
    leave: leaveReducer,
    notification: notificationReducer,
  },
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store