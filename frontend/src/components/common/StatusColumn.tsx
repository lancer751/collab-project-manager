// StatusColumn.tsx
import { CircleSmall } from "lucide-react";
import { Button } from "../ui/button";
import { SortableContext } from "@dnd-kit/sortable";
import { cn } from "@/lib/utils";
import React from "react";

export interface StatusColumnProps<T> {
  /** Estado que filtra y colorea la columna */
  status: string;
  /** Array genérico de ítems a mostrar */
  items: T[];
  /** Función que devuelve la key de cada ítem */
  getId: (item: T) => string | number;
  /** Componente que renderiza cada ítem */
  renderItem: (item: T) => React.ReactNode;
  /** Texto del botón de añadir */
  addButtonLabel?: string;
  /** Callback de añadir */
  onAdd?: () => void;
  /** Mapa de colores por estado */
  statusColorMap: Record<string, string>;
}

export function StatusColumn<T>({
  status,
  items,
  getId,
  renderItem,
  addButtonLabel = "Nuevo ítem",
  onAdd,
  statusColorMap,
}: StatusColumnProps<T>) {
  const bg = statusColorMap[status] ?? "bg-gray-100";
  const text = statusColorMap[status]
    ? `${statusColorMap[status]}/80`
    : "text-gray-600";
  return (
    <div className={cn("rounded-md w-full h-max px-2 py-3", bg)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span
          className={cn(
            "project-tag-status text-sm", 
            status === "Completado" && "project-completed",
            status === "Cancelado" && "project-canceled",
            status === "Curso" && "project-inprogress",
            status === "Pausa" && "project-paused",
            status === "Riesgo" && "project-inrisk"
          )}
        >
          <CircleSmall className="fill-current" size={16} /> {status}
        </span>
      </div>

      {/* Contenido */}
      <div className="flex flex-col gap-2">
        <SortableContext items={items.map(getId)}>
          {items.map((item) => (
            <React.Fragment key={getId(item)}>
              {renderItem(item)}
            </React.Fragment>
          ))}
        </SortableContext>

        {/* Botón Añadir */}
        {onAdd && (
          <Button
            variant="outline"
            className={cn("justify-start", text, "hover:" + text)}
            onClick={onAdd}
          >
            + {addButtonLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
