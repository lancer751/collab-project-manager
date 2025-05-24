import {
  CalendarIcon,
  Circle,
  CircleDot,
  SquareUser,
  Trash,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { RowSelectionState } from "@tanstack/react-table";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";
import { useEffect, useState } from "react";
import { EditMultipleUsers } from "@/types/user.types";
import { format } from "date-fns";
import { useUpdateUsers } from "@/hooks/mutations/user.mutation";

interface EditFiltersProps {
  selectedRows: RowSelectionState;
  handleSelectedRows: () => void;
}

export function EditFilters({
  selectedRows,
  handleSelectedRows,
}: EditFiltersProps) {
  const selectedUsersId = Object.entries(selectedRows)
    .filter(([_, value]) => value === true)
    .map(([key, _]) => Number(key));
  const [modifyUsers, setModifyUsers] = useState<EditMultipleUsers>({userIds: []});
  const { mutateAsync } = useUpdateUsers();

  useEffect(() => {
    if (
      selectedUsersId.length > 0 &&
      (modifyUsers.enable || modifyUsers.entryDate || modifyUsers.enable)
    ) {
      mutateAsync({...modifyUsers, userIds: selectedUsersId});
      setModifyUsers({userIds: []})
    }
  }, [modifyUsers, mutateAsync, handleSelectedRows, selectedUsersId]);

  console.log(selectedUsersId);
  console.log(modifyUsers);

  return (
    <div className="fixed bottom-5 bg-secondary text-white rounded-md px-1.5 py-1.5 w-[90%] max-w-2xl -translate-x-1/2 left-1/2">
      <div className="flex justify-between items-center">
        <Button
          className="text-sm py-1 px-4 rounded-md"
          size={"sm"}
          variant={"outline"}
          onClick={handleSelectedRows}
        >
          <X size={4} />
          {`${selectedUsersId.length} seleccionados`}
        </Button>
        <div className="flex gap-2 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"outline"}
                className="text-sm py-1 px-4 rounded-md"
                size={"sm"}
              >
                <CircleDot />
                Estado
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={14}>
              <DropdownMenuRadioGroup
                value={modifyUsers.enable}
                onValueChange={(status) =>
                  setModifyUsers({ ...modifyUsers, enable: status })
                }
              >
                <DropdownMenuRadioItem value={"true"}>
                  <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
                    <Circle className="size-3.5" />
                  </span>
                  Activo
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value={"false"}>
                  <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
                    <Circle className="size-3.5" />
                  </span>
                  Retirado
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"outline"}
                className="text-sm py-1 px-4 rounded-md"
                size={"sm"}
              >
                <SquareUser />
                Rol
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={14}>
              <DropdownMenuRadioGroup
                value={modifyUsers.rol}
                onValueChange={(rol) => setModifyUsers({ ...modifyUsers, rol })}
              >
                <DropdownMenuRadioItem value={"ADMIN"}>
                  <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
                    <Circle className="size-3.5" />
                  </span>
                  Admin
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value={"LIDERSISTEMAS"}>
                  <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
                    <Circle className="size-3.5" />
                  </span>
                  Lider de Sistemas
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value={"LIDERSOFTWARE"}>
                  <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
                    <Circle className="size-3.5" />
                  </span>
                  Lider de Software
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("justify-start text-left font-normal")}
              >
                <CalendarIcon />
                {modifyUsers.entryDate ? (
                  format(modifyUsers.entryDate, "yy/mm/dd")
                ) : (
                  <span>Fecha de ingreso</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={modifyUsers.entryDate}
                onSelect={(date) =>
                  setModifyUsers({ ...modifyUsers, entryDate: date })
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Button
            variant="destructive"
            className="rounded-md p-0.5"
            size="icon"
          >
            <Trash />
          </Button>
        </div>
      </div>
    </div>
  );
}
