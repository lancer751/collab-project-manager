import { format } from "date-fns";
import { CalendarIcon, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "../ui/dropdown-menu";

export function ProjectFilterByDates() {
  const [date, setDate] = useState<Date>();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size={"sm"}
            variant={"outline"}
            className="text-muted-foreground"
          >
            Fechas <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          sideOffset={8}
          className="flex flex-col gap-3 p-2 min-w-48"
        >
          <Popover>
            <div className="flex flex-col gap-2">
              <span className="text-sm">Fecha de Inicio</span>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  size={"sm"}
                  className={cn(
                    "w-[200px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {date ? (
                    format(date, "yyyy/MM/dd")
                  ) : (
                    <span className="inline-flex gap-2 items-center">
                      Selecciona una fecha <ChevronDown />
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
            </div>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex flex-col gap-2">
                <span className="text-sm">Fecha de Finalización</span>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    className={cn(
                      "w-[200px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {date ? (
                      format(date, "yyyy/MM/dd")
                    ) : (
                      <span className="inline-flex gap-2 items-center">
                        Selecciona una fecha <ChevronDown />
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
