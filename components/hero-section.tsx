"use client"

// import Link from "next/link" // --- Eliminado ---
import { ArrowRight, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center bg-gray-900">
      {/* Static Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-university-1.webp"
          alt="Universidad background"
          // --- MODIFICADO ---
          // Añadida la nueva clase de animación Ken Burns
          className="w-full h-full object-cover animate-ken-burns"
          onError={(e) => {
            console.error("Image failed to load from /hero-university-1.jpg");
            e.currentTarget.style.display = 'none';
          }}
        />

        {/* --- Overlay más oscuro para legibilidad --- */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#0C2B4E]/20 via-transparent to-[#1D546C]/20"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 w-full relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          
          {/* Badge con animación */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 animate-slide-up">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Encuentra tu camino educativo</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-tight text-white drop-shadow-2xl animate-slide-up delay-100">
            Descubre tu{" "}
            {/* --- Texto con animación de bucle --- */}
            <span className="animated-gradient-text">
              universidad ideal
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-white max-w-3xl leading-relaxed drop-shadow-lg animate-slide-up delay-200">
            Explora más de 2,450 programas académicos en 254 instituciones TecNM distribuidas en los 32 estados de
            México. Encuentra la carrera, modalidad y campus perfecto para tu futuro.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-slide-up delay-300">
            <a
              href="/search"
              // Usamos 'Link' como un '<a>' pero con estilos de botón
              className="px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-xl btn-push
                         bg-white text-black hover:bg-gray-100"
            >
              Comenzar búsqueda
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              // --- Enlazado a la sección de Features ---
              href="#features"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-lg font-semibold bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 hover:border-white/50 text-white transition-all duration-300 btn-push"
            >
              Conocer más
            </a>
          </div>

          {/* Trust section */}
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

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-5"></div>
    </section>
  )
}
