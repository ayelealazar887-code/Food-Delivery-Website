import axios from "axios"
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/user`,
})

export const apii = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/food`,
})

export const apiii = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/cart`,
})

export const apiOrder = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/order`,
})

export default api;