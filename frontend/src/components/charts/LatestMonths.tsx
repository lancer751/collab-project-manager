"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from "recharts";

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
import { useEffect, useRef, useState } from "react";
const chartData = [
  { month: "Enero", completados: 186, cancelados: 80 },
  { month: "Febrero", completados: 305, cancelados: 200 },
  { month: "Marzo", completados: 237, cancelados: 120 },
  { month: "Abril", completados: 73, cancelados: 190 },
  { month: "Mayo", completados: 209, cancelados: 130 },
  { month: "Junio", completados: 214, cancelados: 140 },
];

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(() => {
      setWidth(containerRef.current!.offsetWidth);
    });
    observer.observe(containerRef.current);
    console.log(width);
    return () => observer.disconnect();
  }, [width]);

  return (
    <Card ref={containerRef}>
      <CardHeader>
        <CardTitle className="text-lg">Últimos 6 meses</CardTitle>
        <CardDescription>Enero - Junio 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="w-full min-h-[200px] h-[300px]"
          config={chartConfig}
        >
          <BarChart accessibilityLayer data={chartData}>
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
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
