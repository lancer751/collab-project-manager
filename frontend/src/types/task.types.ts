import { RolProject, StateDto } from "./project.types";
import { User } from "./user.types";

export type Task = {
  readonly id: number;
  name: string;
  description: string;
  dateStart: Date;
  dateDeliver: Date;
  prioridad: "ALTA" | "MEDIA" | "BAJA";
  state: StateDto;
  activityFatherId: number | null;
  users: (Omit<User, "active" | "rolDtoList"> & {rolProject: RolProject})[];
  subtasks: Task[] | null;
};

export type TaskChanges = Omit<Task, | "id" | "subtasks" | "users"> & {idProject: number, usersList: number[]}

export type TaskFormData = Omit<Task, "id" | "users"> & {idProject: number, usersList: number[]}