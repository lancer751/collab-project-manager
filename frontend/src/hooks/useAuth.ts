import { AuthContext } from "@/contexts/Auth"
import { useContext } from "react"


export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) {
        throw new Error("useAuth must be used in a AuthProvider")
    }
    return context
} 