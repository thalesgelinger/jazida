import { LoadType } from "../pages/NewLoad"
import { api } from "./api"

export const getLoads = async () => {
    const response = await api.get<(LoadType & { id: string })[]>('/loads')
    return response.data
}

export const saveLoad = async (load: LoadType) => {
    const { data: { url, key } } = await api.post<{ url: string, key: string }>("/signature")


    const signaturePath = load.hasOwnProperty("signaturePath") ? load.signaturePath : load.signature.uri

    const { data: blob } = await api.get(signaturePath, {
        responseType: 'blob',
    });

    await fetch(url, {
        method: 'PUT',
        body: blob,
        headers: {
            'Content-Type': blob.type,
        },
    });

    const body = {
        client: load.client,
        plate: load.plate,
        material: load.material,
        quantity: load.quantity,
        paymentMethod: load.paymentMethod,
        signature: key
    }

    await api.post("/loads", body)
}
