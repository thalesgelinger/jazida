import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://8plz981cfe.execute-api.sa-east-1.amazonaws.com/prod'
})
