import axios from 'axios'
import {UsersType, UserType} from "../MainTypes";

const instance = axios.create({
  baseURL: `http://localhost:4000`
})

export const userAPI = {
  async getUsers(): Promise<UsersType> {
    return instance.get(`/users`).then(res => res.data)
  },
  async updateUser(userId: string,user:UserType) {
    return instance.put(`/users/${userId}`, user)
  }
}