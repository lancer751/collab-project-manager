import { ComponentPropsWithoutRef, Fragment } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { useRecentComments } from "@/hooks/queries/comments.query";
import { cn } from "@/lib/utils";

type RecentCommentsProps = ComponentPropsWithoutRef<"div">;

export function RecentComments(props: RecentCommentsProps) {
    const {data: comments, isPending} = useRecentComments()
  return (
    <Card {...props}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Comentarios recientes</CardTitle>
      </CardHeader>
      <CardContent className={cn("flex-1", (comments && comments.length === 0) && "flex items-center justify-center")}>
        {
            isPending ? (
                <div className="h-full w-full bg-muted-foreground animate-pulse"></div>
            ) : comments && comments.length > 0 ? (
                <ScrollArea className="h-80 w-full">
                <div className="p-4">
                    {comments?.map((cmmt, index) => (
                    <Fragment key={index}>
                        <Link
                        to={"/dashboard/projects"}
                        className="text-sm hover:text-cyan-400 transition-colors inline-flex items-center gap-2"
                        >
                        <MessageCircle size={18} />
                        {cmmt.author}
                        </Link>
                        <Separator className="my-2" />
                    </Fragment>
                    ))}
                </div>
                </ScrollArea>
            ) : (
                <div className="self-center justify-self-center text-muted-foreground">No hay comentarios para mostrar</div>
            )
        }
      </CardContent>
    </Card>
  );
}
