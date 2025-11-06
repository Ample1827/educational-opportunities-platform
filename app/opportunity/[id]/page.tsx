"use client"

import { useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ExternalLink } from "lucide-react"

interface Opportunity {
  id: number
  estado: string
  universidad: string
  carrera: string
  modalidad: string
  grado: string
  url: string
  claveOficial: string
}

// Mock data - same as in search page
const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    id: 1,
    estado: "Aguascalientes",
    universidad: "Instituto Tecnológico de Aguascalientes",
    carrera: "Ingeniería Electrónica",
    modalidad: "Escolarizada",
    grado: "Licenciatura",
    url: "https://example.com",
    claveOficial: "ITA-001",
  },
  {
    id: 2,
    estado: "Jalisco",
    universidad: "Instituto Tecnológico de Guadalajara",
    carrera: "Ingeniería en Sistemas Computacionales",
    modalidad: "Escolarizada",
    grado: "Licenciatura",
    url: "https://example.com",
    claveOficial: "ITG-002",
  },
  {
    id: 3,
    estado: "CDMX",
    universidad: "Instituto Tecnológico de México",
    carrera: "Ingeniería Industrial",
    modalidad: "Mixta",
    grado: "Maestría",
    url: "https://example.com",
    claveOficial: "ITM-003",
  },
  {
    id: 4,
    estado: "Nuevo León",
    universidad: "Instituto Tecnológico de Monterrey",
    carrera: "Ingeniería Mecánica",
    modalidad: "Escolarizada",
    grado: "Licenciatura",
    url: "https://example.com",
    claveOficial: "ITN-004",
  },
  {
    id: 5,
    estado: "Veracruz",
    universidad: "Instituto Tecnológico de Veracruz",
    carrera: "Ingeniería Química",
    modalidad: "Escolarizada",
    grado: "Licenciatura",
    url: "https://example.com",
    claveOficial: "ITV-005",
  },
  {
    id: 6,
    estado: "Aguascalientes",
    universidad: "Instituto Tecnológico de Aguascalientes",
    carrera: "Administración de Empresas",
    modalidad: "No Escolarizada",
    grado: "Licenciatura",
    url: "https://example.com",
    claveOficial: "ITA-006",
  },
  {
    id: 7,
    estado: "Jalisco",
    universidad: "Instituto Tecnológico de Guadalajara",
    carrera: "Ingeniería Civil",
    modalidad: "Escolarizada",
    grado: "Licenciatura",
    url: "https://example.com",
    claveOficial: "ITG-007",
  },
  {
    id: 8,
    estado: "CDMX",
    universidad: "Instituto Tecnológico de México",
    carrera: "Ingeniería en Telemática",
    modalidad: "Escolarizada",
    grado: "Maestría",
    url: "https://example.com",
    claveOficial: "ITM-008",
  },
]

const DETAIL_INFO = {
  descripcion:
    "Forma profesionales capaces de diseñar, desarrollar, implementar y mantener sistemas electrónicos. El programa incluye asignaturas teóricas y prácticas en circuitos, automatización y electrónica de potencia.",
  duracion: "4 años",
  creditos: "240",
  horario: "Matutino y Vespertino",
  requisitos: "Bachillerato o equivalente, Promedio mínimo de 6.0",
}

export default function OpportunityDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = Number(params?.id)

  const opportunity = useMemo(() => {
    return MOCK_OPPORTUNITIES.find((o) => o.id === id)
  }, [id])

  if (!opportunity) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Oportunidad no encontrada</h1>
            <Link href="/search">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Volver a búsqueda</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button */}
        <Link href="/search">
          <Button variant="ghost" className="mb-8 text-foreground hover:bg-muted flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" />
            Volver a resultados
          </Button>
        </Link>

        {/* Main card */}
        <Card className="border border-border bg-card p-8 sm:p-12 mb-8">
          {/* Header section */}
          <div className="mb-8 pb-8 border-b border-border">
            <p className="text-sm text-muted-foreground font-medium mb-2">
              {opportunity.estado} • {opportunity.modalidad}
            </p>
            <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">{opportunity.carrera}</h1>
            <p className="text-xl text-muted-foreground">{opportunity.universidad}</p>
          </div>

          {/* Key info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 pb-8 border-b border-border">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Grado que otorga</p>
              <p className="text-lg font-semibold text-foreground">{opportunity.grado}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Clave Oficial</p>
              <p className="text-lg font-semibold text-foreground">{opportunity.claveOficial}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Duración</p>
              <p className="text-lg font-semibold text-foreground">{DETAIL_INFO.duracion}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Créditos</p>
              <p className="text-lg font-semibold text-foreground">{DETAIL_INFO.creditos}</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Descripción del programa</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">{DETAIL_INFO.descripcion}</p>
          </div>

          {/* Additional info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 pb-8 border-b border-border">
            <div>
              <h3 className="font-bold text-foreground mb-2">Horarios disponibles</h3>
              <p className="text-muted-foreground">{DETAIL_INFO.horario}</p>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-2">Requisitos de admisión</h3>
              <p className="text-muted-foreground">{DETAIL_INFO.requisitos}</p>
            </div>
          </div>

          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a href={opportunity.url} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground flex items-center justify-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Visitar sitio del tecnológico
              </Button>
            </a>
            <a href={opportunity.url} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Ver carrera en el sitio
              </Button>
            </a>
          </div>
        </Card>

        {/* Related opportunities section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Más oportunidades en {opportunity.estado}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {MOCK_OPPORTUNITIES.filter((o) => o.estado === opportunity.estado && o.id !== opportunity.id)
              .slice(0, 2)
              .map((opp) => (
                <Link key={opp.id} href={`/opportunity/${opp.id}`}>
                  <Card className="border border-border bg-card p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <p className="text-xs font-medium text-muted-foreground mb-2">{opp.universidad}</p>
                    <h3 className="font-bold text-foreground mb-3 line-clamp-2">{opp.carrera}</h3>
                    <div className="flex gap-2 flex-wrap">
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary">
                        {opp.modalidad}
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-secondary/10 text-secondary">
                        {opp.grado}
                      </span>
                    </div>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
