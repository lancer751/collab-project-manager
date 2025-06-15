import { ProjectStatus } from "./project.types";

enum Month {
  JANUARY = "January",
  FEBRUARY = "February",
  MARCH = "March",
  APRIL = "April",
  MAY = "May",
  JUNE = "June",
  JULY = "July",
  AUGUST = "August",
  SEPTEMBER = "September",
  OCTOBER = "October",
  NOVEMBER = "November",
  DECEMBER = "December",
}

export type MonthStats = {
  cancelado: number;
  Completado: number;
};

export type MonthlyData = Partial<Record<Month, MonthStats>>;
export type TasksStatusCount = Record<ProjectStatus, number>;
type KPIS =
  | "totalProjectActive"
  | "tasksProgress"
  | "averageProjectFinish"
  | "averageTaskFinish";
  
export type RelevantKPIS = Record<KPIS, number>

export type CountProjectsByState = {
  "En Pausa": number,
  "En Curso": number,
  "Completados": number,
  "Cancelado": number,
  "En Riesgo": number,
}

export type TasksByUser = {
  fullName: string,
  tareasAsigandas: number,
  tareasCompletadas: number
}