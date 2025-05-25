import { UserLoginData } from "@/types/user.types";
import { User } from "@/types/user.types";
import { mainApiInstance } from "./instaces";
import { AxiosError } from "axios";

export interface ErrorLoginResponse {
  message: string,
  error: string
}

export async function login(userData: UserLoginData): Promise<User> {
  try {
    const response = await mainApiInstance.post<{message: string, user: User}>("/login", userData);
    return response.data.user
  } catch (error) {
    const axiosError = error as AxiosError
    console.log("Error in user login authenticacion", axiosError);
    const errorLoginResponse = axiosError.response
    
    if(errorLoginResponse) {
      const errorDetails = errorLoginResponse.data as ErrorLoginResponse
      throw errorDetails
    }
    throw AxiosError
  }
}

export async function logout() {
  try {
    await mainApiInstance.post("/dashboard/logout", null, {
      withCredentials: true
    });
  } catch (error) {
    console.log("Error en logout", error);
    throw error;
  }
}

export async function isAuthenticated(): Promise<User | null> {
  try {
    const response = await mainApiInstance.get<{ message: string; user: User }>(
      "/dashboard/validation",
      {
        withCredentials: true,
      }
    );
    return response.data.user;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}
