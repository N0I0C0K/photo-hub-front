import axios from 'axios'

export const client = axios.create({
  baseURL: 'http://127.0.0.1:8110',
  timeout: 3000,
})
