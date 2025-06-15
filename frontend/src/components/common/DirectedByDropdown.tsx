import { Check, ChevronDown, X } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";

type User = {
  value: string; // id o slug
  label: string; // nombre completo
};

const userOptions: User[] = [
  {
    value: "maria-gonzalez",
    label: "María González",
  },
  {
    value: "juan-perez",
    label: "Juan Pérez",
  },
  {
    value: "ana-lopez",
    label: "Ana López",
  },
  {
    value: "carlos-ramirez",
    label: "Carlos Ramírez",
  },
  {
    value: "laura-martinez",
    label: "Laura Martínez",
  },
];

export default function DirectedByDropdown() {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const handleSelectUser = (selectedUser: string) => {
    const selectedOption = userOptions.find(
      (stat) => stat.value === selectedUser
    );
    if (!selectedOption) return;
    if (selectedUsers.some((stat) => stat.value === selectedUser)) {
      const updatedSelectedStatus = selectedUsers.filter(
        (stat) => stat.value !== selectedUser
      );
      setSelectedUsers(updatedSelectedStatus);
      return;
    }

    setSelectedUsers((prev) => [...prev, selectedOption]);
    setOpen(false);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant={`${selectedUsers.length > 0 ? "secondary" : "outline"}`}
          className="text-xs"
        >
          {selectedUsers.length > 0 ? (
            <>Dirigido por: {selectedUsers[0].label}</>
          ) : (
            <>
              Dirigido por <ChevronDown />
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" side="bottom" align="start">
        <Command>
          <CommandInput placeholder="Buscar usuarios..." />
          {selectedUsers.length > 0 && (
            <div className="w-full px-2 py-2 flex">
              <div className="flex flex-1 flex-wrap gap-2 p-1">
                {selectedUsers.map((status) => (
                  <span
                    key={status.label}
                    className="inline-flex items-center gap-1.5 text-sm"
                  >
                    {status.label}
                    <Button
                      onClick={() => handleSelectUser(status.value)}
                      size={"icon"}
                      className="cursor-pointer rounded-full w-5 h-5  bg-cyan-800 text-white hover:bg-slate-400 hover:bg-none group"
                    >
                      <X size={4} />
                    </Button>
                  </span>
                ))}
              </div>
              <div>
                <Button
                  onClick={() => setSelectedUsers([])}
                  size={"icon"}
                  className="rounded-full w-5 h-5"
                >
                  <X />
                </Button>
              </div>
            </div>
          )}
          <CommandList>
            <CommandEmpty>No hay resultados disponibles.</CommandEmpty>
            <CommandGroup>
              {userOptions.map((status) => (
                <CommandItem
                  key={status.value}
                  value={status.value}
                  onSelect={handleSelectUser}
                  className="flex justify-between"
                >
                  {status.label}
                  {selectedUsers.some(
                    (stat) => stat.value === status.value
                  ) && <Check />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
