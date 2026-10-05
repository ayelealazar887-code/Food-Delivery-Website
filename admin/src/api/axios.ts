import axios from 'axios'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/food`,
})

export const apiOrder = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/order`,
})

export default api