import { configureStore } from '@reduxjs/toolkit';
import { authState } from './slices/authState.js';
import { notificationState } from './slices/notificationState.js';
import { chatState } from './slices/chatState.js';
import { enableMapSet } from "immer";

enableMapSet();
const store = configureStore({
  reducer: {
    Auth: authState.reducer,
    Notification: notificationState.reducer,
    Chat: chatState.reducer
  },
  devTools: true,

})
export default store;  