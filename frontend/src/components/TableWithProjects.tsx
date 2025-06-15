import { ComponentPropsWithoutRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ProjectsTable } from "./ProjectsTable";

type CardWrapperProps = ComponentPropsWithoutRef<"div">;

export function TableWithProjects(props: CardWrapperProps) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Todos los proyectos</CardTitle>
      </CardHeader>
      <CardContent className="overflow-auto relative min-h-[320px] w-full">
        <ProjectsTable />
      </CardContent>
    </Card>
  );
}
