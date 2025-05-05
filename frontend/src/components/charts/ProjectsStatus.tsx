"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart, ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useCountProjectsByState } from "@/hooks/queries/graphs";

// const chartData = [
//   { status: "chrome", count: 275, fill: "var(--project-status-inprogress)" },
//   { status: "safari", count: 200, fill: "var(--color-safari)" },
//   { status: "firefox", count: 287, fill: "var(--color-firefox)" },
//   { status: "edge", count: 173, fill: "var(--color-edge)" },
//   { status: "other", count: 190, fill: "var(--color-other)" },
// ];

const statusColors: Record<string, string> = {
  "Completados": "var(--project-status-completed)",
  "En Pausa": "var(--project-status-paused)",
  "En Curso": "var(--project-status-inprogress)",
  "Cancelado": "var(--project-status-canceled)",
  "En Riesgo": "var(--project-status-risk)",
};

const chartConfig = {
  count: {
    label: "Proyectos",
  },
  "Completados": {
    label: "Completados",
    color: "var(--project-status-completed)",
  },
  "En Pausa": {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function ProjectsStatus() {
  const { data: countProjects, isPending, isError } = useCountProjectsByState();
  
  const chartData = React.useMemo(
    () =>
      countProjects
        ? Object.entries(countProjects).map(([status, count]) => ({
          status,
          count,
          fill: statusColors[status] || "var(--default-color]"
        }))
        : [],
        [countProjects]
      );

  const totalProjects = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, [chartData]);
  
  const growthPercent = 5.2; // Assuming a default growth percent
  const topStatus = chartData.length
    ? chartData.reduce((max, curr) => (curr.count > max.count ? curr : max)).status
    : "";

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-lg">
          Recuento de proyectos por estado
        </CardTitle>
        <CardDescription>Enero - Junio 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ResponsiveContainer>
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="status"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalProjects.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Proyectos
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {`Este mes los proyectos aumentaron un ${growthPercent}%`} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          {`Total: ${totalProjects} proyectos. El estado más frecuente es "${topStatus}".`}
        </div>
        <div className="leading-none text-muted-foreground">
          {`Datos de enero a junio de 2025.`}
        </div>
      </CardFooter>
    </Card>
  );
}
