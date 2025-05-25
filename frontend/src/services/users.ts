import {
  CreateUserDto,
  EditMultipleUsers,
  SingleUserData,
  UpdateUserDto,
  User,
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

export const getInfiniteUsers = async ({
  page = 0,
  filters,
  sorters,
}: UserGetGrouping) => {
  const { name, rol, status } = filters ?? {};
  const { by, direction } = sorters ?? {};
  try {
    const response = await mainApiInstance.get<UsersInfoData>(
      `/dashboardadmin/user?sortBy=${by ?? ""}&page=${page ?? ""}&sortDir=${direction ?? ""}&role=${rol ?? ""}&enable=${status ?? ""}&search=${name ?? ""}`
    );
    return response.data;
  } catch (error) {
    console.error("Error in getInifiniteUsers service", error);
  }
};

export const getSingleUserById = async (userId: number) => {
  try {
    const response = await mainApiInstance.get<SingleUserData>(
      `/dashboardadmin/userid/${userId}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error in getSingleUserById service", error);
  }
};

export const createNewUser = async (userData: CreateUserDto) => {
  try {
    const response = await mainApiInstance.post<SingleUserData>(
      "/dashboardadmin/registeruser",
      userData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error in createNewUser service", error);
  }
};

export const editUserData = async (id: number, userUpdates: UpdateUserDto) => {
  try {
    const response = await mainApiInstance.put<SingleUserData>(
      `/dashboardadmin/edituser/${id}`,
      userUpdates,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error in createNewUser service", error);
  }
};

export const editMultipleUsers = async (
  usersAndModifies: EditMultipleUsers
) => {
  try {
    const response = await mainApiInstance.patch(
      "/dashboardadmin/usereditlist",
      usersAndModifies, {withCredentials: true}
    );
    return response.data;
  } catch (error) {
    console.error("Erron in editMultipleUsers service", error);
  }
};
