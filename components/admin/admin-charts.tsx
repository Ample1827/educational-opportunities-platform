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
import { PieChartIcon, TrendingUp, Building2, GraduationCap, BarChart3 } from "lucide-react"

interface Stats {
  modalityBreakdown: Array<{ name: string; count: number }>
  degreeBreakdown: Array<{ name: string; count: number }>
  typeBreakdown: Array<{ name: string; count: number }>
  topUniversities: Array<{ name: string; count: number }>
  topStates: Array<{ name: string; count: number }>
}

// Vibrant color palette
const COLORS = {
  violet: "#8b5cf6",
  blue: "#3b82f6",
  cyan: "#06b6d4",
  emerald: "#10b981",
  orange: "#f97316",
  pink: "#ec4899",
  indigo: "#6366f1",
  teal: "#14b8a6",
  amber: "#f59e0b",
  rose: "#f43f5e",
}

const colorArray = Object.values(COLORS)

export function AdminCharts({ stats }: { stats: Stats }) {
  // --- Data Preparation ---

  // 1. Modality Data (Donut Chart)
  const modalityData = stats.modalityBreakdown.map((item, index) => ({
    name: item.name,
    count: item.count,
    fill: colorArray[index % colorArray.length],
  }))
  const modalityConfig = {
    count: { label: "Programas" },
    ...Object.fromEntries(modalityData.map((item) => [item.name, { label: item.name, color: item.fill }])),
  } satisfies ChartConfig

  // 2. Type Data (Pie Chart - Licenciatura vs Maestría)
  const typeData = stats.typeBreakdown.map((item, index) => ({
    name: item.name,
    count: item.count,
    fill: index === 0 ? COLORS.emerald : COLORS.indigo,
  }))
  const typeConfig = {
    count: { label: "Programas" },
    Licenciatura: { label: "Licenciatura", color: COLORS.emerald },
    Maestría: { label: "Maestría", color: COLORS.indigo },
  } satisfies ChartConfig

  // 3. Top Universities (Bar Chart - Horizontal) - NO TRUNCATION
  const uniData = stats.topUniversities.slice(0, 5).map((item) => ({
    name: item.name, // Full name for display
    fullName: item.name,
    count: item.count,
  }))
  const uniConfig = {
    count: { label: "Oportunidades", color: COLORS.orange },
  } satisfies ChartConfig

  // 4. Degree Breakdown (Vertical Bar Chart)
  const degreeData = stats.degreeBreakdown.slice(0, 7).map((item, index) => ({
    name: item.name,
    count: item.count,
    fill: colorArray[index % colorArray.length],
  }))
  const degreeConfig = {
    count: { label: "Programas" },
  } satisfies ChartConfig

  // 5. Trend Data (Area Chart)
  const trendData = [
    { month: "Jun", vistas: 186, clics: 80 },
    { month: "Jul", vistas: 305, clics: 200 },
    { month: "Aug", vistas: 237, clics: 120 },
    { month: "Sep", vistas: 173, clics: 190 },
    { month: "Oct", vistas: 309, clics: 230 },
    { month: "Nov", vistas: 414, clics: 280 },
  ]
  const trendConfig = {
    vistas: { label: "Vistas", color: COLORS.violet },
    clics: { label: "Clics", color: COLORS.cyan },
  } satisfies ChartConfig

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      {/* 1. Modality Donut Chart */}
      <Card className="flex flex-col border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden bg-card">
        <div className="h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500" />
        <CardHeader className="pb-0">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-violet-100 dark:bg-violet-900/30">
              <PieChartIcon className="w-4 h-4 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <CardTitle className="text-base font-bold">Modalidad</CardTitle>
              <CardDescription>Distribución por modalidad</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer config={modalityConfig} className="mx-auto aspect-square max-h-[250px]">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie 
                data={modalityData} 
                dataKey="count" 
                nameKey="name" 
                innerRadius={55} 
                outerRadius={85} 
                strokeWidth={3}
                stroke="hsl(var(--card))"
              >
                <LabelList
                  dataKey="count"
                  className="fill-foreground font-semibold"
                  stroke="none"
                  fontSize={11}
                  formatter={(value: number) => value.toLocaleString()}
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
      <Card className="flex flex-col border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden bg-card">
        <div className="h-1 bg-gradient-to-r from-emerald-500 to-indigo-500" />
        <CardHeader className="pb-0">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
              <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <CardTitle className="text-base font-bold">Nivel Educativo</CardTitle>
              <CardDescription>Licenciatura vs Maestría</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer config={typeConfig} className="mx-auto aspect-square max-h-[250px]">
            <PieChart>
              <ChartTooltip 
                cursor={false} 
                content={({ active, payload }) => {
                  if (!active || !payload || !payload.length) return null
                  const data = payload[0]
                  const total = typeData.reduce((sum, item) => sum + item.count, 0)
                  const percentage = ((data.value / total) * 100).toFixed(1)
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid gap-1">
                        <span className="font-bold text-sm">{data.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{data.value}</span>
                          <span className="text-xs text-muted-foreground">({percentage}%)</span>
                        </div>
                      </div>
                    </div>
                  )
                }}
              />
              <Pie 
                data={typeData} 
                dataKey="count" 
                nameKey="name" 
                outerRadius={85} 
                strokeWidth={3}
                stroke="hsl(var(--card))"
                paddingAngle={2}
              >
                {typeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
                <LabelList
                  dataKey="count"
                  className="fill-foreground font-semibold"
                  stroke="none"
                  fontSize={12}
                  formatter={(value: number) => value.toLocaleString()}
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

      {/* 3. Trend Area Chart */}
      <Card className="flex flex-col border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden bg-card">
        <div className="h-1 bg-gradient-to-r from-violet-500 to-cyan-500" />
        <CardHeader className="pb-0">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-100 dark:bg-cyan-900/30">
              <TrendingUp className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <CardTitle className="text-base font-bold">Tendencia de Interés</CardTitle>
              <CardDescription>Actividad estimada (últimos 6 meses)</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 pb-4 w-full">
          <ChartContainer config={trendConfig} className="mx-auto aspect-square max-h-[250px] w-full">
            <AreaChart data={trendData} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="fillVistas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={COLORS.violet} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={COLORS.violet} stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="fillClics" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={COLORS.cyan} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={COLORS.cyan} stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="month" 
                tickLine={false} 
                axisLine={false} 
                tickMargin={8}
                className="text-xs"
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
              <Area
                dataKey="clics"
                type="monotone"
                fill="url(#fillClics)"
                stroke={COLORS.cyan}
                strokeWidth={2}
                stackId="a"
              />
              <Area
                dataKey="vistas"
                type="monotone"
                fill="url(#fillVistas)"
                stroke={COLORS.violet}
                strokeWidth={2}
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* 4. Top Universities Bar Chart (Horizontal) - FIXED */}
      <Card className="lg:col-span-2 border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden bg-card">
        <div className="h-1 bg-gradient-to-r from-orange-500 to-amber-500" />
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-900/30">
              <Building2 className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <CardTitle className="text-base font-bold">Top Instituciones</CardTitle>
              <CardDescription>Instituciones con más programas registrados</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={uniConfig} className="h-[300px] w-full">
            <BarChart accessibilityLayer data={uniData} layout="vertical" margin={{ left: 0, right: 40, top: 10, bottom: 10 }}>
              <CartesianGrid horizontal={false} className="stroke-muted" />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                width={220}
                fontSize={9}
                className="fill-muted-foreground"
                interval={0}
              />
              <XAxis dataKey="count" type="number" hide />
              <ChartTooltip 
                cursor={false} 
                content={({ active, payload }) => {
                  if (!active || !payload || !payload.length) return null
                  const data = payload[0].payload
                  return (
                    <div className="rounded-lg border bg-background p-3 shadow-md">
                      <div className="grid gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Universidad
                          </span>
                          <span className="font-bold text-sm max-w-[280px] break-words">
                            {data.fullName}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Oportunidades
                          </span>
                          <span className="font-bold text-muted-foreground">
                            {data.count}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                }}
              />
              <Bar 
                dataKey="count" 
                layout="vertical" 
                radius={8} 
                barSize={28}
              >
                {uniData.map((_, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index < 3 ? COLORS.orange : COLORS.amber}
                    className="hover:opacity-80 transition-opacity"
                  />
                ))}
                <LabelList 
                  dataKey="count" 
                  position="right" 
                  offset={8} 
                  className="fill-foreground font-semibold" 
                  fontSize={12} 
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* 5. Degree Breakdown Bar Chart (Vertical) */}
      <Card className="lg:col-span-1 border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden bg-card">
        <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500" />
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30">
              <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-base font-bold">Grados Académicos</CardTitle>
              <CardDescription>Desglose por tipo de título</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={degreeConfig} className="h-[300px] w-full">
            <BarChart accessibilityLayer data={degreeData}>
              <CartesianGrid vertical={false} className="stroke-muted" />
              <XAxis 
                dataKey="name" 
                tickLine={false} 
                tickMargin={10} 
                axisLine={false} 
                fontSize={10}
                className="fill-muted-foreground"
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {degreeData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.fill}
                    className="hover:opacity-80 transition-opacity"
                  />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}