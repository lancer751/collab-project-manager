import DirectedByDropdown from "./DirectedByDropdown";
import { ProjectFilterByDates } from "./ProjectFilterByDates";
import ProjectStatusFilter from "./ProjectStatusFilter";


export function ProjectFilters({ open }: { open: boolean }) {
  return (
    <div
      className={`px-4 bg-background w-full h-0 items-center flex gap-2.5 transition-[height] ease-linear overflow-hidden ${open && "h-14"}`}
    >
      <ProjectStatusFilter/>
      <DirectedByDropdown />
      <ProjectFilterByDates/>
    </div>
  );
}
