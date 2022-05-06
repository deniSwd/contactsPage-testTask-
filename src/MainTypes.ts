export type UsersType = Array<UserType>

export type UserType = {
  id: string
  name: string
  login: string
  password: string
  contacts: ContactsType
}
export type ContactsType = Array<ContactType>

export type ContactType = {
  name: string
  telephone: string
}
