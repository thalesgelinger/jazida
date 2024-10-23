import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://jazida-api-production.up.railway.app/api'
})
