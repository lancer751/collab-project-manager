import { Comment } from "@/types/comment.types"
import { mainApiInstance } from "./instaces"

export const getRecentComments = async () => {
    try {
        const response = await mainApiInstance.get<Comment[]>("/dashboardadmin/comentrecient")
        return response.data
    } catch (error) {
        console.log("Erron in RecentComments", error)
        throw error
    }
}