import { storage } from "../storage"
import { api } from "./api"

export const adminSignIn = async (name: string, password: string) => {
    return await api.post("/adminSignIn", { name, password })
}

type LoginType = 'admin' | 'loader'

export const setLoginType = (loginType: LoginType) => storage.setItem('role', loginType)

export const getLoginType = async () => await storage.getItem('role') as LoginType

export const deleteLoginType = () => storage.removeItem('role')
