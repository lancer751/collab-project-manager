import { ComponentPropsWithoutRef, Fragment } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useRecentProjects } from "@/hooks/queries/graphs";
import { Link } from "@tanstack/react-router";
import { Target } from "lucide-react";

type RecentProjectsProps = ComponentPropsWithoutRef<"div">;

export function RecentProjects(props: RecentProjectsProps) {
  const { data: projects } = useRecentProjects();
  return (
    <Card {...props}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Proyectos recientes</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ScrollArea className="h-80 w-full">
          <div className="p-4">
            {projects?.map((pr, index) => (
              <Fragment key={index}>
                <Link
                  to={"/dashboard/projects"}
                  className="text-sm hover:text-cyan-400 transition-colors inline-flex items-center gap-2"
                >
                  <Target size={18} />
                  {pr.title}
                </Link>
                <Separator className="my-2" />
              </Fragment>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
