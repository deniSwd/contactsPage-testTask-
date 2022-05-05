import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../store/store';

export interface ContactsState {
  isAuth: boolean
}

const initialState: ContactsState = {
  isAuth: false
};

export const myContactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setUserAuthorization: (state) => {
      state.isAuth = true
    }
  },
});

export const { setUserAuthorization } = myContactsSlice.actions;
export const selectAuthorization = (state: RootState) => state.contacts.isAuth;

export default myContactsSlice.reducer;
