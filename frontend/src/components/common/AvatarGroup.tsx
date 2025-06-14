import { RolProject } from "@/types/project.types";
import { User } from "@/types/user.types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface AvatarGroupProps {
  avatars:
    | (Omit<User, "rolDtoList" | "active"> & { rolProject: RolProject })[]
    | User[];
  limit: number;
}

export default function AvatarGroup({ avatars, limit }: AvatarGroupProps) {
  return (
    <div className="flex -space-x-2">
      {avatars.length > 0 ? (
        <>
          {avatars.slice(0, limit).map((user) => (
            <Avatar key={user.id}>
              <AvatarImage src="fsdfds" />
              <AvatarFallback className="uppercase">{`${user.name[0].concat(user.lastname[0])}`}</AvatarFallback>
            </Avatar>
          ))}
          {avatars.length > limit && (
            <span className="h-6 w-6 flex items-center justify-center rounded-full bg-primary text-xs font-medium border-2 border-white">
              +{limit}
            </span>
          )}
        </>
      ) : (
        <span className="text-muted-foreground">Vacío</span>
      )}
    </div>
  );
}
