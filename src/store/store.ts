import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import myContactsReducer from '../Components/myContacts/myContactsSlice';

export const store = configureStore({
  reducer: {
    contacts: myContactsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
/*export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;*/
