import axios from 'axios'

export const client = axios.create({
  baseURL: 'http://192.168.18.233:8110',
  timeout: 3000,
})
