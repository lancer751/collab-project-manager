import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useCountTaksByUser } from "@/hooks/queries/graphs";
import { useMemo } from "react";

interface TaskByUser {
  user: string;
  completed: number;
  assigned: number;
}

const chartConfig = {
  completed: {
    label: "Tareas Completadas",
  },
  assigned: {
    label: "Tareas Asignadas",
  },
} satisfies ChartConfig;

export function TaskByUser() {
  const {data: taskByUserData, isPending, isError} = useCountTaksByUser()

  const chartData = useMemo(() => {
    return taskByUserData ? taskByUserData.map(data => ({
      user: data.fullName,
      completed: data.tareasCompletadas,
      assigned: data.tareasAsigandas
    })) : []
  },[taskByUserData])
  
  const totalCompleted = chartData.reduce((acc, curr) => acc + curr.completed, 0);
  const totalAssigned = chartData.reduce((acc, curr) => acc + curr.assigned, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Carga de trabajo por usuario</CardTitle>
        <CardDescription>
          Observa quién tiene menos carga para delegar tareas.
        </CardDescription>
      </CardHeader>
      <CardContent>
      <ResponsiveContainer>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ left: 0 }}
          >
            <CartesianGrid vertical={true} />
            <YAxis
              dataKey="user"
              type="category"
              tickLine={false}
              tickMargin={10}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <XAxis type="number"/>
            <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
            <Bar
              dataKey="completed"
              stackId="a"
              fill="var(--task-status-completed)"
              radius={[4, 0, 0, 4]}
            />
            <Bar
              dataKey="assigned"
              stackId="a"
              fill="var(--task-status-inprogress)"
              radius={[0, 4, 4, 0]}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {chartData.length > 0 && (
          <>
            <div className="leading-none text-muted-foreground">
              Total de tareas completadas: {totalCompleted}
            </div>
            <div className="leading-none text-muted-foreground">
              Total de tareas asignadas: {totalAssigned}
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
