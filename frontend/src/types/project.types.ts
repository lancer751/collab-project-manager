import { User } from "./user.types";

export type ProjectsData = {
  headers: object;
  body: Body;
  statusCode: string;
  statusCodeValue: number;
};

export type Body = {
  totalItems: number;
  totalPages: number;
  project: Project[];
  currentPage: number;
};

export type Project = {
  readonly id: number;
  name: string;
  description?: string;
  dateStart: Date;
  dateDeliver: Date;
  priority: "ALTA" | "MEDIA" | "BAJA";
  stateDto: StateDto;
  createdBy: string;
  active: boolean;
  userRolProjectRequestList: (Omit<User, | "rolDtoList" | "active"> & {rolProject: RolProject})[];
  userLiders: (Omit<User, "rolDtoList" | "active"> & {rolProject: RolProject})[];
};
export type ProjectStatus = "Completado" | "Curso" | "Pausa" | "Riesgo" | "Cancelado"

export type StateDto = {
  name: ProjectStatus;
};


export type UserRolProjectRequestList = {
  id: number;
  email: string;
  rolProject: RolProject;
};

export type RolProject = "Lider" | "Colaborador"

export type NewProjectData = Omit<
  Project,
  "id" | "active" | "createdBy" | "userRolProjectRequestList" | "userLiders"
> & {
  userRolProjectRequestList: UserRolProjectRequestList[],
  userLider: UserRolProjectRequestList[]
};

export type RecentProjects = { id:number, title: string };
export type ProjectsNearToFinish = { id: number, title: string; timeFinish: string };