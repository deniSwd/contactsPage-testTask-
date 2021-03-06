import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk, RootState} from '../store';
import {userAPI} from "../../API/api";
import {ContactType, UsersType, UserType} from "../../MainTypes";
import {FormValues} from "../../Components/authorization/Authorization";

export interface ContactsState {
  isAuth: boolean
  users: UsersType | null
  currentUser: UserType | null
  inputError: boolean
  addContactForm: boolean
}

const initialState: ContactsState = {
  isAuth: false,
  users: null,
  currentUser: null,
  inputError: false,
  addContactForm: false,
}

export const myContactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setUser: (state, actions: PayloadAction<UserType>) => {
      state.currentUser = actions.payload
    },
    setCurrentUser: (state, action: PayloadAction<FormValues>) => {
      const userFound = state.users !== null &&
        state.users.find((u) => u.password === action.payload.password &&
          u.email === action.payload.email)
      userFound ? (state.isAuth = true) && (state.currentUser = userFound) : (state.inputError = true)
    },
    setUsers: (state, action: PayloadAction<UsersType>) => {
      state.users = action.payload
    },
    setAddContactForm: (state, action: PayloadAction<boolean>) => {
      state.addContactForm = action.payload
    },
    userLogout: (state) => {
      state.isAuth = false
      state.inputError = false
    }
  },
});

export const {setCurrentUser, setUsers, setAddContactForm, userLogout, setUser} = myContactsSlice.actions;
export const selectAuthorization = (state: RootState) => state.contacts.isAuth
export const selectUser = (state: RootState) => state.contacts.currentUser
export const selectInputError = (state: RootState) => state.contacts.inputError
export const selectAddContactForm = (state: RootState) => state.contacts.addContactForm


export const getUsers = (currentUser?: UserType): AppThunk => async (dispatch) => {
  const currentUsers = await userAPI.getUsers()
  dispatch(setUsers(currentUsers))
  currentUser && dispatch(setUser(currentUsers.find(v => v.id === currentUser.id) ?? currentUser))
}

export const addNewUserContact = (userId: string, newContact: ContactType): AppThunk => async (dispatch, getState) => {
  const currentUser = getState().contacts.currentUser
  if (!currentUser) return
  await userAPI.updateUser(userId, {...currentUser, contacts: [...currentUser.contacts, newContact]})
  dispatch(getUsers(currentUser))
  dispatch(setAddContactForm(false))
}
export const deleteUserContact = (userId: string, contact: ContactType): AppThunk => async (dispatch, getState) => {
  const currentUser = getState().contacts.currentUser
  if (!currentUser) return
  const changedContacts = currentUser.contacts.filter(c => c.id !== contact.id)
  await userAPI.updateUser(userId, {...currentUser, contacts: changedContacts})
  dispatch(getUsers(currentUser))
}

export const editUserContact = (userId: string, newContactValue: ContactType, name: string, telephone: string): AppThunk =>
  async (dispatch, getState) => {
    const currentUser = getState().contacts.currentUser
    if (!currentUser) return
    const currentUserContacts = [...getState().contacts.currentUser?.contacts ?? []]
    const changedContactIndex = currentUserContacts.findIndex(i => i.name === name && i.telephone === telephone)
    changedContactIndex !== -1 && (currentUserContacts[changedContactIndex] = newContactValue)
    await userAPI.updateUser(userId, {...currentUser, contacts: currentUserContacts})
    dispatch(getUsers(currentUser))
  }

export default myContactsSlice.reducer;

