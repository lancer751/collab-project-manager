import { User, UsersInfoData } from "@/types/user.types"
import { mainApiInstance } from "./instaces"


export const getAllUsers = async () => {
    try {
        const response = await mainApiInstance.get<UsersInfoData>("/dashboardadmin/user")
        return response.data
    } catch (error) {
        console.log("Error on getAllUsers", error)
    }    
}