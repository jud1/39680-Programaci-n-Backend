import { configureStore, createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
   name: 'user',
   initialState: { data: null },
   reducers: {
      setUser: (state, action) => {
         state.data = action.payload
      },
      clearUser: (state) => {
         state.data = null
      }
   },
})

export const { setUser, clearUser } = userSlice.actions

export const selectUser = state => state.user

const store = configureStore({
   reducer: {
      user: userSlice.reducer
   },
})

export default store