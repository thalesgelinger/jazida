import { api } from "./api"

export const adminSignIn = async (name: string, password: string) => {
    try {
        await api.post("/adminSignIn", { name, password })
        return true
    } catch (error) {
        console.log({ error})
        return false
    }
}
