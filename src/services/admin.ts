import { storage } from "../storage"
import { api } from "./api"

export const adminSignIn = async (name: string, password: string) => {
        return await api.post("/adminSignIn", { name, password })
}

type LoginType  =  'admin' | 'loader'

export const setLoginType = (loginType: LoginType) => storage.set('role', loginType)

export const getLoginType = () => storage.getString('role') as LoginType

export const deleteLoginType = () => storage.delete('role')
