import { Rol } from "@/types/roles.types"
import { mainApiInstance } from "./instaces"

export async function getAllRoles () {
    try {
        const response = await mainApiInstance.get<Rol[]>("/dashboardadmin/rollist")
        return response.data
    } catch (error) {
        console.error("Error in getAllRoles service", error)
    }
}