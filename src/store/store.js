// app/store.js
import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './services/baseApi'
import { authApi } from './services/auth/authApi'  
import authReducer from './feature/authSlice'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [authApi.reducerPath]: authApi.reducer,  
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApi.middleware)
      .concat(authApi.middleware),          
})