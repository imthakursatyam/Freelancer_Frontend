import { configureStore } from '@reduxjs/toolkit';
import { authState } from './slices/authState.js';
import { notificationState } from './slices/notificationState.js';

const store = configureStore({
  reducer: {
    Auth: authState.reducer,
    Notification: notificationState.reducer
  }
})
export default store;  