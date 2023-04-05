import { LoadType } from "../pages/NewLoad"
import { api } from "./api"

export const getLoads = () => {}
export const saveLoad = async (load: LoadType) => {
    await api.post('/sendLoad', load);
}
