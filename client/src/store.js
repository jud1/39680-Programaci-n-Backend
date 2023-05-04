import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
   name: "user",
   initialState: {
      id: null,
      firstname: null,
      lastname: null,
      avatar: null,
      email: null
   },
   reducers: {
      setUser: (state, action) => {
         state.id = action.payload.id,
         state.firstname = action.payload.firstname,
         state.lastname = action.payload.lastname,
         state.avatar = action.payload.avatar,
         state.email = action.payload.email
      },
   },
})

const alertSlice = createSlice({
   name: "alert",
   initialState: {
      show: false,
      message: "",
   },
   reducers: {
      showAlert: (state, action) => {
         state.show = true;
         state.message = action.payload;
      },
      hideAlert: (state) => {
         state.show = false;
         state.message = ""
      },
   },
})

export const selectUser = (state) => state.user
export const { setUser } = userSlice.actions
export const selectAlert = (state) => state.alert
export const { showAlert, hideAlert } = alertSlice.actions

export const store = configureStore({
   reducer: {
      user: userSlice.reducer,
      alert: alertSlice.reducer,
   },
})