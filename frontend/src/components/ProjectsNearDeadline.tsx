import { ComponentPropsWithoutRef, Fragment } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useProjectsNearDeadline } from "@/hooks/queries/graphs";
import { Link } from "@tanstack/react-router";
import { Target } from "lucide-react";
import { Separator } from "./ui/separator";

type ProjectsNearDeadlineProps = ComponentPropsWithoutRef<"div">;

export default function ProjectsNearDeadline(props: ProjectsNearDeadlineProps) {
  const { data: projects } = useProjectsNearDeadline();

  return (
    <Card {...props}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Próximos a entregar</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ScrollArea className="h-80 w-full min-w-96">
          <div className="p-4 w-full">
            {projects?.map((pr, index) => (
              <Fragment key={index}>
                <div className="flex items-center justify-between">
                  <Link
                    to={"/dashboard/projects"}
                    className="text-sm hover:text-cyan-400 transition-colors inline-flex items-center gap-4"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Target size={18} />
                      {pr.title}
                    </span>
                  </Link>
                  <span className="text-sm inline-block text-muted-foreground">
                    {pr.timeFinish}
                  </span>
                </div>
                <Separator className="my-2" />
              </Fragment>
            ))}
          </div>
          <ScrollBar orientation="horizontal"/>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
