import { ComponentPropsWithoutRef, Fragment } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useRecentProjects } from "@/hooks/queries/graphs";
import { Link, useLocation } from "@tanstack/react-router";
import { StickyNote, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

type RecentTasksProps = ComponentPropsWithoutRef<"div">;

export function RecentTasks(props: RecentTasksProps) {
  const { data: projects, isPending } = useRecentProjects();
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <Card {...props}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Tareas recientes</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ScrollArea className="h-80 w-full">
          <div className="p-4">
            {isPending &&
              Array.from({ length: 10 }).map((_, idx) => (
                <Fragment key={idx}>
                  <Skeleton className="w-full h-6" />
                  <Separator className="my-2" />
                </Fragment>
              ))}
            {!isPending && projects && projects.map((pr, index) => (
              <Fragment key={index}>
                <Link
                  to={currentPath}
                  search={(prev) => ({
                    ...prev,
                    prjt: pr.id,
                  })}
                  resetScroll={false}
                  className={cn(
                    "text-sm hover:text-cyan-400 transition-colors inline-flex items-center gap-2",
                    isPending && "text-muted-foreground"
                  )}
                >
                  <StickyNote  size={18}/>
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
