"use client"

import { useState, useEffect } from "react"
import { Loader2, GraduationCap, Building2, MapPin, BookOpen, School, Award } from "lucide-react"
import { ModalityCharts } from "@/components/modality-charts"

interface AdminStats {
  totalOpportunities: number
  totalUniversities: number
  totalStates: number
  totalPrograms: number
  totalLicenciaturas: number
  totalPosgrados: number
  modalityBreakdown: Array<{ name: string; count: number }>
  degreeBreakdown: Array<{ name: string; count: number }>
  typeBreakdown: Array<{ name: string; count: number }>
  topUniversities: Array<{ name: string; count: number }>
  topStates: Array<{ name: string; count: number }>
  modalityByState: Array<{ name: string; total: number; [key: string]: any }>
  modalityNames: string[]
  stateLimitApplied: number | "all"
}

type StateLimitOption = "3" | "5" | "10" | "all"

function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(end * progress))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return count
}

interface AdminStatsProps {
  opportunities: Array<any>
}

// Stat card configurations with colors and icons
const statCardConfig = [
  {
    key: "opportunities",
    label: "Total Programas",
    icon: GraduationCap,
    gradient: "from-violet-500 to-purple-600",
    bgLight: "bg-violet-50 dark:bg-violet-950/30",
    iconBg: "bg-violet-100 dark:bg-violet-900/50",
    iconColor: "text-violet-600 dark:text-violet-400",
    textColor: "text-violet-700 dark:text-violet-300",
  },
  {
    key: "universities",
    label: "Tecnológicos",
    icon: Building2,
    gradient: "from-blue-500 to-cyan-500",
    bgLight: "bg-blue-50 dark:bg-blue-950/30",
    iconBg: "bg-blue-100 dark:bg-blue-900/50",
    iconColor: "text-blue-600 dark:text-blue-400",
    textColor: "text-blue-700 dark:text-blue-300",
  },
  {
    key: "states",
    label: "Estados",
    icon: MapPin,
    gradient: "from-emerald-500 to-teal-500",
    bgLight: "bg-emerald-50 dark:bg-emerald-950/30",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/50",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    textColor: "text-emerald-700 dark:text-emerald-300",
  },
  {
    key: "programs",
    label: "Carreras Únicas",
    icon: BookOpen,
    gradient: "from-orange-500 to-amber-500",
    bgLight: "bg-orange-50 dark:bg-orange-950/30",
    iconBg: "bg-orange-100 dark:bg-orange-900/50",
    iconColor: "text-orange-600 dark:text-orange-400",
    textColor: "text-orange-700 dark:text-orange-300",
  },
  {
    key: "licenciaturas",
    label: "Licenciaturas",
    icon: School,
    gradient: "from-green-500 to-emerald-500",
    bgLight: "bg-green-50 dark:bg-green-950/30",
    iconBg: "bg-green-100 dark:bg-green-900/50",
    iconColor: "text-green-600 dark:text-green-400",
    textColor: "text-green-700 dark:text-green-300",
  },
  {
    key: "posgrados",
    label: "Posgrados",
    icon: Award,
    gradient: "from-indigo-500 to-blue-600",
    bgLight: "bg-indigo-50 dark:bg-indigo-950/30",
    iconBg: "bg-indigo-100 dark:bg-indigo-900/50",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    textColor: "text-indigo-700 dark:text-indigo-300",
  },
]

export function AdminStats({ opportunities }: AdminStatsProps) {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [stateLimit, setStateLimit] = useState<StateLimitOption>("10")

  const animatedValues = {
    opportunities: useCountUp(stats?.totalOpportunities || 0, 1000),
    universities: useCountUp(stats?.totalUniversities || 0, 1000),
    states: useCountUp(stats?.totalStates || 0, 1000),
    programs: useCountUp(stats?.totalPrograms || 0, 1000),
    licenciaturas: useCountUp(stats?.totalLicenciaturas || 0, 1000),
    posgrados: useCountUp(stats?.totalPosgrados || 0, 1000),
  }

  useEffect(() => {
    setLoading(true)
    fetch(`/api/stats?stateLimit=${stateLimit}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats(data.data)
        }
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error loading stats:", error)
        setLoading(false)
      })
  }, [stateLimit])

  const stateLimitOptions: { value: StateLimitOption; label: string }[] = [
    { value: "3", label: "Top 3" },
    { value: "5", label: "Top 5" },
    { value: "10", label: "Top 10" },
    { value: "all", label: "Todos" },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCardConfig.map((config, i) => (
          <div
            key={i}
            className={`${config.bgLight} border-0 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[140px]`}
          >
            <Loader2 className={`w-8 h-8 animate-spin ${config.iconColor}`} />
          </div>
        ))}
      </div>
    )
  }

  if (!stats) return null

  return (
    <div className="space-y-8">
      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCardConfig.map((config) => {
          const Icon = config.icon
          const value = animatedValues[config.key as keyof typeof animatedValues]
          const showPlus = config.key === "opportunities"

          return (
            <div
              key={config.key}
              className={`${config.bgLight} border-0 rounded-2xl p-6 
                         hover:shadow-lg hover:scale-[1.02] transition-all duration-300
                         group cursor-default relative overflow-hidden`}
            >
              {/* Gradient accent line */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${config.gradient}`} />
              
              {/* Icon */}
              <div className={`${config.iconBg} w-12 h-12 rounded-xl flex items-center justify-center mb-4
                              group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`w-6 h-6 ${config.iconColor}`} />
              </div>

              {/* Value */}
              <div className={`text-3xl font-bold ${config.textColor} mb-1`}>
                {value.toLocaleString()}{showPlus && "+"}
              </div>

              {/* Label */}
              <div className="text-sm text-muted-foreground font-medium">
                {config.label}
              </div>
            </div>
          )
        })}
      </div>

      {/* Modality Charts Section */}
      {stats.modalityBreakdown && stats.modalityBreakdown.length > 0 && (
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h3 className="text-xl font-bold text-foreground">Análisis de Modalidades</h3>
            
            <div className="flex items-center gap-3">
              <label htmlFor="stateLimit" className="text-sm font-medium text-muted-foreground">
                Estados:
              </label>
              <select
                id="stateLimit"
                value={stateLimit}
                onChange={(e) => setStateLimit(e.target.value as StateLimitOption)}
                className="px-4 py-2 bg-card border border-border rounded-xl text-sm 
                         focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                         cursor-pointer hover:border-primary/50 transition-all"
              >
                {stateLimitOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <ModalityCharts 
            nationalData={stats.modalityBreakdown} 
            stateData={stats.modalityByState || []} 
          />
        </div>
      )}

      {/* Breakdown Stats */}
      {stats.modalityBreakdown && stats.modalityBreakdown.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Modalidad Breakdown */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
              <div className="w-2 h-6 bg-gradient-to-b from-violet-500 to-purple-600 rounded-full" />
              Por Modalidad
            </h3>
            <div className="space-y-4">
              {stats.modalityBreakdown.map((item, index) => {
                const colors = ["bg-violet-500", "bg-blue-500", "bg-emerald-500", "bg-orange-500", "bg-pink-500"]
                return (
                  <div key={item.name} className="group">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-medium text-foreground">{item.name}</span>
                      <span className="text-sm font-bold text-muted-foreground">
                        {item.count.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${colors[index % colors.length]} rounded-full transition-all duration-700 group-hover:opacity-80`}
                        style={{ width: `${(item.count / stats.totalOpportunities) * 100}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Grado Breakdown */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
              <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full" />
              Por Grado
            </h3>
            <div className="space-y-4">
              {stats.degreeBreakdown.map((item, index) => {
                const colors = ["bg-blue-500", "bg-cyan-500", "bg-teal-500", "bg-green-500", "bg-indigo-500"]
                return (
                  <div key={item.name} className="group">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-medium text-foreground">{item.name}</span>
                      <span className="text-sm font-bold text-muted-foreground">
                        {item.count.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${colors[index % colors.length]} rounded-full transition-all duration-700 group-hover:opacity-80`}
                        style={{ width: `${(item.count / stats.totalOpportunities) * 100}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Top Universities & States */}
      {stats.topUniversities && stats.topUniversities.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Universities */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
              <div className="w-2 h-6 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full" />
              Top 10 Tecnológicos
            </h3>
            <div className="space-y-3">
              {stats.topUniversities.map((item, index) => (
                <div 
                  key={item.name} 
                  className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold w-7 h-7 flex items-center justify-center rounded-lg
                      ${index < 3 
                        ? "bg-gradient-to-br from-orange-500 to-amber-500 text-white" 
                        : "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
                      }`}>
                      {index + 1}
                    </span>
                    <span className="text-sm text-foreground truncate max-w-[180px]" title={item.name}>
                      {item.name}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-muted-foreground">
                    {item.count.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top States */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
              <div className="w-2 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full" />
              Top 10 Estados
            </h3>
            <div className="space-y-3">
              {stats.topStates.map((item, index) => (
                <div 
                  key={item.name} 
                  className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold w-7 h-7 flex items-center justify-center rounded-lg
                      ${index < 3 
                        ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white" 
                        : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                      }`}>
                      {index + 1}
                    </span>
                    <span className="text-sm text-foreground">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold text-muted-foreground">
                    {item.count.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}