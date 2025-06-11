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
  userRolProjectRequestList: (Omit<User, "password" | "rolDtoList" | "active"> & {rolProject: RolProject})[];
  userLiders: Omit<User, "password" | "rolDtoList" | "active">[];
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

export type RecentProjects = { title: string };
export type ProjectsNearToFinish = { title: string; timeFinish: string };

// kanban type for mock data

// ----------------------------------------------------
// 1. Definición de las columnas (enumeración posible)
// ----------------------------------------------------
export type KanbanColumnId =
  | "planificacion"
  | "en_curso"
  | "trabajo_acumulado"
  | "en_pausa";

// ----------------------------------------------------
// 2. Interfaz para cada proyecto (Project)
// ----------------------------------------------------
export interface UserSummary {
  userId: number;
  name: string;
  avatarUrl: string;
}

export interface KanbanProject {
  id: number;
  title: string;
  status: KanbanColumnId;
  createdAt: string; // ISO 8601, ex: "2025-01-10T09:34:00Z"
  startDate?: string; // ISO 8601 o undefined
  dueDate?: string | null; // ISO 8601, null si no tiene fecha límite
  priority?: "alta" | "media" | "baja" | null;
  progress?: number | null; // %
  commentsCount: number;
  assignedTo?: UserSummary | null;
}

// ----------------------------------------------------
// 3. Interfaz para cada columna del Kanban
// ----------------------------------------------------
export interface KanbanColumn {
  id: KanbanColumnId;
  name: string;
  order: number;
  projects: KanbanProject[];
}

// ----------------------------------------------------
// 4. Interfaz de la respuesta completa del endpoint
// ----------------------------------------------------
export interface KanbanResponse {
  columns: KanbanColumn[];
  // (opcional) si se añaden metadatos de paginación:
  // meta?: {
  //   page: number;
  //   perPage: number;
  //   totalProjects: number;
  // }
}
