import { UsersInfoData } from "@/types/user.types";
import { mainApiInstance } from "./instaces";

export const getAllUsers = async () => {
  try {
    const response = await mainApiInstance.get<UsersInfoData>(
      "/dashboardadmin/user?sortBy=&page=1&sortDir=&role"
    );
    return response.data;
  } catch (error) {
    console.log("Error on getAllUsers", error);
  }
};

export const getInfiniteUsers = async ({ page = 0 }) => {
  try {
    const response = await mainApiInstance.get<UsersInfoData>(
      `/dashboardadmin/user?sortBy=&page=${page}&sortDir=&role`
    );
    return response.data;
  } catch (error) {
    console.error("Error in getInifiniteUsers Service", error);
  }
};
