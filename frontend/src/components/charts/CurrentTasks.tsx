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
import { useTasksByState } from "@/hooks/queries/graphs";
import { ComponentPropsWithoutRef, useMemo } from "react";

const chartConfig = {
  count: {
    label: "cantidad",
  },
} satisfies ChartConfig;
type CardWrapperProps = ComponentPropsWithoutRef<"div">;

export function CurrentTasks(props: CardWrapperProps) {
  const { data } = useTasksByState();

  const chartData = useMemo(() => {
    const colorBar: Record<string, string> = {
      "En Revisión": "var(--task-status-revision)",
      "En Curso": "var(--task-status-inprogress)",
      "Sin Empezar": "var(--task-status-unstarted)",
      Archivadas: "var(--task-status-archived)",
      Terminados: "var(--task-status-completed)",
    };

    return data
      ? Object.entries(data).map(([key, value]) => ({
          status: key,
          count: value,
          fill: colorBar[key] || "#ccc",
        }))
      : [];
  }, [data]);

  const emptyData = chartData.every((bar) => bar.count === 0);

  return (
    <Card {...props}>
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-lg">Tareas Actuales</CardTitle>
        <CardDescription>
          Se muestran las tareas por estado del mes actual
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {emptyData ? (
          <div className="h-full px-4 text-center text-sm bg-secondary rounded-md flex items-center justify-center">
            <p className="mx-auto max-w-52">Actualmente no hay tareas para mostrar en el gráfico.</p>
          </div>
        ) : (
          <ResponsiveContainer>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[300px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
            >
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={chartData}
                  dataKey="count"
                  label
                  nameKey="status"
                  isAnimationActive={false}
                />
                <Legend />
              </PieChart>
            </ChartContainer>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
