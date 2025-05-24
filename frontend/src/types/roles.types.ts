export type RolList =
  | "ADMIN"
  | "LIDERSISTEMAS"
  | "LIDERSOFTWARE"
  | "USER"
  | "LIDERPROYECTO";

export type Rol = {
  name: RolList;
};
