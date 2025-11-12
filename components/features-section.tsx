"use client" // Necesario para los hooks (useState, useEffect)

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

const FEATURES = [
  {
    title: "Base de datos completa",
    description: "Acceso a la información más actualizada sobre programas académicos en el TecNM",
  },
  {
    title: "Múltiples filtros",
    description: "Busca por universidad, estado, modalidad, grado y especialidad",
  },
  {
    title: "Información confiable",
    description: "Datos verificados y actualizados regularmente directamente de las instituciones",
  },
  {
    title: "Fácil de usar",
    description: "Interfaz intuitiva diseñada para ayudarte a encontrar tu programa ideal",
  },
]

// Array de clases de retraso para la animación escalonada
const animationDelays = ["delay-100", "delay-200", "delay-300", "delay-400"]

export function FeaturesSection() {
  // Lógica para detectar cuándo la sección es visible
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Si la sección entra en la vista, activa la animación
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target) // Deja de observar, solo animamos una vez
        }
      },
      {
        threshold: 0.1, // Activa cuando el 10% de la sección es visible
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

  return (
    <section
      id="features" // <-- Este es el ID de anclaje
      ref={sectionRef} // Referencia para el observador
      className="py-16 sm:py-24 bg-card border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className={`text-3xl font-bold mb-12 text-center text-foreground transition-all duration-700 ${
            // Animación condicional
            isVisible ? "animate-slide-up" : "opacity-0 translate-y-4"
          }`}
        >
          ¿Por qué usar Ample?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {FEATURES.map((feature, index) => (
            <Card
              key={feature.title}
              className={`p-6 border border-border bg-background transition-all duration-700 ${
                // Animación condicional + hover + retraso
                isVisible ? `animate-slide-up ${animationDelays[index]}` : "opacity-0 translate-y-4"
              } card-lift`} // Añadida la clase card-lift para el hover
            >
              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}