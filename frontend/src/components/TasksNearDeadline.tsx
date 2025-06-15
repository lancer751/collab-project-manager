import { ComponentPropsWithoutRef, Fragment } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useProjectsNearDeadline } from "@/hooks/queries/graphs";
import { Link, useLocation } from "@tanstack/react-router";
import { StickyNote } from "lucide-react";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";

type TasksNearDeadlineProps = ComponentPropsWithoutRef<"div">;

export default function TasksNearDeadline(props: TasksNearDeadlineProps) {
  const { data: projects, isPending } = useProjectsNearDeadline();
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <Card {...props}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Próximos a entregar</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ScrollArea className="h-80 w-full min-w-96">
          <div className="p-4 w-full">
            {isPending &&
              Array.from({ length: 10 }).map((_, idx) => (
                <Fragment key={idx}>
                  <Skeleton className="w-full h-6" />
                  <Separator className="my-2" />
                </Fragment>
              ))}
            {!isPending && projects && projects.map((pr, index) => (
              <Fragment key={index}>
                <div className="flex items-center justify-between">
                  <Link
                    to={currentPath}
                    search={(prev) => ({
                      ...prev,
                      prjt: pr.id,
                    })}
                    resetScroll={false}
                    className="text-sm hover:text-cyan-400 transition-colors inline-flex items-center gap-4"
                  >
                    <span className="inline-flex items-center gap-2">
                      <StickyNote size={18} />
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
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
