import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api/user',
});
export const apii = axios.create({
  baseURL: 'http://localhost:5000/api/food',
})
export const apiii = axios.create({
  baseURL: 'http://localhost:5000/api/cart',
})

export default api