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
const chartData = [
  { status: "en revisión", count: 275, fill: "var(--task-status-revision)" },
  { status: "en curso", count: 200, fill: "var(--task-status-inprogress)" },
  { status: "sin empezar", count: 187, fill: "var(--task-status-unstarted)" },
  { status: "archivado", count: 173, fill: "var(--task-status-archived)" },
  { status: "completado", count: 173, fill: "var(--task-status-completed)" },
];

const chartConfig = {
  count: {
    label: "cantidad",
  },
} satisfies ChartConfig;

export function CurrentTasks() {
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
