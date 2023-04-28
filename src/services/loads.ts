import { LoadType } from "../pages/NewLoad"
import { api } from "./api"
import * as Network from 'expo-network';
import { storage } from "../storage";

export const getLoads = async () => {
    const response = await api.get<LoadType[]>('/getLoads') 
    return response.data
}

export const saveLoad = async (load: LoadType) => {
    const { isConnected, isInternetReachable } = await Network.getNetworkStateAsync();
    const hasNoInternet = !isConnected && !isInternetReachable;
    if (hasNoInternet) {
        const key = Date.now().toString()
        storage.set(key, JSON.stringify(load));
        return await Promise.resolve()
    } else {
        await api.post('/sendLoad', {...load, signature: load.signature.uri});
    }
}

export const listenStorageKeys = (callback: (keys: string[]) => void) => {
    const keys = () => storage.getAllKeys().filter(key => key !== 'role')
    callback(keys())
    storage.addOnValueChangedListener(() => {
        callback(keys())
    })
}

export const sendMissingByKey = async (key: string) => {
    const load = JSON.parse(storage.getString(key)) as LoadType;
    try {
        await api.post('/sendLoad', { ...load, signature: load.signature.uri});
    } catch (error) {
        console.log({ ...error })
    }
    storage.delete(key)
}

