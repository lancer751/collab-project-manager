import { NewProjectData, Project, ProjectsData, StateDto } from "@/types/project.types";
import { mainApiInstance } from "./instaces";

export const createProject = async (projectData: NewProjectData) => {
  try {
    const response = await mainApiInstance.post<NewProjectData>(
      "/project/add",
      projectData
    );
    return response.data;
  } catch (error) {
    console.log("Error in createProject", error);
    throw error;
  }
};

export const getInfiniteProjects = async ({ page = 0 }) => {
  try {
    const response = await mainApiInstance.get<ProjectsData>(
      `/dashboardadmin/admin-projects?search=&priority=&startp=&endp=&state=&iduser=&page=${page}`
    );
    return response.data.body;
  } catch (error) {
    console.log("Error in getInfiniteUsers", error);
    throw error;
  }
};

export const deleteProjectById = async (id: number) => {
  try {
    await mainApiInstance.delete(`/project/delete/${id}`, {withCredentials: true})
  } catch (error) {
    console.log("Error in deleteProjectById", error)
    throw error
  }
}

export const getProjectStatus = async () => {
  try {
    const response = await mainApiInstance.get<StateDto[]>("/dashboardadmin/filterstate")
    return response.data
  } catch (error) {
    console.log("Error in getProjectStatus", error)
    throw error
  }
}

export const getProjectsByStatus = async(status: string) => {
  try {
    const response = await mainApiInstance.get<Project[]>(`/project/projectstate/${status}`)
    return response.data
  } catch (error) {
    console.log("Error in getProjectsByStatus", error)
    throw error
  }
}