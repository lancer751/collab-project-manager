import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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
import { ComponentPropsWithoutRef, useMemo } from "react";

export const description = "Un gráfico de anillo con proyectos por estado";

// Datos de ejemplo: sustituye `count` por tu fuente real
const chartData = [
  { status: "Completado", count: 42, fill: "var(--chart-1)" },
  { status: "Cancelado", count: 8, fill: "var(--chart-2)" },
  { status: "Curso", count: 25, fill: "var(--chart-3)" },
  { status: "Pausa", count: 5, fill: "var(--chart-4)" },
  { status: "Riesgo", count: 10, fill: "var(--chart-5)" },
];

const chartConfig = {
  count: {
    label: "Proyectos",
  },
  Completado: {
    label: "Completado",
    color: "var(--chart-1)",
  },
  Cancelado: {
    label: "Cancelado",
    color: "var(--chart-2)",
  },
  Curso: {
    label: "En curso",
    color: "var(--chart-3)",
  },
  Pausa: {
    label: "En pausa",
    color: "var(--chart-4)",
  },
  Riesgo: {
    label: "En riesgo",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

type CardWrapperProps = ComponentPropsWithoutRef<"div">;

export function ProjectsAssigned(props: CardWrapperProps) {
  const totalProjects = useMemo(() => {
    return chartData.reduce((sum, entry) => sum + entry.count, 0);
  }, []);

  return (
    <Card {...props}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Proyectos por estado</CardTitle>
        <CardDescription>Enero – Junio 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
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
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Tendencia positiva del 5.2% este semestre{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Total de proyectos registrados en el primer semestre de 2025
        </div>
      </CardFooter>
    </Card>
  );
}
