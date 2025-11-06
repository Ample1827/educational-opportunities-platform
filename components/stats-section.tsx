"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

interface Stats {
  totalOpportunities: number
  totalUniversities: number
  totalStates: number
  totalCareers: number
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

export function StatsSection() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  const animatedOpportunities = useCountUp(stats?.totalOpportunities || 0)
  const animatedUniversities = useCountUp(stats?.totalUniversities || 0)
  const animatedStates = useCountUp(stats?.totalStates || 0)

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          </div>
        ))}
      </div>
    )
  }

  if (!stats) {
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      <div className="bg-card border border-border rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
        <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
          {animatedOpportunities.toLocaleString()}+
        </div>
        <div className="text-lg text-muted-foreground">Programas</div>
      </div>

      <div className="bg-card border border-border rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
        <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{animatedUniversities}</div>
        <div className="text-lg text-muted-foreground">Tecnológicos</div>
      </div>

      <div className="bg-card border border-border rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
        <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{animatedStates}</div>
        <div className="text-lg text-muted-foreground">Estados</div>
      </div>
    </div>
  )
}
