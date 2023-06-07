const ACCESS_TOKEN =  import.meta.env["VITE_MOVIE_READ_ACCESS_TOKEN"]
const BASE_URL = "https://api.themoviedb.org/3"
import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`
  }
})