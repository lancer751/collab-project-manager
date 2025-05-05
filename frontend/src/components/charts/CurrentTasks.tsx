"use client";

import { Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { MonthlyData, TasksStatusCount } from "@/types/graph.types";
import { useTasksByState } from "@/hooks/queries/graphs";

const chartConfig = {
  count: {
    label: "cantidad",
  },
} satisfies ChartConfig;

export function CurrentTasks() {
  const { data, isLoading, error } = useTasksByState();

  if (isLoading) return <div>Cargando tareas actuales...</div>;
  if (error) return <div>Error al cargar las tareas actuales</div>;
  if (!data) return null;

  // Adaptar los datos recibidos de la API al formato que espera el gráfico
  const chartData = [
    { status: "En Revisión", count: data["En Revisión"], fill: "var(--task-status-revision)" },
    { status: "En Curso", count: data["En Curso"], fill: "var(--task-status-inprogress)" },
    { status: "Sin Empezar", count: data["Sin Empezar"], fill: "var(--task-status-unstarted)" },
    { status: "Archivadas", count: data["Archivadas"], fill: "var(--task-status-archived)" },
    { status: "Terminados", count: data["Terminados"], fill: "var(--task-status-completed)" },
  ];

  return (
    <Card className="flex flex-col max-h-[500px]">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-lg">Tareas Actuales</CardTitle>
        <CardDescription>
          Se muestran las tareas por estado del mes actual
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ResponsiveContainer>
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[350px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie data={chartData} dataKey="count" label nameKey="status" />
              <Legend />
            </PieChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
