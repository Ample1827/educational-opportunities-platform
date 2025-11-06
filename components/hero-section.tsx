import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      <div className="absolute inset-0 -z-10 opacity-50">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div
          className="absolute top-40 right-0 w-80 h-80 bg-secondary rounded-full blur-3xl opacity-15 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-0 left-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Encuentra tu camino educativo</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-balance leading-tight">
            Descubre tu{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              universidad ideal
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl text-balance leading-relaxed">
            Explora más de 2,450 programas académicos en 254 instituciones TecNM distribuidas en los 32 estados de
            México. Encuentra la carrera, modalidad y campus perfecto para tu futuro.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/search">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 gap-2">
                Comenzar búsqueda
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 bg-transparent">
              Conocer más
            </Button>
          </div>

          <div className="pt-8 border-t border-border w-full">
            <p className="text-sm text-muted-foreground mb-6">Confían en Ample más de 50,000 estudiantes</p>
            <div className="flex justify-center items-center gap-8 flex-wrap">
              {["TecNM", "CONACYT", "SEP"].map((org) => (
                <div key={org} className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span className="text-sm font-medium">{org}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent -z-10"></div>
    </section>
  )
}
