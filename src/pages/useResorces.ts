import { useQuery } from "@tanstack/react-query"
import { api } from "../services/api"

export const useResources = () => {
    const { data: clients = [] } = useQuery({
        queryKey: ["clients"],
        queryFn: async () => {
            const response = await api.get<{ id: number, name: string, plates: { id: number, plate: string }[] }[]>("/clients", {
                headers: {
                    Authorization: "loader"
                }
            })

            return response.data
        }
    })

    const { data: materials = [] } = useQuery({
        queryKey: ["materials"],
        queryFn: async () => {
            const response = await api.get<{ id: number, name: string }[]>("/materials", {
                headers: {
                    Authorization: "loader"
                }
            })

            return response.data
        }
    })

    return { clients, materials }
}
