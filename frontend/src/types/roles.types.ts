export type RolList =
  | "ROLE_ADMIN"
  | "ROLE_LIDER_SISTEMAS"
  | "ROLE_LIDER_SOFTWARE"
  | "ROLE_USER"
  | "ROLE_LIDER_PROYECTO";

export type Rol = {
  name: RolList;
};
