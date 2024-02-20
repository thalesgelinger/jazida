import { LoadType } from "../pages/NewLoad"
import { api } from "./api"
import * as Network from 'expo-network';
import { db } from "./db";
import { SQLResultSet } from "expo-sqlite";


export const getLoads = async () => {
    const response = await api.get<LoadType[]>('/getLoads')
    return response.data
}

let notifyLoads = (loads: LoadType[]) => { }

export const saveLoad = async (load: LoadType) => {
    const { isConnected, isInternetReachable } = await Network.getNetworkStateAsync();
    const hasNoInternet = !isConnected && !isInternetReachable;
    if (hasNoInternet) {
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
        await api.post('/sendLoad', { ...load, signature: load.signature.uri });
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
