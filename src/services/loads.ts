import { LoadType } from "../pages/NewLoad"
import { api } from "./api"
import * as Network from 'expo-network';
import { db } from "./db";
import { SQLResultSet } from "expo-sqlite";


export const getLoads = async () => {
    const response = await api.get<LoadType[]>('/loads', {
        headers: {
            Authorization: "admin"
        }
    })
    return response.data
}

let notifyLoads = (loads: LoadType[]) => { }

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
    console.log("SAVEW LOAD")
    const { isConnected, isInternetReachable } = await Network.getNetworkStateAsync();
    const hasNoInternet = !isConnected && !isInternetReachable;
    if (hasNoInternet) {
        console.log("NO INTERNET")
        await new Promise((resolve) => {
            db.transaction(tx =>
                tx.executeSql(`
                    INSERT INTO LOADS (
                        id,
                        client, 
                        plate,
                        material,
                        quantity,
                        paymentMethod,
                        signature
                    ) VALUES (NULL,?,?,?,?,?,?)`,
                    [
                        load.client,
                        load.plate,
                        load.material,
                        load.quantity,
                        load.paymentMethod,
                        JSON.stringify(load.signature)
                    ],
                    (_, value) => {
                        console.log({ value })
                        notify()
                        resolve(value)
                    },
                )
            )
        })
    } else {


        try {

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
                    Authorization: "test",
                    'Content-Type': 'multipart/form-data',
                },
                timeout: 3000
            })

            await api.post('/load', { ...load, signature: url }, {
                headers: {
                    Authorization: "test"
                }
            });
        } catch (e) {
            console.error({ ...e })
        }
    }
}

const notify = async () => {
    const response: SQLResultSet = await new Promise((resolve) => {
        db.transaction(tx =>
            tx.executeSql(`SELECT * FROM loads`,
                [],
                (_, value) => resolve(value)
            )
        )
    })
    const loads = response.rows._array.map(v => ({ ...v, signature: JSON.parse(v.signature) }))
    notifyLoads(loads)
}

export const listenNotLoaded = async (cb: (loads: LoadType[]) => void) => {
    notifyLoads = cb
    notify()
}

export const deleteFromLocalDB = async () => {

}
