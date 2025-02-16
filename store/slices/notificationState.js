import { createSlice } from '@reduxjs/toolkit'



export const notificationState = createSlice({
name:"notificationState",
initialState:[],
reducers: {
  addNotification (state, action) {
    const existingIds = state.map((item) => item.id);
    const newNotifications = action.payload.filter((item) => !existingIds.includes(item.id));
    return [...state,...newNotifications];
  },
  removeNotification (state,action) {
    console.log(action.payload, "payload");
    return state.filter((item) => item.id != action.payload.id);
  },
}
});

export const {addNotification, removeNotification} = notificationState.actions;