// frontend/src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice';
import companiesReducer from './companiesSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    companies: companiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
