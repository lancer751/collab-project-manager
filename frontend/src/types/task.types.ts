import { RolProject } from "./project.types";
import { User } from "./user.types";

export type TaskStatus =
  | "En Revisión"
  | "En Curso"
  | "Terminados"
  | "Sin Empezar"
  | "Archivadas";

export type Task = {
  id: number;
  name: string;
  description: string;
  dateStart: Date;
  dateDeliver: Date;
  prioridad: string;
  state: TaskStatus;
  activityFatherId: number | null;
  users: (Omit<User, "active" | "rolDtoList"> & {rolProject: RolProject})[];
};