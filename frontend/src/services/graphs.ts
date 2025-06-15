import {
  CountProjectsByState,
  MonthlyData,
  RelevantKPIS,
  TasksByUser,
  TasksStatusCount,
} from "@/types/graph.types";
import { mainApiInstance } from "./instaces";
import { ProjectsNearToFinish, RecentProjects } from "@/types/project.types";

export const getCountLatestProjects = async (): Promise<MonthlyData> => {
  const response = await mainApiInstance.get<MonthlyData>(
    "/dashboardadmin/projectmonth"
  );
  return response.data;
};

export const getTasksByState = async (): Promise<TasksStatusCount> => {
  const response = await mainApiInstance.get<TasksStatusCount>(
    "/dashboardadmin/taksbystate"
  );
  return response.data;
};

export const getRelevantKPIS = async (): Promise<RelevantKPIS> => {
  const response = await mainApiInstance.get<RelevantKPIS>(
    "/dashboardadmin/projectreadkpisClave"
  );
  return response.data;
};

export const getTasksByUser = async () => {
  const response = await mainApiInstance.get<TasksByUser[]>(
    "/dashboardadmin/projectactivitysusers"
  );
  return response.data;
};

export const getCountProjectsByState = async () => {
  const response = await mainApiInstance.get<CountProjectsByState>(
    "/dashboardadmin/projectstates"
  );
  return response.data;
};

export const getRecentProjects = async () => {
  try{
    const response = await mainApiInstance.get<RecentProjects[]>("/dashboardadmin/projectrecent")
    return response.data
  }catch(error){
    console.log("Error in getRecentProjects", error)
    throw error
  }
}

export const getProjectsNearToFinish = async () => {
  try{
    const response = await mainApiInstance.get<ProjectsNearToFinish[]>("/dashboardadmin/projectnextdelivery")
    return response.data
  }catch(error){
    console.log("Error in getRecentProjects", error)
    throw error
  }
}