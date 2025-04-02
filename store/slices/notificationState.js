import { createSlice } from '@reduxjs/toolkit'



export const notificationState = createSlice({
  name: "notificationState",
  initialState: [],
  reducers: {
    addNotification(state, action) {
      const existingIds = state?.map((item) => item?.id) || [];
      const newNotifications = action.payload
        ? action.payload.filter((item) => item && !existingIds.includes(item.id))
        : [];

      return [...(state || []), ...newNotifications];
    },
    removeNotification(state, action) {
      return state.filter((item) => item.id != action.payload.id);
    },

    clearNotifications(state, action) {
      return [];
    }
  }
});

export const { addNotification, removeNotification, clearNotifications } = notificationState.actions;