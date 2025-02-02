import { configureStore } from '@reduxjs/toolkit';
import { authState } from './slices/authState.js';

const store = configureStore({
  reducer: {
    Auth: authState.reducer
  }
})
export default store;  