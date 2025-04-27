import { User } from "@/types/user.types";

export async function login(userData: {
  email: string;
  password: string;
}): Promise<User> {
  try {
    const response = await fetch("/api/auth/login", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data: User = await response.json();

    if (!response.ok) {
      return data;
    }

    return data;
  } catch (error) {
    console.log("Error in login", error);
    throw error;
  }
}

export async function logout() {
  try {
    const response = await fetch("/api/logout", {
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
    const res = await fetch("/api/getMe");
    if (!res.ok) {
      return null;
    }
    const data: User = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error in isAuthenticated service");
  }
}
