"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

interface Stats {
  totalOpportunities: number
  totalUniversities: number
  totalStates: number
  totalCareers: number
}

export function StatsSection() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats(data.data)
        }
        setLoading(false)
      })
      .catch(error => {
        console.error('Error loading stats:', error)
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
          {stats.totalOpportunities.toLocaleString()}+
        </div>
        <div className="text-lg text-muted-foreground">Programas</div>
      </div>

      <div className="bg-card border border-border rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
        <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
          {stats.totalUniversities}
        </div>
        <div className="text-lg text-muted-foreground">Tecnológicos</div>
      </div>

      <div className="bg-card border border-border rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
        <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
          {stats.totalStates}
        </div>
        <div className="text-lg text-muted-foreground">Estados</div>
      </div>
    </div>
  )
}
