import { Button } from "@/components/ui/button";
import { formatDateToString } from "@/helpers/utils/formatDate";
import { createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Clock,
  MessageSquare,
  UserPlus,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_auth/dashboard/inbox")({
  component: RouteComponent,
  loader: () => ({ crumb: "bandeja de entrada" }),
});
export interface Notification {
  id: string;
  type:
    | "project_update"
    | "comment_mention"
    | "deadline_reminder"
    | "task_assignment"
    | "performance_alert"
    | "system_announcement";
  message: string;
  description?: string;
  timestamp: string;
  linkId?: string;
  read: boolean;
}

const sampleNotifications: Notification[] = [
  {
    id: "n1",
    type: "task_assignment",
    message: "Has sido asignado a la tarea “Redactar propuesta”",
    description: "En el proyecto “Lanzamiento web”",
    timestamp: "2025-06-12T10:00:00Z",
    linkId: "task-123",
    read: false,
  },
  {
    id: "n2",
    type: "deadline_reminder",
    message: "Recordatorio: la tarea “Preparar reporte” vence mañana",
    timestamp: "2025-06-12T08:00:00Z",
    linkId: "task-456",
    read: true,
  },
];

const iconMap = {
  project_update: Bell,
  comment_mention: MessageSquare,
  deadline_reminder: Clock,
  task_assignment: UserPlus,
  performance_alert: AlertTriangle,
  system_announcement: CheckCircle,
};

function RouteComponent() {
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filtered = sampleNotifications.filter((n) =>
    filter === "all" ? true : !n.read
  );
  return (
    <div className="p-4">
      {/* Filtros */}
      <div className="flex gap-2 mb-4">
        <Button
          variant={`${filter === "all" ? "default" : "ghost"}`}
          onClick={() => setFilter("all")}
        >
          Todas
        </Button>
        <Button
          variant={`${filter === "unread" ? "default" : "ghost"}`}
          onClick={() => setFilter("unread")}
        >
          No leídas
        </Button>
      </div>
      {/* Lista de notificaciones */}
      <ul className="space-y-4">
        {filtered.map((n) => {
          const Icon = iconMap[n.type];
          const date = new Date(n.timestamp);
          return (
            <li
              key={n.id}
              className={`flex items-start gap-3 p-3 rounded shadow-sm ${n.read ? "bg-secondary" : "bg-muted"}`}
            >
              <Icon className="w-6 h-6 flex-shrink-0 text-gray-600" />
              <div className="flex-grow">
                <p className="font-medium">{n.message}</p>
                {n.description && (
                  <p className="text-sm text-gray-500">{n.description}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  {formatDateToString(date)}
                </p>
              </div>
              {!n.read && (
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-1 flex-shrink-0" />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
