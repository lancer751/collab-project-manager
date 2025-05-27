import { Rol, RolList } from "./roles.types";

export interface UsersInfoData {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  users: User[];
}

export type User = {
  readonly id: number;
  name: string;
  lastname: string;
  entryDate: Date;
  email: string;
  numberPhone: string | null;
  description: string | null;
  rolDtoList: Rol[];
  active: boolean;
};

export type SingleUserData = User & { readonly password: string };

export type CreateUserDto = Omit<SingleUserData, "id" | "active">

export type UpdateUserDto = Partial<Pick<CreateUserDto, "password">> & Omit<CreateUserDto, "password">
export interface UserRequestFilters {
  name?: string;
  status?: string;
  rol?: string;
}

export interface UserRequestSort {
  by?: string;
  direction?: string;
}

export type EditMultipleUsers = {
  userIds: number[],
  rol?: string,
  entryDate?: Date,
  enable?: string
}

export type UserLoginData = Pick<SingleUserData, "password"> & Pick<SingleUserData, "email"> 