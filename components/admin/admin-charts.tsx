"use client"

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, LabelList, Pie, PieChart, XAxis, YAxis } from "recharts"
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
  typeBreakdown: Array<{ name: string; count: number }>
  topUniversities: Array<{ name: string; count: number }>
  topStates: Array<{ name: string; count: number }>
}

export function AdminCharts({ stats }: { stats: Stats }) {
  // --- Data Preparation ---

  // 1. Modality Data (Donut Chart)
  const modalityData = stats.modalityBreakdown.map((item, index) => ({
    name: item.name,
    count: item.count,
    fill: `hsl(var(--chart-${(index % 5) + 1}))`,
  }))
  const modalityConfig = {
    count: { label: "Programas" },
    ...Object.fromEntries(modalityData.map((item) => [item.name, { label: item.name, color: item.fill }])),
  } satisfies ChartConfig

  // 2. Type Data (Pie Chart - Licenciatura vs Posgrado)
  const typeData = stats.typeBreakdown.map((item, index) => ({
    name: item.name,
    count: item.count,
    fill: index === 0 ? "hsl(var(--chart-2))" : "hsl(var(--chart-5))",
  }))
  const typeConfig = {
    count: { label: "Programas" },
    Licenciatura: { label: "Licenciatura", color: "hsl(var(--chart-2))" },
    Posgrado: { label: "Posgrado", color: "hsl(var(--chart-5))" },
  } satisfies ChartConfig

  // 3. Top Universities (Bar Chart - Horizontal)
  const uniData = stats.topUniversities.slice(0, 5).map((item, index) => ({
    name: item.name.length > 20 ? item.name.substring(0, 20) + "..." : item.name,
    fullName: item.name,
    count: item.count,
  }))
  const uniConfig = {
    count: { label: "Oportunidades", color: "hsl(var(--chart-3))" },
  } satisfies ChartConfig

  // 4. Degree Breakdown (Vertical Bar Chart)
  const degreeData = stats.degreeBreakdown.slice(0, 7).map((item, index) => ({
    name: item.name,
    count: item.count,
    fill: `hsl(var(--chart-${(index % 5) + 1}))`,
  }))
  const degreeConfig = {
    count: { label: "Programas" },
  } satisfies ChartConfig

  // 5. Trend Data (Area Chart - Mock Data as requested for "Graph")
  const trendData = [
    { month: "Ene", desktop: 186, mobile: 80 },
    { month: "Feb", desktop: 305, mobile: 200 },
    { month: "Mar", desktop: 237, mobile: 120 },
    { month: "Abr", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "Jun", desktop: 214, mobile: 140 },
  ]
  const trendConfig = {
    desktop: { label: "Vistas", color: "hsl(var(--chart-1))" },
    mobile: { label: "Clics", color: "hsl(var(--chart-2))" },
  } satisfies ChartConfig

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      {/* 1. Modality Donut Chart */}
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle className="text-base">Modalidad</CardTitle>
          <CardDescription>Distribución por modalidad</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer config={modalityConfig} className="mx-auto aspect-square max-h-[250px]">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie data={modalityData} dataKey="count" nameKey="name" innerRadius={60} outerRadius={85} strokeWidth={2}>
                <LabelList
                  dataKey="count"
                  className="fill-foreground"
                  stroke="none"
                  fontSize={12}
                  formatter={(value: any) => value.toLocaleString()}
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

      {/* 2. Type Pie Chart */}
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle className="text-base">Nivel Educativo</CardTitle>
          <CardDescription>Licenciatura vs Posgrado</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer config={typeConfig} className="mx-auto aspect-square max-h-[250px]">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie data={typeData} dataKey="count" nameKey="name" outerRadius={85} strokeWidth={2}>
                <Cell fill="var(--color-Licenciatura)" />
                <Cell fill="var(--color-Posgrado)" />
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="name" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* 3. Trend Area Chart */}
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle className="text-base">Tendencia de Interés</CardTitle>
          <CardDescription>Actividad estimada (últimos 6 meses)</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0 w-full">
          <ChartContainer config={trendConfig} className="mx-auto aspect-square max-h-[250px] w-full">
            <AreaChart data={trendData} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
              <Area
                dataKey="mobile"
                type="natural"
                fill="var(--color-mobile)"
                fillOpacity={0.4}
                stroke="var(--color-mobile)"
                stackId="a"
              />
              <Area
                dataKey="desktop"
                type="natural"
                fill="var(--color-desktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* 4. Top Universities Bar Chart (Horizontal) */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Top Instituciones</CardTitle>
          <CardDescription>Instituciones con más programas registrados</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={uniConfig} className="h-[300px] w-full">
            <BarChart accessibilityLayer data={uniData} layout="vertical" margin={{ left: 0, right: 10 }}>
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                width={140}
                fontSize={11}
              />
              <XAxis dataKey="count" type="number" hide />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="count" layout="vertical" fill="var(--color-count)" radius={4} barSize={30}>
                <LabelList dataKey="count" position="right" offset={8} className="fill-foreground" fontSize={12} />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* 5. Degree Breakdown Bar Chart (Vertical) */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Grados Académicos</CardTitle>
          <CardDescription>Desglose por tipo de título</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={degreeConfig} className="h-[300px] w-full">
            <BarChart accessibilityLayer data={degreeData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} fontSize={11} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="count" radius={6}>
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
