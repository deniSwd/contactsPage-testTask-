import axios from 'axios'
import {UsersType, UserType} from "../MainTypes";

const instance = axios.create({
  baseURL: `http://localhost:4000`
})

export const userAPI = {
  async getUsers(): Promise<UsersType> {
    return instance.get<UsersType>(`/users`).then(res => {
      const data = res.data
      data.map(user => user.contacts.map(contact => contact.id = Math.floor(Math.random() * 1000)))
      return data
    })
  },
  async updateUser(userId: string, user: UserType) {
    await instance.put(`/users/${userId}`, {
      ...user,
      contacts: user.contacts.map(contact => ({name: contact.name, telephone: contact.telephone}))
    })
  }
}