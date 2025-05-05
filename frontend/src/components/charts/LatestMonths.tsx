"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import React from "react";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getRouteApi } from "@tanstack/react-router";
import { useLatestMonthProjects } from "@/hooks/queries/graphs";

const chartConfig = {
  completados: {
    label: "Completados",
    color: "var(--completed)",
  },
  cancelados: {
    label: "Cancelados",
    color: "var(--canceled)",
  },
} satisfies ChartConfig;

export function LatestMonths() {
  const { data, isLoading, error } = useLatestMonthProjects();

  const customInfoData = React.useMemo(() => (
    data ? Object.entries(data).map((arr) => {
      return {
        month: arr[0].toLowerCase(),
        completados: arr[1].Completado,
        cancelados: arr[1].cancelado,
      };
    }) : []
  ), [data]);

  const MonthsWithMotshCompleted = React.useMemo(() => (
    customInfoData.length > 0
      ? customInfoData
          .reduce((max, curr) =>
            curr.completados > max.completados ? curr : max
          )
          .month
      : ""
  ), [customInfoData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Últimos 4 meses</CardTitle>
        <CardDescription>Enero - Junio 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="w-full min-h-[200px] h-[300px]"
          config={chartConfig}
        >
          <BarChart accessibilityLayer data={customInfoData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="completados" fill="var(--completed)" radius={4} />
            <Bar dataKey="cancelados" fill="var(--canceled)" radius={4} />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {`Total de proyectos completados: ${customInfoData.reduce((acc, curr) => acc + curr.completados, 0)}`}
        </div>
        <div className="flex items-center gap-2 font-medium leading-none">
          {`Total de proyectos cancelados: ${customInfoData.reduce((acc, curr) => acc + curr.cancelados, 0)}`}
        </div>
        <div className="leading-none text-muted-foreground">
          Mes con más completados: <strong className="capitalize">{MonthsWithMotshCompleted}</strong>
        </div>
      </CardFooter>
    </Card>
  );
}
