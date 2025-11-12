"use client"

// import Link from "next/link" // Eliminado para solucionar error de compilación
import { ArrowRight, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center bg-gray-900">
      {/* Fondo y Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-university-1.webp"
          alt="Universidad background"
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error("Image failed to load from /hero-university-1.jpg");
            e.currentTarget.style.display = 'none';
          }}
        />
        {/* Overlay oscuro para legibilidad (el que ajustamos) */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80"></div>
        {/* Overlay de color de marca */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0C2B4E]/20 via-transparent to-[#1D546C]/20"></div>
      </div>

      {/* Contenido Principal */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 w-full relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 animate-slide-up">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Encuentra tu camino educativo</span>
          </div>

          {/* Título Principal */}
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-tight text-white drop-shadow-2xl animate-slide-up delay-100">
            Descubre tu{" "}
            {/* Texto con gradiente animado */}
            <span className="animated-gradient-text bg-clip-text text-transparent drop-shadow-md">
              universidad ideal
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="text-lg sm:text-xl text-white max-w-3xl leading-relaxed drop-shadow-md animate-slide-up delay-200">
            Explora más de 2,450 programas académicos en 254 instituciones TecNM distribuidas en los 32 estados de
            México. Encuentra la carrera, modalidad y campus perfecto para tu futuro.
          </p>

          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-slide-up delay-300">
            
            {/* Botón 1: Comenzar Búsqueda */}
            <a 
              href="/search"
              className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-xl btn-push"
            >
                Comenzar búsqueda
                <ArrowRight className="w-4 h-4" />
            </a>

            {/* Botón 2: Conocer Más (enlazado a #features) */}
            <a
              href="#features"
              className="px-8 py-3 rounded-lg font-semibold bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 hover:border-white/50 text-white transition-all duration-300 btn-push"
            >
                Conocer más
            </a>
          </div>

          {/* Sección de Confianza */}
          <div className="pt-8 border-t border-white/20 w-full animate-slide-up delay-400">
            <p className="text-sm text-gray-200 mb-6">Confían en Ample más de 50,000 estudiantes</p>
            <div className="flex justify-center items-center gap-8 flex-wrap">
              {["TecNM", "CONACYT", "SEP"].map((org) => (
                <div key={org} className="flex items-center gap-2 text-white/90 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm font-medium">{org}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gradiente inferior (no afecta legibilidad) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-5"></div>
    </section>
  )
}