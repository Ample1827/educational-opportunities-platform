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

const COLORS = ["#0C2B4E", "#1A3D64", "#1D546C", "#4ade80", "#f43f5e"]

export function ModalityCharts({ nationalData, stateData }: ModalityChartsProps) {
  const [selectedState, setSelectedState] = useState<string>("all")

  // Prepare data for the pie chart
  const pieData = nationalData.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length],
  }))

  // Prepare data for the state bar chart
  const barData = selectedState === "all" ? stateData : stateData.filter((s) => s.name === selectedState)

  const chartHeight = Math.max(300, barData.length * 40)

  // Get keys for the stacked bar chart (excluding name, total, and Pct fields)
  const dataKeys =
    stateData.length > 0
      ? Object.keys(stateData[0]).filter((k) => k !== "name" && k !== "total" && !k.endsWith("Pct"))
      : []

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      <Card className="w-full shadow-md border-t-4 border-t-[#0C2B4E]">
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

      <Card className="w-full shadow-md border-t-4 border-t-[#1D546C]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle>Distribución por Estado</CardTitle>
            <CardDescription>Comparativa de modalidades</CardDescription>
          </div>
          <div className="w-[180px]">
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Vista General</SelectItem>
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
          <div className="w-full" style={{ height: `${chartHeight}px` }}>
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
