"use client"

import { useState, useEffect, useRef } from "react"
import { Loader2 } from "lucide-react"

interface Stats {
  totalOpportunities: number
  totalUniversities: number
  totalStates: number
  totalCareers: number
}

// Añadido 'start' para controlar cuándo empieza la animación
function useCountUp(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // No empezar si 'start' es false
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
  }, [end, duration, start]) // Añadido 'start' a las dependencias

  return count
}

export function StatsSection() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  // Lógica de IntersectionObserver
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
      {
        threshold: 0.1, // Activa cuando el 10% es visible
      }
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
  
  // Pasamos 'isVisible' como el trigger 'start'
  const animatedOpportunities = useCountUp(stats?.totalOpportunities || 0, 2000, isVisible)
  const animatedUniversities = useCountUp(stats?.totalUniversities || 0, 2000, isVisible)
  const animatedStates = useCountUp(stats?.totalStates || 0, 2000, isVisible)

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

  // Envolvemos todo en una <section> con la ref
  return (
    <section ref={sectionRef} className="py-12"> {/* Ajusta el padding si es necesario */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[1, 2, 3].map((i) => (
            // Esqueleto con 'pulse' en lugar de 'spin' para una carga más suave
            <div key={i} className="bg-card border border-border rounded-xl p-8 text-center animate-pulse">
              <div className="w-1/2 h-10 bg-muted rounded-md mx-auto mb-2"></div>
              <div className="w-1/3 h-6 bg-muted rounded-md mx-auto"></div>
            </div>
          ))}
        </div>
      )}

      {!loading && stats && (
        // Animación de entrada para todo el grupo de tarjetas
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto transition-all duration-700 ${
          isVisible ? "animate-slide-up" : "opacity-0 translate-y-4"
        }`}>
          
          {/* --- TARJETA 1 (Programas) --- */}
          {/* MODIFICADO: Usando la estructura de borde deslizante */}
          <div className="animated-border-wrapper">
            <div className="animated-border-inner p-8 text-center card-lift">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {animatedOpportunities.toLocaleString()}+
              </div>
              <div className="text-lg text-muted-foreground">Programas</div>
            </div>
          </div>

          {/* --- TARJETA 2 (Tecnológicos) --- */}
          {/* MODIFICADO: Usando la estructura de borde deslizante */}
          <div className="animated-border-wrapper">
            <div className="animated-border-inner p-8 text-center card-lift">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{animatedUniversities}</div>
              <div className="text-lg text-muted-foreground">Tecnológicos</div>
            </div>
          </div>

          {/* --- TARJETA 3 (Estados) --- */}
          {/* MODIFICADO: Usando la estructura de borde deslizante */}
          <div className="animated-border-wrapper">
            <div className="animated-border-inner p-8 text-center card-lift">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{animatedStates}</div>
              <div className="text-lg text-muted-foreground">Estados</div>
            </div>
          </div>

        </div>
      )}
    </section>
  )
}
