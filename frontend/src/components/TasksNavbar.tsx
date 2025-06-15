import { Link } from "@tanstack/react-router";
import { Atom, CircleDot, Filter, KanbanIcon, Rows3Icon } from "lucide-react";
import { useState } from "react";
import { SearchForm } from "./common/SearchForm";
import { Button } from "./ui/button";
import { ProjectFilters } from "./common/ProjectFilters";

const navigationOptions = [
  {
    label: "overview",
    href: "/dashboard/tasks/",
    icon: Atom,
  },
  {
    label: "por proyecto",
    href: "/dashboard/tasks/per-project",
    icon: CircleDot,
  },
  {
    label: "tablero",
    href: "/dashboard/tasks/kanban",
    icon: KanbanIcon,
  },
  {
    label: "todos",
    href: "/dashboard/tasks/all",
    icon: Rows3Icon,
  },
];

export default function TasksNavbar() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <nav className="flex bg-background px-4 h-16 items-center justify-between border-b overflow-x-auto">
        <div className="flex gap-3 items-center text-sm">
          {navigationOptions.map((option, index) => (
            <Link
              key={index}
              to={option.href}
              activeProps={{ className: "text-cyan-600" }}
              activeOptions={{ exact: true }}
              className="capitalize flex items-center gap-1"
            >
              <option.icon size={16} /> {option.label}
            </Link>
          ))}
        </div>
        <div className="flex items-centern gap-2">
          <SearchForm />
          <Button
            onClick={() => setOpen(!open)}
            size={"sm"}
            className="text-sm"
            variant="ghost"
          >
            <Filter className="size-3" />
            {open ? "Ocultar" : "Filtrar"}
          </Button>
        </div>
      </nav>
      <ProjectFilters open={open} />
    </>
  );
}
