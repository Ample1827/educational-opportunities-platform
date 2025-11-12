"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

interface AdminStats {
  totalOpportunities: number
  totalUniversities: number
  totalStates: number
  totalCareers: number
  modalityBreakdown: Array<{ name: string; count: number }>
  degreeBreakdown: Array<{ name: string; count: number }>
}

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

export function AdminStats({ opportunities }: AdminStatsProps) {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)

  const animatedOpportunities = useCountUp(stats?.totalOpportunities || 0, 1000)
  const animatedUniversities = useCountUp(stats?.totalUniversities || 0, 1000)
  const animatedStates = useCountUp(stats?.totalStates || 0, 1000)
  const animatedCareers = useCountUp(stats?.totalCareers || 0, 1000)

  useEffect(() => {
    fetch("/api/stats")
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
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-6 text-center">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" />
          </div>
        ))}
      </div>
    )
  }

  if (!stats) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-primary mb-2">{animatedOpportunities.toLocaleString()}+</div>
          <div className="text-sm text-muted-foreground">Programas Totales</div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-primary mb-2">{animatedUniversities}</div>
          <div className="text-sm text-muted-foreground">Tecnológicos</div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-primary mb-2">{animatedStates}</div>
          <div className="text-sm text-muted-foreground">Estados</div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-primary mb-2">{animatedCareers}</div>
          <div className="text-sm text-muted-foreground">Carreras Diferentes</div>
        </div>
      </div>

      {/* Breakdown Stats */}
      {stats.modalityBreakdown.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Modalidad Breakdown */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Por Modalidad</h3>
            <div className="space-y-3">
              {stats.modalityBreakdown.map((item) => (
                <div key={item.name} className="flex justify-between items-center">
                  <span className="text-muted-foreground">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{
                          width: `${(item.count / stats.totalOpportunities) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-foreground font-semibold min-w-12 text-right">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grado Breakdown */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Por Grado</h3>
            <div className="space-y-3">
              {stats.degreeBreakdown.map((item) => (
                <div key={item.name} className="flex justify-between items-center">
                  <span className="text-muted-foreground">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{
                          width: `${(item.count / stats.totalOpportunities) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-foreground font-semibold min-w-12 text-right">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
