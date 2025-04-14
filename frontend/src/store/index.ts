import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import linksReducer from './linksSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    links: linksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 