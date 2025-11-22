"use client"

import { Bar, BarChart, CartesianGrid, Cell, LabelList, Pie, PieChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface Stats {
  modalityBreakdown: Array<{ name: string; count: number }>
  degreeBreakdown: Array<{ name: string; count: number }>
  topStates: Array<{ name: string; count: number }>
}

export function AdminCharts({ stats }: { stats: Stats }) {
  // Modality Chart Config
  const modalityData = stats.modalityBreakdown.map((item, index) => ({
    name: item.name,
    count: item.count,
    fill: `hsl(var(--chart-${(index % 5) + 1}))`,
  }))

  const modalityConfig = {
    count: {
      label: "Programas",
    },
    ...Object.fromEntries(modalityData.map((item) => [item.name, { label: item.name, color: item.fill }])),
  } satisfies ChartConfig

  // Degree Chart Config
  const degreeData = stats.degreeBreakdown.slice(0, 5).map((item, index) => ({
    name: item.name,
    count: item.count,
    fill: `hsl(var(--chart-${(index % 5) + 1}))`,
  }))

  const degreeConfig = {
    count: {
      label: "Programas",
    },
  } satisfies ChartConfig

  // Top States Chart Config
  const statesData = stats.topStates.slice(0, 10).map((item, index) => ({
    name: item.name,
    count: item.count,
  }))

  const statesConfig = {
    count: {
      label: "Programas",
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Modality Pie Chart */}
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Programas por Modalidad</CardTitle>
          <CardDescription>Distribución de programas educativos</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer config={modalityConfig} className="mx-auto aspect-square max-h-[300px]">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie data={modalityData} dataKey="count" nameKey="name" innerRadius={60} strokeWidth={5}>
                <LabelList
                  dataKey="count"
                  className="fill-foreground"
                  stroke="none"
                  fontSize={12}
                  formatter={(value: keyof typeof modalityConfig) => value.toLocaleString()}
                />
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="name" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Top States Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Top 10 Estados</CardTitle>
          <CardDescription>Estados con mayor oferta educativa</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={statesConfig} className="min-h-[300px] w-full">
            <BarChart accessibilityLayer data={statesData} layout="vertical" margin={{ left: 0, right: 0 }}>
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                width={100}
                fontSize={12}
              />
              <XAxis dataKey="count" type="number" hide />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
              <Bar dataKey="count" layout="vertical" fill="var(--color-count)" radius={4}>
                <LabelList dataKey="count" position="right" offset={8} className="fill-foreground" fontSize={12} />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Degree Bar Chart (Full Width) */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Programas por Grado Académico</CardTitle>
          <CardDescription>Nivel de estudios de los programas ofertados</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={degreeConfig} className="h-[300px] w-full">
            <BarChart accessibilityLayer data={degreeData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="count" radius={8}>
                {degreeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
