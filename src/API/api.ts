import axios from 'axios'

const instance = axios.create({
  baseURL: `http://localhost:4000/users`
})

export const userAPI = {
  async getUsers() {
    return instance.get(``).then(res => res.data)
  }
}