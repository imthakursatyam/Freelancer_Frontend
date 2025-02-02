import { createSlice } from '@reduxjs/toolkit'



export const authState = createSlice({
name:"authState",
initialState:{isLogin:false, currRole:""},
reducers: {
  setLogin (state, action) {
    state.isLogin = action.payload.val;
  },
  setCurrRole (state,action) {
    state.currRole = action.payload.val;
  },
}
});

export const {setLogin, setCurrRole} = authState.actions;