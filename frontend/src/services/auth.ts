import { UserLoginData } from "@/types/auth.types";
import { User } from "@/types/user.types";
import { mainApiInstance } from "./instaces";

export async function login(userData: UserLoginData): Promise<User> {
  try {
    const response = await mainApiInstance.post<User>("/login", userData);

    return response.data;
  } catch (error) {
    console.log("Error in login", error);
    throw error;
  }
}

export async function logout() {
  try {
    const response = await fetch("/logout", {
      method: "post",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error in logout service", error);
  }
}

export async function isAuthenticated(): Promise<User | null> {
  try {
    const response = await mainApiInstance.get<User>("/dashboard/validation", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}
