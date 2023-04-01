import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://us-central1-jazida-dev.cloudfunctions.net'
})
