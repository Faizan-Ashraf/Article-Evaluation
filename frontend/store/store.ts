import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import { apiSlice } from "./apiSlice";


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware().concat(apiSlice.middleware)
    
})

export type RootState = ReturnType<typeof store.getState>; //what it return
export type AppDispatch = typeof store.dispatch; //the whole function type