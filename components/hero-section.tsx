"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Static Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/hero-university-1.jpg"
          alt="Universidad background"
          className="w-full h-full object-cover"
        />

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70"></div>

        {/* Colored gradient overlay for brand colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-transparent to-emerald-500/20"></div>

        {/* Animated gradient circles */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-br from-emerald-500/30 to-teal-500/30 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 w-full relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Badge with animation */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Encuentra tu camino educativo</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-tight text-white drop-shadow-2xl">
            Descubre tu{" "}
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              universidad ideal
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-gray-100 max-w-3xl leading-relaxed drop-shadow-lg">
            Explora más de 2,450 programas académicos en 254 instituciones TecNM distribuidas en los 32 estados de
            México. Encuentra la carrera, modalidad y campus perfecto para tu futuro.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/search">
              <button className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105 shadow-xl">
                Comenzar búsqueda
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <button className="px-8 py-3 rounded-lg font-semibold bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 hover:border-white/50 text-white transition-all duration-300 hover:scale-105">
              Conocer más
            </button>
          </div>

          {/* Trust section */}
          <div className="pt-8 border-t border-white/20 w-full">
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
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent -z-10"></div>
    </section>
  )
}