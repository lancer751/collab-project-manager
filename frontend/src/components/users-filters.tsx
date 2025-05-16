import React, { useState } from "react";
import { Input } from "./ui/input";
import { CheckCircle, ChevronDown, Circle, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { UserRequestFilters, UserRequestSort } from "@/types/user.types";

interface UserFiltersProps {
  filters: UserRequestFilters;
  sorters: UserRequestSort;
  setFilters: React.Dispatch<React.SetStateAction<UserRequestFilters>>;
  setSorters: React.Dispatch<React.SetStateAction<UserRequestSort>>;
}

export default function UsersFilters({
  filters,
  sorters,
  setFilters,
  setSorters,
}: UserFiltersProps) {
  const [search, setSearch] = useState("");

  return (
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
      <div className="flex gap-4 items-center justify-end w-full md:w-auto">
        {/* filter by status */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              {filters.status
                ? `Estado: ${filters.status === "true" ? "Activos" : "Retirados"}`
                : "Estado"}{" "}
              <ChevronDown className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuRadioGroup
              value={filters.status}
              onValueChange={(status) => setFilters({ ...filters, status })}
            >
              <DropdownMenuRadioItem value={""}>Todos</DropdownMenuRadioItem>
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
        {/* filter by rol */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              {filters.rol ? `Rol: ${filters.rol}` : "Rol"}{" "}
              <ChevronDown className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuRadioGroup
              value={filters.rol}
              onValueChange={(rol) => setFilters({ ...filters, rol })}
            >
              <DropdownMenuRadioItem value={""}>Todos</DropdownMenuRadioItem>
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
        {/* sorters */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              Ordenar <ChevronDown className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => setSorters({})}
              className="flex justify-between"
            >
              Ninguno
              <CheckCircle className={`${!!sorters.by && "hidden"}`} />
            </DropdownMenuItem>
            {/* {entry name} */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="gap-3">
                Nombre y apellidos
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent sideOffset={8}>
                <DropdownMenuRadioGroup
                  value={
                    sorters.by === "name" && sorters.direction
                      ? sorters.direction
                      : ""
                  }
                  onValueChange={(direction) =>
                    setSorters({ by: "name", direction })
                  }
                >
                  <DropdownMenuRadioItem value={"asc"}>
                    <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
                      <Circle className="size-3.5" />
                    </span>
                    De forma ascendente
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={"desc"}>
                    De forma descendente
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            {/* {entry gmail} */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="gap-3">
                Gmail
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent sideOffset={8}>
                <DropdownMenuRadioGroup
                  value={
                    sorters.by === "email" && sorters.direction
                      ? sorters.direction
                      : ""
                  }
                  onValueChange={(direction) =>
                    setSorters({ by: "email", direction })
                  }
                >
                  <DropdownMenuRadioItem value={"asc"}>
                    De forma ascendente
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={"desc"}>
                    De forma descendente
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            {/* {entry date} */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="gap-3">
                Fecha de ingreso
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent sideOffset={8}>
                <DropdownMenuRadioGroup
                  value={
                    sorters.by === "entryDate" && sorters.direction
                      ? sorters.direction
                      : ""
                  }
                  onValueChange={(direction) =>
                    setSorters({ by: "entryDate", direction })
                  }
                >
                  <DropdownMenuRadioItem value={"asc"}>
                    De forma ascendente
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={"desc"}>
                    De forma descendente
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
