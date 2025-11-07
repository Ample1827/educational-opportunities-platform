"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ExternalLink, GraduationCap, MapPin, BookOpen, Globe, X, Award } from "lucide-react"

interface Opportunity {
  _id: string
  Estado: string
  "Nombre del tecnológico": string
  "Clave oficial": string
  Modalidad: string
  "Grado que otorga": string
  Carrera: string
  "URL del tecnológico": string
  "URL de la carrera": string
}

function UniversityModal({
  opportunity,
  isOpen,
  onClose,
}: { opportunity: Opportunity | null; isOpen: boolean; onClose: () => void }) {
  if (!isOpen || !opportunity) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Card className="bg-card border border-border w-full max-w-lg relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-primary" />
              Información del Tecnológico
            </h2>

            <div className="space-y-4 mb-6">
              <div className="bg-muted/50 rounded-lg p-4 border border-border">
                <p className="text-sm font-medium text-muted-foreground mb-1">Nombre completo</p>
                <p className="text-foreground font-semibold">{opportunity["Nombre del tecnológico"]}</p>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Estado</p>
                  <p className="text-lg font-semibold text-foreground">{opportunity.Estado}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-sm font-mono text-muted-foreground mt-1">#</span>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Clave oficial</p>
                  <p className="text-lg font-mono font-semibold text-foreground">{opportunity["Clave oficial"]}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Grado que otorga</p>
                  <p className="text-lg font-semibold text-foreground">{opportunity["Grado que otorga"]}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Modalidad</p>
                  <p className="text-lg font-semibold text-foreground">{opportunity.Modalidad}</p>
                </div>
              </div>

              <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                <p className="text-sm font-medium text-muted-foreground mb-2">Carrera</p>
                <p className="text-foreground font-semibold">{opportunity.Carrera}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <a href={opportunity["URL del tecnológico"]} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 border-2 bg-transparent"
                >
                  <Globe className="w-5 h-5" />
                  Visitar sitio
                </Button>
              </a>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg font-medium transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}

export default function OpportunityDetailPage() {
  const params = useParams()
  const id = params?.id as string

  const [opportunity, setOpportunity] = useState<Opportunity | null>(null)
  const [relatedOpportunities, setRelatedOpportunities] = useState<Opportunity[]>([])
  const [similarUniversities, setSimilarUniversities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showUniversityModal, setShowUniversityModal] = useState(false)

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        setLoading(true)
        setError(null)
        
        console.log("Fetching opportunity with ID:", id) // Debug log
        console.log("Full URL:", `/api/opportunities/${id}`) // Debug log
        
        const response = await fetch(`/api/opportunities/${id}`)
        
        console.log("Response status:", response.status) // Debug log
        console.log("Response ok:", response.ok) // Debug log
        
        const data = await response.json()
        
        console.log("API Response:", data) // Debug log
        console.log("Success:", data.success) // Debug log
        console.log("Data exists:", !!data.data) // Debug log

        if (data.success && data.data) {
          setOpportunity(data.data)

          // Fetch related opportunities from the same university
          const relatedParams = new URLSearchParams({
            universidad: data.data["Nombre del tecnológico"],
            limit: "5"
          })
          const relatedResponse = await fetch(`/api/opportunities?${relatedParams}`)
          const relatedData = await relatedResponse.json()

          if (relatedData.success) {
            const filtered = relatedData.data.filter((opp: Opportunity) => opp._id !== id).slice(0, 4)
            setRelatedOpportunities(filtered)
          }

          // Fetch similar universities from the same state
          const similarParams = new URLSearchParams({
            estado: data.data.Estado,
            limit: "20"
          })
          const similarResponse = await fetch(`/api/opportunities?${similarParams}`)
          const similarData = await similarResponse.json()

          if (similarData.success) {
            // Get unique universities from the same state, excluding current one
            const uniqueUniversities = Array.from(
              new Map(
                similarData.data
                  .filter((opp: Opportunity) => opp["Nombre del tecnológico"] !== data.data["Nombre del tecnológico"])
                  .map((opp: Opportunity) => [opp["Nombre del tecnológico"], opp])
              ).values()
            ).slice(0, 3)
            setSimilarUniversities(uniqueUniversities)
          }
        } else {
          setError("No se encontró la oportunidad")
        }
      } catch (error) {
        console.error("Error fetching opportunity:", error)
        setError(error instanceof Error ? error.message : "Error al cargar la oportunidad")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchOpportunity()
    } else {
      setError("ID de oportunidad no válido")
      setLoading(false)
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-8"></div>
            <Card className="border border-border bg-card p-8 sm:p-12">
              <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-muted rounded w-full mb-4"></div>
              <div className="h-6 bg-muted rounded w-2/3"></div>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !opportunity) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              {error || "Oportunidad no encontrada"}
            </h1>
            <p className="text-muted-foreground mb-6">ID: {id}</p>
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
        <Link href="/search">
          <Button variant="ghost" className="mb-8 text-foreground hover:bg-muted flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" />
            Volver a resultados
          </Button>
        </Link>

        <Card className="border border-border bg-card p-8 sm:p-12 mb-8">
          <div className="mb-8 pb-8 border-b border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium mb-3">
              <MapPin className="w-4 h-4" />
              <span>{opportunity.Estado}</span>
              <span className="text-muted-foreground/50">•</span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                {opportunity.Modalidad}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-3 text-balance">{opportunity.Carrera}</h1>
            <p className="text-xl text-muted-foreground flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              {opportunity["Nombre del tecnológico"]}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 pb-8 border-b border-border">
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Grado que otorga
              </p>
              <p className="text-lg font-semibold text-foreground">{opportunity["Grado que otorga"]}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm font-medium text-muted-foreground mb-2">Clave Oficial</p>
              <p className="text-lg font-semibold text-foreground font-mono">{opportunity["Clave oficial"]}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm font-medium text-muted-foreground mb-2">Modalidad</p>
              <p className="text-lg font-semibold text-foreground">{opportunity.Modalidad}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Estado
              </p>
              <p className="text-lg font-semibold text-foreground">{opportunity.Estado}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a href={opportunity["URL del tecnológico"]} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 border-2 bg-transparent"
              >
                <Globe className="w-5 h-5" />
                Sitio web
              </Button>
            </a>
            <a href={opportunity["URL de la carrera"]} target="_blank" rel="noopener noreferrer">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Ver carrera
              </Button>
            </a>
            <Button
              onClick={() => setShowUniversityModal(true)}
              variant="outline"
              className="w-full flex items-center justify-center gap-2 border-2"
            >
              <Award className="w-5 h-5" />
              Más info
            </Button>
          </div>
        </Card>

        {relatedOpportunities.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Más programas en {opportunity["Nombre del tecnológico"]}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedOpportunities.map((opp) => (
                <Link key={opp._id} href={`/opportunity/${opp._id}`}>
                  <Card className="border border-border bg-card p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <div className="flex items-start justify-between mb-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-semibold bg-primary/10 text-primary">
                        {opp.Modalidad}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-semibold bg-secondary/10 text-secondary">
                        {opp["Grado que otorga"]}
                      </span>
                    </div>
                    <h3 className="font-bold text-foreground mb-2 line-clamp-2 text-lg">{opp.Carrera}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1 font-mono">{opp["Clave oficial"]}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {similarUniversities.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Otros tecnológicos en {opportunity.Estado}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {similarUniversities.map((uni) => (
                <Card key={uni._id} className="border border-border bg-card p-6 hover:shadow-lg transition-shadow">
                  <div className="mb-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-semibold bg-primary/10 text-primary">
                      {uni.Estado}
                    </span>
                  </div>
                  <h3 className="font-bold text-foreground mb-3 line-clamp-3 text-sm">{uni["Nombre del tecnológico"]}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    <span className="font-semibold">Programa:</span> {uni.Carrera}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4 font-mono">{uni["Clave oficial"]}</p>
                  <Link href={`/opportunity/${uni._id}`}>
                    <Button className="w-full bg-primary/90 hover:bg-primary text-primary-foreground" size="sm">
                      Ver detalles
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      <UniversityModal
        opportunity={opportunity}
        isOpen={showUniversityModal}
        onClose={() => setShowUniversityModal(false)}
      />

      <Footer />
    </div>
  )
}