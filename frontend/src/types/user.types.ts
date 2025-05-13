import { Rol } from "./roles.types";

export interface UsersInfoData {
  totalItems: number,
  totalPages: number,
  currentPage: number,
  users: User[]
}

export type User = {
  id:          number;
  name:        string;
  lastname:    string;
  entryDate:   Date;
  email:       string;
  numberPhone: string | null;
  description: string;
  rolDtoList:  Rol[];
  active:      boolean;
}