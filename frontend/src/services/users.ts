import { mainApiInstance } from "./instaces"


export const getAllUsers = async () => {
    try {
        await mainApiInstance.get("/users")
        
    } catch (error) {
        console.log("Error on getAllUsers", error)
    }    
} 