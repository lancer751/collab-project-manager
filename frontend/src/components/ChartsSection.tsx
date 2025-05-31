import React from "react";
import { LatestMonths } from "./charts/LatestMonths";
import { CurrentTasks } from "./charts/CurrentTasks";
import { TaskByUser } from "./charts/TaskByUser";
import { ProjectsStatus } from "./charts/ProjectsStatus";

export default function ChartsSection() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <LatestMonths className="col-span-1 lg:col-span-2 xl:col-span-3 max-h-[500px]" />
      <CurrentTasks className="col-span-1 lg:col-span-2 xl:col-span-2 max-h-[500px]" />
      <ProjectsStatus className="col-span-1 lg:col-span-2 xl:col-span-2 max-h-[500px]" />
      <TaskByUser className="col-span-1 lg:col-span-2 xl:col-span-3 max-h-[500px]" />
    </div>
  );
}
