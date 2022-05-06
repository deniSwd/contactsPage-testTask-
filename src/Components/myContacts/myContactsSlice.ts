import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk, RootState} from '../../store/store';
import {userAPI} from "../../API/api";
import {UsersType} from "../../MainTypes";

export interface ContactsState {
  isAuth: boolean
  users: UsersType | null
}

const initialState: ContactsState = {
  isAuth: false,
  users: null
}

export const myContactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setUserAuthorization: (state) => {
      state.isAuth = true
    },
    setUser: (state, action: PayloadAction<UsersType>) => {
      state.users = action.payload
    }
  },
});

export const {setUserAuthorization, setUser} = myContactsSlice.actions;
export const selectAuthorization = (state: RootState) => state.contacts.isAuth;
export const selectUsers = (state: RootState) => state.contacts.users;


export const getUsers = (): AppThunk => async (dispatch) => {
  const currentUsers = await userAPI.getUsers()
  dispatch(setUser(currentUsers))
}

export default myContactsSlice.reducer;

