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

export function FeaturesSection() {
  return (
    <section className="py-16 sm:py-24 bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12 text-center text-foreground">¿Por qué usar Ample?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {FEATURES.map((feature) => (
            <Card
              key={feature.title}
              className="p-6 border border-border bg-background hover:shadow-md transition-shadow"
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
