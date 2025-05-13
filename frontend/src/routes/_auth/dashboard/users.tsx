import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Search, Check } from "lucide-react";
import { getAllUsers } from "@/services/users";
import { DataTable } from "@/components/common/data-table";
import { UsersColumns } from "@/components/users/users-columns";
import { useUsers } from "@/hooks/queries/users";

const ORDER = [
  { label: "Nombre", value: "name" },
  { label: "Gmail", value: "gmail" },
  { label: "Fecha de ingreso", value: "fech_ingreso" },
];

const STATUS = [
  {label: "todos", value: "all"},
  {label: "Activo", value: "true"},
  {label: "Retirado", value: "false"},
]

export const Route = createFileRoute("/_auth/dashboard/users")({
  component: RouteComponent,
  loader: async ({ context: { queryClient } }) => {
    queryClient.prefetchQuery({
      queryKey: ["users"],
      queryFn: getAllUsers,
    });
  },
});

interface UserFilters {
  status: string,
  sortBy: string,
  rol: string,
}

function RouteComponent() {
  const {data, isPending, isError} = useUsers()
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Partial<UserFilters>>({
    status: "all",
    sortBy: "recientes",
    rol: "all"
  })

  const users = data ? data.users : []

  return (
    <div className="space-y-6">
      {/* filters container */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* search bar */}
        <div className="relative w-full max-w-xs">
          <Input
            placeholder="Buscar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        </div>
        {/* dropdowns sorters and filters */}
        <div className="flex gap-2 items-center justify-end w-full md:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                Estado <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuRadioGroup value="todos">
                <DropdownMenuRadioItem value={"todos"}>
                  Todos
                </DropdownMenuRadioItem>
                
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          
        </div>
      </div>
      <DataTable columns={UsersColumns} data={users}/>
    </div>
  );
}
