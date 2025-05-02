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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface TaskByUser {
  user: string;
  Completed: number;
  Assigned: number;
}

const charData: TaskByUser[] = [
  { user: "Ana García", Completed: 8, Assigned: 15 },
  { user: "Carlos Rodríguez", Completed: 12, Assigned: 20 },
  { user: "María Sánchez", Completed: 5, Assigned: 12 },
  { user: "David Martínez", Completed: 15, Assigned: 25 },
  { user: "Elena Torres", Completed: 7, Assigned: 18 },
  { user: "Javier López", Completed: 10, Assigned: 16 },
];

const chartConfig = {
  Completed: {
    label: "Tareas Completadas",
  },
  Assigned: {
    label: "Tareas Asignadas",
  },
} satisfies ChartConfig;

export function TaskByUser() {
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
            data={charData}
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
              dataKey="Completed"
              stackId="a"
              fill="var(--task-status-completed)"
              radius={[4, 0, 0, 4]}
            />
            <Bar
              dataKey="Assigned"
              stackId="a"
              fill="var(--task-status-inprogress)"
              radius={[0, 4, 4, 0]}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
