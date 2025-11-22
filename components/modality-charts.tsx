"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ModalityData {
  name: string
  count: number
}

interface StateModalityData {
  name: string
  total: number
  [key: string]: any
}

interface ModalityChartsProps {
  nationalData: ModalityData[]
  stateData: StateModalityData[]
}

const COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
]

export function ModalityCharts({ nationalData, stateData }: ModalityChartsProps) {
  const [filterValue, setFilterValue] = useState<string>("limit-10")

  // Prepare data for the pie chart
  const pieData = nationalData.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length],
  }))

  // Prepare data for the state bar chart
  let barData = []
  if (filterValue.startsWith("limit-")) {
    const limitStr = filterValue.replace("limit-", "")
    if (limitStr === "all") {
      barData = stateData
    } else {
      const limit = Number.parseInt(limitStr, 10)
      barData = stateData.slice(0, limit)
    }
  } else {
    // It's a specific state
    barData = stateData.filter((s) => s.name === filterValue)
  }

  const dynamicHeight = Math.max(300, barData.length * 50)

  // Get keys for the stacked bar chart (excluding name, total, and Pct fields)
  const dataKeys =
    stateData.length > 0
      ? Object.keys(stateData[0]).filter((k) => k !== "name" && k !== "total" && !k.endsWith("Pct"))
      : []

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      <Card className="w-full shadow-md border-t-4 border-t-primary">
        <CardHeader>
          <CardTitle>Distribución Nacional por Modalidad</CardTitle>
          <CardDescription>Porcentaje de carreras en cada modalidad a nivel nacional</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [value.toLocaleString(), "Programas"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full shadow-md border-t-4 border-t-secondary">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle>Distribución por Estado</CardTitle>
            <CardDescription>Comparativa de modalidades</CardDescription>
          </div>
          <div className="w-[180px]">
            <Select value={filterValue} onValueChange={setFilterValue}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar vista" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="limit-3">Top 3 Estados</SelectItem>
                <SelectItem value="limit-5">Top 5 Estados</SelectItem>
                <SelectItem value="limit-10">Top 10 Estados</SelectItem>
                <SelectItem value="limit-all">Todos los Estados</SelectItem>
                <div className="my-1 border-t" />
                {[...stateData]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((state) => (
                    <SelectItem key={state.name} value={state.name}>
                      {state.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div style={{ height: `${dynamicHeight}px`, width: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={120} style={{ fontSize: "12px" }} />
                <Tooltip
                  formatter={(value: number, name: string, props: any) => {
                    // Find the percentage
                    const pctKey = `${name}Pct`
                    const pct = props.payload[pctKey]
                    return [`${value} (${pct}%)`, name]
                  }}
                />
                <Legend />
                {dataKeys.map((key, index) => (
                  <Bar key={key} dataKey={key} stackId="a" fill={COLORS[index % COLORS.length]} name={key} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
