import { configureStore } from '@reduxjs/toolkit';
import companySlice from './reducers/companySlice';

export const store = configureStore({
  reducer: {
    items: companySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
