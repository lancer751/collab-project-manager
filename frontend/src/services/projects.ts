import { NewProjectData, ProjectsData } from "@/types/project.types";
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
