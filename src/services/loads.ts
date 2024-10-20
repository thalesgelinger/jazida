import { LoadType } from "../pages/NewLoad"
import { api } from "./api"

export const getLoads = async () => {
    const response = await api.get<(LoadType & { id: string })[]>('/loads', {
        headers: {
            Authorization: "admin"
        }
    })
    return response.data
}

interface BlobType {
    _data: {
        __collector: object,
        blobId: string,
        lastModified: number,
        name: string,
        offset: 0,
        size: 106137,
        type: string
    }
}

export const saveLoad = async (load: LoadType) => {
    console.log("LOAD: ", { load})
    try {
        console.log("Load: ", { load })
        const { data: blob } = await api.get<BlobType>(load.signature.uri, { responseType: "blob" })
        const form = new FormData();
        const imageData = {
            uri: load.signature.uri,
            name: blob._data.name,
            type: blob._data.type,
        } as unknown as Blob
        form.append("image", imageData)
        const { data: { url } } = await api.post("/signature", form, {
            headers: {
                Authorization: "loader",
                'Content-Type': 'multipart/form-data',
            },
            timeout: 3000
        })
        await api.post('/load', { ...load, signature: url }, {
            headers: {
                Authorization: "loader"
            }
        });
        console.log("Load saved")
    } catch (e) {
        console.error({ ...e })
    }
}
