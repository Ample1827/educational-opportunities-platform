"use client"

import { useState, useEffect, useRef } from "react"
import { ModalityCharts } from "@/components/modality-charts"

interface Stats {
  totalOpportunities: number
  totalUniversities: number
  totalStates: number
  totalPrograms: number
  totalLicenciaturas: number
  totalPosgrados: number
  modalityBreakdown: Array<{ name: string; count: number }>
  modalityByState: Array<{ name: string; total: number; [key: string]: any }>
  modalityNames: string[]
  stateLimitApplied: number | "all"
}

type StateLimitOption = "3" | "5" | "10" | "all"

function useCountUp(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return

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
  }, [end, duration, start])

  return count
}

export function StatsSection() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [stateLimit, setStateLimit] = useState<StateLimitOption>("10")

  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const animatedOpportunities = useCountUp(stats?.totalOpportunities || 0, 2000, isVisible)
  const animatedUniversities = useCountUp(stats?.totalUniversities || 0, 2000, isVisible)
  const animatedStates = useCountUp(stats?.totalStates || 0, 2000, isVisible)

  // Fetch stats with stateLimit parameter
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

  return (
    <section ref={sectionRef} className="py-12 bg-slate-50">
      {loading && (
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-8 text-center animate-pulse">
                <div className="w-1/2 h-10 bg-muted rounded-md mx-auto mb-2"></div>
                <div className="w-1/3 h-6 bg-muted rounded-md mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && stats && (
        <div className="container mx-auto px-4">
          {/* Animated Stats Cards */}
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 transition-all duration-700 ${
              isVisible ? "animate-slide-up" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="animated-border-wrapper">
              <div className="animated-border-inner p-8 text-center card-lift bg-white shadow-sm">
                <div className="text-4xl md:text-5xl font-bold text-[#0C2B4E] mb-2">
                  {animatedOpportunities.toLocaleString()}+
                </div>
                <div className="text-lg text-muted-foreground font-medium">Programas</div>
              </div>
            </div>

            <div className="animated-border-wrapper">
              <div className="animated-border-inner p-8 text-center card-lift bg-white shadow-sm">
                <div className="text-4xl md:text-5xl font-bold text-[#1D546C] mb-2">{animatedUniversities}</div>
                <div className="text-lg text-muted-foreground font-medium">Tecnológicos</div>
              </div>
            </div>

            <div className="animated-border-wrapper">
              <div className="animated-border-inner p-8 text-center card-lift bg-white shadow-sm">
                <div className="text-4xl md:text-5xl font-bold text-[#1A3D64] mb-2">{animatedStates}</div>
                <div className="text-lg text-muted-foreground font-medium">Estados</div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? "animate-slide-up opacity-100" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <h2 className="text-2xl font-bold text-center text-[#0C2B4E]">Panorama Educativo Nacional</h2>

              {/* State Limit Selector */}
              <div className="flex items-center gap-2">
                <label htmlFor="stateLimit" className="text-sm font-medium text-muted-foreground">
                  Estados a mostrar:
                </label>
                <select
                  id="stateLimit"
                  value={stateLimit}
                  onChange={(e) => setStateLimit(e.target.value as StateLimitOption)}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-[#0C2B4E] font-medium
                           focus:outline-none focus:ring-2 focus:ring-[#0C2B4E] focus:border-transparent
                           cursor-pointer hover:border-gray-400 transition-colors"
                >
                  {stateLimitOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <ModalityCharts nationalData={stats.modalityBreakdown || []} stateData={stats.modalityByState || []} />
          </div>
        </div>
      )}
    </section>
  )
}
