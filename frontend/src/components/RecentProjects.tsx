import { ComponentPropsWithoutRef, Fragment } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

type RecentProjectsProps = ComponentPropsWithoutRef<"div">;

export function RecentProjects(props: RecentProjectsProps) {
  return (
    <Card {...props}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Proyectos recientes</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ScrollArea className="h-80 w-full">
          <div className="p-4">
            {tags.map((tag) => (
              <Fragment key={tag}>
                <div className="text-sm">{tag}</div>
                <Separator className="my-2" />
              </Fragment>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
