import { UserLoginData } from "@/types/auth.types";
import { User } from "@/types/user.types";
import { mainApiInstance } from "./instaces";

export async function login(userData: UserLoginData): Promise<void> {
  try {
    await mainApiInstance.post<User>("/login", userData);
  } catch (error) {
    console.log("Error in login", error);
    throw error;
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
