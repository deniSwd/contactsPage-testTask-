import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk, RootState} from '../../store/store';
import {userAPI} from "../../API/api";
import {UsersType, UserType} from "../../MainTypes";
import {FormValues} from "../authorization/Autorization";

export interface ContactsState {
  isAuth: boolean
  users: UsersType | null
  currentUser: UserType | null
  inputError: boolean
}

const initialState: ContactsState = {
  isAuth: false,
  users: null,
  currentUser: null,
  inputError: false
}

export const myContactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<FormValues>) => {
      const userFound = state.users != null &&
        state.users.find((u) => u.password === action.payload.password &&
        u.email === action.payload.email)
      userFound ? (state.isAuth = true) && (state.currentUser = userFound): (state.inputError = true)
    },
    setUsers: (state, action: PayloadAction<UsersType>) => {
      state.users = action.payload
    },
    userExit: (state) => {
      state.isAuth = false
    }
  },
});

export const {setCurrentUser, setUsers,userExit} = myContactsSlice.actions;
export const selectAuthorization = (state: RootState) => state.contacts.isAuth;
export const selectUser = (state: RootState) => state.contacts.currentUser;
export const selectInputError = (state: RootState) => state.contacts.inputError;



export const getUsers = (): AppThunk => async (dispatch) => {
  const currentUsers = await userAPI.getUsers()
  dispatch(setUsers(currentUsers))
}

export default myContactsSlice.reducer;

