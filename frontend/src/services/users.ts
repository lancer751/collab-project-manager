import {
  UserRequestFilters,
  UserRequestSort,
  UsersInfoData,
} from "@/types/user.types";
import { mainApiInstance } from "./instaces";

interface UserGetGrouping {
  page: number;
  filters?: Partial<UserRequestFilters>;
  sorters?: Partial<UserRequestSort>;
}

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

export const getInfiniteUsers = async ({
  page = 0,
  filters,
  sorters,
}: UserGetGrouping) => {
  const { name, rol, status } = filters ?? {};
  const { by, direction } = sorters ?? {};

  try {
    const response = await mainApiInstance.get<UsersInfoData>(
      `/dashboardadmin/user?sortBy=${by ?? ""}&page=${page ?? ""}&sortDir=${direction ?? ""}&role=${rol ?? ""}&enable=${status ?? ""}`
    );
    return response.data;
  } catch (error) {
    console.error("Error in getInifiniteUsers Service", error);
  }
};
