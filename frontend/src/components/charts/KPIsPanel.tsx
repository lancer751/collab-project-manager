import { useRelevantKPIS } from "@/hooks/queries/graphs";
import { CheckCircle, ListChecks, Timer, CalendarCheck } from "lucide-react";

export function KPIsPanel() {
  const { data: kpis } = useRelevantKPIS();


  const kpiList = [
    {
      label: "Proyectos activos",
      value: kpis?.totalProjectActive,
      icon: <CheckCircle className="text-green-600 w-8 h-8" />,
      bg: "bg-green-50 dark:bg-green-50/10"
    },
    {
      label: "Tareas en progreso",
      value: kpis?.tasksProgress,
      icon: <ListChecks className="text-blue-600 w-8 h-8" />,
      bg: "bg-blue-50 dark:bg-blue-50/10"
    },
    {
      label: "Promedio entrega tarea",
      value: `${kpis?.averageTaskFinish}min`,
      icon: <Timer className="text-yellow-600 w-8 h-8" />,
      bg: "bg-yellow-50 dark:bg-yellow-50/10"
    },
    {
      label: "Promedio finalización proyecto",
      value: `${kpis?.averageProjectFinish} días`,
      icon: <CalendarCheck className="text-purple-600 w-8 h-8" />,
      bg: "bg-purple-50 dark:bg-purple-50/10"
    }
  ];

  return (
    <div className="col-span-2">
      <div className="text-lg font-semibold mb-4">KPIs Clave</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiList.map((kpi, idx) => (
          <div key={idx} className="rounded-md bg-primary-foreground flex flex-col items-center justify-center py-5">
              <div className="mb-2">{kpi.icon}</div>
              <div className="text-normal text-muted-foreground">{kpi.label}</div>
              <div className="text-2xl text-gray-400 font-bold">{kpi.value ?? "-"}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 